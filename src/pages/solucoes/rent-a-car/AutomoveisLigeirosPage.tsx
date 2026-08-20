import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Car, Fuel, ShieldCheck, Clock } from 'lucide-react';

export function AutomoveisLigeirosPage() {
  const sidebarLinks = [
    { href: '/solucoes/rent-a-car/suv', label: 'SUV' },
    { href: '/solucoes/rent-a-car/automoveis-ligeiros', label: 'Automóveis Ligeiros' },
    { href: '/solucoes/rent-a-car/vans-carrinhas', label: 'Vans / Carrinhas' },
    { href: '/solucoes/rent-a-car/comerciais', label: 'Comerciais' },
    { href: '/solucoes/rent-a-car/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rent-a-Car' },
    { label: 'Automóveis Ligeiros' }
  ];

  return (
    <SubPageLayout
      title="Aluguer de Automóveis Ligeiros"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Frota de carros ligeiros executivos e urbanos"
        subtitle="Eficiência e Elegância na Mobilidade Urbana"
        description="Soluções práticas e económicas para a deslocação diária da sua empresa. Os nossos veículos ligeiros alinham baixos consumos, conforto de condução e elevados padrões de segurança."
        features={[
          {
            icon: <Fuel className="w-5 h-5 text-[#1868B8]" />,
            title: "Baixo Consumo",
            description: "Viaturas modernas e eficientes que otimizam os custos de combustível para a sua frota corporativa."
          },
          {
            icon: <Car className="w-5 h-5 text-[#1868B8]" />,
            title: "Conforto Executivo",
            description: "Interiores cuidados com ar condicionado e conectividade moderna para deslocações diárias sem esforço."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Segurança Ativa",
            description: "Sistemas avançados de travagem e assistência ao condutor para máxima tranquilidade na estrada."
          },
          {
            icon: <Clock className="w-5 h-5 text-[#1868B8]" />,
            title: "Disponibilidade Imediata",
            description: "Processos de reserva rápidos com entrega flexível no local pretendido ou nos nossos escritórios."
          }
        ]}
      />
    </SubPageLayout>
  );
}
