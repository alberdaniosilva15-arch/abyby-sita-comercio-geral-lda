import { SubPageLayout } from '../../layouts/SubPageLayout';
import { Link } from 'react-router-dom';
import { Building2, Target, Briefcase, Factory, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export function SobreIndex() {
  const sidebarLinks = [
    { href: '/sobre/perfil', label: 'Perfil da Empresa' },
    { href: '/sobre/missao-visao-valores', label: 'Missão, Visão e Valores' },
    { href: '/sobre/setores-atuacao', label: 'Setores de Atuação' },
    { href: '/sobre/industrias', label: 'As Nossas Indústrias' }
  ];

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Sobre Nós' }
  ];

  const aboutCards = [
    {
      title: 'Perfil da Empresa',
      desc: 'Conheça a história, estrutura e consolidação da Abyby Sita como parceira de referência em Angola.',
      href: '/sobre/perfil',
      icon: Building2
    },
    {
      title: 'Missão, Visão e Valores',
      desc: 'Os princípios de integridade, excelência técnica, segurança e compromisso que norteiam cada ação.',
      href: '/sobre/missao-visao-valores',
      icon: Target
    },
    {
      title: 'Setores de Atuação',
      desc: 'A nossa presença ativa em Oil & Gas, construção, logística, saúde e suporte governamental.',
      href: '/sobre/setores-atuacao',
      icon: Briefcase
    },
    {
      title: 'As Nossas Indústrias',
      desc: 'Divisões especializadas e capacidade técnica instalada para responder aos maiores desafios do mercado.',
      href: '/sobre/industrias',
      icon: Factory
    }
  ];

  return (
    <SubPageLayout
      title="Sobre a Abyby Sita"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8">
        {/* Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F3B63] to-[#071B2E] border border-[#7E92A6]/20 p-8 md:p-12 text-white">
          <div className="max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 bg-[#1868B8]/30 border border-[#1868B8]/50 rounded-full text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest mb-4">
              A Nossa Identidade
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Excelência Operacional e Compromisso com Angola
            </h2>
            <p className="text-[#EFF4F8]/80 text-sm md:text-base leading-relaxed mb-6">
              Sediada em Luanda, a Abyby Sita Comércio Geral, LDA é uma empresa de direito angolano especializada na prestação de serviços integrados de apoio à indústria petrolífera, logística e saneamento.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-cyan-200">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-cyan-400" /> Capital 100% Angolano</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-cyan-400" /> Conformidade e Certificação</span>
            </div>
          </div>
        </div>

        {/* Grid de Seções */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {aboutCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.href}
                className="group bg-white/5 hover:bg-[#1868B8]/15 border border-[#7E92A6]/20 hover:border-cyan-400/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1868B8]/20 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {card.title}
                  </h4>
                  <p className="text-xs text-[#7E92A6] group-hover:text-[#EFF4F8]/80 transition-colors leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                  <span>Conhecer mais</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </SubPageLayout>
  );
}
