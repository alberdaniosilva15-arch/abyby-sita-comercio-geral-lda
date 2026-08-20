import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.6 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface HeroRecrutamentoProps {
  onScrollToJobs: () => void;
}

export const HeroRecrutamento: React.FC<HeroRecrutamentoProps> = ({ onScrollToJobs }) => {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1200px] flex items-center justify-center">
      {/* ── Hero Content ── */}
      <motion.div
        className="relative z-[10] text-center px-4 md:px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Painel Liquid Glass Transparente */}
        <div className="liquid-glass-transparent rounded-3xl p-8 sm:p-10 md:p-14 mb-8 relative">
          {/* Badge Liquid Glass Transparente */}
          <motion.div variants={childVariants}>
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/25 text-[#38bdf8] text-[11px] font-mono font-bold uppercase tracking-[0.3em] mb-6 shadow-sm pulse-glow text-readable backdrop-blur-md">
              Recrutamento Oil &amp; Gas
            </span>
          </motion.div>

          {/* Headline com Shaders Azuis */}
          <motion.h1
            variants={childVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.05]"
          >
            <span className="inline-block text-shader-sweep">
              Construa o seu futuro
            </span>
            <br />
            <span className="inline-block text-gradient-cyan">
              na indústria petrolífera
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={childVariants}
            className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto font-medium leading-relaxed text-readable-light font-sans"
          >
            Junte-se a uma equipa que opera nos maiores projectos
            offshore e onshore de Angola, com excelência e tecnologia de ponta.
          </motion.p>
        </div>

        {/* CTA Button com Liquid Glass Transparente e Shimmer */}
        <motion.div variants={childVariants}>
          <button
            onClick={onScrollToJobs}
            className="liquid-glass-transparent-btn shimmer-btn inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold text-base tracking-wider uppercase cursor-pointer text-readable shadow-xl backdrop-blur-md"
          >
            Ver Oportunidades
            <ChevronDown className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2">
        <span className="text-[#7E92A6] text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-5 h-5 text-[#1868B8] animate-scroll-bounce" />
      </div>
    </section>
  );
};

