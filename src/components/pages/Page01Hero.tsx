import React from 'react';
import { ArrowRight, FileText, MapPin, ShieldCheck, Flag, Layers, Compass } from 'lucide-react';
import heroBg from '../../assets/images/hero_background_1785194629717.jpg';

interface PageProps {
  onNavigate: (index: number) => void;
}

export const Page01Hero: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] min-h-[720px] lg:min-h-[820px] bg-[#020A14] text-white overflow-hidden select-none">
      {/* High-Resolution Cinematic Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroBg}
        className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none transition-all duration-700 opacity-90"
      >
        <source
          src="https://res.cloudinary.com/vgxylpmd/video/upload/v1785249938/Ultra_realistic_cinematic_cargo_ship_202607281542_suqyxv.mp4"
          type="video/mp4"
        />
      </video>

      {/* Subtle gradient vignette to ensure high text contrast while keeping ship video completely clear on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020A14]/90 via-[#020A14]/50 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020A14]/90 via-transparent to-[#020A14]/30 pointer-events-none z-[1]" />

      {/* Ambient Radial Glow Highlights */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1868B8]/30 blur-[120px] pointer-events-none z-[2]" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none z-[2]" />

      {/* Main Centered Container */}
      <div id="hero-main-container" className="relative z-[10] w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-10 flex flex-col justify-between min-h-[calc(100vh-80px)]">
        {/* Top Section - Brand Identity Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#071B2E] border border-[#1868B8]/40 shadow-lg flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-300" />
              <span className="font-mono text-xs text-white font-semibold tracking-wider">
                ABYBY SITA • LUANDA
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area (Left aligned, clean and spacious) */}
        <div className="my-auto pt-6 md:pt-10 max-w-2xl lg:max-w-3xl">
          {/* Small Tagline */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#071B2E] border border-cyan-400/40 shadow-md mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-mono text-xs md:text-sm font-semibold tracking-widest text-cyan-200 uppercase">
              SOLUÇÕES GLOBAIS. CONFIANÇA LOCAL.
            </span>
          </div>

          {/* Main Headline - High Contrast, Clean Line Breaks */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            <span className="block text-white">COMÉRCIO</span>
            <span className="block text-cyan-300 my-1 font-mono tracking-wider text-2xl sm:text-4xl md:text-5xl uppercase font-bold">
              GLOBAL
            </span>
            <span className="block text-slate-100 font-display">
              SOLUÇÕES INTELIGENTES
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-slate-200 max-w-xl leading-relaxed mb-8 drop-shadow-md font-medium">
            Excelência em serviços logísticos, marítimos, offshore e fornecimento de produtos, conectando Angola ao mundo.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Primary Highlighted Button */}
            <button
              onClick={() => onNavigate(2)}
              className="px-8 py-4 rounded-xl bg-[#1868B8] hover:bg-[#1868B8]/90 text-white font-mono text-xs md:text-sm uppercase tracking-wider font-bold shadow-lg border border-cyan-300/40 flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              <span>NOSSOS SERVIÇOS</span>
              <ArrowRight className="w-4 h-4 text-cyan-300" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => onNavigate(11)}
              className="px-8 py-4 rounded-xl bg-[#071B2E] hover:bg-[#0B2A4A] border border-[#1868B8]/60 text-white font-mono text-xs md:text-sm uppercase tracking-wider font-bold shadow-md flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-300" />
              <span>SOLICITAR PROPOSTA</span>
            </button>
          </div>
        </div>

        {/* Bottom Highlights (Solid Industrial Panels) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8 pt-6 border-t border-slate-800">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-[#071B2E] border border-[#1868B8]/30 shadow-md flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#1868B8]/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs md:text-sm text-white uppercase tracking-wider">
                OPERAÇÕES MARÍTIMAS
              </h4>
              <p className="font-sans text-[11px] text-slate-300 mt-0.5">
                Agenciamento e suporte em portos
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-[#071B2E] border border-[#1868B8]/30 shadow-md flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs md:text-sm text-white uppercase tracking-wider">
                LOGÍSTICA INTEGRADA
              </h4>
              <p className="font-sans text-[11px] text-slate-300 mt-0.5">
                Despachos e transporte pesado
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl bg-[#071B2E] border border-[#1868B8]/30 shadow-md flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs md:text-sm text-white uppercase tracking-wider">
                ACESSO POR CORDAS
              </h4>
              <p className="font-sans text-[11px] text-slate-300 mt-0.5">
                Rope Access e certificação IRATA
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-xl bg-[#071B2E] border border-[#1868B8]/30 shadow-md flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs md:text-sm text-white uppercase tracking-wider">
                SEDE EM TALATONA
              </h4>
              <p className="font-sans text-[11px] text-slate-300 mt-0.5">
                Luanda & Bases em Angola
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

