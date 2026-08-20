import React from 'react';

export const Page05bNewSection: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-white text-[#071B2E] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            SAÚDE E BEM-ESTAR
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-[#071B2E] tracking-tight">
          Material Hospitalar
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6 my-auto items-center justify-center">
        <div className="w-full max-w-4xl rounded-xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-50 flex justify-center items-center p-4">
          <img
            src="/nova-seccao.png"
            alt="Material Hospitalar"
            className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>SEÇÃO 05B — MATERIAL HOSPITALAR</span>
        <span>ABYBY SITA COMÉRCIO GERAL, LDA</span>
      </div>
    </div>
  );
};
