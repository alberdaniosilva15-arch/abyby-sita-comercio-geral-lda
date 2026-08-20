import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import rateLimit from 'express-rate-limit';
import { supabase } from '../supabase';

export const adminRouter = Router();

interface AuthenticatedRequest extends Request {
  admin?: string | jwt.JwtPayload;
}

// Rate limiter para o login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: { error: 'Muitas tentativas de login. Por favor tente novamente mais tarde.' },
});

// Helper para obter configuração do cookie baseada no NODE_ENV
export const getCookieConfig = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd, // em localhost fica false para permitir envio
    sameSite: (isProd ? 'strict' : 'lax') as 'strict' | 'lax',
    maxAge: 8 * 60 * 60 * 1000, // 8h
  };
};

// ==========================================
// ROTA DE LOGIN
// ==========================================
adminRouter.post('/login', loginLimiter, async (req: Request, res: Response) => {
  try {
    const { password, totpCode } = req.body;
    if (!password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH || '';
    const secret = process.env.JWT_SECRET || '';

    if (!hash || !secret) {
      console.error('Falta ADMIN_PASSWORD_HASH ou JWT_SECRET no .env');
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }

    const isValid = await bcrypt.compare(password, hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // ── Verificação 2FA (TOTP) ──────────────────────────────────
    const totpSecret = process.env.ADMIN_TOTP_SECRET || '';
    if (totpSecret) {
      if (!totpCode || typeof totpCode !== 'string') {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      const isTotpValid = authenticator.verify({
        token: totpCode.trim(),
        secret: totpSecret,
      });
      if (!isTotpValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
    }
    // ─────────────────────────────────────────────────────────────

    // Gerar token com tempo de expiração seguro
    const expiresIn = (process.env.JWT_EXPIRES_IN || '8h') as jwt.SignOptions['expiresIn'];
    const token = jwt.sign({ role: 'admin' }, secret, {
      expiresIn,
    });

    res.cookie('admin_token', token, getCookieConfig());
    return res.json({ success: true });
  } catch (err) {
    console.error('Erro no login admin:', err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
});

// ==========================================
// ROTA DE LOGOUT
// ==========================================
adminRouter.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('admin_token', getCookieConfig());
  return res.json({ success: true });
});

// ==========================================
// MIDDLEWARE DE PROTEÇÃO
// ==========================================
const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.admin_token;
  if (!token) {
    return res.status(401).json({ error: 'Acesso negado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    req.admin = decoded;
    next();
  } catch (_err) {
    return res.status(401).json({ error: 'Sessão expirada ou inválida' });
  }
};

adminRouter.use(requireAdmin);

// ==========================================
// ROTAS DE VAGAS
// ==========================================
adminRouter.get('/vagas', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('recruitment_jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ vagas: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ error: message });
  }
});

adminRouter.post('/vagas', async (req: Request, res: Response) => {
  try {
    const vaga = req.body;
    const insertData = { ...vaga, is_active: true };
    const { data, error } = await supabase.from('recruitment_jobs').insert([insertData]).select();

    if (error) throw error;
    res.status(201).json({ success: true, vaga: data[0] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ error: message });
  }
});

adminRouter.patch('/vagas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const { data, error } = await supabase
      .from('recruitment_jobs')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ success: true, vaga: data[0] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ error: message });
  }
});

adminRouter.patch('/vagas/:id/arquivar', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('recruitment_jobs')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ error: message });
  }
});

adminRouter.patch('/vagas/:id/reativar', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('recruitment_jobs')
      .update({ is_active: true })
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ error: message });
  }
});

// ==========================================
// ROTAS DE CANDIDATURAS
// ==========================================
adminRouter.get('/candidaturas', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const vagaId = req.query.vagaId as string;
    const status = req.query.status as string;

    let query = supabase.from('recruitment_applications').select('*, recruitment_jobs(title)', { count: 'exact' });

    if (vagaId) query = query.eq('job_id', vagaId);
    if (status && status !== 'todas') query = query.eq('status', status);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    res.json({ candidaturas: data, total: count, page, limit });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ error: message });
  }
});

adminRouter.patch('/candidaturas/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { error } = await supabase
      .from('recruitment_applications')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ error: message });
  }
});

