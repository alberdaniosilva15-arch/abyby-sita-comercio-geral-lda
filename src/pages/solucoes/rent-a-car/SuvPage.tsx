import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Car, Compass, ShieldCheck, Award } from 'lucide-react';

export function SuvPage() {
  const sidebarLinks = [
    { href: '/solucoes/rent-a-car/suv', label: 'SUV' },
    { href: '/solucoes/rent-a-car/automoveis-ligeiros', label: 'Automóveis Ligeiros' },
    { href: '/solucoes/rent-a-car/vans-carrinhas', label: 'Vans / Carrinhas' },
    { href: '/solucoes/rent-a-car/comerciais', label: 'Comerciais' },
    { href: '/solucoes/rent-a-car/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rent-a-Car' },
    { label: 'SUV' }
  ];

  return (
    <SubPageLayout
      title="Aluguer de SUV"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Frota de viaturas SUV modernas e corporativas"
        subtitle="Frota de Viaturas SUV Robustas e Confortáveis"
        description="Disponibilizamos uma frota moderna de viaturas SUV de tração integral (4x4) e 4x2, ideais para deslocações corporativas, projetos em terrenos exigentes e mobilidade executiva em Angola. Combinamos segurança, conforto premium e máxima fiabilidade."
        features={[
          {
            icon: <Car className="w-5 h-5 text-[#1868B8]" />,
            title: "Tração 4x4 e Conforto",
            description: "Veículos preparados para qualquer tipo de terreno, garantindo máxima estabilidade e conforto nas viagens."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Manutenção Rigorosa",
            description: "Todas as viaturas passam por revisões periódicas rigorosas e assistência técnica garantida 24 horas por dia."
          },
          {
            icon: <Compass className="w-5 h-5 text-[#1868B8]" />,
            title: "Mobilidade Todo-o-Terreno",
            description: "Ideais para missões de prospeção, mobilidade de equipas técnicas e visitas a instalações industriais remotas."
          },
          {
            icon: <Award className="w-5 h-5 text-[#1868B8]" />,
            title: "Contratos Flexíveis",
            description: "Aluguer de curta, média e longa duração com pacotes de assistência em viagem e viatura de substituição."
          }
        ]}
      />
    </SubPageLayout>
  );
}
