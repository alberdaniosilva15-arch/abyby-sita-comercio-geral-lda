import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Briefcase, FileText, CheckCircle2,
  Upload, Check, Home, ChevronRight, Clock, Send, Shield,
  Award
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SVGFilters } from '../components/SVGFilters';

interface JobDetail {
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
}

export function RecrutamentoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '', email: '', phone: '', nationality: '',
    years_experience: '', has_offshore_experience: 'false', message: ''
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Navbar navigation
  const handleNavigate = useCallback((pageIndex: number) => {
    if (pageIndex === -1) {
      navigate('/recrutamentos');
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/recrutamento/jobs/${id}`);
        if (!res.ok) throw new Error('Vaga não encontrada');
        const data = await res.json();
        setJob(data);
      } catch (_err) {
        console.error('Erro ao buscar vaga');
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setErrorMsg('O envio do CV (PDF/DOC) é obrigatório.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const data = new FormData();
      data.append('job_id', id || '');
      Object.entries(formData).forEach(([key, value]) => data.append(key, value as string));
      data.append('cv', cvFile);
      if (certFile) data.append('certificates', certFile);

      const res = await fetch('/api/recrutamento/applications', {
        method: 'POST',
        body: data
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Erro ao submeter candidatura.');

      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao submeter candidatura.';
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1868B8]/40 focus:border-[#1868B8] transition-all";
  const labelClass = "block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full min-h-screen bg-[#071B2E]">
        <SVGFilters />
        <Navbar currentPage={-1} onNavigate={handleNavigate} />
        <div className="pt-32 text-center">
          <div className="w-10 h-10 border-2 border-[#1868B8]/30 border-t-[#1868B8] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">A carregar vaga...</p>
        </div>
      </div>
    );
  }

  // Not found
  if (!job) {
    return (
      <div className="relative w-full min-h-screen bg-[#071B2E]">
        <SVGFilters />
        <Navbar currentPage={-1} onNavigate={handleNavigate} />
        <div className="pt-32 text-center px-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-16 max-w-lg mx-auto border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Vaga não encontrada</h2>
            <p className="text-slate-400 mb-8">A posição que procura não existe ou foi removida.</p>
            <Link to="/recrutamentos" className="text-[#1868B8] font-semibold hover:underline text-sm">
              ← Voltar às vagas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <SVGFilters />
      <Navbar currentPage={-1} onNavigate={handleNavigate} />

      {/* ── Header Band ── */}
      <header className="bg-[#071B2E] pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-1.5 mb-8 text-xs">
            <Link to="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" /> Início
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <Link to="/recrutamentos" className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-3 h-3" /> Recrutamento
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-white font-medium truncate max-w-[220px]">{job.title}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1868B8] text-white text-[11px] font-semibold uppercase tracking-wide">
              {job.type}
            </span>
            <span className="px-3 py-1 rounded-md bg-white/10 text-slate-300 text-[11px] font-semibold uppercase tracking-wide">
              {job.area}
            </span>
            <span className="px-3 py-1 rounded-md bg-white/10 text-slate-300 text-[11px] font-semibold uppercase tracking-wide">
              {job.experience_level}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            {job.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#1868B8]" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#1868B8]" /> {job.experience_level}
            </span>
            {job.shift_type && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#1868B8]" /> Turno: {job.shift_type}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="relative px-6 -mt-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Job Details (Left) ── */}
            <div className="lg:col-span-2 space-y-0">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

                {/* Description */}
                <div className="p-8 border-b border-slate-100">
                  <h3 className="flex items-center gap-2.5 text-lg font-bold text-[#071B2E] mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#1868B8]/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#1868B8]" />
                    </div>
                    Descrição da Posição
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    {job.full_description}
                  </p>
                </div>

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="p-8 border-b border-slate-100">
                    <h3 className="flex items-center gap-2.5 text-lg font-bold text-[#071B2E] mb-5">
                      <div className="w-8 h-8 rounded-lg bg-[#1868B8]/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#1868B8]" />
                      </div>
                      Responsabilidades
                    </h3>
                    <ul className="space-y-3">
                      {job.responsibilities.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-[15px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1868B8] mt-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className="p-8 border-b border-slate-100">
                    <h3 className="flex items-center gap-2.5 text-lg font-bold text-[#071B2E] mb-5">
                      <div className="w-8 h-8 rounded-lg bg-[#1868B8]/10 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-[#1868B8]" />
                      </div>
                      Requisitos
                    </h3>
                    <ul className="space-y-3">
                      {job.requirements.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-[15px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Certifications */}
                {job.certifications && job.certifications.length > 0 && (
                  <div className="p-8">
                    <h3 className="flex items-center gap-2.5 text-lg font-bold text-[#071B2E] mb-5">
                      <div className="w-8 h-8 rounded-lg bg-[#1868B8]/10 flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#1868B8]" />
                      </div>
                      Certificações Obrigatórias
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {job.certifications.map((item: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#1868B8] flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Application Form (Right — Sticky) ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 sticky top-28">
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-200">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#071B2E] mb-3">
                      Candidatura Enviada
                    </h3>
                    <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                      A sua candidatura foi submetida com sucesso. A nossa equipa de RH entrará em contacto consigo em breve.
                    </p>
                    <Link
                      to="/recrutamentos"
                      className="text-[#1868B8] font-semibold hover:underline text-sm"
                    >
                      ← Voltar às vagas
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-xl bg-[#1868B8] flex items-center justify-center">
                        <Send className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#071B2E]">Candidatar-se</h3>
                        <p className="text-xs text-slate-400">Preencha os campos obrigatórios</p>
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-5 text-sm">
                        {errorMsg}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className={labelClass}>Nome Completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: João Alberto da Silva"
                          className={inputClass}
                          value={formData.full_name}
                          onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="email@exemplo.com"
                            className={inputClass}
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Telefone *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+244 9XX XXX XXX"
                            className={inputClass}
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Nationality & Experience */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>Nacionalidade *</label>
                          <input
                            type="text"
                            required
                            placeholder="Angolana"
                            className={inputClass}
                            value={formData.nationality}
                            onChange={e => setFormData({ ...formData, nationality: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Anos de Experiência *</label>
                          <input
                            type="number"
                            min="0"
                            required
                            placeholder="5"
                            className={inputClass}
                            value={formData.years_experience}
                            onChange={e => setFormData({ ...formData, years_experience: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Offshore Experience */}
                      <div>
                        <label className={labelClass}>Experiência Offshore? *</label>
                        <select
                          required
                          className={inputClass + " appearance-none cursor-pointer"}
                          value={formData.has_offshore_experience}
                          onChange={e => setFormData({ ...formData, has_offshore_experience: e.target.value })}
                        >
                          <option value="false">Não</option>
                          <option value="true">Sim</option>
                        </select>
                      </div>

                      {/* CV Upload */}
                      <div>
                        <label className={labelClass}>Curriculum Vitae (PDF) *</label>
                        <label className="flex items-center justify-center w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-4 cursor-pointer hover:border-[#1868B8] hover:bg-[#1868B8]/5 transition-all group">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            className="hidden"
                            onChange={e => setCvFile(e.target.files?.[0] || null)}
                          />
                          <span className="text-slate-500 text-sm flex items-center gap-2 group-hover:text-[#1868B8] transition-colors">
                            <Upload className="w-4 h-4" />
                            {cvFile ? cvFile.name : 'Selecionar ficheiro (Máx. 5 MB)'}
                          </span>
                        </label>
                      </div>

                      {/* Certificates Upload */}
                      <div>
                        <label className={labelClass}>Certificações (Opcional)</label>
                        <label className="flex items-center justify-center w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-4 cursor-pointer hover:border-[#1868B8] hover:bg-[#1868B8]/5 transition-all group">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.zip"
                            className="hidden"
                            onChange={e => setCertFile(e.target.files?.[0] || null)}
                          />
                          <span className="text-slate-500 text-sm flex items-center gap-2 group-hover:text-[#1868B8] transition-colors">
                            <Upload className="w-4 h-4" />
                            {certFile ? certFile.name : 'Selecionar ficheiro PDF / ZIP'}
                          </span>
                        </label>
                      </div>

                      {/* Message */}
                      <div>
                        <label className={labelClass}>Mensagem (Opcional)</label>
                        <textarea
                          rows={3}
                          placeholder="Apresente-se brevemente ou indique motivação..."
                          className={inputClass + " resize-none"}
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#1868B8] hover:bg-[#145da0] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 mt-2 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            A enviar...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Enviar Candidatura
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-slate-400 text-center leading-relaxed mt-2">
                        Ao submeter a candidatura, autoriza o tratamento dos seus dados pessoais em conformidade com a política de privacidade da empresa.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer spacing */}
      <div className="h-16 bg-slate-50" />
    </div>
  );
}
