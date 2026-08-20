import { SubPageLayout } from '../../layouts/SubPageLayout';
import { Link } from 'react-router-dom';
import { Award, ShieldAlert, FileDown, HelpCircle, ArrowRight } from 'lucide-react';

export function RecursosIndex() {
  const sidebarLinks = [
    { href: '/recursos/certificacoes', label: 'Certificações' },
    { href: '/recursos/normas-seguranca', label: 'Normas de Segurança' },
    { href: '/recursos/folheto', label: 'Folheto Institucional' },
    { href: '/recursos/faq', label: 'Perguntas Frequentes (FAQ)' }
  ];

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Recursos' }
  ];

  const sections = [
    {
      title: 'Certificações & Homologações',
      desc: 'Padrões de qualidade, acreditação IRATA e licenças operacionais em conformidade internacional.',
      href: '/recursos/certificacoes',
      icon: Award
    },
    {
      title: 'Normas de Segurança & QHSE',
      desc: 'Política de tolerância zero a acidentes e diretrizes de proteção e saúde ocupacional.',
      href: '/recursos/normas-seguranca',
      icon: ShieldAlert
    },
    {
      title: 'Folheto Institucional',
      desc: 'Descarregue o catálogo corporativo com todas as divisões e especificações técnicas.',
      href: '/recursos/folheto',
      icon: FileDown
    },
    {
      title: 'Perguntas Frequentes (FAQ)',
      desc: 'Respostas rápidas às dúvidas mais comuns sobre contratações, frotas e prazos operacionais.',
      href: '/recursos/faq',
      icon: HelpCircle
    }
  ];

  return (
    <SubPageLayout
      title="Recursos & Documentação Institucional"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F3B63] to-[#071B2E] border border-[#7E92A6]/20 p-8 md:p-12 text-white">
          <h2 className="text-3xl font-display font-bold mb-3 tracking-tight">
            Transparência, QHSE & Conformidade Técnica
          </h2>
          <p className="text-[#EFF4F8]/80 text-sm leading-relaxed max-w-2xl">
            Aceda aos documentos oficiais, certificações ambientais e políticas de segurança da Abyby Sita.
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
                  <span>Consultar recurso</span>
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
