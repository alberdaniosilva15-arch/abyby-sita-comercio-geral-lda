import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown, Anchor, Building2, Truck, Droplet, Cog, Wrench } from 'lucide-react';
import { COMPANY } from '../lib/company';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  currentPage?: number;
  onNavigate?: (pageIndex: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage = -1, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (target: string | number) => {
    if (typeof target === 'number') {
      // It's a Home section scroll index
      if (location.pathname !== '/') {
        navigate('/');
        // We'd ideally wait for render then scroll, but simple approach is to let Home handle it
        setTimeout(() => {
          if (onNavigate) onNavigate(target);
        }, 100);
      } else {
        if (onNavigate) onNavigate(target);
      }
    } else {
      // It's a route
      navigate(target);
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const isNavActive = (_id: string, pathPrefix?: string, pageIndex?: number) => {
    if (pathPrefix && location.pathname.startsWith(pathPrefix)) return true;
    if (location.pathname === '/' && currentPage === pageIndex) return true;
    return false;
  };

  const megamenuSolucoes = [
    { title: 'Rope Access', desc: 'Trabalhos em Altura Offshore', icon: Anchor, href: '/offshore/rope-access' },
    { title: 'Aluguer de Equip.', desc: 'Máquinas e Ferramentas', icon: Cog, href: '/solucoes/aluguer-equipamentos' },
    { title: 'Rent-a-Car', desc: 'Frota Ligeira e Pesada', icon: Truck, href: '/solucoes/rent-a-car' },
    { title: 'Pipes & Industrial', desc: 'Tubagens e Suprimentos', icon: Wrench, href: '/solucoes/venda-pipes' },
    { title: 'Limpeza Industrial', desc: 'Fossa & Comercial', icon: Droplet, href: '/solucoes/limpeza' },
    { title: 'Indústrias', desc: 'Material Hospitalar & Projetos', icon: Building2, href: '/industrias' },
  ];

  const megamenuSobre = [
    { title: 'Perfil da Empresa', desc: 'A nossa história e identidade', href: '/sobre/perfil' },
    { title: 'Missão & Visão', desc: 'Valores que nos guiam', href: '/sobre/missao-visao-valores' },
    { title: 'Setores de Atuação', desc: 'Onde marcamos presença', href: '/sobre/setores-atuacao' },
    { title: 'As Nossas Indústrias', desc: 'Áreas de especialidade', href: '/sobre/industrias' },
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-[500] glass-nav h-20 px-4 md:px-8 flex items-center justify-between">
      {/* Brand Logo */}
      <button
        onClick={() => handleNavClick(0)}
        className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
      >
        <img
          src="/abybysita_logo_icon.png"
          alt="Abybysita Icon"
          className="w-10 h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-md"
        />
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
      <nav className="hidden xl:flex items-center gap-8 h-full">
        <button
          onClick={() => handleNavClick(0)}
          className={`font-mono text-xs uppercase tracking-wider transition-all relative h-full flex items-center ${
            isNavActive('inicio', undefined, 0) ? 'text-white font-semibold' : 'text-[#B0C4D8] hover:text-white'
          }`}
        >
          INÍCIO
          {isNavActive('inicio', undefined, 0) && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1868B8] rounded-t-full shadow-[0_0_8px_#1868B8]" />}
        </button>

          {/* SOBRE NÓS Mega Menu */}
          <div 
            className="relative h-full flex items-center group"
            onMouseEnter={() => setActiveDropdown('sobre')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleNavClick(1)}
              className={`font-mono text-xs uppercase tracking-wider transition-all relative h-full flex items-center gap-1 ${
                isNavActive('sobre', '/sobre', 1) ? 'text-white font-semibold' : 'text-[#B0C4D8] hover:text-white group-hover:text-white'
              }`}
            >
              SOBRE NÓS
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'sobre' ? 'rotate-180' : ''}`} />
              {isNavActive('sobre', '/sobre', 1) && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1868B8] rounded-t-full shadow-[0_0_8px_#1868B8]" />}
            </button>
            
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[420px] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.06)] border border-slate-200/80 transition-all duration-200 origin-top overflow-hidden mt-1 ${activeDropdown === 'sobre' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="p-4 grid grid-cols-1 gap-1.5 bg-white">
                {megamenuSobre.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="group/item flex flex-col py-2.5 px-3.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/80"
                  >
                    <span className="font-display font-bold text-[#071B2E] text-sm group-hover/item:text-[#1868B8] transition-colors">{item.title}</span>
                    <span className="font-sans text-xs text-slate-500 mt-0.5">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mega Menu Dropdown (Soluções e Serviços - Fundo Branco) */}
          <div 
            className="relative h-full flex items-center group"
            onMouseEnter={() => setActiveDropdown('solucoes')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleNavClick('/solucoes')}
              className={`font-mono text-xs uppercase tracking-wider transition-all relative h-full flex items-center gap-1 ${
                isNavActive('solucoes', '/solucoes', 2) || isNavActive('offshore', '/offshore', 2) || isNavActive('industrias', '/industrias', 2) ? 'text-white font-semibold' : 'text-[#B0C4D8] hover:text-white group-hover:text-white'
              }`}
            >
              SOLUÇÕES E SERVIÇOS
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'solucoes' ? 'rotate-180' : ''}`} />
              {(isNavActive('solucoes', '/solucoes', 2) || isNavActive('offshore', '/offshore', 2) || isNavActive('industrias', '/industrias', 2)) && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1868B8] rounded-t-full shadow-[0_0_8px_#1868B8]" />}
            </button>
            
            {/* Mega Menu Panel - Design Branco Limpo de Alto Contraste */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.06)] border border-slate-200/80 transition-all duration-200 origin-top overflow-hidden mt-1 ${activeDropdown === 'solucoes' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="p-5 grid grid-cols-2 gap-3 bg-white">
                {megamenuSolucoes.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="group/item flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200/80"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1868B8]/10 text-[#1868B8] flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#1868B8] group-hover/item:text-white transition-all duration-200 shadow-sm">
                      <item.icon className="w-5 h-5 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-[#071B2E] text-sm group-hover/item:text-[#1868B8] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-slate-500 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  Serviços globais e excelência local
                </span>
                <Link 
                  to="/solucoes" 
                  onClick={() => setActiveDropdown(null)}
                  className="font-mono text-[11px] text-[#1868B8] hover:text-[#0F3B63] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors"
                >
                  Ver Todas as Soluções <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                </Link>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('/recrutamentos')}
            className={`font-mono text-xs uppercase tracking-wider transition-all relative h-full flex items-center ${
              isNavActive('recrutamentos', '/recrutamentos') ? 'text-white font-semibold' : 'text-[#B0C4D8] hover:text-white'
            }`}
          >
            RECRUTAMENTO
            {isNavActive('recrutamentos', '/recrutamentos') && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1868B8] rounded-t-full shadow-[0_0_8px_#1868B8]" />}
          </button>

          <button
            onClick={() => handleNavClick(3)}
            className={`font-mono text-xs uppercase tracking-wider transition-all relative h-full flex items-center ${
              isNavActive('actividades', undefined, 3) ? 'text-white font-semibold' : 'text-[#B0C4D8] hover:text-white'
            }`}
          >
            ACTIVIDADES
            {isNavActive('actividades', undefined, 3) && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-cyan-400 rounded-t-full shadow-[0_0_8px_#38bdf8]" />}
          </button>

          <button
            onClick={() => handleNavClick(4)}
            className={`font-mono text-xs uppercase tracking-wider transition-all relative h-full flex items-center ${
              isNavActive('contactos', undefined, 4) ? 'text-white font-semibold' : 'text-[#B0C4D8] hover:text-white'
            }`}
          >
            CONTACTOS
            {isNavActive('contactos', undefined, 4) && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1868B8] rounded-t-full shadow-[0_0_8px_#1868B8]" />}
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${COMPANY.phones.primary.replace(/\s+/g, '')}`}
            className="apple-glass-pill px-4 py-2 rounded-full flex items-center gap-2.5 text-xs font-mono tracking-wider text-white shadow-lg cursor-pointer"
            title="Ligar para a Abybysita"
          >
            <div className="w-5 h-5 rounded-full bg-[#1868B8]/50 border border-white/25 flex items-center justify-center text-white shadow-inner">
              <Phone className="w-3 h-3 text-white" />
            </div>
            <span className="hidden sm:inline font-semibold text-white tracking-wide">{COMPANY.phones.primary}</span>
          </a>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white backdrop-blur-md transition-colors cursor-pointer active:scale-95 shadow-lg"
          aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>

    {/* Mobile Drawer Menu — OUTSIDE header to avoid glass-nav stacking context */}
    {mobileMenuOpen && (
      <div
        id="mobile-nav-drawer"
        className="xl:hidden fixed inset-0 bg-[#040E18] text-white z-[9999] flex flex-col overflow-hidden"
        style={{ animation: 'fadeIn 0.15s ease-out' }}
      >
        {/* Mobile Drawer Top Header */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-white/10 bg-[#071B2E] flex-shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/abybysita_logo_icon.png"
              alt="Abybysita Icon"
              className="w-10 h-10 object-contain drop-shadow-md"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Abybysita
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#7E92A6] uppercase -mt-1 font-semibold">
                COMÉRCIO GERAL, LDA
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-red-500/80 border border-white/20 text-white transition-colors cursor-pointer flex items-center justify-center shadow-lg active:scale-95"
            aria-label="Fechar menu de navegação"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4">
          {/* Quick Action Top Bar */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={COMPANY.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-600/25 hover:bg-emerald-600/40 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold transition-all active:scale-95 shadow-lg"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              WhatsApp
            </a>
            <a
              href={`tel:${COMPANY.phones.primary.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#1868B8]/30 hover:bg-[#1868B8]/50 border border-[#1868B8]/60 text-cyan-300 font-mono text-xs font-bold transition-all active:scale-95 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Ligar Agora
            </a>
          </div>

          {/* Main Navigation Links */}
          <div className="flex flex-col gap-2 flex-1 mt-2">
            {/* Início */}
            <button
              onClick={() => handleNavClick(0)}
              className="text-left font-mono text-sm font-bold uppercase tracking-wider text-white hover:text-cyan-300 p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center justify-between cursor-pointer active:scale-98"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                INÍCIO
              </span>
              <span className="text-xs text-slate-500 font-mono">01</span>
            </button>

            {/* Soluções e Serviços - Acórdion */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'solucoes-mobile' ? null : 'solucoes-mobile')}
                className="w-full text-left font-mono text-sm font-bold uppercase tracking-wider text-white hover:text-cyan-300 p-4 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#1868B8]" />
                  SOLUÇÕES & SERVIÇOS
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-cyan-400 transition-transform duration-200 ${
                    activeDropdown === 'solucoes-mobile' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'solucoes-mobile' && (
                <div className="p-3 pt-0 grid grid-cols-1 gap-2 border-t border-white/10 mt-1">
                  {megamenuSolucoes.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.05] hover:bg-[#1868B8]/30 border border-white/10 active:scale-98 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#1868B8]/30 text-cyan-300 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-bold text-white text-xs leading-tight">{item.title}</div>
                        <div className="font-sans text-[11px] text-slate-300 truncate mt-0.5">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/solucoes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 font-mono text-[11px] text-cyan-300 font-bold uppercase tracking-wider hover:underline block"
                  >
                    Ver Catálogo Completo de Soluções →
                  </Link>
                </div>
              )}
            </div>

            {/* Sobre Nós - Acórdion */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'sobre-mobile' ? null : 'sobre-mobile')}
                className="w-full text-left font-mono text-sm font-bold uppercase tracking-wider text-white hover:text-cyan-300 p-4 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  SOBRE NÓS
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-cyan-400 transition-transform duration-200 ${
                    activeDropdown === 'sobre-mobile' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'sobre-mobile' && (
                <div className="p-3 pt-0 grid grid-cols-1 gap-2 border-t border-white/10 mt-1">
                  {megamenuSobre.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex flex-col p-3 rounded-xl bg-white/[0.05] hover:bg-[#1868B8]/30 border border-white/10 active:scale-98 transition-all"
                    >
                      <span className="font-display font-bold text-white text-xs">{item.title}</span>
                      <span className="font-sans text-[11px] text-slate-300 mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recrutamento (com badge de destaque) */}
            <button
              onClick={() => handleNavClick('/recrutamentos')}
              className="text-left font-mono text-sm font-bold uppercase tracking-wider text-white hover:text-cyan-300 p-4 rounded-2xl bg-[#1868B8]/20 border border-[#1868B8]/50 transition-all flex items-center justify-between cursor-pointer active:scale-98"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                RECRUTAMENTO & CARREIRAS
              </span>
              <span className="font-mono text-[9px] text-emerald-300 bg-emerald-950/90 px-2.5 py-1 rounded-full border border-emerald-500/50 font-bold">
                Vagas Abertas
              </span>
            </button>

            {/* Actividades */}
            <button
              onClick={() => handleNavClick(3)}
              className="text-left font-mono text-sm font-bold uppercase tracking-wider text-white hover:text-cyan-300 p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center justify-between cursor-pointer active:scale-98"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                ACTIVIDADES EM VÍDEO
              </span>
              <span className="text-xs text-slate-500 font-mono">03</span>
            </button>

            {/* Contactos */}
            <button
              onClick={() => handleNavClick(4)}
              className="text-left font-mono text-sm font-bold uppercase tracking-wider text-white hover:text-cyan-300 p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center justify-between cursor-pointer active:scale-98"
            >
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                CONTACTOS & PROPOSTAS
              </span>
              <span className="text-xs text-slate-500 font-mono">04</span>
            </button>
          </div>

          {/* Bottom Footer Info */}
          <div className="pt-4 mt-2 border-t border-white/10 text-center font-mono text-[10px] text-slate-400">
            <p>Abyby Sita Comércio Geral, LDA — Talatona, Luanda</p>
            <p className="text-slate-500 mt-0.5 font-sans">{COMPANY.phones.primary}</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
};
