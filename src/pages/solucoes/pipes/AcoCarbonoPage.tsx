import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { ShieldCheck, Layers, Gauge, Warehouse } from 'lucide-react';

export function AcoCarbonoPage() {
  const sidebarLinks = [
    { href: '/solucoes/venda-pipes/aco-carbono', label: 'Aço Carbono' },
    { href: '/solucoes/venda-pipes/aco-inoxidavel', label: 'Aço Inoxidável' },
    { href: '/solucoes/venda-pipes/outros-materiais', label: 'Outros Materiais' }
  ];
  
  const breadcrumbs = [
    { label: 'Vendas de Pipes' },
    { label: 'Aço Carbono' }
  ];

  return (
    <SubPageLayout
      title="Tubagens em Aço Carbono"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Armazém de tubos e tubagens em aço carbono industrial"
        subtitle="Tubos e Conexões em Aço Carbono para Indústria Heavy-Duty"
        description="Fornecemos tubagens sem costura e com costura em aço carbono de elevada resistência mecânica, fabricados sob rigorosas normas internacionais (ASTM, API, DIN). Solução ideal para transporte de petróleo, gás, água e aplicações estruturais."
        features={[
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Normas API & ASTM",
            description: "Certificação internacional de qualidade e rastreabilidade total do material desde a fábrica."
          },
          {
            icon: <Layers className="w-5 h-5 text-[#1868B8]" />,
            title: "Sem Costura e Com Costura",
            description: "Gama completa de espessuras e diâmetros para suportar elevadas pressões de trabalho."
          },
          {
            icon: <Gauge className="w-5 h-5 text-[#1868B8]" />,
            title: "Resistência à Pressão",
            description: "Materiais testados hidrostaticamente e prontos para ambientes operacionais críticos."
          },
          {
            icon: <Warehouse className="w-5 h-5 text-[#1868B8]" />,
            title: "Stock em Angola",
            description: "Disponibilidade imediata de inventário estratégico nos nossos armazéns para pronta entrega."
          }
        ]}
      />
    </SubPageLayout>
  );
}
