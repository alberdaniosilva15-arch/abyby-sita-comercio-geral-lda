import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Send, ArrowRight, Search } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SVGFilters } from '../components/SVGFilters';
import { HeroRecrutamento } from '../components/recrutamento/HeroRecrutamento';
import { StatsRecrutamento } from '../components/recrutamento/StatsRecrutamento';
import { FilterBarRecrutamento } from '../components/recrutamento/FilterBarRecrutamento';
import { JobCardRecrutamento } from '../components/recrutamento/JobCardRecrutamento';
import { LiquidGlassShader } from '../components/recrutamento/LiquidGlassShader';

const VIDEO_URL = 'https://res.cloudinary.com/vgxylpmd/video/upload/v1785847232/Oil_platform_workers_operating_e__202608041337_hbq3wg.mp4';

interface Job {
  id: string;
  title: string;
  type: string;
  area: string;
  experience_level: string;
  location: string;
  short_description: string;
  shift_type: string;
}

export function RecrutamentoList() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [area, setArea] = useState('');
  const [experience, setExperience] = useState('');

  // Ref for scroll-to-jobs
  const jobsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToJobs = useCallback(() => {
    jobsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Navbar page navigation (send back to Home for page-flip sections)
  const handleNavigate = useCallback((pageIndex: number) => {
    if (pageIndex === -1) {
      // Already on recrutamento
      scrollToJobs();
    } else {
      navigate('/');
      // Small delay to let the Home page mount before scrolling
      setTimeout(() => {
        const sectionIds = [
          'hero','about','services','services-detail','fleet',
          'fleet-sedan','fleet-suv','fleet-van','fleet-bus','fleet-heavy',
          'fresh-food','contacts'
        ];
        const id = sectionIds[pageIndex];
        if (id) {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [navigate, scrollToJobs]);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('q', search);
        if (type) queryParams.append('type', type);
        if (area) queryParams.append('area', area);
        if (experience) queryParams.append('experience', experience);

        const res = await fetch(`/api/recrutamento/jobs?${queryParams.toString()}`);
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error('Erro ao buscar vagas', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchJobs();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, type, area, experience]);

  return (
    <div className="relative w-full min-h-screen bg-[#071B2E] text-[#EFF4F8] font-sans antialiased overflow-x-hidden">
      {/* ── Fixed Global Background ── */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoLoaded(true)}
        />
        <div className="absolute inset-0 hero-video-overlay z-[1]" />
        <div className="absolute inset-0 z-[1]" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(7,27,46,0.6) 100%)',
        }} />
        <div className="absolute inset-0 z-[2]">
          <LiquidGlassShader />
        </div>
      </div>

      {/* SVG Liquid Refraction Filter Definitions (shared with main site) */}
      <SVGFilters />

      {/* Fixed Navbar (shared with main site) */}
      <Navbar currentPage={-1} onNavigate={handleNavigate} />

      {/* ── Page Content Wrapper ── */}
      <div className="relative z-10">
        {/* ═══ HERO ═══ */}
        <HeroRecrutamento onScrollToJobs={scrollToJobs} />

      {/* ═══ STATS ═══ */}
      <StatsRecrutamento />

      {/* ═══ JOBS SECTION ═══ */}
      <section
        ref={jobsSectionRef}
        className="relative py-20 px-6 scroll-mt-24"
        id="vagas"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-[-15%] w-[700px] h-[700px] bg-[#1868B8] rounded-full mix-blend-screen filter blur-[200px] opacity-[0.07] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1868B8] rounded-full mix-blend-screen filter blur-[180px] opacity-[0.05] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <span className="text-[#38bdf8] text-[11px] font-mono font-bold uppercase tracking-[0.3em] mb-4 block text-readable">
              Oportunidades abertas
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4 text-readable-heading">
              Encontre a sua próxima missão
            </h2>
            <p className="text-slate-200/90 text-base md:text-lg max-w-2xl mx-auto text-readable-light font-sans">
              Explore as vagas disponíveis e candidate-se directamente. Cada posição é uma oportunidade de impacto real.
            </p>
          </motion.div>

          {/* Filters */}
          <FilterBarRecrutamento
            search={search}
            onSearchChange={setSearch}
            type={type}
            onTypeChange={setType}
            area={area}
            onAreaChange={setArea}
            experience={experience}
            onExperienceChange={setExperience}
          />

          {/* Job Cards */}
          <div className="space-y-5">
            {loading ? (
              /* Loading Skeleton */
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="liquid-glass rounded-2xl p-8 animate-pulse"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="w-20 h-6 bg-[#7E92A6]/10 rounded-lg" />
                      <div className="w-24 h-6 bg-[#7E92A6]/10 rounded-lg" />
                      <div className="w-16 h-6 bg-[#7E92A6]/10 rounded-lg" />
                    </div>
                    <div className="w-3/4 h-7 bg-[#7E92A6]/10 rounded-lg mb-3" />
                    <div className="w-full h-5 bg-[#7E92A6]/10 rounded-lg mb-2" />
                    <div className="w-2/3 h-5 bg-[#7E92A6]/10 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="liquid-glass rounded-2xl p-16 text-center specular-edge"
              >
                <div className="w-20 h-20 rounded-full bg-[#1868B8]/15 border border-[#1868B8]/20 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-[#1868B8]/50" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3 text-readable">
                  Nenhuma vaga encontrada
                </h3>
                <p className="text-slate-200/90 text-base max-w-md mx-auto mb-6 text-readable-light">
                  Não encontrámos vagas com os filtros selecionados. Tente ajustar os critérios ou envie-nos uma candidatura espontânea.
                </p>
                <button
                  onClick={() => {
                    setSearch('');
                    setType('');
                    setArea('');
                    setExperience('');
                  }}
                  className="text-[#38bdf8] text-sm font-mono font-bold uppercase tracking-wider hover:underline cursor-pointer text-readable"
                >
                  Limpar Filtros
                </button>
              </motion.div>
            ) : (
              jobs.map((job, index) => (
                <JobCardRecrutamento key={job.id} job={job} index={index} />
              ))
            )}
          </div>

          {/* Results count */}
          {!loading && jobs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <span className="text-slate-300 text-xs font-mono uppercase tracking-wider text-readable-light">
                {jobs.length} {jobs.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══ BOTTOM CTA — Candidatura Espontânea ═══ */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F3B63]/20 to-[#071B2E] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="liquid-glass glow-border rounded-3xl p-10 md:p-16 text-center specular-edge">
            <div className="w-16 h-16 rounded-2xl bg-[#1868B8]/20 border border-[#1868B8]/20 flex items-center justify-center mx-auto mb-8 text-[#1868B8]">
              <Send className="w-7 h-7" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight text-readable-heading">
              Não encontrou a sua vaga?
            </h2>
            <p className="text-slate-200/90 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed text-readable-light font-sans">
              Envie-nos uma candidatura espontânea. Valorizamos talentos excepcionais
              e estamos sempre à procura de profissionais qualificados para os nossos projectos.
            </p>
            <Link
              to="/#contactos"
              className="shimmer-btn inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#1868B8] to-[#1868B8] text-[#071B2E] font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,240,255,0.35)] hover:scale-[1.03] active:scale-[0.98] border border-white/20 text-readable"
            >
              Contactar-nos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
      </div>
    </div>
  );
}
