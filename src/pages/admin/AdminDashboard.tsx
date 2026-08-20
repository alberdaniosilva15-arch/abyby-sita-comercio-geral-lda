import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, Plus, Briefcase, Users, Filter, 
  Download, Archive, RefreshCw, AlertCircle, Newspaper,
  Trash2, Edit3, ExternalLink, Image as ImageIcon,
  Search
} from 'lucide-react';
import { SVGFilters } from '../../components/SVGFilters';

interface Vaga {
  id: string;
  title: string;
  type: string;
  area: string;
  experience_level: string;
  location: string;
  short_description: string;
  full_description: string;
  shift_type?: string;
  responsibilities?: string[];
  requirements?: string[];
  certifications?: string[];
  is_active: boolean;
  created_at: string;
}

interface Candidatura {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
  years_experience: number;
  has_offshore_experience: boolean;
  message?: string;
  cv_url: string;
  certificates_url?: string;
  score: number | null;
  classification: string;
  status: string;
  created_at: string;
  recruitment_jobs?: {
    title: string;
  };
}

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
  created_at: string;
  updated_at: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'candidaturas' | 'vagas' | 'noticias'>('noticias');
  
  // Data states
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [newsList, setNewsList] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals & Forms for Vagas
  const [showVagaForm, setShowVagaForm] = useState(false);
  const [editingVaga, setEditingVaga] = useState<Vaga | null>(null);
  
  const [vagaForm, setVagaForm] = useState({
    title: '',
    type: 'Offshore',
    area: '',
    experience_level: '',
    location: '',
    short_description: '',
    full_description: '',
    shift_type: '',
    responsibilities: '',
    requirements: '',
    certifications: ''
  });

  // Filters for applications
  const [statusFilter, setStatusFilter] = useState('todas');
  const [vagaFilter, setVagaFilter] = useState('');

  // News States & Form
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
  const [newsCategoryFilter, setNewsCategoryFilter] = useState('Todas');
  const [newsSearch, setNewsSearch] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Operações',
    excerpt: '',
    body: '',
    image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    is_featured: false,
    author: 'Comunicação Institucional'
  });

  // Fetch functions
  const fetchVagas = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/vagas', { credentials: 'include' }); 
      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setVagas(data.vagas || []);
    } catch (_err) {
      console.error('Erro ao obter vagas');
    }
  }, [navigate]);

  const fetchCandidaturas = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'todas') params.append('status', statusFilter);
      if (vagaFilter) params.append('vagaId', vagaFilter);
      
      const res = await fetch(`/api/admin/candidaturas?${params.toString()}`, { credentials: 'include' });
      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setCandidaturas(data.candidaturas || []);
    } catch (_err) {
      console.error('Erro ao obter candidaturas');
    }
  }, [statusFilter, vagaFilter, navigate]);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/news', { credentials: 'include' });
      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setNewsList(data.news || []);
    } catch (_err) {
      console.error('Erro ao obter notícias');
    }
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;
    const loadInitialData = async () => {
      try {
        const params = new URLSearchParams();
        if (statusFilter !== 'todas') params.append('status', statusFilter);
        if (vagaFilter) params.append('vagaId', vagaFilter);

        const [vagasRes, candsRes, newsRes] = await Promise.all([
          fetch('/api/admin/vagas', { credentials: 'include' }),
          fetch(`/api/admin/candidaturas?${params.toString()}`, { credentials: 'include' }),
          fetch('/api/admin/news', { credentials: 'include' })
        ]);

        if (vagasRes.status === 401 || candsRes.status === 401 || newsRes.status === 401) {
          navigate('/admin/login');
          return;
        }

        const [vagasData, candsData, newsData] = await Promise.all([
          vagasRes.json(),
          candsRes.json(),
          newsRes.json()
        ]);

        if (isMounted) {
          setVagas(vagasData.vagas || []);
          setCandidaturas(candsData.candidaturas || []);
          setNewsList(newsData.news || []);
          setLoading(false);
        }
      } catch (_err) {
        if (isMounted) {
          setError('Erro ao carregar dados. Verifique a sua ligação.');
          setLoading(false);
        }
      }
    };

    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, [statusFilter, vagaFilter, navigate]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
      navigate('/admin/login');
    } catch (_err) {
      navigate('/admin/login');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/candidaturas/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include'
      });
      fetchCandidaturas();
    } catch (_err) {
      alert('Erro ao atualizar estado');
    }
  };

  const handleDownloadCV = async (candId: string, candidateName: string, directUrl?: string) => {
    try {
      const res = await fetch(`/api/admin/candidaturas/${candId}/download-cv`, {
        credentials: 'include'
      });

      if (!res.ok) {
        if (directUrl) {
          window.open(directUrl, '_blank');
          return;
        }
        throw new Error('Não foi possível descarregar o ficheiro.');
      }

      const blob = await res.blob();
      const cleanName = (candidateName || 'Candidato')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .replace(/_+/g, '_');

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CV_${cleanName}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao descarregar CV';
      alert(msg);
    }
  };

  const handleArchiveVaga = async (id: string, currentlyActive: boolean) => {
    if (!window.confirm(`Tem a certeza que deseja ${currentlyActive ? 'arquivar' : 'reativar'} esta vaga?`)) return;
    try {
      await fetch(`/api/admin/vagas/${id}/${currentlyActive ? 'arquivar' : 'reativar'}`, {
        method: 'PATCH',
        credentials: 'include'
      });
      fetchVagas();
    } catch (_err) {
      alert('Erro na operação');
    }
  };

  const handleVagaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...vagaForm,
        responsibilities: vagaForm.responsibilities.split('\n').filter(Boolean),
        requirements: vagaForm.requirements.split('\n').filter(Boolean),
        certifications: vagaForm.certifications.split('\n').filter(Boolean),
      };

      const url = editingVaga ? `/api/admin/vagas/${editingVaga.id}` : '/api/admin/vagas';
      const method = editingVaga ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setShowVagaForm(false);
        setEditingVaga(null);
        fetchVagas();
      } else {
        alert('Erro ao guardar vaga: ' + (data?.error || res.statusText));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro na operação';
      alert('Erro na operação: ' + message);
    }
  };

  const openEditVaga = (vaga: Vaga) => {
    setEditingVaga(vaga);
    setVagaForm({
      title: vaga.title || '',
      type: vaga.type || 'Offshore',
      area: vaga.area || '',
      experience_level: vaga.experience_level || '',
      location: vaga.location || '',
      short_description: vaga.short_description || '',
      full_description: vaga.full_description || '',
      shift_type: vaga.shift_type || '',
      responsibilities: (vaga.responsibilities || []).join('\n'),
      requirements: (vaga.requirements || []).join('\n'),
      certifications: (vaga.certifications || []).join('\n')
    });
    setShowVagaForm(true);
  };

  // ── NEWS / FEED HANDLERS ──────────────────────────────────────
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecione um ficheiro de imagem válido (JPG, PNG, WebP).');
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/admin/news/upload-image', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const data = await res.json();
      if (res.ok && data.image_url) {
        setNewsForm(prev => ({ ...prev, image_url: data.image_url }));
      } else {
        alert('Erro ao fazer upload da imagem: ' + (data.error || 'Falha no envio'));
      }
    } catch (_err) {
      alert('Erro de comunicação ao carregar a imagem.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingNews ? `/api/admin/news/${editingNews.id}` : '/api/admin/news';
      const method = editingNews ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm),
        credentials: 'include'
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setShowNewsForm(false);
        setEditingNews(null);
        fetchNews();
      } else {
        alert('Erro ao guardar notícia: ' + (data?.error || res.statusText));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro na operação';
      alert('Erro na operação: ' + message);
    }
  };

  const openEditNews = (post: NewsPost) => {
    setEditingNews(post);
    setNewsForm({
      title: post.title,
      category: post.category || 'Operações',
      excerpt: post.excerpt || '',
      body: post.body || '',
      image_url: post.image_url || '',
      is_featured: !!post.is_featured,
      author: post.author || 'Comunicação Institucional'
    });
    setShowNewsForm(true);
  };

  const handleToggleNewsArchive = async (id: string, currentlyActive: boolean) => {
    const action = currentlyActive ? 'arquivar' : 'reativar';
    if (!window.confirm(`Tem a certeza que deseja ${action} esta publicação?`)) return;
    try {
      const res = await fetch(`/api/admin/news/${id}/${action}`, {
        method: 'PATCH',
        credentials: 'include'
      });
      if (res.ok) {
        fetchNews();
      } else {
        alert('Erro ao alterar estado da notícia.');
      }
    } catch (_err) {
      alert('Erro de comunicação.');
    }
  };

  const handleDeleteNews = async (id: string, title: string) => {
    if (!window.confirm(`ATENÇÃO: Deseja eliminar DEFINITIVAMENTE a notícia:\n\n"${title}"?\n\nEsta ação não pode ser desfeita.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/news/${id}/eliminar`, {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        fetchNews();
      } else {
        alert('Erro ao eliminar notícia.');
      }
    } catch (_err) {
      alert('Erro de comunicação.');
    }
  };

  const filteredNews = newsList.filter(post => {
    if (newsCategoryFilter !== 'Todas' && post.category.toLowerCase() !== newsCategoryFilter.toLowerCase()) {
      return false;
    }
    if (newsSearch.trim()) {
      const q = newsSearch.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="relative min-h-screen bg-[#071B2E] text-[#EFF4F8] font-sans">
      <SVGFilters />
      
      {/* Decorative Background */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1868B8] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] pointer-events-none" />
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-[#071B2E]/90 backdrop-blur-md border-b border-[#7E92A6]/15 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1868B8]/20 flex items-center justify-center border border-[#1868B8]/40 shadow-md">
              <Newspaper className="w-5 h-5 text-[#1868B8]" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold tracking-tight text-white">Portal Administrativo</h1>
              <p className="text-[#7E92A6] text-[10px] font-mono uppercase tracking-wider">Abyby Sita • Gestão Corporativa</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-xs font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Terminar Sessão
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 py-8">
        
        {/* Tabs Switcher */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#7E92A6]/15 mb-8 pb-4">
          <button
            onClick={() => setActiveTab('noticias')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'noticias' 
                ? 'bg-[#1868B8] text-white shadow-lg shadow-[#1868B8]/25 border border-[#1868B8]/40' 
                : 'text-[#7E92A6] hover:bg-[#0F3B63]/40 hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            Feed & Notícias ({newsList.length})
          </button>

          <button
            onClick={() => setActiveTab('candidaturas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'candidaturas' 
                ? 'bg-[#1868B8] text-white shadow-lg shadow-[#1868B8]/25 border border-[#1868B8]/40' 
                : 'text-[#7E92A6] hover:bg-[#0F3B63]/40 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Candidaturas ({candidaturas.length})
          </button>

          <button
            onClick={() => setActiveTab('vagas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'vagas' 
                ? 'bg-[#1868B8] text-white shadow-lg shadow-[#1868B8]/25 border border-[#1868B8]/40' 
                : 'text-[#7E92A6] hover:bg-[#0F3B63]/40 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Gestão de Vagas ({vagas.length})
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-[#7E92A6]">
            <div className="w-8 h-8 border-2 border-[#1868B8]/30 border-t-[#1868B8] rounded-full animate-spin mb-4" />
            <p className="font-mono text-xs">A carregar dados do sistema...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* ── ABA 1: FEED & NOTÍCIAS CORPORATIVAS (NOVO) ── */}
            {activeTab === 'noticias' && (
              <motion.div
                key="noticias"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Header & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                      <Newspaper className="w-5 h-5 text-[#1868B8]" />
                      Gestão de Notícias & Feed Corporativo
                    </h2>
                    <p className="text-xs text-[#7E92A6]">
                      Publique comunicados, atualizações operacionais e artigos de imprensa exibidos no Newsroom da empresa.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (showNewsForm) {
                        setShowNewsForm(false);
                      } else {
                        setEditingNews(null);
                        setNewsForm({
                          title: '',
                          category: 'Operações',
                          excerpt: '',
                          body: '',
                          image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
                          is_featured: false,
                          author: 'Comunicação Institucional'
                        });
                        setShowNewsForm(true);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1868B8] hover:bg-[#15599e] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {showNewsForm ? 'Fechar Formulário' : <><Plus className="w-4 h-4" /> Publicar Nova Notícia</>}
                  </button>
                </div>

                {/* News Modal Form */}
                {showNewsForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-6 md:p-8 rounded-2xl bg-[#0F3B63]/30 border border-[#1868B8]/30 space-y-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-[#7E92A6]/20 pb-3">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Newspaper className="w-4 h-4 text-[#1868B8]" />
                        {editingNews ? 'Editar Publicação' : 'Criar Nova Publicação para o Feed'}
                      </h3>
                      <span className="text-[10px] font-mono text-[#7E92A6]">Guardado localmente sem dependência de nuvem</span>
                    </div>

                    <form onSubmit={handleNewsSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-xs font-semibold text-[#EFF4F8]">Título da Notícia *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Abyby Sita conclui com sucesso manutenção em estaleiro..."
                            value={newsForm.title}
                            onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                            className="w-full bg-[#071B2E]/70 border border-[#7E92A6]/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#7E92A6] focus:outline-none focus:border-[#1868B8]/50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#EFF4F8]">Categoria *</label>
                          <select
                            value={newsForm.category}
                            onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}
                            className="w-full bg-[#071B2E]/70 border border-[#7E92A6]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#1868B8]/50"
                          >
                            <option value="Operações">Operações</option>
                            <option value="Indústria">Indústria</option>
                            <option value="Institucional">Institucional</option>
                            <option value="Comunidade">Comunidade</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#EFF4F8]">Autor / Departamento</label>
                          <input
                            type="text"
                            value={newsForm.author}
                            onChange={e => setNewsForm({ ...newsForm, author: e.target.value })}
                            className="w-full bg-[#071B2E]/70 border border-[#7E92A6]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#1868B8]/50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#EFF4F8]">Imagem de Capa (URL ou Upload)</label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              placeholder="https://..."
                              value={newsForm.image_url}
                              onChange={e => setNewsForm({ ...newsForm, image_url: e.target.value })}
                              className="flex-1 bg-[#071B2E]/70 border border-[#7E92A6]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#1868B8]/50"
                            />
                            <label className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-[#7E92A6]/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-[#1868B8] transition-all">
                              <ImageIcon className="w-3.5 h-3.5" />
                              {uploadingImage ? 'A enviar...' : 'Upload'}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploadingImage}
                                onChange={handleImageFileUpload}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <label className="text-xs font-semibold text-[#EFF4F8]">Resumo Curto (Excerto) *</label>
                          <span className="text-[10px] text-[#7E92A6] font-mono">{newsForm.excerpt.length}/280</span>
                        </div>
                        <textarea
                          required
                          rows={2}
                          maxLength={280}
                          placeholder="Uma síntese de 1 a 2 frases exibida nos cards do feed..."
                          value={newsForm.excerpt}
                          onChange={e => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                          className="w-full bg-[#071B2E]/70 border border-[#7E92A6]/30 rounded-xl p-3 text-xs text-white placeholder-[#7E92A6] focus:outline-none focus:border-[#1868B8]/50 resize-none font-sans"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#EFF4F8]">Corpo Completo do Artigo *</label>
                        <p className="text-[10px] text-[#7E92A6]">Dica: Separe os parágrafos com linha em branco. Se iniciar um parágrafo com aspas (ex: "O nosso compromisso..."), será formatado como citação de destaque.</p>
                        <textarea
                          required
                          rows={7}
                          placeholder="Escreva aqui o conteúdo integral da notícia..."
                          value={newsForm.body}
                          onChange={e => setNewsForm({ ...newsForm, body: e.target.value })}
                          className="w-full bg-[#071B2E]/70 border border-[#7E92A6]/30 rounded-xl p-3 text-xs text-white placeholder-[#7E92A6] focus:outline-none focus:border-[#1868B8]/50 resize-none font-sans leading-relaxed"
                        />
                      </div>

                      {/* Featured Checkbox */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <input
                          type="checkbox"
                          id="is_featured"
                          checked={newsForm.is_featured}
                          onChange={e => setNewsForm({ ...newsForm, is_featured: e.target.checked })}
                          className="w-4 h-4 rounded text-[#1868B8] focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="is_featured" className="text-xs font-medium text-white cursor-pointer">
                          ⭐ Fixar como Notícia em Destaque no topo do Feed (Hero Banner)
                        </label>
                      </div>

                      {/* Submit Actions */}
                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowNewsForm(false)}
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#7E92A6] text-xs font-semibold cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#1868B8] hover:bg-[#15599e] text-white text-xs font-bold shadow-lg shadow-[#1868B8]/30 cursor-pointer"
                        >
                          {editingNews ? 'Guardar Alterações' : 'Publicar Notícia Agora'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Filters & Search Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F3B63]/20 border border-[#7E92A6]/20">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-[#7E92A6]" />
                    <select
                      value={newsCategoryFilter}
                      onChange={e => setNewsCategoryFilter(e.target.value)}
                      className="bg-[#071B2E] border border-[#7E92A6]/30 rounded-xl px-3 py-1.5 text-xs text-white outline-none cursor-pointer"
                    >
                      <option value="Todas">Todas as Categorias</option>
                      <option value="Operações">Operações</option>
                      <option value="Indústria">Indústria</option>
                      <option value="Institucional">Institucional</option>
                      <option value="Comunidade">Comunidade</option>
                    </select>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Filtrar por título..."
                      value={newsSearch}
                      onChange={e => setNewsSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#071B2E] border border-[#7E92A6]/30 text-xs text-white placeholder-[#7E92A6] outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-[#7E92A6] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* News Table / List */}
                <div className="rounded-2xl overflow-hidden border border-[#7E92A6]/20 bg-[#0F3B63]/20">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs whitespace-nowrap">
                      <thead className="bg-[#0F3B63]/60 text-[#7E92A6] font-mono text-[10px] uppercase tracking-wider">
                        <tr>
                          <th className="px-5 py-3.5">Publicação</th>
                          <th className="px-5 py-3.5">Categoria</th>
                          <th className="px-5 py-3.5">Autor</th>
                          <th className="px-5 py-3.5">Data</th>
                          <th className="px-5 py-3.5">Estado</th>
                          <th className="px-5 py-3.5 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#7E92A6]/10">
                        {filteredNews.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-[#7E92A6]">
                              Nenhuma notícia encontrada. Clique em "+ Publicar Nova Notícia" para criar a primeira.
                            </td>
                          </tr>
                        ) : (
                          filteredNews.map(post => (
                            <tr key={post.id} className="hover:bg-[#0F3B63]/30 transition-colors">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="w-12 h-10 object-cover rounded-lg border border-white/10 flex-shrink-0"
                                  />
                                  <div className="max-w-md">
                                    <div className="font-bold text-white truncate flex items-center gap-1.5">
                                      {post.is_featured && (
                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#1868B8]/20 text-[#1868B8] border border-[#1868B8]/30">
                                          ★ Destaque
                                        </span>
                                      )}
                                      <span className="truncate">{post.title}</span>
                                    </div>
                                    <div className="text-[10px] text-[#7E92A6] font-mono truncate">
                                      /blog/noticias/{post.slug}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/5 border border-white/10 text-white">
                                  {post.category}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-[#7E92A6]">
                                {post.author || 'Abyby Sita'}
                              </td>

                              <td className="px-5 py-4 text-[#7E92A6] font-mono text-[11px]">
                                {new Date(post.published_at).toLocaleDateString('pt-PT')}
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                    post.is_active
                                      ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                                      : 'bg-red-500/15 text-red-400 border border-red-500/30'
                                  }`}
                                >
                                  {post.is_active ? 'Ativo no Site' : 'Arquivado'}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-right">
                                <div className="inline-flex items-center gap-2">
                                  <a
                                    href={`/blog/noticias/${post.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#1868B8] transition-all"
                                    title="Ver no Site"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                  
                                  <button
                                    onClick={() => openEditNews(post)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-all cursor-pointer"
                                    title="Editar"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => handleToggleNewsArchive(post.id, post.is_active)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-[#7E92A6] hover:text-white transition-all cursor-pointer"
                                    title={post.is_active ? 'Arquivar' : 'Reativar'}
                                  >
                                    {post.is_active ? <Archive className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
                                  </button>

                                  <button
                                    onClick={() => handleDeleteNews(post.id, post.title)}
                                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer"
                                    title="Eliminar Definitivamente"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── ABA 2: CANDIDATURAS ── */}
            {activeTab === 'candidaturas' && (
              <motion.div
                key="candidaturas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="bg-[#0F3B63]/40 border border-[#7E92A6]/20 rounded-xl p-2 flex items-center gap-3">
                    <Filter className="w-4 h-4 text-[#7E92A6] ml-2" />
                    <select 
                      className="bg-transparent text-sm text-[#EFF4F8] outline-none border-none pr-4"
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                    >
                      <option value="todas" className="bg-[#071B2E]">Todos os estados</option>
                      <option value="Novo" className="bg-[#071B2E]">Novo</option>
                      <option value="Em análise" className="bg-[#071B2E]">Em análise</option>
                      <option value="Rejeitado" className="bg-[#071B2E]">Rejeitado</option>
                      <option value="Prioritário" className="bg-[#071B2E]">Prioritário</option>
                      <option value="Contratado" className="bg-[#071B2E]">Contratado</option>
                    </select>
                  </div>
                  
                  <div className="bg-[#0F3B63]/40 border border-[#7E92A6]/20 rounded-xl p-2 flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-[#7E92A6] ml-2" />
                    <select 
                      className="bg-transparent text-sm text-[#EFF4F8] outline-none border-none pr-4 max-w-[200px] truncate"
                      value={vagaFilter}
                      onChange={e => setVagaFilter(e.target.value)}
                    >
                      <option value="" className="bg-[#071B2E]">Todas as Vagas</option>
                      {vagas.map(v => (
                        <option key={v.id} value={v.id} className="bg-[#071B2E]">{v.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="liquid-glass rounded-2xl overflow-hidden border border-[#7E92A6]/20">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-[#0F3B63]/50 text-[#7E92A6] font-mono text-[10px] uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Candidato</th>
                          <th className="px-6 py-4">Vaga</th>
                          <th className="px-6 py-4">Data</th>
                          <th className="px-6 py-4">Score</th>
                          <th className="px-6 py-4">Estado</th>
                          <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#7E92A6]/10">
                        {candidaturas.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-10 text-center text-[#7E92A6]">
                              Nenhuma candidatura encontrada com estes filtros.
                            </td>
                          </tr>
                        ) : candidaturas.map(cand => (
                          <tr key={cand.id} className="hover:bg-[#0F3B63]/20 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-[#EFF4F8]">{cand.full_name}</div>
                              <div className="text-xs text-[#7E92A6]">{cand.email}</div>
                            </td>
                            <td className="px-6 py-4 text-[#7E92A6]">
                              {cand.recruitment_jobs?.title || 'Vaga Removida'}
                            </td>
                            <td className="px-6 py-4 text-[#7E92A6]">
                              {new Date(cand.created_at).toLocaleDateString('pt-PT')}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-[#1868B8]/20 text-[#7EB8FF] text-xs font-bold font-mono">
                                {cand.score} pts
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <select 
                                value={cand.status}
                                onChange={(e) => handleStatusChange(cand.id, e.target.value)}
                                className={`text-xs font-bold uppercase tracking-wider rounded px-2 py-1 outline-none cursor-pointer border ${
                                  cand.status === 'Novo' ? 'bg-[#1868B8]/10 text-[#1868B8] border-[#1868B8]/20' :
                                  cand.status === 'Rejeitado' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                  cand.status === 'Contratado' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                  'bg-[#1868B8]/10 text-[#7EB8FF] border-[#1868B8]/20'
                                }`}
                              >
                                <option value="Novo" className="bg-[#071B2E]">NOVO</option>
                                <option value="Em análise" className="bg-[#071B2E]">EM ANÁLISE</option>
                                <option value="Rejeitado" className="bg-[#071B2E]">REJEITADO</option>
                                <option value="Contratado" className="bg-[#071B2E]">CONTRATADO</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {cand.cv_url && (
                                <button 
                                  onClick={() => handleDownloadCV(cand.id, cand.full_name, cand.cv_url)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1868B8]/10 text-[#1868B8] hover:bg-[#1868B8]/20 transition-colors text-xs font-bold cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5" /> Baixar CV (.pdf)
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── ABA 3: GESTÃO DE VAGAS ── */}
            {activeTab === 'vagas' && (
              <motion.div
                key="vagas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-display font-bold">Vagas Publicadas</h2>
                  <button 
                    onClick={() => { 
                      if (showVagaForm) {
                        setShowVagaForm(false);
                      } else {
                        setEditingVaga(null); 
                        setVagaForm({ title: '', type: 'Offshore', area: '', experience_level: '', location: '', short_description: '', full_description: '', shift_type: '', responsibilities: '', requirements: '', certifications: '' });
                        setShowVagaForm(true); 
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1868B8] text-[#071B2E] rounded-xl font-bold text-sm hover:scale-105 transition-transform cursor-pointer"
                  >
                    {showVagaForm ? 'Cancelar' : <><Plus className="w-4 h-4" /> Nova Vaga</>}
                  </button>
                </div>

                {showVagaForm && (
                  <div className="liquid-glass border border-[#1868B8]/30 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-[#1868B8] mb-4">{editingVaga ? 'Editar Vaga' : 'Criar Nova Vaga'}</h3>
                    <form onSubmit={handleVagaSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Título" required value={vagaForm.title} onChange={e => setVagaForm({...vagaForm, title: e.target.value})} className="bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm" />
                        <select value={vagaForm.type} onChange={e => setVagaForm({...vagaForm, type: e.target.value})} className="bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm">
                          <option value="Offshore">Offshore</option>
                          <option value="Onshore">Onshore</option>
                        </select>
                        <input type="text" placeholder="Área (ex: Manutenção)" required value={vagaForm.area} onChange={e => setVagaForm({...vagaForm, area: e.target.value})} className="bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm" />
                        <input type="text" placeholder="Nível Exp. (ex: Pleno)" required value={vagaForm.experience_level} onChange={e => setVagaForm({...vagaForm, experience_level: e.target.value})} className="bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm" />
                        <input type="text" placeholder="Localização" required value={vagaForm.location} onChange={e => setVagaForm({...vagaForm, location: e.target.value})} className="bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm" />
                        <input type="text" placeholder="Turno" value={vagaForm.shift_type} onChange={e => setVagaForm({...vagaForm, shift_type: e.target.value})} className="bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm" />
                      </div>
                      
                      <textarea placeholder="Descrição Curta (1-2 frases)" required value={vagaForm.short_description} onChange={e => setVagaForm({...vagaForm, short_description: e.target.value})} className="w-full bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm resize-none" rows={2} />
                      <textarea placeholder="Descrição Completa" required value={vagaForm.full_description} onChange={e => setVagaForm({...vagaForm, full_description: e.target.value})} className="w-full bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm resize-none" rows={4} />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <textarea placeholder="Responsabilidades (1 por linha)" value={vagaForm.responsibilities} onChange={e => setVagaForm({...vagaForm, responsibilities: e.target.value})} className="bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm resize-none" rows={4} />
                        <textarea placeholder="Requisitos (1 por linha)" value={vagaForm.requirements} onChange={e => setVagaForm({...vagaForm, requirements: e.target.value})} className="bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm resize-none" rows={4} />
                        <textarea placeholder="Certificações (1 por linha)" value={vagaForm.certifications} onChange={e => setVagaForm({...vagaForm, certifications: e.target.value})} className="bg-[#071B2E]/50 border border-[#7E92A6]/30 rounded px-4 py-2 text-sm resize-none" rows={4} />
                      </div>

                      <button type="submit" className="px-6 py-2 bg-[#1868B8] text-[#071B2E] font-bold rounded-lg text-sm cursor-pointer">{editingVaga ? 'Guardar Alterações' : 'Publicar Vaga'}</button>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vagas.length === 0 ? (
                    <div className="col-span-full py-10 text-center text-[#7E92A6]">
                      Nenhuma vaga registada.
                    </div>
                  ) : vagas.map(vaga => (
                    <div key={vaga.id} className={`liquid-glass rounded-xl p-5 border ${vaga.is_active ? 'border-[#7E92A6]/20' : 'border-red-500/20 opacity-60'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded ${vaga.is_active ? 'bg-[#1868B8]/10 text-[#1868B8]' : 'bg-red-500/10 text-red-400'}`}>
                          {vaga.is_active ? 'Ativa' : 'Arquivada'}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openEditVaga(vaga)}
                            className="text-[#7E92A6] hover:text-[#1868B8] transition-colors text-xs flex items-center gap-1 cursor-pointer"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => handleArchiveVaga(vaga.id, vaga.is_active)}
                            className="text-[#7E92A6] hover:text-[#EFF4F8] transition-colors cursor-pointer"
                            title={vaga.is_active ? 'Arquivar' : 'Reativar'}
                          >
                            {vaga.is_active ? <Archive className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-1 truncate">{vaga.title}</h3>
                      <p className="text-[#7E92A6] text-xs mb-4 flex items-center gap-2">
                        {vaga.type} • {vaga.location}
                      </p>
                      
                      <div className="pt-4 border-t border-[#7E92A6]/10 flex justify-between items-center text-xs text-[#7E92A6]">
                        <span>Criada a {new Date(vaga.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
