import React from 'react';
import { ChevronUp, ChevronDown, Layers } from 'lucide-react';

interface BookFolioBarProps {
  currentPage: number;
  totalPages: number;
  pageTitles: string[];
  onPrevPage: () => void;
  onNextPage: () => void;
  onSelectPage: (index: number) => void;
  isFlipping?: boolean;
}

export const BookFolioBar: React.FC<BookFolioBarProps> = ({
  currentPage,
  totalPages,
  pageTitles,
  onPrevPage,
  onNextPage,
  onSelectPage,
}) => {
  const pageNumStr = String(currentPage + 1).padStart(2, '0');
  const totalNumStr = String(totalPages).padStart(2, '0');
  const scrollProgressPercent = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[500] h-14 bg-[#071B2E]/92 backdrop-blur-md border-t border-[#7E92A6]/25 px-4 md:px-8 flex items-center justify-between text-xs font-mono shadow-2xl">
      {/* Scroll Progress Line at Top */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#1868B8] via-white to-[#1868B8] transition-all duration-300 shadow-[0_0_10px_#1868B8]"
        style={{ width: `${scrollProgressPercent}%` }}
      />

      {/* Section Counter Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0F3B63]/80 border border-[#7E92A6]/30">
          <Layers className="w-3.5 h-3.5 text-[#1868B8]" />
          <span className="font-stamp text-sm text-white tracking-widest font-bold">
            SEÇÃO {pageNumStr}
          </span>
          <span className="text-[#7E92A6]">/ {totalNumStr}</span>
        </div>
        <span className="hidden sm:inline-block text-[#EFF4F8] text-[11px] font-sans font-medium truncate max-w-[180px] md:max-w-[280px]">
          — {pageTitles[currentPage] || ''}
        </span>
      </div>

      {/* Quick Jump Section Dots */}
      <div className="hidden md:flex items-center gap-1.5">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPage(idx)}
            title={`Seção ${idx + 1}: ${pageTitles[idx] || ''}`}
            className={`transition-all cursor-pointer ${
              idx === currentPage
                ? 'w-6 h-2 rounded-full bg-[#1868B8] shadow-[0_0_8px_#1868B8]'
                : 'w-2 h-2 rounded-full bg-[#7E92A6]/30 hover:bg-[#7E92A6]'
            }`}
          />
        ))}
      </div>

      {/* Up/Down Scroll Controls */}
      <div className="flex items-center gap-2">
        <span className="hidden lg:inline text-[10px] text-[#7E92A6] uppercase tracking-wider mr-2">
          [Role para navegar]
        </span>
        <button
          onClick={onPrevPage}
          disabled={currentPage === 0}
          className="p-1.5 rounded bg-[#0F3B63]/80 hover:bg-[#1868B8] text-white disabled:opacity-30 disabled:hover:bg-[#0F3B63]/80 transition-colors border border-[#7E92A6]/30 cursor-pointer flex items-center gap-1"
          title="Seção Anterior"
        >
          <ChevronUp className="w-4 h-4" />
          <span className="hidden xl:inline text-[10px]">Anterior</span>
        </button>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
          className="p-1.5 rounded bg-[#0F3B63]/80 hover:bg-[#1868B8] text-white disabled:opacity-30 disabled:hover:bg-[#0F3B63]/80 transition-colors border border-[#7E92A6]/30 cursor-pointer flex items-center gap-1"
          title="Próxima Seção"
        >
          <span className="hidden xl:inline text-[10px]">Próxima</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
