import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss';
import { ABYBY_SITA_SYSTEM_PROMPT } from './src/lib/systemPrompt';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Headers using Helmet (Configured for Production Security & Dev Preview Compatibility)
  const isProd = process.env.NODE_ENV === 'production';
  app.use(
    helmet({
      contentSecurityPolicy: isProd
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://maps.googleapis.com", "https://cdn.jsdelivr.net"],
              styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
              fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
              imgSrc: ["'self'", "data:", "https:", "blob:"],
              connectSrc: ["'self'", "https://api.emailjs.com", "https://generativelanguage.googleapis.com"],
              frameSrc: ["'self'", "https://maps.google.com", "https://www.google.com"],
            },
          }
        : false, // Vite dev mode requires flexible CSP
      frameguard: isProd ? { action: 'sameorigin' } : false, // In prod, prevents clickjacking; in dev, allows iframe preview
      crossOriginEmbedderPolicy: false,
      hidePoweredBy: true,
    })
  );

  // Payload size limit to prevent Denial of Service (DoS) attacks
  app.use(express.json({ limit: '10kb' }));

  // Initialize Google GenAI with GEMINI_API_KEY and telemetry User-Agent header
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Rate Limiting to prevent brute-force, DoS and API quota exhaustion on /api/chat
  const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15-minute window
    max: 30, // Limit each IP to 30 chat requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Limite de mensagens excedido. Por favor, aguarde alguns minutos antes de tentar novamente.',
    },
  });

  // AI Chat endpoint with rate limiting and strict input validation & sanitization
  app.post('/api/chat', chatLimiter, async (req, res) => {
    try {
      const { message, history } = req.body;

      // 1. Input presence & type validation
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Por favor, forneça uma mensagem válida.' });
      }

      // 2. Length constraint to prevent prompt injection and memory overload
      const trimmedMessage = message.trim();
      if (trimmedMessage.length === 0) {
        return res.status(400).json({ error: 'A mensagem não pode estar vazia.' });
      }
      if (trimmedMessage.length > 1000) {
        return res.status(400).json({ error: 'A mensagem excede o limite de 1000 caracteres.' });
      }

      // 3. XSS Sanitization
      const sanitizedMessage = xss(trimmedMessage);

      // 4. Validate & sanitize conversation history
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        // Restrict history to last 10 turns to avoid excessive context tokens and memory overload
        const safeHistory = history.slice(-10);
        for (const item of safeHistory) {
          if (
            item &&
            typeof item === 'object' &&
            typeof item.content === 'string' &&
            item.content.trim().length > 0 &&
            item.content.trim().length <= 2000
          ) {
            const role: 'user' | 'model' = item.role === 'user' ? 'user' : 'model';
            contents.push({
              role,
              parts: [{ text: xss(item.content.trim()) }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: sanitizedMessage }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction: ABYBY_SITA_SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'Desculpe, não foi possível obter uma resposta neste momento. Por favor, tente novamente.';

      return res.json({ reply });
    } catch (error: any) {
      console.error('Erro na rota /api/chat:', error);
      // Safe error response that never leaks internal stack traces or environment secrets
      return res.status(500).json({
        error: 'Ocorreu um erro ao comunicar com a Assistente de IA. Por favor, tente novamente.',
      });
    }
  });

  // Vite development middleware or production static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
