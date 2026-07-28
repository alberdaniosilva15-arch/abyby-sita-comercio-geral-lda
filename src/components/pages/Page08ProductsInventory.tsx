import React from 'react';
import { Package, ShieldCheck } from 'lucide-react';
import { ImageWithLoader } from '../ImageWithLoader';
import equipamentosMateriaisImg from '../../assets/images/equipamentos_materiais.png';

export const Page08ProductsInventory: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-white text-[#071B2E] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Watermark */}
      <div className="absolute top-10 right-10 font-stamp text-8xl font-bold text-slate-100 pointer-events-none">
        INVENTÁRIO
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            CATÁLOGO DE PRODUTOS & EQUIPAMENTOS
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-[#071B2E] tracking-tight">
          Produtos & Material Ferroso
        </h2>
        <p className="font-sans text-xs md:text-sm text-slate-600 mt-1">
          Linha completa de fornecimento industrial para estaleiros, mineração e bases petrolíferas em Angola.
        </p>
      </div>

      {/* Products Infographic */}
      <div className="relative z-10 my-auto w-full flex justify-center">
        <div className="w-full max-w-4xl rounded-xl overflow-hidden border border-slate-200 shadow-md">
          <ImageWithLoader
            src={equipamentosMateriaisImg}
            alt="Equipamentos e Materiais em Angola"
            imageClassName="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Note */}
      <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-slate-500">
        <ShieldCheck className="w-4 h-4 text-[#1868B8]" />
        <span>Todos os produtos acompanham certificados de garantia e conformidade com normas industriais.</span>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>SEÇÃO 08 — MANIFESTO DE INVENTÁRIO DE PRODUTOS</span>
        <span>MERCADORIA EM ESTOQUE</span>
      </div>
    </div>
  );
};
