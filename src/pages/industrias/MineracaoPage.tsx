import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Mountain, Truck, ShieldCheck, Compass } from 'lucide-react';

export function MineracaoPage() {
  const sidebarLinks = [
    { href: '/industrias/oil-gas', label: 'Oil & Gas' },
    { href: '/industrias/construcao', label: 'Construção' },
    { href: '/industrias/mineracao', label: 'Mineração' },
    { href: '/industrias/logistica', label: 'Logística' },
    { href: '/industrias/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Indústrias' },
    { label: 'Mineração' }
  ];

  return (
    <SubPageLayout
      title="Soluções para o Sector Mineiro"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Mina a céu aberto com equipamentos pesados de escavação"
        subtitle="Apoio Logístico e Equipamentos para Mineração e Extração"
        description="Fornecemos apoio integral aos projetos de mineração em Angola, incluindo aluguer de frotas 4x4, camiões pesados de transporte, manutenção mecânica de campo e fornecimento de tubagens e drenagem industrial."
        features={[
          {
            icon: <Mountain className="w-5 h-5 text-[#1868B8]" />,
            title: "Operações em Terrenos Severos",
            description: "Equipamentos e viaturas preparados para operar nas condições geográficas mais exigentes."
          },
          {
            icon: <Truck className="w-5 h-5 text-[#1868B8]" />,
            title: "Transporte e Logística de Minério",
            description: "Frota de camiões basculantes e trailers de alta capacidade para movimentação contínua."
          },
          {
            icon: <Compass className="w-5 h-5 text-[#1868B8]" />,
            title: "Suporte a Prospeção",
            description: "Aluguer de viaturas todo-o-terreno (SUV 4x4) e acampamentos móveis para equipas de geologia."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Tubagens para Drenagem",
            description: "Sistemas de tubagem em PEAD e Aço Carbono para esgotamento e bombagem de água nas minas."
          }
        ]}
      />
    </SubPageLayout>
  );
}
