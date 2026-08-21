import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Eye, Sparkles, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { ACTIVITIES_VIDEOS, ActivityVideo, getVideoPosterUrl } from '../../data/activitiesVideos';
import { ActivitiesVideoModal } from '../activities/ActivitiesVideoModal';

export const PageActivitiesVideos: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<ActivityVideo | null>(null);
  const [isPausedTop, setIsPausedTop] = useState(false);
  const [isPausedBottom, setIsPausedBottom] = useState(false);

  const topRowVideos = ACTIVITIES_VIDEOS.filter((v) => v.row === 'top');
  const bottomRowVideos = ACTIVITIES_VIDEOS.filter((v) => v.row === 'bottom');

  // Repetição quádrupla para garantir preenchimento total e loop infinito sem falhas
  const topLoop = [...topRowVideos, ...topRowVideos, ...topRowVideos, ...topRowVideos];
  const bottomLoop = [...bottomRowVideos, ...bottomRowVideos, ...bottomRowVideos, ...bottomRowVideos];

  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  // ── AUTO-SCROLL SUAVE & CONTÍNUO A 60 FPS COM LOOP INFINITO ──────────────────
  useEffect(() => {
    let animId: number;
    const topEl = topScrollRef.current;
    const bottomEl = bottomScrollRef.current;

    // Inicializa a linha superior a meio para poder rolar para a direita desde o 1º frame
    if (topEl && topEl.scrollLeft === 0) {
      topEl.scrollLeft = topEl.scrollWidth / 3;
    }

    const step = () => {
      // 1. Linha Superior: Rola para a DIREITA (scrollLeft diminui)
      if (topEl && !isPausedTop) {
        topEl.scrollLeft -= 0.75;
        if (topEl.scrollLeft <= 10) {
          topEl.scrollLeft = (topEl.scrollWidth / 4) * 2;
        }
      }

      // 2. Linha Inferior: Rola para a ESQUERDA (scrollLeft aumenta)
      if (bottomEl && !isPausedBottom) {
        bottomEl.scrollLeft += 0.75;
        if (bottomEl.scrollLeft >= (bottomEl.scrollWidth / 4) * 2) {
          bottomEl.scrollLeft = bottomEl.scrollWidth / 4;
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPausedTop, isPausedBottom]);

  // ── BOTÕES DE NAVEGAÇÃO MANUAL (AVANÇAR / RECUAR) ───────────────────────────
  const handleManualScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'left' | 'right',
    setPause: (paused: boolean) => void
  ) => {
    if (ref.current) {
      // Pausa temporariamente o auto-scroll durante a interação manual
      setPause(true);
      const scrollAmount = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      // Retoma o auto-scroll suave 2.5s após o clique
      setTimeout(() => {
        setPause(false);
      }, 2500);
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#071B2E] via-[#040E18] to-[#071B2E] text-white overflow-hidden border-t border-b border-cyan-500/15 select-none">
      {/* Luzes de fundo atmosféricas */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[#1868B8] rounded-full mix-blend-screen filter blur-[140px] opacity-[0.08] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[140px] opacity-[0.06] pointer-events-none" />

      {/* Cabeçalho da Secção */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 sm:mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Nossos Serviços • Atividades Reais</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-tight mb-4 text-readable-heading">
            Veja as Nossas Actividades
          </h2>

          <p className="text-slate-300 font-sans text-sm sm:text-base md:text-lg max-w-2xl text-readable-light flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Clique no vídeo e acompanhe as nossas operações industriais em campo</span>
          </p>
        </motion.div>
      </div>

      {/* ── LINHA 1 (SUPERIOR): MOBILIZAÇÃO & OPERAÇÕES PESADAS ── */}
      <div
        className="relative w-full mb-8 sm:mb-12 group"
        onMouseEnter={() => setIsPausedTop(true)}
        onMouseLeave={() => setIsPausedTop(false)}
        onTouchStart={() => setIsPausedTop(true)}
        onTouchEnd={() => setTimeout(() => setIsPausedTop(false), 2000)}
      >
        <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold">
              Mobilização & Operações Pesadas
            </span>
          </div>

          {/* Botões de Navegação Manual Funcionais */}
          <div className="flex items-center gap-2 z-10">
            <button
              onClick={() => handleManualScroll(topScrollRef, 'left', setIsPausedTop)}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/25 border border-white/15 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center"
              title="Recuar Linha Superior"
              aria-label="Recuar Linha Superior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll(topScrollRef, 'right', setIsPausedTop)}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/25 border border-white/15 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center"
              title="Avançar Linha Superior"
              aria-label="Avançar Linha Superior"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Trilho de Scroll Infinito Contínuo (Sem Espaços Vazios) */}
        <div
          ref={topScrollRef}
          className="w-full overflow-x-auto scrollbar-none py-2 scroll-smooth"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex gap-6 w-max px-4">
            {topLoop.map((video, idx) => (
              <VideoActivityCard
                key={`top-${video.id}-${idx}`}
                video={video}
                onSelect={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── LINHA 2 (INFERIOR): PIPES, FITTINGS & LOGÍSTICA INDUSTRIAL ── */}
      <div
        className="relative w-full group"
        onMouseEnter={() => setIsPausedBottom(true)}
        onMouseLeave={() => setIsPausedBottom(false)}
        onTouchStart={() => setIsPausedBottom(true)}
        onTouchEnd={() => setTimeout(() => setIsPausedBottom(false), 2000)}
      >
        <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1868B8] shadow-[0_0_8px_#1868B8]" />
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold">
              Pipes, Fittings & Logística Industrial
            </span>
          </div>

          {/* Botões de Navegação Manual Funcionais */}
          <div className="flex items-center gap-2 z-10">
            <button
              onClick={() => handleManualScroll(bottomScrollRef, 'left', setIsPausedBottom)}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/25 border border-white/15 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center"
              title="Recuar Linha Inferior"
              aria-label="Recuar Linha Inferior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll(bottomScrollRef, 'right', setIsPausedBottom)}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-500/25 border border-white/15 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center"
              title="Avançar Linha Inferior"
              aria-label="Avançar Linha Inferior"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Trilho de Scroll Infinito Contínuo (Sem Espaços Vazios) */}
        <div
          ref={bottomScrollRef}
          className="w-full overflow-x-auto scrollbar-none py-2 scroll-smooth"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex gap-6 w-max px-4">
            {bottomLoop.map((video, idx) => (
              <VideoActivityCard
                key={`bot-${video.id}-${idx}`}
                video={video}
                onSelect={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal / Lightbox Interativo com AnimatePresence */}
      <AnimatePresence>
        {selectedVideo && (
          <ActivitiesVideoModal
            key={selectedVideo.id}
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// ── COMPONENTE DO CARTÃO DE VÍDEO QUADRADO + "DIZER" ──────────────────────────
interface VideoActivityCardProps {
  video: ActivityVideo;
  onSelect: () => void;
}

const VideoActivityCard: React.FC<VideoActivityCardProps> = ({ video, onSelect }) => {
  const posterUrl = getVideoPosterUrl(video.videoUrl);

  return (
    <div
      onClick={onSelect}
      className="w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0 cursor-pointer group/card bg-[#071B2E]/90 hover:bg-[#0B253E] border border-white/15 hover:border-cyan-400/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
    >
      {/* Área Visual: Imagem Poster Otimizada (~15KB) com Botão Play */}
      <div className="relative w-full h-[190px] sm:h-[210px] bg-slate-950 overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={video.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 select-none pointer-events-none"
            onError={(e) => {
              (e.target as HTMLElement).style.opacity = '0.3';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-[#0B253E] flex items-center justify-center">
            <span className="text-xs font-mono text-cyan-400/60 uppercase">{video.tag}</span>
          </div>
        )}

        {/* Gradiente Escuro Subtil */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-transparent to-black/30 pointer-events-none" />

        {/* Tag Superior */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/85 text-cyan-300 border border-cyan-500/40 backdrop-blur-sm shadow-md">
            {video.tag}
          </span>
        </div>

        {/* Badge 'Vídeo' */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="px-2 py-0.5 rounded text-[8px] font-mono text-slate-300 bg-black/60 backdrop-blur-xs border border-white/10">
            Vídeo HD
          </span>
        </div>

        {/* Botão Play Central */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 group-hover/card:bg-cyan-500 border border-cyan-400/60 flex items-center justify-center text-white group-hover/card:text-[#071B2E] group-hover/card:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Indicador de Ação no Rodapé */}
        <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[10px] font-mono text-cyan-300 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none">
          <Eye className="w-3 h-3" />
          <span>Ver vídeo</span>
        </div>
      </div>

      {/* Caixa de Descrição / Legenda Profissional ("DIZER") */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#071B2E] to-[#040E18] border-t border-white/10">
        <div>
          <h4 className="font-display font-bold text-white text-sm sm:text-base leading-snug mb-2 group-hover/card:text-cyan-300 transition-colors line-clamp-1">
            {video.title}
          </h4>

          {/* Bloco "DIZER" */}
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 mb-2">
            <span className="block text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
              [ DIZER • Descrição da Atividade ]
            </span>
            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
              {video.description}
            </p>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>{video.category}</span>
          <span className="text-cyan-300 group-hover/card:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
            Assistir ➔
          </span>
        </div>
      </div>
    </div>
  );
};
