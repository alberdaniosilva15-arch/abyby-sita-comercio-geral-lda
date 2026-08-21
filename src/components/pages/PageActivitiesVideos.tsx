import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Eye, Sparkles, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { ACTIVITIES_VIDEOS, ActivityVideo, getVideoPosterUrl } from '../../data/activitiesVideos';
import { ActivitiesVideoModal } from '../activities/ActivitiesVideoModal';

export const PageActivitiesVideos: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<ActivityVideo | null>(null);

  const topRowVideos = ACTIVITIES_VIDEOS.filter((v) => v.row === 'top');
  const bottomRowVideos = ACTIVITIES_VIDEOS.filter((v) => v.row === 'bottom');

  // Duplicação exata 2x (Grupo A e Grupo B) para loop contínuo de 50%
  const topLoop = [...topRowVideos, ...topRowVideos];
  const bottomLoop = [...bottomRowVideos, ...bottomRowVideos];

  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  const handleManualScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#071B2E] via-[#040E18] to-[#071B2E] text-white overflow-hidden border-t border-b border-cyan-500/15">
      {/* Iluminação de fundo subtil */}
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

      {/* ── LINHA 1 (SUPERIOR): VÍDEOS A RODAR EM DIRECÇÃO À DIREITA ➡️ ── */}
      <div className="relative w-full mb-8 sm:mb-12 group pause-on-hover">
        <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold">
              Mobilização & Operações Pesadas (Direcção Direita ➔)
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleManualScroll(topScrollRef, 'left')}
              className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
              title="Recuar"
              aria-label="Recuar linha superior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll(topScrollRef, 'right')}
              className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
              title="Avançar"
              aria-label="Avançar linha superior"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Trilho de Scroll Contínuo para a DIREITA com Gap 24px */}
        <div
          ref={topScrollRef}
          className="w-full overflow-x-auto scrollbar-none py-3"
        >
          <div className="animate-marquee-right flex gap-6 px-4">
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

      {/* ── LINHA 2 (INFERIOR): VÍDEOS A RODAR EM DIRECÇÃO À ESQUERDA ⬅️ ── */}
      <div className="relative w-full group pause-on-hover">
        <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1868B8] animate-ping" />
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold">
              Pipes, Fittings & Logística Industrial (Direcção Esquerda ⬅️)
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleManualScroll(bottomScrollRef, 'left')}
              className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
              title="Recuar"
              aria-label="Recuar linha inferior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll(bottomScrollRef, 'right')}
              className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
              title="Avançar"
              aria-label="Avançar linha inferior"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Trilho de Scroll Contínuo para a ESQUERDA com Gap 24px */}
        <div
          ref={bottomScrollRef}
          className="w-full overflow-x-auto scrollbar-none py-3"
        >
          <div className="animate-marquee-left flex gap-6 px-4">
            {bottomLoop.map((video, idx) => (
              <VideoActivityCard
                key={`bottom-${video.id}-${idx}`}
                video={video}
                onSelect={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal / Lightbox Interativo com AnimatePresence no Pai */}
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
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 select-none"
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
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/85 text-cyan-300 border border-cyan-500/40 backdrop-blur-sm shadow-md">
            {video.tag}
          </span>
        </div>

        {/* Badge 'Vídeo' */}
        <div className="absolute top-3 right-3 z-10">
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
        <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[10px] font-mono text-cyan-300 opacity-0 group-hover/card:opacity-100 transition-opacity">
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
