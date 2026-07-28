import React from 'react';
import { Droplet, Clock, ShieldCheck, Users } from 'lucide-react';
import { ImageWithLoader } from '../ImageWithLoader';
import fossaImg from '../../assets/images/servico_limpeza_fossa.png';

export const Page09SepticService: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-[#F0F4F8] text-[#071B2E] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            SERVIÇOS DE SANEAMENTO & AMBIENTE
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-[#071B2E] tracking-tight">
          Serviço de Limpeza de Fossa
        </h2>
      </div>

      {/* Main Block Content with 2 Operational Photos */}
      <div className="relative z-10 my-auto max-w-5xl mx-auto flex flex-col gap-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#1868B8]/10 border border-[#1868B8]/30 flex items-center justify-center text-[#1868B8]">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#071B2E]">
              Soluções Especializadas de Saneamento & Descarte
            </h3>
          </div>

          <p className="font-sans text-xs md:text-sm text-slate-700 leading-relaxed">
            A <strong>Abyby Sita Comércio Geral, LDA</strong> presta serviços especializados de limpeza de fossas sépticas, garantindo soluções eficientes, seguras e ambientalmente responsáveis para clientes residenciais, comerciais, industriais e institucionais em Angola.
          </p>
          <p className="font-sans text-xs md:text-sm text-slate-700 leading-relaxed mt-2">
            Dispomos de equipamentos de sucção auto-vácuo de alta potência e de uma equipa qualificada para a remoção, transporte e descarte adequado de resíduos efluentes, prevenindo entupimentos, maus odores e contaminações.
          </p>

          {/* Badges Line */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-200 text-left">
            <div className="flex items-center gap-2 p-2 rounded bg-[#F8FAFC] border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-[#1868B8]" />
              <span className="font-mono text-[11px] text-[#071B2E] font-medium">Atendimento Programado</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded bg-[#F8FAFC] border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-[#1868B8]" />
              <span className="font-mono text-[11px] text-[#071B2E] font-medium">Suporte de Emergência</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded bg-[#F8FAFC] border border-slate-200">
              <Users className="w-3.5 h-3.5 text-[#1868B8]" />
              <span className="font-mono text-[11px] text-[#071B2E] font-medium">Equipa Qualificada</span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded bg-[#F8FAFC] border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1868B8]" />
              <span className="font-mono text-[11px] text-[#071B2E] font-medium">Proteção Ambiental</span>
            </div>
          </div>
        </div>

        {/* 2 Operational Photographs (Camião Sucção + Operação de Campo) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-44 rounded-xl overflow-hidden border border-slate-200 relative group shadow-sm">
            <ImageWithLoader
              src={fossaImg}
              alt="Camião de Sucção de Fossa"
              imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-white z-10">
              <span className="font-sans font-bold text-xs">Camião Limpeza de Fossa Auto-Vácuo</span>
              <span className="font-mono text-[10px] bg-[#1868B8] px-2 py-0.5 rounded font-bold">DISPONÍVEL</span>
            </div>
          </div>

          <div className="h-44 rounded-xl overflow-hidden border border-slate-200 relative group shadow-sm">
            <ImageWithLoader
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
              alt="Operação de Sucção e Saneamento"
              imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-white">
              <span className="font-sans font-bold text-xs">Operação de Remoção de Efluentes</span>
              <span className="font-mono text-[10px] bg-[#071B2E] border border-cyan-400/40 text-cyan-300 px-2 py-0.5 rounded font-bold">SANEAMENTO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>SEÇÃO 09 — HIGIENE URBANA E SANEAMENTO AMBIENTAL</span>
        <span>RESÍDUOS TRATADOS</span>
      </div>
    </div>
  );
};
