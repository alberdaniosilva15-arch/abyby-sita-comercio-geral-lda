import { SubPageLayout } from '../../layouts/SubPageLayout';
import { Link } from 'react-router-dom';
import { Briefcase, Send, ArrowRight } from 'lucide-react';

export function CarreirasIndex() {
  const sidebarLinks = [
    { href: '/recrutamentos', label: 'Vagas em Aberto' },
    { href: '/carreiras/candidatura', label: 'Candidatura Espontânea' }
  ];

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Carreiras' }
  ];

  return (
    <SubPageLayout
      title="Carreiras & Oportunidades na Abyby Sita"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8">
        {/* Banner Hero com Liquid Glass Translúcido */}
        <div className="relative rounded-3xl overflow-hidden liquid-glass-clear p-8 md:p-12 text-white">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1868B8]/25 border border-[#1868B8]/50 rounded-full text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#1868B8] shadow-[0_0_8px_#1868B8]" />
              Trabalhe Connosco
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 tracking-tight text-white leading-tight text-readable-heading">
              Construa o seu Futuro na Indústria de Oil & Gas e Logística
            </h2>
            <p className="text-slate-100/90 text-sm md:text-base leading-relaxed max-w-2xl font-sans text-readable-light">
              Procuramos profissionais qualificados, técnicos de corda (Rope Access), operadores de máquinas pesadas e motoristas profissionais para integrar projetos estratégicos em Angola.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            to="/recrutamentos"
            className="group liquid-glass-clear-card rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1868B8]/35 border border-white/25 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-inner">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-[#1868B8] transition-colors mb-2 text-readable">
                Vagas Publicadas
              </h4>
              <p className="text-xs text-slate-200/90 group-hover:text-white transition-colors leading-relaxed text-readable-light">
                Consulte as oportunidades ativas para posições offshore e onshore e envie o seu CV.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-[#1868B8] group-hover:translate-x-1 transition-all text-readable">
              <span>Ver vagas abertas</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to="/carreiras/candidatura"
            className="group liquid-glass-clear-card rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1868B8]/35 border border-white/25 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-inner">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-[#1868B8] transition-colors mb-2 text-readable">
                Candidatura Espontânea
              </h4>
              <p className="text-xs text-slate-200/90 group-hover:text-white transition-colors leading-relaxed text-readable-light">
                Deixe os seus dados na nossa base de talentos para futuros processos seletivos.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-[#1868B8] group-hover:translate-x-1 transition-all text-readable">
              <span>Enviar candidatura</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </SubPageLayout>
  );
}
