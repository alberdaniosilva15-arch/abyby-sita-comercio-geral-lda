import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { CustomCursor } from '../components/CustomCursor';
import { SVGFilters } from '../components/SVGFilters';

export interface SidebarLink {
  label: string;
  href: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface SubPageLayoutProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  sidebarLinks?: SidebarLink[];
  children: React.ReactNode;
  backgroundVideo?: string;
}

export const SubPageLayout: React.FC<SubPageLayoutProps> = ({
  title,
  breadcrumbs,
  sidebarLinks = [],
  children,
  backgroundVideo = 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787129516/Logo_rotating_360_degrees_202608190950_smguwj.mp4',
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Temporary stub for Navbar since we aren't editing Navbar yet
  // We'll just pass dummy props to keep it from crashing if it requires them
  const handleNavigate = () => { };

  return (
    <div className="relative w-full min-h-screen bg-[#040E18] text-[#EFF4F8] font-sans antialiased overflow-x-hidden">
      {/* Vídeo 3D em Reprodução Automática no Fundo Todo da Página (Alta Nitidez e Brilho) */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-75 md:opacity-90 mix-blend-screen transition-opacity duration-700"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        {/* Degradê translúcido e subtil para manter o fundo 3D bem visível */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040E18]/65 via-[#040E18]/20 to-[#040E18]/75 z-[1]" />
        <div className="absolute inset-0 bg-[#040E18]/30 z-[1]" />
      </div>

      <SVGFilters />
      <CustomCursor />

      {/* Navbar Fixa */}
      <Navbar currentPage={-1} onNavigate={handleNavigate} />

      <main className="relative z-10 pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">

        {/* Sidebar Navigation (Desktop Sidebar / Mobile Horizontal Selector) */}
        {sidebarLinks.length > 0 && (
          <aside className="w-full md:w-64 flex-shrink-0">
            {/* Desktop View */}
            <div className="hidden md:flex sticky top-32 flex-col gap-2">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-mono text-[#B0C4D8] hover:text-white transition-colors mb-6 cursor-pointer text-readable-light"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>

              <h3 className="font-display font-bold text-lg text-white mb-4 text-readable">Nesta Secção</h3>

              {sidebarLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md ${
                      isActive
                        ? 'bg-[#1868B8]/40 text-white font-semibold border border-[#1868B8]/60 shadow-lg'
                        : 'bg-white/[0.03] text-[#B0C4D8] border border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/25'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Horizontal Quick Navigation Chips */}
            <div className="md:hidden flex flex-col gap-2 mb-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                  Navegar nesta categoria:
                </span>
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-1 text-[11px] font-mono text-[#B0C4D8] hover:text-white"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Voltar
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                {sidebarLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`px-3 py-1.5 rounded-xl font-mono text-[11px] uppercase tracking-wider whitespace-nowrap snap-start transition-all backdrop-blur-md flex-shrink-0 ${
                        isActive
                          ? 'bg-[#1868B8] text-white font-bold border border-cyan-400/50 shadow-md'
                          : 'bg-white/10 text-slate-200 border border-white/15'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-[#B0C4D8] mb-3 sm:mb-5 uppercase tracking-wider overflow-x-auto pb-1 text-readable-light scrollbar-none">
            <Link to="/" className="hover:text-[#1868B8] whitespace-nowrap flex-shrink-0">Início</Link>
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-2.5 h-2.5 flex-shrink-0 text-slate-500" />
                {bc.href ? (
                  <Link to={bc.href} className="hover:text-[#1868B8] whitespace-nowrap flex-shrink-0">{bc.label}</Link>
                ) : (
                  <span className="text-white font-semibold whitespace-nowrap text-readable-light flex-shrink-0">{bc.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl text-white mb-4 sm:mb-6 leading-tight text-readable-heading">
            {title}
          </h1>

          <div className="flex-1">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
