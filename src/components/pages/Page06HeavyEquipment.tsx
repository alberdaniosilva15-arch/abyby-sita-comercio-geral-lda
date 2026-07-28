import React from 'react';
import { Anchor, ShieldCheck } from 'lucide-react';
import { ImageWithLoader } from '../ImageWithLoader';
import tiposEquipamentosImg from '../../assets/images/tipos_equipamentos_pesados.png';
import gruaImg from '../../assets/images/tipos_equipamentos_grua.png';

export const Page06HeavyEquipment: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-[#F8FAFC] text-[#071B2E] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            LOGÍSTICA PESADA & MARÍTIMA
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-[#071B2E] tracking-tight">
          Equipamentos Pesados e Transporte
        </h2>
      </div>

      {/* Main Text */}
      <div className="relative z-10 max-w-4xl mb-4">
        <p className="font-sans text-xs md:text-sm text-slate-700 leading-relaxed">
          O serviço de Equipamentos Pesados e Transporte da <strong>Abyby Sita Comércio Geral, LDA</strong> oferece soluções completas para operações industriais, logísticas e de construção, disponibilizando gruas, camiões trailer e navios para diferentes tipos de projetos. A nossa frota é composta por equipamentos modernos, sujeitos a manutenção rigorosa e inspeções regulares, garantindo máxima segurança e fiabilidade em terra e no mar.
        </p>
      </div>

      {/* 3 Featured Blocks in Line with Real High-Res Photos */}
      <div className="relative z-10 flex flex-col gap-6 my-auto">
        {/* Imagem composta real com Camiões, Navio e Gruas */}
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md group">
          <ImageWithLoader
            src={tiposEquipamentosImg}
            alt="Equipamentos Pesados - Camiões Trailer, Navio, Gruas"
            imageClassName="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* Grua em destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-start rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden group hover:border-[#1868B8] transition-all">
            <div className="w-full h-48 relative overflow-hidden bg-white flex items-center justify-center p-4">
              <ImageWithLoader
                src={gruaImg}
                alt="Grua Pesada Industrial"
                imageClassName="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-display font-bold text-lg text-[#071B2E] mb-1">Gruas Pesadas</h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed mb-3">
                Operação de içamento e movimentação de estruturas metálicas, módulos de perfuração e carga industrial de grande porte. Gruas de 50 e 100 toneladas.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="font-display font-bold text-lg text-[#071B2E] mb-1">Camiões Trailer</h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                Trailers robustos de alta capacidade para transporte de cargas indivisíveis, tubagens e porta-containers em rotas nacionais.
              </p>
              <span className="font-mono text-[10px] text-[#1868B8] font-bold mt-2 inline-block">5 - 100 TONELADAS</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="font-display font-bold text-lg text-[#071B2E] mb-1">Navio / Caboagem</h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                Embarcações dedicadas ao transporte marítimo costeiro e apoio logístico offshore entre Luanda, Cabinda e bases petrolíferas.
              </p>
              <span className="font-mono text-[10px] text-[#1868B8] font-bold mt-2 inline-block">LOGÍSTICA MARÍTIMA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Compliance Line */}
      <div className="relative z-10 p-3 rounded-lg bg-white border border-slate-200 flex items-center gap-3 text-xs shadow-sm">
        <ShieldCheck className="w-5 h-5 text-[#1868B8] flex-shrink-0" />
        <span className="font-sans text-slate-700">
          Todos os equipamentos possuem certificados de teste de carga em dia e operadores formados com licenças internacionais.
        </span>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>SEÇÃO 06 — OPERAÇÕES DE MOVIMENTAÇÃO DE CARGA PESADA</span>
        <span>INSPEÇÃO E NORMAS DE SEGURANÇA</span>
      </div>
    </div>
  );
};
