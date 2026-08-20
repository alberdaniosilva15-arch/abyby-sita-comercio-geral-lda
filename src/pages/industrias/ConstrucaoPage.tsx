import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { HardHat, Truck, Weight, Wrench } from 'lucide-react';

export function ConstrucaoPage() {
  const sidebarLinks = [
    { href: '/industrias/oil-gas', label: 'Oil & Gas' },
    { href: '/industrias/construcao', label: 'Construção' },
    { href: '/industrias/mineracao', label: 'Mineração' },
    { href: '/industrias/logistica', label: 'Logística' },
    { href: '/industrias/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Indústrias' },
    { label: 'Construção' }
  ];

  return (
    <SubPageLayout
      title="Soluções para Construção Civil e Obras Públicas"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Estaleiro de obras e construção civil infraestrutural"
        subtitle="Apoio Técnico e Equipamentos para Infraestruturas e Edificação"
        description="Apoiamos as maiores construtoras em Angola com aluguer de gruas, maquinaria pesada, transporte de materiais de construção e montagens em altura com técnicas de trabalho vertical."
        features={[
          {
            icon: <Weight className="w-5 h-5 text-[#1868B8]" />,
            title: "Aluguer de Gruas e Elevação",
            description: "Equipamentos de grande tonelagem com operadores experientes para montagem de estruturas."
          },
          {
            icon: <Truck className="w-5 h-5 text-[#1868B8]" />,
            title: "Transporte de Materiais",
            description: "Logística integrada e frota pesada para transporte de inertes, pré-fabricados e estruturas."
          },
          {
            icon: <HardHat className="w-5 h-5 text-[#1868B8]" />,
            title: "Segurança em Obra",
            description: "Cumprimento rigoroso das normas HSE em todas as operações de apoio à edificação."
          },
          {
            icon: <Wrench className="w-5 h-5 text-[#1868B8]" />,
            title: "Montagem de Estruturas em Altura",
            description: "Aplicação de Rope Access na instalação de fachadas, painéis e estruturas metálicas."
          }
        ]}
      />
    </SubPageLayout>
  );
}
