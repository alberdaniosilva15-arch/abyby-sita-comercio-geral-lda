import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Factory, Flame, HardHat, Package } from 'lucide-react';

export function IndustriasPage() {
  const sidebarLinks = [
    { href: '/sobre/perfil', label: 'Perfil da Empresa' },
    { href: '/sobre/missao-visao-valores', label: 'Missão, Visão e Valores' },
    { href: '/sobre/industrias', label: 'As Nossas Indústrias' },
    { href: '/sobre/setores-atuacao', label: 'Setores de Atuação' },
    { href: '/sobre/setores-atuacao/equipamentos-industriais', label: 'Equipamentos Industriais' },
    { href: '/sobre/setores-atuacao/frescos-bens-alimentares', label: 'Frescos e Bens Alimentares' }
  ];
  
  const breadcrumbs = [
    { label: 'Sobre Nós' },
    { label: 'As Nossas Indústrias' }
  ];

  return (
    <SubPageLayout
      title="As Nossas Indústrias de Atuação"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Instalações industriais e diversidade de sectores operacionais"
        subtitle="Presença Multissectorial Estratégica na Economia Angolana"
        description="Operamos em múltiplos sectores chave do mercado angolano, oferecendo soluções integradas e adaptadas às necessidades específicas de cada indústria, desde o Oil & Gas até à Construção Civil e Bens de Consumo."
        features={[
          {
            icon: <Flame className="w-5 h-5 text-[#1868B8]" />,
            title: "Oil & Gas Offshore / Onshore",
            description: "Serviços especializados em rope access, tubagens API e suporte logístico marítimo e terrestre."
          },
          {
            icon: <HardHat className="w-5 h-5 text-[#1868B8]" />,
            title: "Construção Civil & Mineração",
            description: "Aluguer de equipamento pesado, elevação de cargas e transporte de materiais de grande porte."
          },
          {
            icon: <Package className="w-5 h-5 text-[#1868B8]" />,
            title: "Logística & Bens de Consumo",
            description: "Frota comercial, transporte de contentores e distribuição de frescos e produtos alimentares."
          },
          {
            icon: <Factory className="w-5 h-5 text-[#1868B8]" />,
            title: "Sector Público & Institucional",
            description: "Fornecimentos estratégicos e contratos de manutenção e frota para entidades estatais."
          }
        ]}
      />
    </SubPageLayout>
  );
}
