import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { BookOpen, ShieldCheck, HardHat, Building2 } from 'lucide-react';

export function ArtigosSetoresPage() {
  const sidebarLinks = [
    { href: '/blog/noticias', label: 'Notícias' },
    { href: '/blog/artigos-setores', label: 'Artigos dos Setores' },
    { href: '/blog/dicas-informacoes', label: 'Dicas e Informações' }
  ];
  
  const breadcrumbs = [
    { label: 'Blog' },
    { label: 'Artigos dos Setores' }
  ];

  return (
    <SubPageLayout
      title="Artigos dos Setores"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Artigos técnicos e análises dos setores industriais em Angola"
        subtitle="Análises, Tendências e Estudos de Mercado Técnico"
        description="Explore artigos especializados sobre a evolução das indústrias Oil & Gas, mineração, construção civil e logística em Angola, focando em inovação, eficiência e normas técnicas."
        features={[
          {
            icon: <BookOpen className="w-5 h-5 text-[#1868B8]" />,
            title: "Tecnologia em Acesso por Corda Offshore",
            description: "Como a certificação IRATA está a transformar a segurança nas plataformas marítimas e estruturas elevadas."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Normas de Qualidade em Tubagens de Aço",
            description: "Critérios cruciais na escolha entre aço carbono e aço inoxidável para ambientes industriais e altamente corrosivos."
          },
          {
            icon: <HardHat className="w-5 h-5 text-[#1868B8]" />,
            title: "Segurança na Operação de Gruas Pesadas",
            description: "Melhores práticas operacionais, planeamento de rig e manutenção preventiva para içamentos industriais críticos."
          },
          {
            icon: <Building2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Desafios Logísticos em Grandes Obras",
            description: "Artigos dedicados às exigências de fornecimento contínuo e gestão de frota comercial em Angola."
          }
        ]}
      />
    </SubPageLayout>
  );
}

