import React from 'react';
import { Package, Cog, ArrowRight } from 'lucide-react';
import { FoodProduct } from '../../types';

interface FoodKitCardProps {
  kit: FoodProduct;
  onQuoteRequest: (product: FoodProduct) => void;
}

export const FoodKitCard: React.FC<FoodKitCardProps> = ({ kit, onQuoteRequest }) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#0F3B63]/80 to-[#071B2E] border border-cyan-500/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_10px_40px_rgba(24,104,184,0.3)]">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1868B8]/30 border border-cyan-400/40 text-cyan-300">
            <Package className="h-5 w-5" />
          </div>
          <h4 className="font-display text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            {kit.name}
          </h4>
        </div>

        {kit.badge && (
          <span className="rounded-full bg-cyan-500/20 px-2 py-1 font-mono text-[10px] font-bold text-cyan-300 border border-cyan-400/30 uppercase tracking-widest text-center whitespace-nowrap hidden sm:inline-block">
            {kit.badge}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col">
        <p className="mb-5 text-sm text-slate-300 leading-relaxed">{kit.description}</p>

        {/* Nutrients/Features Highlight */}
        <div className="mb-6 flex flex-col gap-2 mt-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#7E92A6]">
            Inclui:
          </span>
          <ul className="flex flex-col gap-1.5">
            {kit.nutrients.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-cyan-100/90 font-mono">
                <div className="h-1 w-1 rounded-full bg-cyan-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col sm:flex-row gap-3 border-t border-[#7E92A6]/30 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#7E92A6] sm:w-1/2">
            <Cog className="h-4 w-4 text-slate-400" />
            <span>Qtd. Personalizável</span>
          </div>

          <button
            onClick={() => onQuoteRequest(kit)}
            className="flex w-full sm:w-1/2 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 font-mono text-xs font-bold text-[#071B2E] transition-all hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2A4A] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            aria-label={kit.quoteLabel}
          >
            <span>Configurar Kit</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
