import React from 'react';
import { FoodCategory } from '../../types';

interface FoodCategoryTabsProps {
  activeCategory: FoodCategory;
  onSelectCategory: (category: FoodCategory) => void;
}

const CATEGORIES: { id: FoodCategory; label: string }[] = [
  { id: 'proteinas', label: 'Proteínas & Massa Muscular' },
  { id: 'arroz-feijao-cereais', label: 'Arroz, Feijão & Cereais' },
  { id: 'frutas-horticolas', label: 'Frutas & Hortícolas' },
  { id: 'essenciais', label: 'Bens Alimentares Essenciais' },
  { id: 'kits', label: 'Kits de Abastecimento' },
];

export const FoodCategoryTabs: React.FC<FoodCategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Categorias de Alimentos"
      className="flex w-full gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-[#071B2E] scrollbar-thumb-[#1868B8]/50"
    >
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${cat.id}`}
            id={`tab-${cat.id}`}
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 font-mono text-xs md:text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#071B2E] ${
              isActive
                ? 'bg-[#1868B8] text-white font-semibold shadow-[0_0_15px_rgba(24,104,184,0.5)] border border-[#1868B8]'
                : 'bg-[#0F3B63]/40 text-slate-400 border border-[#7E92A6]/30 hover:bg-[#0F3B63] hover:text-white hover:border-[#7E92A6]/50'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
