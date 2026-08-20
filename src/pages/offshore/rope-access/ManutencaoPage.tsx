import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Wrench, Zap, Cog, Clock } from 'lucide-react';

export function ManutencaoPage() {
  const sidebarLinks = [
    { href: '/offshore/rope-access/inspecao', label: 'Inspeção' },
    { href: '/offshore/rope-access/manutencao', label: 'Manutenção' },
    { href: '/offshore/rope-access/limpeza-pintura', label: 'Limpeza e Pintura' },
    { href: '/offshore/rope-access/montagem-reparacao', label: 'Montagem e Reparação' },
    { href: '/offshore/rope-access/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rope Access' },
    { label: 'Manutenção' }
  ];

  return (
    <SubPageLayout
      title="Manutenção Industrial"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Técnicos a realizar manutenção em ambiente industrial"
        subtitle="Intervenções Rápidas e Seguras em Altura"
        description="Serviços de manutenção preventiva e correctiva em alturas e espaços confinados. Garantimos intervenções rápidas com equipas especializadas IRATA, reduzindo significativamente os custos operacionais face aos métodos convencionais como andaimes pesados."
        features={[
          {
            icon: <Wrench className="w-5 h-5 text-[#1868B8]" />,
            title: "Manutenção Mecânica",
            description: "Reparação e substituição de componentes mecânicos, válvulas e tubagens em infraestruturas industriais e offshore."
          },
          {
            icon: <Zap className="w-5 h-5 text-[#1868B8]" />,
            title: "Instalações Elétricas",
            description: "Manutenção e inspeção de sistemas elétricos, cablagem e iluminação em locais de difícil alcance."
          },
          {
            icon: <Cog className="w-5 h-5 text-[#1868B8]" />,
            title: "Reparações Estruturais",
            description: "Intervenções corretivas em estruturas metálicas e betão, garantindo a integridade e prolongando a vida útil."
          },
          {
            icon: <Clock className="w-5 h-5 text-[#1868B8]" />,
            title: "Resposta Rápida a Emergências",
            description: "Equipas preparadas para mobilização imediata, atuando rapidamente em situações críticas e minimizando interrupções."
          }
        ]}
      />
    </SubPageLayout>
  );
}

