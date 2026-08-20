import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { CheckCircle2, Award, Flame, Building2 } from 'lucide-react';

export function RealizadosPage() {
  const sidebarLinks = [
    { href: '/projetos/realizados', label: 'Projetos Realizados' },
    { href: '/projetos/galeria', label: 'Galeria de Imagens' },
    { href: '/projetos/testemunhos', label: 'Testemunhos' },
    { href: '/projetos/estudos-de-caso', label: 'Estudos de Caso' }
  ];
  
  const breadcrumbs = [
    { label: 'Projetos' },
    { label: 'Projetos Realizados' }
  ];

  return (
    <SubPageLayout
      title="Projetos Realizados"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Projetos industriais e intervenções offshore da Abybysita"
        subtitle="Histórico de Intervenções e Obras de Sucesso em Angola"
        description="Demonstração prática da capacidade técnica e operacional da Abybysita na execução de projetos industriais de grande complexidade, tais como inspeções offshore, montagem de tubagens pesadas e logística corporativa."
        features={[
          {
            icon: <Flame className="w-5 h-5 text-[#1868B8]" />,
            title: "Inspeção NDT Offshore",
            description: "Campanha de inspeção e manutenção por Rope Access em FPSOs no Bloco 17 e Bloco 31."
          },
          {
            icon: <Building2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Montagem Industrial de Tubagens",
            description: "Fornecimento e instalação de tubagens de aço carbono para complexo industrial de refinação."
          },
          {
            icon: <Award className="w-5 h-5 text-[#1868B8]" />,
            title: "Operações de Elevação Pesada",
            description: "Aluguer de gruas de 100T a 250T para elevação de módulos de infraestrutura portuária."
          },
          {
            icon: <CheckCircle2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Gestão Integrada de Frota",
            description: "Contrato de longa duração para aluguer e manutenção de viaturas corporativas e comerciais."
          }
        ]}
      />
    </SubPageLayout>
  );
}
