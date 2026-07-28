import React from 'react';
import { Truck, Car, Anchor, ShieldCheck } from 'lucide-react';
import { ImageWithLoader } from '../ImageWithLoader';
import tiposViaturasImg from '../../assets/images/tipos_de_viaturas.png';
import tiposViaturasPesadosImg from '../../assets/images/tipos_de_viaturas_pesados.png';

export const Page05RentalFleet: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-white text-[#071B2E] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            GESTÃO DE FROTA & CABOAGEM
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-[#071B2E] tracking-tight">
          Aluguer de Meios & Rent-a-Car
        </h2>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
        {/* Left Column: Aluguer Text & Fleet Overview */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <p className="font-sans text-xs md:text-sm text-slate-700 leading-relaxed">
            A <strong>Abyby Sita Comércio Geral, LDA</strong> oferece serviços de aluguer de equipamentos e meios de transporte como uma solução prática, eficiente e economicamente vantajosa para empresas e projetos de diferentes dimensões.
          </p>
          <p className="font-sans text-xs md:text-sm text-slate-700 leading-relaxed">
            A nossa frota inclui navios, camiões trailers, gruas de 50 e 100 toneladas, viaturas no sistema Rent-a-Car e porta-contentores, garantindo alto desempenho, fiabilidade e segurança em todas as operações em Angola.
          </p>

          {/* Featured Fleet Banner Photo */}
          <div className="rounded-xl overflow-hidden border border-slate-200 relative shadow-sm group h-36 mt-2">
            <ImageWithLoader
              src={tiposViaturasPesadosImg}
              alt="Frota de Aluguer - Camiões, Gruas, SUV e Navio"
              imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-[#071B2E]/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-white">
              <span className="font-sans font-bold text-xs">Frota Pesada & Rent-a-Car</span>
              <span className="font-mono text-[10px] bg-[#1868B8] px-2 py-0.5 rounded font-bold">LUANDA & PROVÍNCIAS</span>
            </div>
          </div>
        </div>

        {/* Right Column: "Tipos de Viaturas:" Grid from PDF screenshots */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <h3 className="font-display font-bold text-lg md:text-xl text-[#071B2E] border-b border-slate-200 pb-1.5 flex items-center gap-2">
            <Car className="w-5 h-5 text-[#1868B8]" />
            <span>Tipos de Viaturas:</span>
          </h3>

          {/* Imagem composta real com todos os tipos de viaturas */}
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
            <ImageWithLoader
              src={tiposViaturasImg}
              alt="Tipos de Viaturas - SUV Compacto, SUV 4x4, Carrinha, Auto Carro, Van"
              imageClassName="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>SEÇÃO 05 — ALUGUER DE EQUIPAMENTOS E FROTA RENT-A-CAR</span>
        <span>DISPONIBILIDADE IMEDIATA</span>
      </div>
    </div>
  );
};
