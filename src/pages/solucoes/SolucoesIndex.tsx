import { SubPageLayout } from '../../layouts/SubPageLayout';
import { Link } from 'react-router-dom';
import { Anchor, Cog, Truck, Wrench, Droplet, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function SolucoesIndex() {
  const sidebarLinks = [
    { href: '/offshore/rope-access', label: 'Rope Access (Offshore)' },
    { href: '/solucoes/aluguer-equipamentos', label: 'Aluguer de Equipamentos' },
    { href: '/solucoes/rent-a-car', label: 'Rent-a-Car' },
    { href: '/solucoes/venda-pipes', label: 'Vendas de Pipes' },
    { href: '/solucoes/limpeza', label: 'Limpeza Industrial' }
  ];

  const breadcrumbs = [
    { label: 'Soluções & Serviços' }
  ];

  const solutions = [
    {
      title: 'Rope Access Offshore',
      desc: 'Inspeções não destrutivas (NDT), pintura industrial, montagem e manutenção em altura para plataformas petrolíferas, FPSOs e estaleiros navais.',
      href: '/offshore/rope-access',
      icon: Anchor,
      tag: 'Offshore & Onshore'
    },
    {
      title: 'Aluguer de Equipamentos Pesados',
      desc: 'Gruas móveis e telescópicas (25T a 250T), camiões trailer, porta-contentores e empilhadores com operadores e riggers certificados.',
      href: '/solucoes/aluguer-equipamentos',
      icon: Cog,
      tag: 'Maquinaria Pesada'
    },
    {
      title: 'Rent-a-Car & Gestão de Frotas',
      desc: 'Pick-ups 4x4, SUVs, carrinhas comerciais e transporte executivo com planos flexíveis para suporte a operações em campo.',
      href: '/solucoes/rent-a-car',
      icon: Truck,
      tag: 'Mobilidade'
    },
    {
      title: 'Vendas de Pipes & Tubagens',
      desc: 'Tubagens em aço carbono (ASTM A106 Gr. B), aço inoxidável (304/316L), válvulas e conexões com certificados de conformidade 3.1.',
      href: '/solucoes/venda-pipes',
      icon: Wrench,
      tag: 'Suprimentos'
    },
    {
      title: 'Limpeza Industrial & Saneamento',
      desc: 'Descontaminação de tanques, limpeza de fossas com camiões auto-vácuo, desentupimentos e saneamento técnico para instalações comerciais e industriais.',
      href: '/solucoes/limpeza',
      icon: Droplet,
      tag: 'Saneamento'
    }
  ];

  return (
    <SubPageLayout
      title="Nossas Soluções & Serviços Integrados"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8">
        {/* Banner com Efeito Liquid Glass Claro e Translúcido */}
        <div className="relative rounded-3xl overflow-hidden liquid-glass-clear p-8 md:p-12 text-white">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1868B8]/25 border border-[#1868B8]/50 rounded-full text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#1868B8] shadow-[0_0_8px_#1868B8]" />
              Divisões Técnicas & Operacionais
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight text-white leading-tight text-readable-heading">
              Engenharia, Logística e Apoio Industrial
            </h2>
            <p className="text-slate-100/90 text-sm md:text-base leading-relaxed mb-6 font-sans text-readable-light">
              Prestação de serviços especializados para os sectores petrolífero, marítimo e de infraestruturas em Angola, com equipas técnicas certificadas IRATA, frota pesada e gestão logística integrada.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-100">
              <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 shadow-sm backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-white" /> Certificação IRATA & HSE
              </span>
              <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 shadow-sm backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-white" /> Conformidade ISO
              </span>
            </div>
          </div>
        </div>

        {/* Grid de Soluções com Liquid Glass Translúcido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {solutions.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <Link
                key={idx}
                to={sol.href}
                className="group liquid-glass-clear-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1868B8]/35 border border-white/25 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-inner">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-white/10 border border-white/15 text-slate-100 rounded-md text-readable-light">
                      {sol.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-[#1868B8] transition-colors mb-2 text-readable">
                    {sol.title}
                  </h4>
                  <p className="text-xs text-slate-200/90 group-hover:text-white transition-colors leading-relaxed text-readable-light">
                    {sol.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-[#1868B8] group-hover:translate-x-1 transition-all text-readable">
                  <span>Aceder à divisão</span>
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
