import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Users, Truck, ShieldCheck, LifeBuoy } from 'lucide-react';

export function VansCarrinhasPage() {
  const sidebarLinks = [
    { href: '/solucoes/rent-a-car/suv', label: 'SUV' },
    { href: '/solucoes/rent-a-car/automoveis-ligeiros', label: 'Automóveis Ligeiros' },
    { href: '/solucoes/rent-a-car/vans-carrinhas', label: 'Vans / Carrinhas' },
    { href: '/solucoes/rent-a-car/comerciais', label: 'Comerciais' },
    { href: '/solucoes/rent-a-car/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rent-a-Car' },
    { label: 'Vans / Carrinhas' }
  ];

  return (
    <SubPageLayout
      title="Aluguer de Vans e Carrinhas"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Vans de transporte de passageiros e carrinhas corporativas"
        subtitle="Transporte de Passagistas e Equipas com Segurança"
        description="Vans e carrinhas de 9 a 16 lugares preparadas para o transporte cómodo e seguro de equipas de trabalho, delegações e grupos corporativos em todo o território nacional."
        features={[
          {
            icon: <Users className="w-5 h-5 text-[#1868B8]" />,
            title: "Capacidade Ampliada",
            description: "Opções de 9, 12 e 15 lugares com espaço otimizado para bagagem e equipamentos de trabalho."
          },
          {
            icon: <Truck className="w-5 h-5 text-[#1868B8]" />,
            title: "Versatilidade de Carga",
            description: "Modelos mistos para transporte simultâneo de passageiros e ferramentas ou material de apoio."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Ar Condicionado Integrado",
            description: "Climatização eficiente em todas as zonas do veículo para viagens confortáveis em climas quentes."
          },
          {
            icon: <LifeBuoy className="w-5 h-5 text-[#1868B8]" />,
            title: "Assistência e Motoristas",
            description: "Possibilidade de contratação de motoristas profissionais qualificados para viagens interprovinciais."
          }
        ]}
      />
    </SubPageLayout>
  );
}
