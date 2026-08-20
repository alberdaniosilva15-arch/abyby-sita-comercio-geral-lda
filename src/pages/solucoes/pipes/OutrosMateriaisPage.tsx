import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Layers, ShieldCheck, Cpu, Package } from 'lucide-react';

export function OutrosMateriaisPage() {
  const sidebarLinks = [
    { href: '/solucoes/venda-pipes/aco-carbono', label: 'Aço Carbono' },
    { href: '/solucoes/venda-pipes/aco-inoxidavel', label: 'Aço Inoxidável' },
    { href: '/solucoes/venda-pipes/outros-materiais', label: 'Outros Materiais' }
  ];
  
  const breadcrumbs = [
    { label: 'Vendas de Pipes' },
    { label: 'Outros Materiais' }
  ];

  return (
    <SubPageLayout
      title="Materiais e Ligas Especiais"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Variedade de tubagens e ligas industriais especiais"
        subtitle="Ligas Especiais, HDPE e Acessórios Industriais"
        description="Fornecimento especializado de tubagens em PEAD (HDPE), PVC industrial, ligas de níquel, cobre-níquel e aços de liga especial. Soluções completas para sistemas de água, efluentes e processos químicos exigentes."
        features={[
          {
            icon: <Layers className="w-5 h-5 text-[#1868B8]" />,
            title: "Tubagem PEAD (HDPE)",
            description: "Tubos flexíveis e resistentes para redes de água potável, saneamento e dragagens."
          },
          {
            icon: <Cpu className="w-5 h-5 text-[#1868B8]" />,
            title: "Ligas de Níquel e Ligeiras",
            description: "Materiais para ambientes de altíssima temperatura e corrosão extrema."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Conexões e Válvulas",
            description: "Gama completa de acessórios hidráulicos e mecânicos para montagem de sistemas inteiros."
          },
          {
            icon: <Package className="w-5 h-5 text-[#1868B8]" />,
            title: "Sourcing Internacional",
            description: "Capacidade de importar materiais específicos diretamente dos maiores fabricantes mundiais."
          }
        ]}
      />
    </SubPageLayout>
  );
}
