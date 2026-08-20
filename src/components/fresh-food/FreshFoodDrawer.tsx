import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { FoodCategory, FoodProduct } from '../../types';
import { ALL_FOODS } from '../../data/foodProducts';
import { FoodCategoryTabs } from './FoodCategoryTabs';
import { FoodProductCard } from './FoodProductCard';
import { FoodKitCard } from './FoodKitCard';

interface FreshFoodDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreshFoodDrawer: React.FC<FreshFoodDrawerProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('proteinas');
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape & Lock Body Scroll
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Lock background scroll
      // Try to focus the drawer itself for A11y
      drawerRef.current?.focus();
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const handleQuoteRequest = (product: FoodProduct) => {
    let message = `Olá, gostaria de solicitar uma cotação para: ${product.name}.`;
    if (product.category === 'kits') {
      message = `Olá, gostaria de configurar o ${product.name.toUpperCase()}.\nNúmero de pessoas/equipa: [preencher].\nFrequência de fornecimento: [preencher].`;
    } else {
      message += `\nQuantidade pretendida: [preencher].\nLocal de entrega: [preencher].`;
    }

    // 1. Dispatch custom event
    const event = new CustomEvent('open-quote', {
      detail: {
        productName: product.name,
        category: product.category,
        message: message,
      },
    });
    window.dispatchEvent(event);

    // 2. Close drawer
    onClose();

    // 3. Scroll to contacts section after a small delay to allow drawer closing animation
    setTimeout(() => {
      const contactEl = document.getElementById('contactos');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  if (!isOpen) return null;

  const currentProducts = ALL_FOODS.filter((p) => p.category === activeCategory);

  return (
    <div
      className="fixed inset-0 z-[1000] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-[#030F1C]/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="relative flex h-full w-full flex-col bg-gradient-to-b from-[#071B2E] to-[#0B2A4A] shadow-2xl sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] animate-in slide-in-from-right duration-300 focus:outline-none border-l border-[#7E92A6]/30 overflow-hidden"
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-[#7E92A6]/30 p-6 md:p-8 bg-[#0F3B63]/20">
          <div>
            <h2
              id="drawer-title"
              className="font-display text-2xl font-bold text-white md:text-3xl tracking-tight mb-2"
            >
              Frescos & Bens Alimentares
            </h2>
            <p className="font-mono text-xs md:text-sm text-cyan-300 uppercase tracking-widest">
              Abastecimento essencial. Energia para cada dia.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-[#1868B8]/30 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Fechar painel de Frescos e Alimentares"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="shrink-0 border-b border-[#7E92A6]/20 bg-[#071B2E]/90 px-6 py-4 md:px-8">
          <FoodCategoryTabs activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-track-[#071B2E] scrollbar-thumb-[#1868B8]/50">
          {/* Editorial Area for Muscle Mass Category */}
          {activeCategory === 'proteinas' && (
            <div className="mb-8 rounded-xl bg-gradient-to-r from-[#1868B8]/20 to-transparent p-5 border-l-4 border-cyan-400">
              <h3 className="mb-2 font-display text-lg font-bold text-white tracking-tight">
                TOP 10 ALIMENTOS PARA APOIAR A SUA MASSA MUSCULAR
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Alimentos ricos em proteína, energia e micronutrientes que podem fazer parte de uma
                alimentação equilibrada e de uma rotina de treino.
              </p>
              <div className="flex items-start gap-2 rounded bg-[#030F1C]/40 p-3 text-xs text-slate-400 font-mono">
                <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500/80" />
                <p>
                  Informação educativa. As necessidades nutricionais variam de pessoa para pessoa.
                  Para orientação individual, consulte um nutricionista ou profissional de saúde.
                </p>
              </div>
            </div>
          )}

          {/* Beans Editorial Warning */}
          {activeCategory === 'arroz-feijao-cereais' && (
            <div className="mb-8 flex items-center gap-2 rounded bg-amber-900/20 p-3 text-xs text-amber-200/80 font-mono border border-amber-500/20">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <p>
                Preparar leguminosas de forma adequada. Nunca consumir feijão cru ou mal cozinhado.
              </p>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {currentProducts.map((product) => (
              <div key={product.id}>
                {product.category === 'kits' ? (
                  <FoodKitCard kit={product} onQuoteRequest={handleQuoteRequest} />
                ) : (
                  <FoodProductCard product={product} onQuoteRequest={handleQuoteRequest} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