// ==========================================
// ROTA DE DOWNLOAD SEGURO E NOMEADO DE CV
// ==========================================
adminRouter.get('/candidaturas/:id/download-cv', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data: cand, error } = await supabase
      .from('recruitment_applications')
      .select('full_name, cv_url')
      .eq('id', id)
      .single();

    if (error || !cand || !cand.cv_url) {
      return res.status(404).json({ error: 'CV não encontrado' });
    }

    // Proteção Anti-SSRF: apenas URLs legítimas do Cloudinary são permitidas
    if (!cand.cv_url.startsWith('https://res.cloudinary.com/')) {
      return res.status(403).json({ error: 'Origem de ficheiro não autorizada.' });
    }

    const cleanName = (cand.full_name || 'Candidato')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_');

    const fileRes = await fetch(cand.cv_url);
    if (!fileRes.ok) {
      return res.status(502).json({ error: 'Erro ao obter ficheiro do armazenamento seguro' });
    }

    const contentType = fileRes.headers.get('content-type') || 'application/pdf';
    let ext = '.pdf';
    if (contentType.includes('wordprocessingml') || cand.cv_url.toLowerCase().endsWith('.docx')) {
      ext = '.docx';
    } else if (contentType.includes('msword') || cand.cv_url.toLowerCase().endsWith('.doc')) {
      ext = '.doc';
    }

    const filename = `CV_${cleanName}${ext}`;
    const arrayBuffer = await fileRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length.toString());
    return res.send(buffer);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao processar download';
    res.status(500).json({ error: message });
  }
});

// ==========================================
// ROTAS DE GESTÃO DE FEED & NOTÍCIAS (ADMIN)
// ==========================================
import multer from 'multer';
import {
  getNewsList,
  createNews,
  updateNews,
  toggleNewsActive,
  deleteNewsPermanently,
} from '../news-store';
import { uploadToCloudinary } from '../upload-cloudinary';

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // máx 8MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas ficheiros de imagem (JPG, PNG, WebP) são permitidos.'));
    }
  },
});

// 1. Listar todas as notícias (ativas e arquivadas)
adminRouter.get('/news', (_req: Request, res: Response) => {
  try {
    const { news, total } = getNewsList({ includeInactive: true });
    res.json({ news, total });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao obter notícias';
    res.status(500).json({ error: message });
  }
});

// 2. Criar nova notícia
adminRouter.post('/news', (req: Request, res: Response) => {
  try {
    const { title, excerpt, body, category, image_url, is_featured, author } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'O título da notícia é obrigatório.' });
    }
    if (!excerpt || !excerpt.trim()) {
      return res.status(400).json({ error: 'O resumo/excerto da notícia é obrigatório.' });
    }
    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'O corpo do artigo é obrigatório.' });
    }

    const post = createNews({
      title,
      excerpt,
      body,
      category,
      image_url,
      is_featured,
      author,
    });

    res.status(201).json({ success: true, post });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao criar notícia';
    res.status(500).json({ error: message });
  }
});

// 3. Atualizar notícia
adminRouter.patch('/news/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = updateNews(id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Notícia não encontrada.' });
    }

    res.json({ success: true, post: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao atualizar notícia';
    res.status(500).json({ error: message });
  }
});

// 4. Arquivar notícia (Soft-delete)
adminRouter.patch('/news/:id/arquivar', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ok = toggleNewsActive(id, false);
    if (!ok) {
      return res.status(404).json({ error: 'Notícia não encontrada.' });
    }
    res.json({ success: true, message: 'Notícia arquivada com sucesso.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao arquivar notícia';
    res.status(500).json({ error: message });
  }
});

// 5. Reativar notícia
adminRouter.patch('/news/:id/reativar', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ok = toggleNewsActive(id, true);
    if (!ok) {
      return res.status(404).json({ error: 'Notícia não encontrada.' });
    }
    res.json({ success: true, message: 'Notícia reativada com sucesso.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao reativar notícia';
    res.status(500).json({ error: message });
  }
});

// 6. Eliminar definitivamente notícia
adminRouter.post('/news/:id/eliminar', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ok = deleteNewsPermanently(id);
    if (!ok) {
      return res.status(404).json({ error: 'Notícia não encontrada.' });
    }
    res.json({ success: true, message: 'Notícia eliminada definitivamente.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao eliminar notícia';
    res.status(500).json({ error: message });
  }
});

// 7. Upload de Imagem de Notícia para o Cloudinary
adminRouter.post('/news/upload-image', imageUpload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum ficheiro de imagem foi enviado.' });
    }

    const secureUrl = await uploadToCloudinary(
      req.file.buffer,
      'abyby-sita/news',
      'image',
      req.file.originalname
    );

    res.json({ success: true, image_url: secureUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao fazer upload da imagem';
    res.status(500).json({ error: message });
  }
});


