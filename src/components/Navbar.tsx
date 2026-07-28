import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { NavItem } from '../types';

interface NavbarProps {
  currentPage: number;
  onNavigate: (pageIndex: number) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', label: 'INÍCIO', pageIndex: 0 },
  { id: 'sobre', label: 'SOBRE NÓS', pageIndex: 1 },
  { id: 'servicos', label: 'SERVIÇOS', pageIndex: 2 },
  { id: 'frota', label: 'FROTA & RENT-A-CAR', pageIndex: 4 },
  { id: 'contactos', label: 'CONTACTOS', pageIndex: 11 },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNavActive = (itemPageIndex: number) => {
    if (itemPageIndex === 0) return currentPage === 0;
    if (itemPageIndex === 1) return currentPage === 1;
    if (itemPageIndex === 2) return currentPage >= 2 && currentPage <= 3;
    if (itemPageIndex === 4) return currentPage >= 4 && currentPage <= 10;
    if (itemPageIndex === 11) return currentPage === 11;
    return false;
  };

  const handleNavClick = (pageIndex: number) => {
    onNavigate(pageIndex);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[500] glass-nav h-20 px-4 md:px-8 flex items-center justify-between">
      {/* Brand Logo */}
      <button
        onClick={() => handleNavClick(0)}
        className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1868B8] to-[#0F3B63] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
          <svg className="w-8 h-8 text-white" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 28C10 18 18 10 28 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M10 29C15 22 22 15 30 14" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" />
            <path d="M14 30C19 25 24 20 30 20" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.4" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-white group-hover:text-[#EFF4F8] transition-colors">
            Abybysita
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-[#7E92A6] uppercase -mt-1 font-semibold">
            COMÉRCIO GERAL, LDA
          </span>
        </div>
      </button>

      {/* Navigation Items (Desktop) */}
      <nav className="hidden xl:flex items-center gap-6">
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(item.pageIndex);
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.pageIndex)}
              className={`font-mono text-xs uppercase tracking-wider transition-all relative py-2 cursor-pointer ${
                active ? 'text-white font-semibold' : 'text-[#7E92A6] hover:text-white'
              }`}
            >
              {item.label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1868B8] rounded-full shadow-[0_0_8px_#1868B8]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <a
          href="tel:+244935403327"
          className="glass-button px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono tracking-wider text-white hover:text-white shadow-lg cursor-pointer transition-all border border-white/20 hover:border-cyan-400/50"
        >
          <div className="w-5 h-5 rounded-full bg-[#1868B8]/40 flex items-center justify-center">
            <Phone className="w-3 h-3 text-cyan-300" />
          </div>
          <span className="hidden sm:inline font-semibold">+244 935 403 327</span>
        </a>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg bg-[#0F3B63]/80 border border-[#7E92A6]/30 text-white hover:bg-[#1868B8] transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-20 left-0 right-0 bg-[#071B2E]/95 backdrop-blur-xl border-b border-[#7E92A6]/30 p-6 shadow-2xl flex flex-col gap-4 z-[600] animate-in fade-in slide-in-from-top-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.pageIndex)}
              className="text-left font-mono text-sm uppercase tracking-wider text-[#EFF4F8] hover:text-[#1868B8] py-2 border-b border-[#7E92A6]/15 flex justify-between items-center cursor-pointer"
            >
              <span>{item.label}</span>
              <span className="text-xs text-[#7E92A6]">0{item.pageIndex + 1}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

