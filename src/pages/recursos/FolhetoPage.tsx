import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { FileText, Download, BookOpen, Layers } from 'lucide-react';

export function FolhetoPage() {
  const sidebarLinks = [
    { href: '/recursos/folheto', label: 'Folheto da Empresa' },
    { href: '/recursos/certificacoes', label: 'Certificações' },
    { href: '/recursos/normas-seguranca', label: 'Normas de Segurança' },
    { href: '/recursos/faq', label: 'FAQ' }
  ];
  
  const breadcrumbs = [
    { label: 'Recursos' },
    { label: 'Folheto da Empresa' }
  ];

  return (
    <SubPageLayout
      title="Brochura e Folheto Institucional"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1542744094-3a3172720189?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Brochura corporativa e apresentação institucional"
        subtitle="Apresentação Geral dos Serviços da Abybysita LDA"
        description="Aceda ao nosso folheto institucional completo em formato digital. Conheça a nossa história, a capacidade da nossa frota, as especificações técnicas dos nossos produtos e a nossa cobertura geográfica em Angola."
        features={[
          {
            icon: <BookOpen className="w-5 h-5 text-[#1868B8]" />,
            title: "Visão Geral do Portfólio",
            description: "Resumo completo das divisões de Rope Access, Aluguer de Equipamentos, Pipes e Distribuição Alimentar."
          },
          {
            icon: <FileText className="w-5 h-5 text-[#1868B8]" />,
            title: "Especificações Técnicas",
            description: "Catálogo detalhado com fichas técnicas de equipamentos e dimensões de tubagens disponíveis."
          },
          {
            icon: <Layers className="w-5 h-5 text-[#1868B8]" />,
            title: "Projetos de Referência",
            description: "Casos de sucesso e portfólio de intervenções realizadas para grandes operadoras de Oil & Gas."
          },
          {
            icon: <Download className="w-5 h-5 text-[#1868B8]" />,
            title: "Download Direto em PDF",
            description: "Versão otimizada para descarregar e partilhar facilmente com a sua equipa técnica ou de compras."
          }
        ]}
      />
    </SubPageLayout>
  );
}
