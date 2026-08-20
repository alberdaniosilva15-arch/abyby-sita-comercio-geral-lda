import { Router, Request, Response } from 'express';
import { getNewsList, getNewsBySlug, readAllNews } from '../news-store';

export const newsRouter = Router();

// ── GET /api/news ──────────────────────────────────────────────
// Lista pública de notícias ativas com suporte a filtros e busca
newsRouter.get('/', (req: Request, res: Response) => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const search = typeof req.query.q === 'string' ? req.query.q : undefined;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const offset = (page - 1) * limit;

    const { news, total } = getNewsList({
      includeInactive: false,
      category,
      search,
      limit,
      offset,
    });

    const allActive = readAllNews().filter((n) => n.is_active);
    const featured = allActive.find((n) => n.is_featured) || allActive[0] || null;

    const categories = ['Todas', 'Operações', 'Indústria', 'Institucional', 'Comunidade'];

    return res.json({
      news,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      featured,
      categories,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao obter notícias';
    return res.status(500).json({ error: message });
  }
});

// ── GET /api/news/slug/:slug ──────────────────────────────────
// Detalhes de um post específico pelo slug amigável
newsRouter.get('/slug/:slug', (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = getNewsBySlug(slug);

    if (!post) {
      return res.status(404).json({ error: 'Notícia não encontrada ou inativa.' });
    }

    // Obter 3 notícias relacionadas da mesma categoria
    const allActive = readAllNews().filter((n) => n.is_active && n.id !== post.id);
    const related = allActive
      .filter((n) => n.category.toLowerCase() === post.category.toLowerCase())
      .slice(0, 3);

    // Se não houver suficientes da mesma categoria, preencher com as mais recentes
    if (related.length < 3) {
      const remaining = allActive.filter((n) => !related.some((r) => r.id === n.id)).slice(0, 3 - related.length);
      related.push(...remaining);
    }

    return res.json({ post, related });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erro ao obter notícia';
    return res.status(500).json({ error: message });
  }
});
