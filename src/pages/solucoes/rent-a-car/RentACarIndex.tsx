import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, ArrowRight, Truck, Fuel, Users, Building, Shield } from 'lucide-react';

export function RentACarIndex() {
  const sidebarLinks = [
    { href: '/solucoes/rent-a-car/suv', label: 'SUV' },
    { href: '/solucoes/rent-a-car/automoveis-ligeiros', label: 'Automóveis Ligeiros' },
    { href: '/solucoes/rent-a-car/vans-carrinhas', label: 'Vans / Carrinhas' },
    { href: '/solucoes/rent-a-car/comerciais', label: 'Comerciais' },
    { href: '/solucoes/rent-a-car/governo-instituicoes', label: 'Governo e Instituições' }
  ];

  const breadcrumbs = [
    { label: 'Nossas Soluções', href: '/#servicos' },
    { label: 'Rent-a-Car' }
  ];

  const categories = [
    {
      title: 'SUV & Todo-o-Terreno',
      desc: 'Veículos 4x4 robustos e confortáveis para operações exigentes no interior e deslocações executivas.',
      href: '/solucoes/rent-a-car/suv',
      icon: Shield,
      badge: '4x4 & Luxo'
    },
    {
      title: 'Automóveis Ligeiros',
      desc: 'Carros compactos e berlinas para transporte diário urbano, com baixo consumo e máxima agilidade.',
      href: '/solucoes/rent-a-car/automoveis-ligeiros',
      icon: Car,
      badge: 'Urbano & Económico'
    },
    {
      title: 'Vans / Carrinhas',
      desc: 'Carrinhas de passageiros para transporte de equipas e pessoal técnico com capacidade e conforto.',
      href: '/solucoes/rent-a-car/vans-carrinhas',
      icon: Users,
      badge: 'Transporte de Pessoal'
    },
    {
      title: 'Comerciais & Pick-ups',
      desc: 'Viaturas de carga e cabine dupla preparadas para suporte logístico e transporte de mercadorias.',
      href: '/solucoes/rent-a-car/comerciais',
      icon: Truck,
      badge: 'Carga & Operações'
    },
    {
      title: 'Governo & Instituições',
      desc: 'Contratos corporativos e frotas dedicadas para entidades estatais, embaixadas e ONGs.',
      href: '/solucoes/rent-a-car/governo-instituicoes',
      icon: Building,
      badge: 'Frotas Corporativas'
    }
  ];

  return (
    <SubPageLayout
      title="Rent-a-Car Corporativo & Frotas"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8">
        {/* Banner Hero com Liquid Glass Translúcido */}
        <div className="relative rounded-3xl overflow-hidden liquid-glass-clear p-8 md:p-12 text-white">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1868B8]/25 border border-[#1868B8]/50 rounded-full text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#1868B8] shadow-[0_0_8px_#1868B8]" />
              Frota Corporativa Abyby Sita
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight text-white leading-tight text-readable-heading">
              Mobilidade Segura e Confiável em Todo o Território Angolano
            </h2>
            <p className="text-slate-100/90 text-sm md:text-base leading-relaxed mb-6 font-sans text-readable-light">
              Disponibilizamos uma frota diversificada com manutenção preventiva rigorosa, assistência 24/7 e opções de aluguer de curta, média e longa duração com ou sem motorista profissional.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-100">
              <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 shadow-sm backdrop-blur-sm text-readable-light">
                <ShieldCheck className="w-4 h-4 text-white" /> Seguro Contra Todos os Riscos
              </span>
              <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 shadow-sm backdrop-blur-sm text-readable-light">
                <Fuel className="w-4 h-4 text-white" /> Frotas Modernas e Eficientes
              </span>
            </div>
          </div>
        </div>

        {/* Categorias Grid */}
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-6 text-readable">
            Explore a Nossa Frota por Categoria
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  to={cat.href}
                  className="group liquid-glass-clear-card rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1868B8]/35 border border-white/25 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-inner">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-white/10 border border-white/15 text-slate-100 rounded-md text-readable-light">
                        {cat.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#1868B8] transition-colors mb-2 text-readable">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-slate-200/90 group-hover:text-white transition-colors leading-relaxed text-readable-light">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-[#1868B8] group-hover:translate-x-1 transition-all text-readable">
                    <span>Ver detalhes da frota</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
