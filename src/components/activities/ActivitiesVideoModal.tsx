import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X, Volume2, VolumeX, ArrowRight, ShieldCheck } from 'lucide-react';
import { ActivityVideo } from '../../data/activitiesVideos';

interface ActivitiesVideoModalProps {
  video: ActivityVideo;
  onClose: () => void;
}

export const ActivitiesVideoModal: React.FC<ActivitiesVideoModalProps> = ({ video, onClose }) => {
  // Predefinição: Vídeo arranca sem som (requisito do utilizador), com botão para ativar
  const [isMuted, setIsMuted] = useState(true);

  // Gestão de bloqueio de scroll do body e fecho pela tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop com desfoque e animação de fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#040E18]/85 backdrop-blur-md cursor-pointer"
        aria-hidden="true"
      />

      {/* Contentor do Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="relative z-10 w-full max-w-4xl bg-[#071B2E] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 border border-white/20 text-white hover:text-cyan-400 hover:border-cyan-400/50 flex items-center justify-center transition-all cursor-pointer shadow-lg"
          title="Fechar (Esc)"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Área do Leitor de Vídeo em Alta Definição */}
        <div className="relative w-full md:w-3/5 bg-black flex items-center justify-center min-h-[260px] sm:min-h-[340px] md:min-h-[440px]">
          <video
            key={video.id}
            src={video.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            controls
            className="w-full h-full object-contain max-h-[60vh] md:max-h-[75vh]"
          />

          {/* Alternador de Áudio */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-full bg-slate-900/85 border border-white/20 text-xs font-mono text-slate-200 hover:text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm"
            aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>Sem Som</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Áudio Ligado</span>
              </>
            )}
          </button>
        </div>

        {/* Painel Informativo da Operação / Legenda "DIZER" */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#0B253E] to-[#071B2E] border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {video.tag}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {video.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-4 leading-snug text-readable-heading">
              {video.title}
            </h3>

            {/* Bloco "DIZER" / Relatório Técnico */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-cyan-400 font-semibold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Relatório de Atividade</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed text-readable-light">
                {video.description}
              </p>
            </div>
          </div>

          {/* Ação / Contacto Direto */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="#contactos"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                const el = document.getElementById('contactos');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#1868B8] to-cyan-500 text-[#071B2E] font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
            >
              <span>Solicitar Cotação</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
