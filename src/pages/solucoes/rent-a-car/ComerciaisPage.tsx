import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Truck, PackageCheck, Shield, Wrench } from 'lucide-react';

export function ComerciaisPage() {
  const sidebarLinks = [
    { href: '/solucoes/rent-a-car/suv', label: 'SUV' },
    { href: '/solucoes/rent-a-car/automoveis-ligeiros', label: 'Automóveis Ligeiros' },
    { href: '/solucoes/rent-a-car/vans-carrinhas', label: 'Vans / Carrinhas' },
    { href: '/solucoes/rent-a-car/comerciais', label: 'Comerciais' },
    { href: '/solucoes/rent-a-car/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rent-a-Car' },
    { label: 'Comerciais' }
  ];

  return (
    <SubPageLayout
      title="Aluguer de Veículos Comerciais"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Frota de veículos comerciais e furgões de distribuição"
        subtitle="Veículos Utilitários para Apoio à Distribuição e Logística"
        description="Furgões, pick-ups e ligeiros de mercadorias projetados para responder às exigências operacionais da sua empresa. Soluções fiáveis para transporte de carga, entregas urbanas e apoio técnico."
        features={[
          {
            icon: <Truck className="w-5 h-5 text-[#1868B8]" />,
            title: "Capacidade de Carga Útil",
            description: "Diferentes volumetrias e capacidades de peso adaptadas ao transporte de mercadorias e ferramentas."
          },
          {
            icon: <PackageCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Pick-ups e Furgões Fechados",
            description: "Veículos com caixa aberta ou fechada para garantir o transporte seguro e protegido de qualquer tipo de carga."
          },
          {
            icon: <Shield className="w-5 h-5 text-[#1868B8]" />,
            title: "Resistência Garantida",
            description: "Chassis reforçados e motores robustos para operar com máximo rendimento e fiabilidade nas estradas."
          },
          {
            icon: <Wrench className="w-5 h-5 text-[#1868B8]" />,
            title: "Suporte Operacional",
            description: "Planos de substituição imediata e manutenção programada sem interromper o ritmo do seu negócio."
          }
        ]}
      />
    </SubPageLayout>
  );
}
