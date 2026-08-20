import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: 'Operações' | 'Indústria' | 'Institucional' | 'Comunidade' | string;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
  author: string;
  read_time: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

const DATA_FILE = path.resolve(process.cwd(), 'data', 'news.json');

// Garante que o ficheiro data/news.json existe
function ensureDataFile(): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Gera um slug amigável e único
export function generateSlug(title: string, existingSlugs: string[] = []): string {
  const base = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .substring(0, 60);

  let candidate = base || 'noticia-' + Date.now();
  let count = 1;
  while (existingSlugs.includes(candidate)) {
    candidate = `${base}-${count}`;
    count++;
  }
  return candidate;
}

// Estima o tempo de leitura
export function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min`;
}

// Lê todos os posts
export function readAllNews(): NewsPost[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Erro ao ler data/news.json:', err);
    return [];
  }
}

// Guarda todos os posts de forma atómica
export function saveAllNews(posts: NewsPost[]): void {
  ensureDataFile();
  const tmpFile = `${DATA_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tmpFile, JSON.stringify(posts, null, 2), 'utf-8');
  fs.renameSync(tmpFile, DATA_FILE);
}

// Lista notícias com filtros
export function getNewsList(options?: {
  includeInactive?: boolean;
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): { news: NewsPost[]; total: number } {
  let list = readAllNews();

  if (!options?.includeInactive) {
    list = list.filter((n) => n.is_active);
  }

  if (options?.category && options.category !== 'Todas') {
    list = list.filter((n) => n.category.toLowerCase() === options.category?.toLowerCase());
  }

  if (options?.search && options.search.trim()) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
    );
  }

  // Ordenar por published_at desc
  list.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  const total = list.length;
  const offset = options?.offset || 0;
  const limit = options?.limit || list.length;
  const sliced = list.slice(offset, offset + limit);

  return { news: sliced, total };
}

// Obter notícia por slug
export function getNewsBySlug(slug: string): NewsPost | null {
  const list = readAllNews();
  return list.find((n) => n.slug === slug && n.is_active) || null;
}

// Obter notícia por ID
export function getNewsById(id: string): NewsPost | null {
  const list = readAllNews();
  return list.find((n) => n.id === id) || null;
}

// Criar nova notícia
export function createNews(data: {
  title: string;
  excerpt: string;
  body: string;
  category?: string;
  image_url?: string;
  is_featured?: boolean;
  author?: string;
}): NewsPost {
  const list = readAllNews();
  const existingSlugs = list.map((n) => n.slug);
  const now = new Date().toISOString();

  // Se marcar como destaque, desmarcar anteriores
  if (data.is_featured) {
    list.forEach((n) => {
      n.is_featured = false;
    });
  }

  const newPost: NewsPost = {
    id: `post-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`,
    title: data.title.trim(),
    slug: generateSlug(data.title, existingSlugs),
    excerpt: data.excerpt.trim(),
    body: data.body.trim(),
    category: data.category?.trim() || 'Institucional',
    image_url:
      data.image_url?.trim() ||
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    is_featured: !!data.is_featured,
    is_active: true,
    author: data.author?.trim() || 'Comunicação Institucional',
    read_time: calculateReadTime(data.body),
    published_at: now,
    created_at: now,
    updated_at: now,
  };

  list.unshift(newPost);
  saveAllNews(list);
  return newPost;
}

// Atualizar notícia existente
export function updateNews(
  id: string,
  updates: Partial<Omit<NewsPost, 'id' | 'created_at'>>
): NewsPost | null {
  const list = readAllNews();
  const index = list.findIndex((n) => n.id === id);
  if (index === -1) return null;

  const current = list[index];
  const now = new Date().toISOString();

  // Se alterar o destaque
  if (updates.is_featured) {
    list.forEach((n) => {
      if (n.id !== id) n.is_featured = false;
    });
  }

  let newSlug = current.slug;
  if (updates.title && updates.title !== current.title) {
    const existingSlugs = list.filter((n) => n.id !== id).map((n) => n.slug);
    newSlug = generateSlug(updates.title, existingSlugs);
  }

  const updatedBody = updates.body !== undefined ? updates.body : current.body;

  const updatedPost: NewsPost = {
    ...current,
    ...updates,
    slug: newSlug,
    read_time: calculateReadTime(updatedBody),
    updated_at: now,
  };

  list[index] = updatedPost;
  saveAllNews(list);
  return updatedPost;
}

// Arquivar / Reativar notícia (Soft-delete / Toggle)
export function toggleNewsActive(id: string, isActive: boolean): boolean {
  const list = readAllNews();
  const post = list.find((n) => n.id === id);
  if (!post) return false;

  post.is_active = isActive;
  post.updated_at = new Date().toISOString();
  saveAllNews(list);
  return true;
}

// Eliminar definitivamente notícia
export function deleteNewsPermanently(id: string): boolean {
  const list = readAllNews();
  const filtered = list.filter((n) => n.id !== id);
  if (filtered.length === list.length) return false;

  saveAllNews(filtered);
  return true;
}
