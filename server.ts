import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import OpenAI from 'openai';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import xss from 'xss';
import { ABYBY_SITA_SYSTEM_PROMPT } from './src/lib/systemPrompt';
import { recrutamentoRouter } from './server/routes/recrutamento';
import { adminRouter } from './server/routes/admin';
import { newsRouter } from './server/routes/news';
import { supabase } from './server/supabase';
import cors from 'cors';
import cookieParser from 'cookie-parser';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080;

  const isProd = process.env.NODE_ENV === 'production';

  // Configuração CORS (Dev vs Prod) conforme planeado
  if (!isProd) {
    app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }));
  }

  // Cookie parser (necessário para a autenticação do admin)
  app.use(cookieParser());

  // Security Headers using Helmet (Configured for Production Security & Dev Preview Compatibility)
  app.use(
    helmet({
      contentSecurityPolicy: isProd
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'", "'unsafe-inline'", 'https://maps.googleapis.com'],
              styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
              fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
              imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
              connectSrc: [
                "'self'",
                'https://api.emailjs.com',
                'https://generativelanguage.googleapis.com',
              ],
              frameSrc: ["'self'", 'https://maps.google.com', 'https://www.google.com'],
            },
          }
        : false, // Vite dev mode requires flexible CSP
      frameguard: isProd ? { action: 'sameorigin' } : false, // In prod, prevents clickjacking; in dev, allows iframe preview
      crossOriginEmbedderPolicy: false,
      hidePoweredBy: true,
    }),
  );

  // Payload size limit to prevent Denial of Service (DoS) attacks.
  // 100kb keeps the AI chat history (up to 10 turns) within limits while still
  // blocking oversized bodies. Field lengths are validated per-route.
  app.use(express.json({ limit: '100kb' }));

  // GZIP compression for all responses
  app.use(compression());

  // Healthcheck endpoint
  app.get('/healthz', (_req, res) => {
    res.status(200).send('OK');
  });

  // Initialize OpenAI client with NVIDIA_API_KEY
  let ai: OpenAI | null = null;
  if (!process.env.NVIDIA_API_KEY) {
    console.warn('AVISO: NVIDIA_API_KEY não configurada. A rota /api/chat devolverá 503.');
  } else {
    ai = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    });
  }

  // Rate Limiting to prevent brute-force, DoS and API quota exhaustion on /api/chat: max 20 requests per 15 min per IP
  app.set('trust proxy', 1);
  const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15-minute window
    max: 20, // Limit each IP to 20 requests per 15-minute window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error:
        'Demasiados pedidos a partir deste endereço IP. Limite de 20 pedidos a cada 15 minutos atingido. Por favor, aguarde alguns minutos antes de tentar novamente.',
    },
  });

  // AI Chat endpoint with rate limiting and strict input validation & sanitization
  app.post('/api/chat', chatLimiter, async (req, res) => {
    try {
      if (!ai) {
        return res
          .status(503)
          .json({ error: 'O serviço de Assistente IA está temporariamente indisponível.' });
      }

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
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: ABYBY_SITA_SYSTEM_PROMPT },
      ];

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
            const role = item.role === 'user' ? 'user' : 'assistant';
            messages.push({
              role,
              content: xss(item.content.trim()),
            });
          }
        }
      }

      messages.push({
        role: 'user',
        content: sanitizedMessage,
      });

      const response = await ai.chat.completions.create(
        {
          model: 'meta/llama-3.1-8b-instruct',
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        },
        // Groq responds very quickly, but we keep the same timeout pattern for safety.
        { timeout: 60000 }
      );

      const reply =
        response.choices[0]?.message?.content ||
        'Desculpe, não foi possível obter uma resposta neste momento. Por favor, tente novamente.';

      return res.json({ reply });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Erro na rota /api/chat:', errorMessage);
      // Safe error response that never leaks internal stack traces or environment secrets
      return res.status(500).json({
        error: 'Ocorreu um erro ao comunicar com a Assistente de IA. Por favor, tente novamente.',
      });
    }
  });

  // Quote Enhancement Rate Limiting (AI enrichment for the quote form)
  const quoteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Muitos pedidos de melhoramento de proposta. Tente novamente mais tarde.' },
  });

  // System prompt for transforming a client's short note into a structured, professional
    // request-for-quotation document. The AI organizes the client's OWN words/figures —
    // nothing is invented — and returns it as a JSON object the frontend renders.
    const ENHANCE_QUOTE_SYSTEM_PROMPT = `És o redator executivo de documentos de solicitação de proposta da ABYBY SITA COMÉRCIO GERAL, LDA (Luanda, Angola) — empresa de fornecimento industrial, tubagens, Oil & Gas, rope access, logística integrada, frescos e bens alimentares.

  Recebes o SERVIÇO DE INTERESSE (selecionado pelo cliente) e uma NOTA curta e informal escrita pelo próprio cliente.

  A tua missão: ORGANIZAR as ideias do cliente e transformá-las num documento profissional de solicitação de orçamento, de tal forma que o cliente se reconheça no texto mas o veja elevado ao nível de uma proposta executiva.

  REGRAS ABSOLUTAS:
    - POLIMENTO FORMAL OBRIGATÓRIO: reescreve a nota numa prosa profissional, formal e bem estruturada, mesmo que o cliente tenha escrito de forma informal, cheia de erros ou com calão. Corrige gramática, pontuação e ortografia; eleva o tom para linguagem executiva institucional. O cliente deve reconhecer as SUAS IDEIAS, mas a forma deve parecer escrita por um profissional.
    - PRESERVA SEMPRE todos os factos, unidades de medida, quantidades, prazos e datas: se ele disse "500 metros de tubo de aço", mantém "500 metros de tubo de aço" — nunca alteres, reduzas nem inventes números.
    - Expande e estrutura apenas o que está implícito no sector indicado, com generalizações profissionais — NUNCA inventes quantidades, medidas, preços, prazos, marcas, localidades, NIFs ou qualquer dado concreto não mencionado.
    - Escreve em português profissional e institucional de Angola (pt-AO), com ortografia e acentuação corretas.
    - Se a nota já for detalhada e formal, apenas organiza-a e eleva levemente o tom sem alterar o conteúdo.
    - Guarda sempre a voz e a motivação do cliente no significado; não transformes em jargão vazio, mas eleva o tom informal de modo a soar executivo.

  FORMATO DE RESPOSTA — devolve APENAS um objeto JSON puro, sem markdown, sem \`\`\`, sem texto fora, com EXATAMENTE esta estrutura:
  {
    "titulo": "subtítulo curto que resume o pedido (ex.: Fornecimento de tubagens industriais)",
    "resumo": "parágrafo profissional de 3 a 5 linhas que reconta a necessidade usando as palavras e factos do cliente",
    "objectivos": ["3 a 5 bullets descrevendo o que o cliente pretende alcançar", "..."],
    "requisitos": ["3 a 6 bullets com especificações e condicionantes do pedido (quantidades, materiais, local de entrega, prazo, condições) — apenas o mencionado ou o implicitível sem inventar concretos", "..."],
    "detalhes": "texto adicional relevante, ou string vazia caso não exista"
  }
  LIMITES: titulo ≤ 90 caracteres; resumo ≤ 150 caracteres; cada bullet ≤ 200 caracteres; máximo 5 objectivos e 6 requisitos; detalhes ≤ 350 caracteres.`;

    // Robust JSON extraction from the model output (tolerates code fences / stray text).
    function extractQuoteJson(raw: string): Record<string, unknown> | null {
      try {
        const s = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
        const start = s.indexOf('{');
        const end = s.lastIndexOf('}');
        if (start === -1 || end === -1 || end <= start) return null;
        const parsed = JSON.parse(s.slice(start, end + 1));
        return parsed && typeof parsed === 'object' ? parsed : null;
      } catch {
        return null;
      }
    }

    // AI Quote Enhancement endpoint — enriches the client's short message into a professional
    // structured document (organized using the client's own words).
    app.post('/api/enhance-quote', quoteLimiter, async (req, res) => {
      try {
        if (!ai) {
          return res
            .status(503)
            .json({ error: 'O serviço de IA está temporariamente indisponível.' });
        }

        const { servico, mensagem } = req.body;

        // 1. Input presence & type validation
        if (!mensagem || typeof mensagem !== 'string') {
          return res.status(400).json({ error: 'Por favor, forneça a mensagem do cliente.' });
        }

        // 2. Length constraint
        const trimmedMessage = mensagem.trim();
        if (trimmedMessage.length < 2) {
          return res.status(400).json({ error: 'A mensagem é demasiado curta para ser melhorada.' });
        }
        if (trimmedMessage.length > 2000) {
          return res.status(400).json({ error: 'A mensagem excede o limite de 2000 caracteres.' });
        }

        // 3. XSS Sanitization
        const cleanServico =
          typeof servico === 'string' && servico.trim()
            ? xss(servico.trim().slice(0, 100))
            : 'Serviço não especificado';
        const cleanMensagem = xss(trimmedMessage);

        const response = await ai.chat.completions.create(
          {
            model: 'meta/llama-3.1-8b-instruct',
            messages: [
              { role: 'system', content: ENHANCE_QUOTE_SYSTEM_PROMPT },
              {
                role: 'user',
                content: `Serviço de interesse: ${cleanServico}\n\nNota do cliente:\n${cleanMensagem}`,
              },
            ],
            temperature: 0.4,
            max_tokens: 1200,
          },
          // Same model latency consideration as /api/chat — give it room to respond.
          { timeout: 60000 },
        );

        const enhanced = response.choices[0]?.message?.content?.trim() || '';
        if (!enhanced) {
          return res
            .status(502)
            .json({ error: 'A IA não produziu uma especificação. Tente novamente.' });
        }

        // 4. Parse the structured JSON the model returned.
        const parsed = extractQuoteJson(enhanced);
        const str = (v: unknown, fallback = ''): string =>
          typeof v === 'string' && v.trim() ? v.trim() : fallback;
        const arr = (v: unknown): string[] =>
          Array.isArray(v)
            ? v
                .map((i) => str(i))
                .filter(Boolean)
                .slice(0, 6)
            : [];

        const titulo = str(parsed?.titulo) || `Pedido de orçamento — ${cleanServico}`;
        const resumo =
          str(parsed?.resumo) || (parsed ? '' : `Solicitação de ${cleanServico}.`);
        const objectivos = arr(parsed?.objectivos);
        const requisitos = arr(parsed?.requisitos);
        const detalhes = str(parsed?.detalhes);

        const documento = { titulo, resumo, objectivos, requisitos, detalhes };
        const textoPlano = [
          titulo,
          resumo,
          objectivos.length ? `Objectivos:\n- ${objectivos.join('\n- ')}` : '',
          requisitos.length ? `Requisitos:\n- ${requisitos.join('\n- ')}` : '',
          detalhes,
        ]
          .filter(Boolean)
          .join('\n\n');

        return res.json({ documento, textoPlano });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Erro na rota /api/enhance-quote:', errorMessage);
        // Safe error response that never leaks internal stack traces or environment secrets
        return res.status(500).json({
          error: 'Ocorreu um erro ao melhorar a especificação. Por favor, tente novamente.',
        });
      }
    });

  // Contact Rate Limiting
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Muitos pedidos de contacto. Tente novamente mais tarde.' },
  });

  // API Contact endpoint with server-side persistence in JSON
  app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
      const { nome, empresa, email, telefone, servico, mensagem } = req.body;
      if (!nome || !email || !mensagem) {
        return res
          .status(400)
          .json({ error: 'Os campos Nome, Email e Mensagem são obrigatórios.' });
      }

      const lead = {
        nome: xss(nome),
        empresa: xss(empresa || ''),
        email: xss(email),
        telefone: xss(telefone || ''),
        servico: xss(servico || ''),
        mensagem: xss(mensagem),
        status: 'Novo'
      };

      const { error: insertErr } = await supabase.from('leads').insert([lead]);
      if (insertErr) {
        console.error('Erro ao inserir lead no Supabase:', insertErr);
        throw insertErr;
      }

      return res.json({ success: true });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Erro na rota /api/contact:', errorMessage);
      return res.status(500).json({ error: 'Erro ao processar o pedido.' });
    }
  });

  // Recrutamento Routes
  app.use('/api/recrutamento', recrutamentoRouter);

  // Corporate News / Feed Routes
  app.use('/api/news', newsRouter);

  // Admin Routes
  app.use('/api/admin', adminRouter);

  // Vite development middleware or production static files
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: unknown) {
        if (e instanceof Error) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(
      express.static(distPath, {
        maxAge: '1y',
        setHeaders: (res, path) => {
          if (path.endsWith('index.html')) {
            res.setHeader('Cache-Control', 'no-cache');
          }
        },
      }),
    );
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('A encerrar servidor...');
    server.close(() => {
      console.log('Servidor encerrado.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer().catch((error: unknown) => {
  console.error('Erro fatal ao arrancar servidor:', error);
  process.exit(1);
});
