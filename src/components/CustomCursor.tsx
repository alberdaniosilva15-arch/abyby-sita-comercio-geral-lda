import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('a, button, input, select, textarea, [role="button"], .interactive-cursor');
        setIsHovered(!!isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <div
        className={`rounded-full border border-white/60 backdrop-blur-[2px] shadow-[0_0_15px_rgba(24,104,184,0.4)] transition-all duration-200 ${
          isHovered
            ? 'w-12 h-12 bg-[#1868B8]/20 border-white shadow-[0_0_25px_rgba(24,104,184,0.8)] scale-110'
            : 'w-7 h-7 bg-white/5 border-white/50'
        }`}
      >
        <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-[#1868B8] rounded-full shadow-[0_0_8px_#ffffff]" />
      </div>
    </div>
  );
};
