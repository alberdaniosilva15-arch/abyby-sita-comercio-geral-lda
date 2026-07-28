import React from 'react';
import { ShieldAlert, CheckCircle2, Award, Zap } from 'lucide-react';
import ropeAccessImg from '../../assets/images/rope_access.png';
import { ImageWithLoader } from '../ImageWithLoader';

export const Page04RopeAccess: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-[#EFF4F8] text-[#071B2E] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Vertical Side Badge */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-[#0F3B63] hidden md:flex items-center justify-center pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#EFF4F8] uppercase rotate-90 whitespace-nowrap">
          BLASTING & PINTURA • MANUTENÇÃO INDUSTRIAL • MECÂNICA & HIDRÁULICA
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4 pr-0 md:pr-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            OIL & GAS / TRABALHOS EM ALTURA
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-[#071B2E] tracking-tight">
          Rope Access & Serviços Industriais
        </h2>
      </div>

      {/* Main Content Layout with Real Rope Access Photo */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto pr-0 md:pr-8">
        {/* Left Column: Real Rope Access Image & Main Text */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            {/* Real High Quality Rope Access Photograph */}
            <div className="w-full sm:w-48 h-48 md:h-56 rounded-xl overflow-hidden relative flex-shrink-0 border border-slate-200 shadow-inner group">
              <ImageWithLoader
                src={ropeAccessImg}
                alt="Técnico de Rope Access em operação Offshore"
                imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                <span className="font-mono text-[10px] bg-[#1868B8] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  IRATA / SOFT CERTIFIED
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <p className="font-sans text-xs md:text-sm text-[#071B2E]/90 leading-relaxed">
                  A <strong>Abyby Sita Comércio Geral, LDA</strong> atua na área de soluções técnicas e serviços especializados, oferecendo <strong>Rope Access (Acesso por Cordas)</strong> como uma técnica moderna, segura e altamente eficiente para trabalhos em altura e locais de difícil acesso.
                </p>
                <p className="font-sans text-xs md:text-sm text-[#071B2E]/90 leading-relaxed mt-2">
                  O Rope Access utiliza equipamentos certificados, como cordas de alta resistência, arnês e sistemas de segurança avançados, permitindo a execução de inspeções e reparações com máxima precisão e eliminação total de andaimes pesados.
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F3B63]/10 text-[#0F3B63] font-mono text-[11px] font-semibold">
                  <Award className="w-3.5 h-3.5 text-[#1868B8]" />
                  <span>Certificação Internacional</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-800 font-mono text-[11px] font-semibold">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rápida Mobilização</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Advantages Tags */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#1868B8]" />
              <span className="font-bold text-[#071B2E]">Sem Andaimes Pesados</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <ShieldAlert className="w-4 h-4 text-[#1868B8]" />
              <span className="font-bold text-[#071B2E]">Equipamentos Certificados</span>
            </div>
          </div>
        </div>

        {/* Right Column: 6 Photo Gallery Grid 3x2 */}
        <div className="lg:col-span-5">
          <div className="font-mono text-[11px] text-[#7E92A6] uppercase tracking-wider mb-2 font-semibold">
            SERVIÇOS E APLICAÇÕES EM CAMPO
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Inspeção NDT', code: 'IMG_01', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },
              { label: 'Plataforma Offshore', code: 'IMG_02', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80' },
              { label: 'Pintura Industrial', code: 'IMG_03', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
              { label: 'Manutenção Tocha', code: 'IMG_04', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
              { label: 'Rope Rigging', code: 'IMG_05', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80' },
              { label: 'Inspeção Estrutura', code: 'IMG_06', url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80' },
            ].map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-4/3 rounded bg-[#071B2E] border border-[#7E92A6]/30 overflow-hidden flex flex-col justify-end p-2 group shadow-sm hover:border-[#1868B8] transition-all"
              >
                <ImageWithLoader
                  src={img.url}
                  alt={img.label}
                  imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-[#071B2E]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity pointer-events-none" />
                <div className="relative z-10">
                  <span className="font-mono text-[9px] text-[#1868B8] bg-[#071B2E]/80 px-1 rounded inline-block font-bold">{img.code}</span>
                  <span className="font-sans font-bold text-[10px] text-white leading-tight block mt-0.5">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-[#7E92A6]/30 flex justify-between items-center text-[11px] font-mono text-[#7E92A6] pr-0 md:pr-10">
        <span>ROPE ACCESS & MANUTENÇÃO INDUSTRIAL</span>
        <span>EQUIPAS CERTIFICADAS</span>
      </div>
    </div>
  );
};
