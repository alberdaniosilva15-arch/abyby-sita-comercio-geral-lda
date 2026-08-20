import { SubPageLayout } from '../../layouts/SubPageLayout';
import { Link } from 'react-router-dom';
import { CheckCircle2, FileText, Image as ImageIcon, MessageSquareQuote, ArrowRight } from 'lucide-react';

export function ProjetosIndex() {
  const sidebarLinks = [
    { href: '/projetos/realizados', label: 'Projetos Realizados' },
    { href: '/projetos/estudos-de-caso', label: 'Estudos de Caso' },
    { href: '/projetos/galeria', label: 'Galeria de Fotos' },
    { href: '/projetos/testemunhos', label: 'Testemunhos de Clientes' }
  ];

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Projetos' }
  ];

  const sections = [
    {
      title: 'Projetos Realizados',
      desc: 'Portfólio de empreitadas e serviços concluídos com sucesso em setores de alta exigência.',
      href: '/projetos/realizados',
      icon: CheckCircle2
    },
    {
      title: 'Estudos de Caso',
      desc: 'Análise aprofundada de desafios técnicos superados pelas nossas equipas multidisciplinares.',
      href: '/projetos/estudos-de-caso',
      icon: FileText
    },
    {
      title: 'Galeria de Fotos',
      desc: 'Registo visual das nossas operações offshore, frotas de transporte e intervenções industriais.',
      href: '/projetos/galeria',
      icon: ImageIcon
    },
    {
      title: 'Testemunhos',
      desc: 'A palavra dos nossos parceiros e clientes sobre o nível de serviço e compromisso da Abyby Sita.',
      href: '/projetos/testemunhos',
      icon: MessageSquareQuote
    }
  ];

  return (
    <SubPageLayout
      title="Projetos & Portfólio Operacional"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F3B63] to-[#071B2E] border border-[#7E92A6]/20 p-8 md:p-12 text-white">
          <h2 className="text-3xl font-display font-bold mb-3 tracking-tight">
            Histórico Comprovado de Entregas em Angola
          </h2>
          <p className="text-[#EFF4F8]/80 text-sm leading-relaxed max-w-2xl">
            Conheça as obras, campanhas offshore e intervenções técnicas que consolidam a nossa reputação de confiança no mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link
                key={idx}
                to={sec.href}
                className="group bg-white/5 hover:bg-[#1868B8]/15 border border-[#7E92A6]/20 hover:border-cyan-400/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1868B8]/20 flex items-center justify-center text-cyan-300 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-[#7E92A6] group-hover:text-[#EFF4F8]/80 transition-colors leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                  <span>Ver projetos</span>
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
