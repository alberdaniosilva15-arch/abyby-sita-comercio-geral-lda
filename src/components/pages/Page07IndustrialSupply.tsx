import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { ImageWithLoader } from '../ImageWithLoader';
import steelPipesImg from '../../assets/images/vendas_tubagens_pipes.png';

export const Page07IndustrialSupply: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-[#071B2E] text-[#EFF4F8] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Top Compact Tags Line */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-4">
        {[
          'Fornecimento Rápido',
          'Materiais de Construção',
          'Equipamentos de Qualidade',
          'Camiões 5-100t',
          'Gruas 50-100t',
          'Camiões & Trailers',
        ].map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-md bg-[#0F3B63]/60 border border-[#1868B8]/40 font-mono text-[10px] uppercase text-[#1868B8] font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            SUPPLY CHAIN / MATERIAL FERROSO
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-white tracking-tight">
          Venda de Tubagens (Pipes) & Soluções Industriais
        </h2>
      </div>

      {/* Main Text & Steel Pipe Photo Banner */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mb-2">
        <div className="lg:col-span-7">
          <p className="font-sans text-xs md:text-sm text-[#EFF4F8]/90 leading-relaxed">
            O serviço de Venda de Tubagens da <strong>Abyby Sita Comércio Geral, LDA</strong> disponibiliza soluções completas e de elevada qualidade para os setores industrial, petrolífero, construção e infraestruturas. Fornecemos uma ampla gama de tubagens (pipes), adequadas para condução de fluidos, gás, água e sistemas técnicos. Trabalhamos com aço carbono, aço inoxidável e materiais certificados segundo normas internacionais.
          </p>
        </div>
        <div className="lg:col-span-5 h-28 rounded-xl overflow-hidden border border-[#7E92A6]/30 relative group shadow-md">
          <ImageWithLoader
            src={steelPipesImg}
            alt="Estoque Real de Tubagens Industriais em Aço"
            imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-transparent to-transparent opacity-80 pointer-events-none" />
          <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center z-10">
            <span className="font-sans font-bold text-xs text-white">Estoque de Tubagens de Aço</span>
            <span className="font-mono text-[10px] text-[#1868B8] bg-[#071B2E] px-2 py-0.5 rounded border border-[#1868B8]/40">API 5L / ASTM</span>
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      <div className="relative z-10 my-auto overflow-x-auto rounded-xl border border-[#7E92A6]/30 bg-[#0F3B63]/20 shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0F3B63]/80 border-b border-[#7E92A6]/40 font-mono text-xs text-[#1868B8] uppercase tracking-wider">
              <th className="p-3">Diâmetro (Pol.)</th>
              <th className="p-3">Comprimento (m)</th>
              <th className="p-3">Aplicação Comum</th>
              <th className="p-3">Observações Técnicas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#7E92A6]/20 font-sans text-xs md:text-sm">
            <tr className="hover:bg-[#0F3B63]/40 transition-colors">
              <td className="p-3 font-mono font-bold text-white">3"</td>
              <td className="p-3 font-mono text-[#EFF4F8]">12 m</td>
              <td className="p-3 text-[#EFF4F8]">Transporte de fluidos industriais</td>
              <td className="p-3 text-[#7E92A6]">Alta eficiência em longas distâncias</td>
            </tr>
            <tr className="hover:bg-[#0F3B63]/40 transition-colors">
              <td className="p-3 font-mono font-bold text-white">3"</td>
              <td className="p-3 font-mono text-[#EFF4F8]">9 m</td>
              <td className="p-3 text-[#EFF4F8]">Sistemas industriais e construção</td>
              <td className="p-3 text-[#7E92A6]">Versátil e fácil de manusear</td>
            </tr>
            <tr className="hover:bg-[#0F3B63]/40 transition-colors">
              <td className="p-3 font-mono font-bold text-white">3"</td>
              <td className="p-3 font-mono text-[#EFF4F8]">6 m</td>
              <td className="p-3 text-[#EFF4F8]">Instalações técnicas e urbanas</td>
              <td className="p-3 text-[#7E92A6]">Ideal para espaços reduzidos</td>
            </tr>
            <tr className="hover:bg-[#0F3B63]/40 transition-colors">
              <td className="p-3 font-mono font-bold text-[#1868B8]">3" – 60"</td>
              <td className="p-3 font-mono text-[#EFF4F8]">Variável</td>
              <td className="p-3 text-[#EFF4F8]">Projetos industriais de grande escala</td>
              <td className="p-3 text-[#7E92A6]">Disponível sob especificação do cliente</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quality Standards Note */}
      <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-[#7E92A6] pt-2">
        <CheckCircle2 className="w-4 h-4 text-[#1868B8]" />
        <span>Aço Carbono, Aço Inoxidável • Normas API / ISO / ASTM</span>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-[#7E92A6]/20 flex justify-between items-center text-[11px] font-mono text-[#7E92A6]">
        <span>SEÇÃO 07 — CATÁLOGO DE TUBAGENS E ESPECIFICAÇÕES TÉCNICAS</span>
        <span>ABASTECIMENTO INDUSTRIAL</span>
      </div>
    </div>
  );
};
