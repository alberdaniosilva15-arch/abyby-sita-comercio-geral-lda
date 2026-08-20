import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { ImageWithLoader } from '../ImageWithLoader';
import equipamentosMateriaisImg from '../../assets/images/equipamentos_materiais.png';
import { FreshFoodTrigger } from '../fresh-food/FreshFoodTrigger';
import { FreshFoodDrawer } from '../fresh-food/FreshFoodDrawer';

export const Page08ProductsInventory: React.FC = () => {
  const [isFreshFoodOpen, setIsFreshFoodOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'industriais' | 'frescos'>('industriais');

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
          Linha completa de fornecimento industrial para estaleiros, mineração e bases petrolíferas
          em Angola.
        </p>
      </div>

      {/* Tabs */}
      <div className="relative z-10 flex gap-6 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('industriais')}
          className={"pb-3 text-sm font-bold uppercase tracking-wider transition-colors " + (
            activeTab === 'industriais'
              ? 'border-b-2 border-[#1868B8] text-[#1868B8]'
              : 'text-slate-400 hover:text-slate-600'
          )}
        >
          Equipamentos Industriais
        </button>
        <button
          onClick={() => setActiveTab('frescos')}
          className={"pb-3 text-sm font-bold uppercase tracking-wider transition-colors " + (
            activeTab === 'frescos'
              ? 'border-b-2 border-[#1868B8] text-[#1868B8]'
              : 'text-slate-400 hover:text-slate-600'
          )}
        >
          Frescos e Bens Alimentares
        </button>
      </div>

      {/* Tab Content */}
      <div className="relative z-10 my-auto w-full flex flex-col items-center justify-center min-h-[300px]">
        {activeTab === 'industriais' && (
          <div className="w-full flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="w-full md:w-2/3 max-w-4xl rounded-xl overflow-hidden border border-slate-200 shadow-md">
              <ImageWithLoader
                src={equipamentosMateriaisImg}
                alt="Equipamentos e Materiais em Angola"
                imageClassName="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div className="flex items-start gap-2 text-[10px] sm:text-xs font-mono text-slate-500 bg-slate-50/50 p-4 rounded-lg border border-slate-100 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#1868B8] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Todos os produtos industriais acompanham certificados de garantia e conformidade com as normas internacionais em vigor.
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'frescos' && (
          <div className="w-full max-w-sm mx-auto">
            <FreshFoodTrigger onClick={() => setIsFreshFoodOpen(true)} />
          </div>
        )}
      </div>

      <FreshFoodDrawer isOpen={isFreshFoodOpen} onClose={() => setIsFreshFoodOpen(false)} />

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>SEÇÃO 08 — MANIFESTO DE INVENTÁRIO DE PRODUTOS</span>
        <span>MERCADORIA EM ESTOQUE</span>
      </div>
    </div>
  );
};
