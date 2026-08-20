import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { Link } from 'react-router-dom';
import { Droplets, Building2, Truck, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function LimpezaIndex() {
  const sidebarLinks = [
    { href: '/solucoes/limpeza/comercial', label: 'Limpeza Comercial' },
    { href: '/solucoes/limpeza/fossa', label: 'Limpeza de Fossa' },
    { href: '/solucoes/limpeza/industrial', label: 'Limpeza Industrial' }
  ];

  const breadcrumbs = [
    { label: 'Nossas Soluções', href: '/#servicos' },
    { label: 'Limpeza' }
  ];

  const services = [
    {
      title: 'Limpeza Comercial & Escritórios',
      desc: 'Serviços de higienização regular e profunda para instalações corporativas, escritórios e edifícios comerciais.',
      href: '/solucoes/limpeza/comercial',
      icon: Building2,
      badge: 'Corporativo & Comercial'
    },
    {
      title: 'Limpeza e Desentupimento de Fossas',
      desc: 'Camiões cisterna auto-vácuo de alta potência para esvaziamento, transporte e descarte ecológico certificado.',
      href: '/solucoes/limpeza/fossa',
      icon: Truck,
      badge: 'Saneamento & Auto-Vácuo'
    },
    {
      title: 'Limpeza Técnica & Industrial',
      desc: 'Descontaminação de tanques, tubagens, separadores água-óleo e zonas de produção industrial pesada.',
      href: '/solucoes/limpeza/industrial',
      icon: Droplets,
      badge: 'Industrial & Degasagem'
    }
  ];

  return (
    <SubPageLayout
      title="Serviços de Limpeza & Saneamento"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8">
        {/* Banner Hero com Liquid Glass Translúcido */}
        <div className="relative rounded-3xl overflow-hidden liquid-glass-clear p-8 md:p-12 text-white">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1868B8]/25 border border-[#1868B8]/50 rounded-full text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#1868B8] shadow-[0_0_8px_#1868B8]" />
              Higiene, Saneamento & Meio Ambiente
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight text-white leading-tight text-readable-heading">
              Excelência e Conformidade Ambiental em Cada Operação
            </h2>
            <p className="text-slate-100/90 text-sm md:text-base leading-relaxed mb-6 font-sans text-readable-light">
              A Abyby Sita dispõe de equipas certificadas e equipamentos industriais de sucção e hidro-jateamento para garantir a desinfeção e operacionalidade contínua das suas instalações.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-100">
              <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 shadow-sm backdrop-blur-sm text-readable-light">
                <ShieldCheck className="w-4 h-4 text-white" /> Licenciamento Ambiental Certificado
              </span>
              <span className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 shadow-sm backdrop-blur-sm text-readable-light">
                <Sparkles className="w-4 h-4 text-white" /> Equipamentos de Alta Pressão
              </span>
            </div>
          </div>
        </div>

        {/* Serviços Grid */}
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-6 text-readable">
            Selecione o Serviço de Limpeza
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={idx}
                  to={srv.href}
                  className="group liquid-glass-clear-card rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1868B8]/35 border border-white/25 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-inner">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-white/10 border border-white/15 text-slate-100 rounded-md text-readable-light">
                        {srv.badge}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#1868B8] transition-colors mb-2 text-readable">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-slate-200/90 group-hover:text-white transition-colors leading-relaxed text-readable-light">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-[#1868B8] group-hover:translate-x-1 transition-all text-readable">
                    <span>Saber mais</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Garantias */}
        <div className="liquid-glass-clear rounded-2xl p-6 border border-white/15">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono text-readable">
            Diferenciais Operacionais
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-100">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
              <span className="text-readable-light">Resposta rápida para emergências em Luanda e arredores.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
              <span className="text-readable-light">Camiões cisterna próprios com capacidade até 15.000 litros.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
              <span className="text-readable-light">Tratamento e descarte em aterros e ETARs autorizadas.</span>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
