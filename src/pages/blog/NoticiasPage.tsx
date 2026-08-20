import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SubPageLayout } from '../../layouts/SubPageLayout';
import { 
  Newspaper, Search, Calendar, Clock, ArrowRight, 
  Briefcase, AlertCircle 
} from 'lucide-react';
import { motion } from 'motion/react';

interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
  author: string;
  read_time: string;
  published_at: string;
}

export function NoticiasPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<NewsPost | null>(null);
  const [categories, setCategories] = useState<string[]>([
    'Todas',
    'Operações',
    'Indústria',
    'Institucional',
    'Comunidade',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = useCallback(async (category: string, search: string) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (category && category !== 'Todas') params.append('category', category);
      if (search.trim()) params.append('q', search.trim());

      const res = await fetch(`/api/news?${params.toString()}`);
      if (!res.ok) throw new Error('Erro ao carregar o feed de notícias');
      const data = await res.json();

      setNews(data.news || []);
      if (data.featured && category === 'Todas' && !search.trim()) {
        setFeaturedPost(data.featured);
      } else {
        setFeaturedPost(null);
      }
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Não foi possível carregar as notícias.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'Todas') params.append('category', selectedCategory);
        if (searchQuery.trim()) params.append('q', searchQuery.trim());

        const res = await fetch(`/api/news?${params.toString()}`);
        if (!res.ok) throw new Error('Erro ao carregar o feed de notícias');
        const data = await res.json();

        if (!ignore) {
          setNews(data.news || []);
          if (data.featured && selectedCategory === 'Todas' && !searchQuery.trim()) {
            setFeaturedPost(data.featured);
          } else {
            setFeaturedPost(null);
          }
          if (data.categories) {
            setCategories(data.categories);
          }
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!ignore) {
          const msg = err instanceof Error ? err.message : 'Não foi possível carregar as notícias.';
          setError(msg);
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [selectedCategory, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews(selectedCategory, searchQuery);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'operações':
        return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'indústria':
        return 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30';
      case 'comunidade':
        return 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30';
      case 'institucional':
      default:
        return 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30';
    }
  };

  const sidebarLinks = [
    { href: '/blog/noticias', label: 'Notícias & Feed da Empresa' },
    { href: '/blog/artigos-setores', label: 'Artigos dos Setores' },
    { href: '/blog/dicas-informacoes', label: 'Dicas & Informações' },
    { href: '/recrutamentos', label: 'Oportunidades de Carreira' },
  ];

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Blog & Notícias', href: '/blog' },
    { label: 'Notícias da Empresa' },
  ];

  // Se houver post em destaque e estiver na aba Todas sem busca, remover o featured da grelha normal para não duplicar
  const gridPosts = featuredPost ? news.filter((n) => n.id !== featuredPost.id) : news;

  return (
    <SubPageLayout
      title="Notícias da Empresa"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-10 max-w-5xl">
        {/* Header Institucional estilo Chevron/SLB */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F3B63] via-[#071B2E] to-[#051321] border border-[#7E92A6]/20 p-8 md:p-12 text-white shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1868B8]/20 border border-[#1868B8]/30 text-[#1868B8] text-xs font-mono font-bold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5" />
              Comunicação Institucional
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white leading-tight">
              Notícias e Comunicados
            </h2>
            <p className="text-sm md:text-base text-[#EFF4F8]/80 leading-relaxed font-sans pt-1">
              Acompanhe os avanços operacionais, novos contratos e marcos de actividade da Abyby Sita em Angola.
            </p>
          </div>

          <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#1868B8] rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none" />
        </div>

        {/* Filter Bar & Search Tool */}
        <div className="bg-[#0F3B63]/20 border border-[#7E92A6]/20 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categorias Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1868B8] text-white shadow-md shadow-[#1868B8]/30 border border-[#1868B8]/40'
                    : 'bg-white/5 text-[#7E92A6] hover:bg-white/10 hover:text-white border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Pesquisar notícias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-[#7E92A6]/20 text-white placeholder-[#7E92A6] text-xs focus:outline-none focus:border-[#1868B8]/50 focus:bg-white/10 transition-all font-sans"
            />
            <Search className="w-4 h-4 text-[#7E92A6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => fetchNews(selectedCategory, searchQuery)}
              className="text-xs font-bold underline hover:text-white"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-[#7E92A6]">
            <div className="w-8 h-8 border-2 border-[#1868B8]/30 border-t-[#1868B8] rounded-full animate-spin mb-4" />
            <p className="font-mono text-xs">A carregar publicações...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 1. HERO POST EM DESTAQUE (Estilo SLB / Chevron Top Story) */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F3B63]/60 to-[#071B2E] border border-[#7E92A6]/25 hover:border-[#1868B8]/40 shadow-2xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 h-64 sm:h-80 lg:h-[400px] overflow-hidden relative">
                    <img
                      src={featuredPost.image_url}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-[#071B2E]/90 lg:to-[#071B2E] pointer-events-none" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#1868B8] text-[#071B2E] shadow-lg">
                        ⭐ Destaque
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-md ${getCategoryColor(
                          featuredPost.category
                        )}`}
                      >
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-[#7E92A6] font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(featuredPost.published_at)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredPost.read_time || '3 min'}
                        </span>
                      </div>

                      <Link to={`/blog/noticias/${featuredPost.slug}`}>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-[#1868B8] transition-colors leading-snug">
                          {featuredPost.title}
                        </h3>
                      </Link>

                      <p className="text-xs md:text-sm text-[#EFF4F8]/70 line-clamp-3 leading-relaxed font-sans">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#7E92A6]/10 flex items-center justify-between">
                      <span className="text-[11px] text-[#7E92A6] font-mono">
                        {featuredPost.author || 'Abyby Sita'}
                      </span>
                      <Link
                        to={`/blog/noticias/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1868B8] hover:bg-[#15599e] text-white text-xs font-semibold shadow-md transition-all group-hover:translate-x-1"
                      >
                        <span>Ler Artigo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. GRELHA MODULAR DE NOTÍCIAS (Cards Corporativos) */}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group bg-[#0F3B63]/20 hover:bg-[#0F3B63]/40 border border-[#7E92A6]/20 hover:border-[#1868B8]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      {/* Image Preview with Category Badge */}
                      <div className="h-48 overflow-hidden relative bg-[#071B2E]">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E]/80 via-transparent to-transparent pointer-events-none" />
                        <span
                          className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase border backdrop-blur-md ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {post.category}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] text-[#7E92A6] font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.published_at)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.read_time || '3 min'}
                          </span>
                        </div>

                        <Link to={`/blog/noticias/${post.slug}`}>
                          <h4 className="text-base font-display font-bold text-white group-hover:text-[#1868B8] transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h4>
                        </Link>

                        <p className="text-xs text-[#EFF4F8]/70 line-clamp-3 leading-relaxed font-sans">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-5 pt-0 border-t border-white/5 mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-[#7E92A6] font-mono truncate max-w-[140px]">
                        {post.author || 'Abyby Sita'}
                      </span>
                      <Link
                        to={`/blog/noticias/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1868B8] group-hover:text-white transition-colors"
                      >
                        <span>Ler mais</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-white/5 border border-[#7E92A6]/20 space-y-3">
                <Newspaper className="w-10 h-10 text-[#7E92A6] mx-auto mb-2" />
                <h4 className="text-base font-bold text-white">Nenhuma notícia encontrada</h4>
                <p className="text-xs text-[#7E92A6] max-w-md mx-auto">
                  Não foram encontradas publicações com os critérios de filtro selecionados. Tente selecionar outra categoria ou limpar a pesquisa.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Todas');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1868B8] hover:bg-[#15599e] text-white text-xs font-semibold transition-all mt-2 cursor-pointer"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* Institutional Call-to-Action Bar */}
        <div className="rounded-2xl bg-[#0F3B63]/30 border border-[#7E92A6]/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-display font-bold text-white">
              Quer fazer parte das nossas operações ou solicitar uma proposta?
            </h4>
            <p className="text-xs text-[#7E92A6]">
              Consulte as nossas oportunidades de emprego em aberto ou solicite uma cotação técnica.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/recrutamentos"
              className="px-4 py-2.5 rounded-xl bg-[#1868B8] hover:bg-[#15599e] text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-all"
            >
              <Briefcase className="w-4 h-4" />
              Ver Vagas Abertas
            </Link>
            <Link
              to="/#contactos"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-[#7E92A6]/30 transition-all"
            >
              Contactar Equipa
            </Link>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
