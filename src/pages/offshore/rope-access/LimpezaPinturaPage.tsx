import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Droplet, Paintbrush, Layers, CheckSquare } from 'lucide-react';

export function LimpezaPinturaPage() {
  const sidebarLinks = [
    { href: '/offshore/rope-access/inspecao', label: 'Inspeção' },
    { href: '/offshore/rope-access/manutencao', label: 'Manutenção' },
    { href: '/offshore/rope-access/limpeza-pintura', label: 'Limpeza e Pintura' },
    { href: '/offshore/rope-access/montagem-reparacao', label: 'Montagem e Reparação' },
    { href: '/offshore/rope-access/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rope Access' },
    { label: 'Limpeza e Pintura' }
  ];

  return (
    <SubPageLayout
      title="Limpeza e Pintura Industrial"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Técnico a realizar pintura industrial"
        subtitle="Proteção Anti-corrosiva e Blasting em Estruturas Elevadas"
        description="Prestamos serviços de limpeza industrial e pintura de proteção em estruturas metálicas, tanques de armazenamento, torres e plataformas marítimas. Utilizamos os melhores revestimentos do mercado, cumprindo rigorosamente as normas internacionais de proteção."
        features={[
          {
            icon: <Droplet className="w-5 h-5 text-[#1868B8]" />,
            title: "Lavagem a Alta Pressão",
            description: "Remoção eficiente de sujidade, óleos, e incrustações através de sistemas de hidro-decapagem (Water Blasting)."
          },
          {
            icon: <Paintbrush className="w-5 h-5 text-[#1868B8]" />,
            title: "Pintura Airless",
            description: "Aplicação profissional de tinta com tecnologia airless para um acabamento uniforme e proteção duradoura."
          },
          {
            icon: <Layers className="w-5 h-5 text-[#1868B8]" />,
            title: "Tratamento Anti-Corrosivo",
            description: "Sistemas complexos de pintura e revestimento para proteção contra os ambientes marítimos severos."
          },
          {
            icon: <CheckSquare className="w-5 h-5 text-[#1868B8]" />,
            title: "Preparação de Superfícies",
            description: "Abrasivos e decapagem de qualidade (Sandblasting/Gritblasting) garantindo a aderência perfeita do novo revestimento."
          }
        ]}
      />
    </SubPageLayout>
  );
}
