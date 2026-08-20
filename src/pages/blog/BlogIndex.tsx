import { SubPageLayout } from '../../layouts/SubPageLayout';
import { Link } from 'react-router-dom';
import { Newspaper, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';

export function BlogIndex() {
  const sidebarLinks = [
    { href: '/blog/noticias', label: 'Notícias da Empresa' },
    { href: '/blog/artigos-setores', label: 'Artigos do Setor' },
    { href: '/blog/dicas-informacoes', label: 'Dicas & Informações' }
  ];

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Blog & Notícias' }
  ];

  const sections = [
    {
      title: 'Notícias da Empresa',
      desc: 'Atualizações sobre contratos, novas aquisições de frotas e marcos operacionais da Abyby Sita.',
      href: '/blog/noticias',
      icon: Newspaper
    },
    {
      title: 'Artigos do Setor',
      desc: 'Tendências e análises sobre o mercado de petróleo, gás, energias renováveis e infraestruturas em Angola.',
      href: '/blog/artigos-setores',
      icon: BookOpen
    },
    {
      title: 'Dicas & Boas Práticas',
      desc: 'Guias técnicos sobre segurança em altura, manutenção preventiva de frotas e conformidade ambiental.',
      href: '/blog/dicas-informacoes',
      icon: Lightbulb
    }
  ];

  return (
    <SubPageLayout
      title="Notícias, Artigos & Insights"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F3B63] to-[#071B2E] border border-[#7E92A6]/20 p-8 md:p-12 text-white">
          <h2 className="text-3xl font-display font-bold mb-3 tracking-tight">
            Conhecimento e Atualidade do Setor Industrial
          </h2>
          <p className="text-[#EFF4F8]/80 text-sm leading-relaxed max-w-2xl">
            Acompanhe as novidades da Abyby Sita e artigos técnicos preparados por especialistas da área.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <span>Ler artigos</span>
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
