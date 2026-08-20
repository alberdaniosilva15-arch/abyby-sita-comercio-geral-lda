import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Package, Truck, Anchor, Clock } from 'lucide-react';

export function LogisticaPage() {
  const sidebarLinks = [
    { href: '/industrias/oil-gas', label: 'Oil & Gas' },
    { href: '/industrias/construcao', label: 'Construção' },
    { href: '/industrias/mineracao', label: 'Mineração' },
    { href: '/industrias/logistica', label: 'Logística' },
    { href: '/industrias/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Indústrias' },
    { label: 'Logística' }
  ];

  return (
    <SubPageLayout
      title="Soluções Logísticas e Cadeia de Abastecimento"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Armazém logístico moderno e frota de transporte de contentores"
        subtitle="Cadeia de Abastecimento Eficiente, Transporte Terrestre e Marítimo"
        description="Oferecemos soluções logísticas de ponta a ponta em Angola, conectando portos, centros industriais e clientes com transporte multimodal, movimentação de contentores e soluções de armazenagem temporária."
        features={[
          {
            icon: <Package className="w-5 h-5 text-[#1868B8]" />,
            title: "Movimentação de Contentores",
            description: "Aluguer de camiões porta-contentores e operações portuárias de carga e descarga."
          },
          {
            icon: <Truck className="w-5 h-5 text-[#1868B8]" />,
            title: "Transporte Rodoviário de Carga",
            description: "Cobertura de transporte terrestre interprovincial com controlo por rastreio por satélite."
          },
          {
            icon: <Anchor className="w-5 h-5 text-[#1868B8]" />,
            title: "Apoio Logístico Marítimo",
            description: "Frete de embarcações de transporte marítimo costeiro para cargas industriais e equipamentos."
          },
          {
            icon: <Clock className="w-5 h-5 text-[#1868B8]" />,
            title: "Cumprimento Rígido de Prazos",
            description: "Planificação otimizada de rotas para garantir entregas pontuais e minimização de custos operacionais."
          }
        ]}
      />
    </SubPageLayout>
  );
}
