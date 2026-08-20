import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { FileText, TrendingUp, ShieldCheck, Clock } from 'lucide-react';

export function EstudosDeCasoPage() {
  const sidebarLinks = [
    { href: '/projetos/realizados', label: 'Projetos Realizados' },
    { href: '/projetos/galeria', label: 'Galeria de Imagens' },
    { href: '/projetos/testemunhos', label: 'Testemunhos' },
    { href: '/projetos/estudos-de-caso', label: 'Estudos de Caso' }
  ];
  
  const breadcrumbs = [
    { label: 'Projetos' },
    { label: 'Estudos de Caso' }
  ];

  return (
    <SubPageLayout
      title="Estudos de Caso e Análise Técnica"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Análise técnica e relatórios de estudos de caso industriais"
        subtitle="Resolução Eficiente de Desafios Complexos de Engenharia"
        description="Analise detalhadamente como a Abybysita respondeu a desafios críticos em grandes projetos industriais, economizando tempo e recursos para os seus parceiros com soluções personalizadas de engenharia e logística."
        features={[
          {
            icon: <Clock className="w-5 h-5 text-[#1868B8]" />,
            title: "Redução de Downtime Offshore",
            description: "Como a utilização de Rope Access evitou a paragem de produção numa plataforma petrolífera durante 15 dias."
          },
          {
            icon: <TrendingUp className="w-5 h-5 text-[#1868B8]" />,
            title: "Otimização de Custos de Frota",
            description: "Reestruturação do plano de mobilidade corporativa para operadora mineira com redução de 25% de custos."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Substituição Crítica de Tubagem",
            description: "Fornecimento prioritário e montagem de tubos API de emergência em menos de 48 horas."
          },
          {
            icon: <FileText className="w-5 h-5 text-[#1868B8]" />,
            title: "Relatórios de Impacto",
            description: "Metodologias documentadas com métricas de desempenho, ROI e conformidade de segurança."
          }
        ]}
      />
    </SubPageLayout>
  );
}
