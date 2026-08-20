import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { randomBytes } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';

/**
 * Segurança de transporte: CSP condicional (dev vs prod), rate limits, origem.
 * Em dev: CSP com 'unsafe-inline'/'unsafe-eval' (Vite HMR + React Refresh).
 * Em prod: CSP estrita, HSTS, sem upgrade-insecure-requests para HTTPS próprio.
 */

const isProd = process.env.NODE_ENV === 'production';

/**
 * Caminho SECRETO da área admin. Nunca aparece no bundle do frontend nem em
 * links — é injetado pelo servidor só quando o visitante acede ao caminho
 * exato (ver server.ts). Se faltar no .env, cai num fallback discreto.
 */
export function adminPath(): string {
  return process.env.ADMIN_PATH || '/garagem-2026';
}

/**
 * Caminhos de admin/painéis conhecidos por scanners — respondem SEMPRE 404
 * para ninguém descobrir que existe uma área de gestão.
 */
export const KNOWN_ADMIN_PATHS = [
  '/admin', '/administrador', '/administrator', '/admin.php', '/admin.html',
  '/admin/login', '/administracao', '/painel', '/painel-admin', '/dashboard',
  '/wp-admin', '/wp-login.php', '/login', '/login.php', '/signin', '/auth',
  '/gerencia', '/backoffice', '/gestao',
];

export function applySecurity(app: import('express').Express) {
  // Nonce CSP por pedido — permite o script inline do caminho admin secreto
  // SEM abrir 'unsafe-inline' em produção.
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.locals.cspNonce = randomBytes(16).toString('base64');
    next();
  });
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'"],
          "script-src": [
            (_req, res) => `'nonce-${(res as Response).locals.cspNonce}'`,
            ...(isProd
              ? ["'self'", "https://www.gstatic.com", "'blob:'"]
              : ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.gstatic.com", "'blob:'"]), // Vite dev
          ],
          "style-src": ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          "font-src": ["'self'", 'https://fonts.gstatic.com', 'data:'],
          "img-src": ["'self'", 'data:', 'blob:', 'https://images.unsplash.com', 'https://res.cloudinary.com'],
          "connect-src": isProd
            ? ["'self'", 'blob:', 'https://integrate.api.nvidia.com', 'https://www.gstatic.com', 'https://*.supabase.co']
            : ["'self'", 'blob:', 'ws:', 'wss:', 'https://integrate.api.nvidia.com', 'https://www.gstatic.com', 'https://*.supabase.co'],
          "media-src": ["'self'", 'blob:', 'https://res.cloudinary.com', 'https://d359.d2mefast.net'],
          "worker-src": ["'self'", "blob:"],
          "object-src": ["'none'"],
          "frame-ancestors": ["'none'"],
          "base-uri": ["'self'"],
          "form-action": ["'self'"],
          // Nunca ativar upgrade-insecure-requests: o site corre em HTTP na LAN
          // (ex.: http://192.168.1.3:3001) e essa diretiva reescreveria todos os
          // assets para https://, quebrando a página no telemóvel (tela branca).
          "upgrade-insecure-requests": null,
        },
        reportOnly: false,
      },
      crossOriginEmbedderPolicy: false,
      strictTransportSecurity: isProd ? undefined : false,
    }),
  );
}

/** Rate limit geral da API pública: máximo de 20 pedidos a cada 15 minutos por IP. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados pedidos a partir deste endereço IP. Limite de 20 pedidos a cada 15 minutos atingido. Por favor, tente novamente mais tarde.' },
});

/** Rate limit de login: 5 falhas/15min por IP. Bloqueia brute-force. */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { error: 'Muitas tentativas de login. Aguarde 15 minutos.' },
});

/**
 * Só aceita pedidos da MESMA origem (mesma porta). Mata CSRF vindo de outros sites.
 * Nota: o Vite dev serve na MESMA origem (middlewareMode), logo o Origin coincide sempre.
 */
export function requireSameOrigin(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;
  if (!origin) return next(); // fetch server-side / curl sem Origin — aceite
  const host = req.headers.host;
  if (host && origin.includes(`://${host}`)) return next();
  const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (allowed.includes(origin)) return next();
  res.status(403).json({ error: 'Origem não permitida.' });
}

/** /admin nunca deve ser indexado. */
export function noindex(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  next();
}
