import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Building2, ShieldCheck, FileCheck2, HeartHandshake } from 'lucide-react';

export function GovernoInstituicoesPage() {
  const sidebarLinks = [
    { href: '/industrias/oil-gas', label: 'Oil & Gas' },
    { href: '/industrias/construcao', label: 'Construção' },
    { href: '/industrias/mineracao', label: 'Mineração' },
    { href: '/industrias/logistica', label: 'Logística' },
    { href: '/industrias/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Indústrias' },
    { label: 'Governo e Instituições' }
  ];

  return (
    <SubPageLayout
      title="Parcerias para o Sector Público e Governamental"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Edifício governamental moderno e projetos de utilidade pública"
        subtitle="Soluções Industriais e Infraestruturais para Projetos de Estado"
        description="Apoio a projetos públicos de desenvolvimento nacional em Angola, desde a construção de infraestruturas até à manutenção de edifícios institucionais, fornecimento de materiais e soluções de higiene e transporte."
        features={[
          {
            icon: <Building2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Desenvolvimento de Infraestruturas",
            description: "Fornecimento de tubagens e equipamentos pesados para obras públicas essenciais."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Padrões Rigorosos de Qualidade",
            description: "Garantia de conformidade técnica em todos os fornecimentos e serviços contratados."
          },
          {
            icon: <FileCheck2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Contratação Pública Transparente",
            description: "Acompanhamento integral das exigências legais de cadernos de encargos governamentais."
          },
          {
            icon: <HeartHandshake className="w-5 h-5 text-[#1868B8]" />,
            title: "Parceria Estratégica Continua",
            description: "Compromisso com o progresso socioeconómico e desenvolvimento sustentável de Angola."
          }
        ]}
      />
    </SubPageLayout>
  );
}
