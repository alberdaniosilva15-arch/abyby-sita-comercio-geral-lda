import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { ShieldAlert, Sparkles, Award, Factory } from 'lucide-react';

export function AcoInoxidavelPage() {
  const sidebarLinks = [
    { href: '/solucoes/venda-pipes/aco-carbono', label: 'Aço Carbono' },
    { href: '/solucoes/venda-pipes/aco-inoxidavel', label: 'Aço Inoxidável' },
    { href: '/solucoes/venda-pipes/outros-materiais', label: 'Outros Materiais' }
  ];
  
  const breadcrumbs = [
    { label: 'Vendas de Pipes' },
    { label: 'Aço Inoxidável' }
  ];

  return (
    <SubPageLayout
      title="Tubagens em Aço Inoxidável"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Tubos de aço inoxidável industriais de alta qualidade"
        subtitle="Máxima Resistência à Corrosão para Ambientes Exigentes"
        description="Comercializamos tubos, conexões e flanges em aço inoxidável (ligas 304, 316, Duplex e Super Duplex). Especialmente indicados para a indústria petrolífera offshore, química, alimentar e dessalinização."
        features={[
          {
            icon: <ShieldAlert className="w-5 h-5 text-[#1868B8]" />,
            title: "Alta Resistência à Corrosão",
            description: "Liga anticorrosiva superior para operação prolongada em meio marinho e corrosivo."
          },
          {
            icon: <Sparkles className="w-5 h-5 text-[#1868B8]" />,
            title: "Ligas Duplex e Super Duplex",
            description: "Disponibilidade de ligas especiais com elevadíssima resistência mecânica e química."
          },
          {
            icon: <Award className="w-5 h-5 text-[#1868B8]" />,
            title: "Acabamentos Sanitários e Industriais",
            description: "Superfícies polidas para aplicações alimentares e acabamento industrial para instalações químicas."
          },
          {
            icon: <Factory className="w-5 h-5 text-[#1868B8]" />,
            title: "Soluções Sob Medida",
            description: "Corte à medida e fornecimento de juntas e flanges adequadas a cada projeto."
          }
        ]}
      />
    </SubPageLayout>
  );
}
