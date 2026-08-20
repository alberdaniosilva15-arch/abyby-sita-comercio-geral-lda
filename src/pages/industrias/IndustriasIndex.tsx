import { SubPageLayout } from '../../layouts/SubPageLayout';
import { Page05bNewSection } from '../../components/pages/Page05bNewSection';
import { Link } from 'react-router-dom';
import { Flame, Hammer, Pickaxe, Truck, Building2, ArrowRight } from 'lucide-react';

export function IndustriasIndex() {
  const sidebarLinks = [
    { href: '/industrias/oil-gas', label: 'Oil & Gas' },
    { href: '/industrias/construcao', label: 'Construção Civil' },
    { href: '/industrias/mineracao', label: 'Mineração' },
    { href: '/industrias/logistica', label: 'Logística & Portos' },
    { href: '/industrias/governo-instituicoes', label: 'Governo e Instituições' }
  ];

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Indústrias' }
  ];

  const industries = [
    {
      title: 'Oil & Gas',
      desc: 'Soluções offshore e onshore de inspeção por corda, montagem, fornecimento de tubagens e limpeza de tanques.',
      href: '/industrias/oil-gas',
      icon: Flame
    },
    {
      title: 'Construção Civil',
      desc: 'Aluguer de gruas, camiões articulados e fornecimento de tubos estruturais para obras de infraestruturas.',
      href: '/industrias/construcao',
      icon: Hammer
    },
    {
      title: 'Mineração',
      desc: 'Equipamentos pesados, frotas 4x4 todo-o-terreno e apoio técnico e logístico para explorações minerais remotas.',
      href: '/industrias/mineracao',
      icon: Pickaxe
    },
    {
      title: 'Logística & Transportes',
      desc: 'Movimentação de contentores, transporte rodoviário pesado e soluções marítimas integradas.',
      href: '/industrias/logistica',
      icon: Truck
    },
    {
      title: 'Governo & Setor Público',
      desc: 'Fornecimento de frotas institucionais, material hospitalar e saneamento para ministérios e governos provinciais.',
      href: '/industrias/governo-instituicoes',
      icon: Building2
    }
  ];

  return (
    <SubPageLayout
      title="Indústrias & Setores de Atuação"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-10">
        {/* Grid de Setores */}
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-4">Setores Estratégicos que Atendemos</h3>
          <p className="text-sm text-[#7E92A6] mb-6">
            A Abyby Sita atua transversalmente nos principais pilares da economia angolana com soluções sob medida:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={idx}
                  to={ind.href}
                  className="group bg-white/5 hover:bg-[#1868B8]/15 border border-[#7E92A6]/20 hover:border-cyan-400/40 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#1868B8]/20 flex items-center justify-center text-cyan-300 mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                      {ind.title}
                    </h4>
                    <p className="text-xs text-[#7E92A6] group-hover:text-[#EFF4F8]/80 transition-colors leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                    <span>Ver setor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Secção Destaque: Material Hospitalar */}
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-4">Divisão de Material Hospitalar & Saúde</h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
            <Page05bNewSection />
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
