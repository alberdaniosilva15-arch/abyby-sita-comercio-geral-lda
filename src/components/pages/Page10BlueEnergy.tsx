import React from 'react';
import { Leaf, Award, CheckCircle2 } from 'lucide-react';
import { ImageWithLoader } from '../ImageWithLoader';

export const Page10BlueEnergy: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-white text-[#071B2E] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Page Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-[#2D9C4A] uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5" />
            PARCERIA ESTRATÉGICA SUSTENTÁVEL
          </span>
          <div className="h-[1px] w-12 bg-[#2D9C4A]/40" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#071B2E] tracking-tight">
            Blue Energy & Simple Green®
          </h2>

          {/* Official Partner Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2D9C4A]/10 border border-[#2D9C4A]">
            <Award className="w-4 h-4 text-[#2D9C4A]" />
            <span className="font-mono text-xs text-[#2D9C4A] font-bold">
              Parceiro Oficial Angola
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mt-3">
          <p className="md:col-span-8 font-sans text-xs md:text-sm text-slate-700 leading-relaxed">
            Em parceria com a <strong>Blue Energy, LDA</strong> — distribuidora oficial da{' '}
            <strong>Simple Green®</strong> para Angola e África — a{' '}
            <strong>Abyby Sita Comércio Geral, LDA</strong> amplia a sua oferta com soluções de
            limpeza industrial sustentável de alto rendimento.
          </p>
          <div className="md:col-span-4 h-20 rounded-xl overflow-hidden border border-slate-200 relative group shadow-sm">
            <ImageWithLoader
              src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80"
              alt="Simple Green Limpeza Industrial Ecológica"
              imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-transparent to-transparent opacity-80 pointer-events-none" />
            <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#2D9C4A] bg-white px-1.5 py-0.5 rounded font-bold border border-[#2D9C4A]/30 shadow-xs">
              SIMPLE GREEN® BIODEGRADÁVEL
            </span>
          </div>
        </div>
      </div>

      {/* 3 Compact Side-by-Side Blocks (Single Row) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
        {/* Block 1: Missão */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between shadow-xs">
          <div>
            <div className="font-mono text-xs text-[#2D9C4A] font-bold uppercase mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              MISSÃO BLUE ENERGY
            </div>
            <p className="font-sans text-xs text-slate-600 leading-relaxed">
              Ajudar empresas angolanas a otimizar o custo da limpeza através de soluções
              sustentáveis e de alto desempenho da Simple Green, elevando padrões de segurança e
              eficiência industrial.
            </p>
          </div>
        </div>

        {/* Block 2: Consultoria HSE */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between shadow-xs">
          <div>
            <div className="font-mono text-xs text-[#2D9C4A] font-bold uppercase mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              CONSULTORIA HSE
            </div>
            <p className="font-sans text-xs text-slate-600 leading-relaxed">
              Diagnóstico técnico, avaliação do custo real, desenho de rotinas otimizadas e apoio
              técnico contínuo — transformando a limpeza industrial num investimento estratégico.
            </p>
          </div>
        </div>

        {/* Block 3: Formação */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between shadow-xs">
          <div>
            <div className="font-mono text-xs text-[#2D9C4A] font-bold uppercase mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              FORMAÇÃO OPERACIONAL
            </div>
            <p className="font-sans text-xs text-slate-600 leading-relaxed">
              Treinamentos práticos em segurança operacional e sustentabilidade aplicada para
              equipas de operação e manutenção nos estaleiros.
            </p>
          </div>
        </div>
      </div>

      {/* Global Clients Section */}
      <div className="relative z-10 pt-4 border-t border-slate-200">
        <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">
          CLIENTES GLOBAIS DA SIMPLE GREEN®
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600 font-medium">
          <span>DELTA AIR LINES</span>
          <span>•</span>
          <span>HILTON</span>
          <span>•</span>
          <span>MARRIOTT</span>
          <span>•</span>
          <span>PEPSI</span>
          <span>•</span>
          <span>MCDONALD'S</span>
          <span>•</span>
          <span>COCA-COLA</span>
          <span>•</span>
          <span>CHEVRON</span>
          <span>•</span>
          <span>MERCEDES-BENZ</span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>SEÇÃO 10 — BLUE ENERGY & SIMPLE GREEN SUSTENTABILIDADE</span>
        <span>PRODUTOS ATÓXICOS E BIODEGRADÁVEIS</span>
      </div>
    </div>
  );
};
