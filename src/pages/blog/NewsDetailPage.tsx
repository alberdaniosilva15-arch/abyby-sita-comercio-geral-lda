import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SubPageLayout } from '../../layouts/SubPageLayout';
import { 
  Calendar, Clock, User, ArrowLeft, ArrowRight, 
  Share2, Check, MessageSquare, Newspaper, AlertCircle 
} from 'lucide-react';
import { COMPANY } from '../../lib/company';

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

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [related, setRelated] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/news/slug/${slug}`);
        if (!res.ok) {
          throw new Error('Notícia não encontrada');
        }
        const data = await res.json();
        if (isMounted) {
          setPost(data.post);
          setRelated(data.related || []);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Erro ao carregar o artigo.';
          setError(msg);
          setLoading(false);
        }
      }
    };

    fetchArticle();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!post) return;
    const text = encodeURIComponent(`*${post.title}* - Abyby Sita: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const sidebarLinks = [
    { href: '/blog/noticias', label: 'Centro de Notícias' },
    { href: '/blog/artigos-setores', label: 'Artigos dos Setores' },
    { href: '/blog/dicas-informacoes', label: 'Dicas & Informações' },
    { href: '/recrutamentos', label: 'Oportunidades de Carreira' },
  ];

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Blog & Notícias', href: '/blog' },
    { label: 'Notícias', href: '/blog/noticias' },
    { label: post?.title ? (post.title.length > 35 ? `${post.title.substring(0, 35)}...` : post.title) : 'Artigo' }
  ];

  if (loading) {
    return (
      <SubPageLayout title="A carregar artigo..." breadcrumbs={breadcrumbs} sidebarLinks={sidebarLinks}>
        <div className="py-24 flex flex-col items-center justify-center text-[#7E92A6]">
          <div className="w-10 h-10 border-3 border-[#1868B8]/30 border-t-[#1868B8] rounded-full animate-spin mb-4" />
          <p className="font-mono text-sm">A carregar publicação...</p>
        </div>
      </SubPageLayout>
    );
  }

  if (error || !post) {
    return (
      <SubPageLayout title="Notícia não encontrada" breadcrumbs={breadcrumbs} sidebarLinks={sidebarLinks}>
        <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-center max-w-xl mx-auto my-12">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Publicação Indisponível</h3>
          <p className="text-sm text-[#EFF4F8]/70 mb-6">
            A notícia solicitada pode ter sido arquivada ou o endereço está incorreto.
          </p>
          <Link
            to="/blog/noticias"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1868B8] hover:bg-[#15599e] text-white font-medium text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Feed de Notícias
          </Link>
        </div>
      </SubPageLayout>
    );
  }

  return (
    <SubPageLayout
      title={post.title}
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <article className="space-y-8 max-w-4xl">
        {/* Top Navigation & Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#7E92A6]/20 pb-4">
          <button
            onClick={() => navigate('/blog/noticias')}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#7E92A6] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar a todas as notícias
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Partilhar no WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-[#7E92A6]/30 text-white text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Copiar ligação"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar Link'}
            </button>
          </div>
        </div>

        {/* Article Metadata Pills */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1868B8] text-white shadow-sm">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#7E92A6] font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#7E92A6] font-mono">
              <Clock className="w-3.5 h-3.5" />
              {post.read_time || '3 min'} de leitura
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#7E92A6] font-mono">
              <User className="w-3.5 h-3.5" />
              {post.author || 'Abyby Sita'}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base md:text-lg text-[#EFF4F8]/80 leading-relaxed font-sans border-l-4 border-[#1868B8] pl-4 py-1 bg-white/5 rounded-r-xl">
            {post.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        {post.image_url && (
          <div className="relative rounded-2xl overflow-hidden border border-[#7E92A6]/20 bg-[#0F3B63]/30 shadow-2xl">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-[320px] md:h-[460px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E]/60 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Body Content */}
        <div className="bg-[#0F3B63]/20 border border-[#7E92A6]/20 rounded-2xl p-6 md:p-10 text-white space-y-6 leading-relaxed">
          {post.body.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            // Quote style if it starts with quote marks
            if (trimmed.startsWith('"') || trimmed.startsWith('“')) {
              return (
                <blockquote
                  key={idx}
                  className="p-4 md:p-6 my-6 rounded-xl bg-[#1868B8]/15 border-l-4 border-[#1868B8] text-[#EFF4F8] italic text-base md:text-lg font-sans"
                >
                  {trimmed}
                </blockquote>
              );
            }

            return (
              <p key={idx} className="text-sm md:text-base text-[#EFF4F8]/90 font-sans leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Author / Institutional Signoff Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0F3B63]/40 to-[#071B2E] border border-[#7E92A6]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7E92A6] block">Publicado por</span>
            <h4 className="text-sm font-bold text-white">{post.author || COMPANY.name}</h4>
            <p className="text-xs text-[#7E92A6]">{COMPANY.slogan}</p>
          </div>
          <a
            href={`mailto:${COMPANY.emails?.comercial || COMPANY.email}`}
            className="px-4 py-2 rounded-xl bg-[#1868B8] hover:bg-[#15599e] text-white text-xs font-semibold transition-all shadow-md"
          >
            Contactar Comunicação
          </a>
        </div>

        {/* Related Posts Section */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-[#7E92A6]/20 space-y-6">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#1868B8]" />
              <h3 className="text-xl font-display font-bold text-white">Outras Notícias Relacionadas</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/noticias/${rel.slug}`}
                  className="group bg-white/5 hover:bg-[#1868B8]/15 border border-[#7E92A6]/20 hover:border-[#1868B8]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
                >
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src={rel.image_url}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#071B2E]/90 text-[#1868B8] border border-[#1868B8]/30">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#1868B8] transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-[#7E92A6] font-mono pt-2 border-t border-white/5">
                      <span>{formatDate(rel.published_at)}</span>
                      <span className="flex items-center gap-1 text-[#1868B8] font-semibold group-hover:translate-x-1 transition-transform">
                        Ler <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </SubPageLayout>
  );
}
