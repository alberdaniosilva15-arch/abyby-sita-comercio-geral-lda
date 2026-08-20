import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const fleetCards = [
  {
    id: 1,
    title: 'Rent-a-Car',
    img: '/frota/rent-acar.png',
    desc: 'Viaturas ligeiras, pick-ups e SUVs preparados para o exigente dia a dia corporativo e operações on/off-road.',
    contain: true,
  },
  {
    id: 2,
    title: 'Transporte Terrestre',
    img: '/frota/transporte-de-cargas-terrestres.png',
    desc: 'Camiões, trailers pesados e gruas para suporte logístico rodoviário em todo o território nacional.',
    contain: false,
  },
  {
    id: 3,
    title: 'Aluguer de Autocarro',
    img: '/frota/aluguer-dde-autrocarro.png',
    desc: 'Soluções confortáveis e seguras de mobilidade de passageiros e equipas de trabalho.',
    contain: false,
  },
  {
    id: 4,
    title: 'Navios de Carga',
    img: '/frota/navios-de-carga.png',
    desc: 'Operações de cabotagem e transporte logístico marítimo de grande escala.',
    contain: false,
  },
  {
    id: 5,
    title: 'Logística Marítima',
    img: '/frota/navio-de-carga-1.png',
    desc: 'Suporte eficiente nas rotas de navegação comercial e fornecimento à indústria offshore.',
    contain: false,
  },
];

export function FleetHoverSwipe() {
  const [current, setCurrent] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const active = hoverIdx ?? current;

  const advance = (dir: number) => {
    setCurrent((prev) => (prev + dir + fleetCards.length) % fleetCards.length);
  };

  // Swipe em mobile — decide o eixo no primeiro movimento para não roubar o scroll vertical
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isHorizontalSwipe.current === null) {
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
      // só decide "é swipe horizontal" se o movimento lateral já for claramente dominante
      if (dx > 10 || dy > 10) {
        isHorizontalSwipe.current = dx > dy * 1.3;
      }
    }
    // se for horizontal, impede o scroll da página de reagir a este gesto
    if (isHorizontalSwipe.current) {
      e.preventDefault();
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isHorizontalSwipe.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) advance(1);
    else if (dx > 50) advance(-1);
    isHorizontalSwipe.current = null;
  };

  return (
    <div className="relative w-full mt-2">
      {/* Área principal — hover troca em desktop, swipe troca em mobile, clique também avança */}
      <div
        className={`group relative w-full rounded-xl overflow-hidden shadow-md border border-slate-200 select-none cursor-pointer ${fleetCards[active].contain ? 'h-auto min-h-[280px] md:min-h-[360px]' : 'h-56 md:h-64'}`}
        onClick={() => advance(1)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`${fleetCards[active].contain ? 'relative' : 'absolute inset-0'}`}
          >
            <img
              src={fleetCards[active].img}
              alt={fleetCards[active].title}
              className={`w-full transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:blur-[1px] ${fleetCards[active].contain ? 'h-auto object-contain' : 'h-full object-cover'}`}
              draggable={false}
            />
            {!fleetCards[active].contain && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-[#071B2E]/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-display font-bold text-lg text-cyan-400 mb-1 drop-shadow-md">
                    {fleetCards[active].title}
                  </h4>
                  <p className="font-sans text-xs text-slate-200 leading-snug drop-shadow max-w-[85%] line-clamp-2">
                    {fleetCards[active].desc}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Contador numérico */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full font-mono text-[10px] text-white border border-white/20 pointer-events-none">
          <span className="text-cyan-400">{String(active + 1).padStart(2, '0')}</span>
          <span className="text-white/40">/ {String(fleetCards.length).padStart(2, '0')}</span>
        </div>

        {/* Dica de gesto — só em mobile, discreta, sem animate-pulse */}
        <div className="absolute top-3 left-3 z-10 bg-black/30 backdrop-blur-md px-2 py-1 rounded text-[9px] text-white/70 font-mono uppercase border border-white/10 md:hidden pointer-events-none">
          Deslize para o lado
        </div>
      </div>

      {/* Faixa de thumbnails — hover-preview em desktop, sempre visível em mobile como navegação direta */}
      <div className="flex gap-2 mt-3">
        {fleetCards.map((card, idx) => (
          <button
            key={card.id}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(idx);
            }}
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}
            className="relative flex-1 h-1.5 rounded-full overflow-hidden bg-slate-200"
          >
            <motion.div
              className="absolute inset-0 bg-cyan-400"
              initial={false}
              animate={{ scaleX: idx === current ? 1 : 0 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default FleetHoverSwipe;
