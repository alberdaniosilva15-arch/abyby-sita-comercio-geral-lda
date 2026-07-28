import React from 'react';
import { CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { OceanCanvas } from '../OceanCanvas';

export const Page11WhyChooseUs: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-[#071B2E] text-[#EFF4F8] p-6 md:p-12 flex flex-col justify-between items-center text-center overflow-hidden select-none">
      {/* Animated Ocean & Digital Network Canvas Background */}
      <OceanCanvas />
      {/* Header Tag */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1868B8]/10 border border-[#1868B8]/30 mb-3">
          <Star className="w-3.5 h-3.5 text-[#1868B8]" />
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-wider font-semibold">
            VALOR ACRESCENTADO & DIFERENCIAÇÃO
          </span>
        </div>
      </div>

      {/* Centered Large Highlight Quote */}
      <div className="relative z-10 max-w-3xl my-auto py-6">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-8">
          “Soluções Globais. <br />
          <span className="text-[#38bdf8]">Confiança Local.”</span>
        </h2>

        {/* Compact Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-[#0F3B63]/40 backdrop-blur-md border border-[#7E92A6]/30 shadow-md flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-sans font-bold text-sm text-white">Empresa 100% Angolana</h3>
              <p className="font-sans text-xs text-slate-300">Domínio profundo do mercado local e regulação nacional.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F3B63]/40 backdrop-blur-md border border-[#7E92A6]/30 shadow-md flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-sans font-bold text-sm text-white">Experiência Multisetorial</h3>
              <p className="font-sans text-xs text-slate-300">Atuação comprovada em Oil & Gas, Construção e Mineração.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F3B63]/40 backdrop-blur-md border border-[#7E92A6]/30 shadow-md flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-sans font-bold text-sm text-white">Soluções Integradas</h3>
              <p className="font-sans text-xs text-slate-300">Venda, Aluguer, Manutenção e Suporte Técnico num único parceiro.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F3B63]/40 backdrop-blur-md border border-[#7E92A6]/30 shadow-md flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-sans font-bold text-sm text-white">Compromisso com a Qualidade</h3>
              <p className="font-sans text-xs text-slate-300">Equipamentos inspecionados e rigor nos prazos operacionais.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 w-full border-t border-[#7E92A6]/30 flex justify-between items-center text-[11px] font-mono text-[#7E92A6]">
        <span>SEÇÃO 11 — PORQUÊ ESCOLHER A ABYBY SITA</span>
        <span>EXCELÊNCIA OPERACIONAL</span>
      </div>
    </div>
  );
};
