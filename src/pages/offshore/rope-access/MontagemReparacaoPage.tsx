import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Construction, Compass, Hexagon, Cog } from 'lucide-react';

export function MontagemReparacaoPage() {
  const sidebarLinks = [
    { href: '/offshore/rope-access/inspecao', label: 'Inspeção' },
    { href: '/offshore/rope-access/manutencao', label: 'Manutenção' },
    { href: '/offshore/rope-access/limpeza-pintura', label: 'Limpeza e Pintura' },
    { href: '/offshore/rope-access/montagem-reparacao', label: 'Montagem e Reparação' },
    { href: '/offshore/rope-access/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rope Access' },
    { label: 'Montagem e Reparação' }
  ];

  return (
    <SubPageLayout
      title="Montagem e Reparação"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Montagem de estruturas metálicas complexas"
        subtitle="Intervenções Estruturais de Alta Precisão"
        description="Montagem, soldadura e reparação de estruturas metálicas pesadas, sistemas de tubagem e equipamentos especializados em locais de difícil acesso. A nossa equipa conta com profissionais altamente experientes para executar soluções mecânicas personalizadas em segurança."
        features={[
          {
            icon: <Construction className="w-5 h-5 text-[#1868B8]" />,
            title: "Instalação Estrutural",
            description: "Montagem de suportes, passadiços e vigas metálicas suspensas com recurso a técnicas de rope access e rigging."
          },
          {
            icon: <Hexagon className="w-5 h-5 text-[#1868B8]" />,
            title: "Soldadura Certificada",
            description: "Serviços de soldadura TIG, MIG e MAG em locais remotos, efetuados por técnicos especializados."
          },
          {
            icon: <Cog className="w-5 h-5 text-[#1868B8]" />,
            title: "Montagem de Tubagens",
            description: "Substituição e montagem de tubagens de processo e linhas de fluxo em estruturas marítimas e instalações petroquímicas."
          },
          {
            icon: <Compass className="w-5 h-5 text-[#1868B8]" />,
            title: "Planeamento Rigoroso",
            description: "Cada reparação complexa envolve uma análise prévia detalhada, garantindo execução segura e nos prazos definidos."
          }
        ]}
      />
    </SubPageLayout>
  );
}
