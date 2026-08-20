import React from 'react';

interface FreshFoodTriggerProps {
  onClick: () => void;
}

export const FreshFoodTrigger: React.FC<FreshFoodTriggerProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl border-2 border-cyan-400/30 bg-gradient-to-br from-[#071B2E] to-[#0F3B63] p-6 md:p-8 text-left transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer"
      aria-label="Abrir catálogo de Frescos e Bens Alimentares — clique para explorar"
    >
      {/* Frost Shimmer Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 via-cyan-300/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />

      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        {/* SVG Refrigerator / Geleira */}
        <div className="relative transition-transform duration-500 group-hover:scale-105">
          {/* Frost Glow Ring */}
          <div className="absolute -inset-3 rounded-full bg-cyan-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <svg
            width="120"
            height="140"
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]"
            aria-hidden="true"
          >
            {/* Fridge Body */}
            <rect
              x="15"
              y="5"
              width="90"
              height="130"
              rx="8"
              fill="#0B2A4A"
              stroke="#22D3EE"
              strokeWidth="2"
              className="transition-all duration-500 group-hover:stroke-[#67E8F9]"
            />

            {/* Freezer Section (Top) */}
            <rect
              x="20"
              y="10"
              width="80"
              height="40"
              rx="4"
              fill="#071B2E"
              stroke="#1868B8"
              strokeWidth="1.5"
            />
            {/* Snowflake Icon in Freezer */}
            <path
              d="M60 18 L60 42 M48 24 L72 36 M72 24 L48 36"
              stroke="#67E8F9"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx="60" cy="30" r="2" fill="#67E8F9" opacity="0.9" />

            {/* Fridge Section (Bottom) */}
            <rect
              x="20"
              y="56"
              width="80"
              height="72"
              rx="4"
              fill="#071B2E"
              stroke="#1868B8"
              strokeWidth="1.5"
            />

            {/* Shelves inside */}
            <line
              x1="24"
              y1="78"
              x2="96"
              y2="78"
              stroke="#1868B8"
              strokeWidth="0.8"
              opacity="0.5"
            />
            <line
              x1="24"
              y1="100"
              x2="96"
              y2="100"
              stroke="#1868B8"
              strokeWidth="0.8"
              opacity="0.5"
            />

            {/* Food Items Inside - Shelf 1 */}
            {/* Apple */}
            <circle cx="35" cy="68" r="5" fill="#22C55E" opacity="0.7" />
            <line
              x1="35"
              y1="63"
              x2="36"
              y2="60"
              stroke="#16A34A"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Fish */}
            <ellipse cx="55" cy="68" rx="8" ry="4" fill="#38BDF8" opacity="0.6" />
            <path d="M63 68 L68 64 L68 72 Z" fill="#38BDF8" opacity="0.5" />
            {/* Bottle */}
            <rect x="75" y="61" width="6" height="12" rx="2" fill="#F59E0B" opacity="0.5" />
            <rect x="76" y="58" width="4" height="4" rx="1" fill="#F59E0B" opacity="0.6" />

            {/* Food Items Inside - Shelf 2 */}
            {/* Meat */}
            <rect x="28" y="83" width="14" height="10" rx="3" fill="#EF4444" opacity="0.5" />
            {/* Eggs */}
            <ellipse cx="55" cy="88" rx="4" ry="5" fill="#FDE68A" opacity="0.6" />
            <ellipse cx="63" cy="88" rx="4" ry="5" fill="#FDE68A" opacity="0.5" />
            {/* Milk box */}
            <rect x="77" y="82" width="10" height="14" rx="1" fill="#E0E7FF" opacity="0.5" />

            {/* Food Items Inside - Shelf 3 */}
            {/* Vegetables */}
            <rect x="28" y="104" width="8" height="16" rx="3" fill="#4ADE80" opacity="0.5" />
            <rect x="38" y="106" width="7" height="14" rx="3" fill="#22C55E" opacity="0.4" />
            {/* Grain bag */}
            <path d="M55 105 L50 120 L60 120 Z" fill="#D4A574" opacity="0.5" />
            <path d="M65 105 L60 120 L70 120 Z" fill="#C2A061" opacity="0.4" />
            {/* Bean bowl */}
            <ellipse cx="85" cy="116" rx="8" ry="4" fill="#92400E" opacity="0.4" />
            <ellipse cx="85" cy="114" rx="7" ry="3" fill="#B45309" opacity="0.5" />

            {/* Door Handle - Freezer */}
            <rect
              x="92"
              y="25"
              width="3"
              height="12"
              rx="1.5"
              fill="#67E8F9"
              opacity="0.8"
              className="transition-all duration-500 group-hover:fill-[#A5F3FC]"
            />
            {/* Door Handle - Fridge */}
            <rect
              x="92"
              y="80"
              width="3"
              height="18"
              rx="1.5"
              fill="#67E8F9"
              opacity="0.8"
              className="transition-all duration-500 group-hover:fill-[#A5F3FC]"
            />

            {/* Frost particles */}
            <circle cx="25" cy="15" r="1" fill="#67E8F9" opacity="0.4">
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="95" cy="12" r="1.2" fill="#67E8F9" opacity="0.3">
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="18" cy="55" r="0.8" fill="#67E8F9" opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.5;0.9;0.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <h3 className="font-display text-xl font-bold text-white md:text-2xl tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
              Frescos & Bens Alimentares
            </h3>
            <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-cyan-300 border border-cyan-400/40 uppercase tracking-widest animate-pulse">
              Novo
            </span>
          </div>
          <p className="font-sans text-xs md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors max-w-[280px]">
            Arroz, feijão, proteínas, hortícolas, frutas e abastecimento essencial.
          </p>
          <div className="mt-2 flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
            <span>Abrir Catálogo</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
};
