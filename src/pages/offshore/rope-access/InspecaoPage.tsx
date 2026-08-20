import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { ShieldCheck, Search, Activity, ClipboardCheck } from 'lucide-react';

export function InspecaoPage() {
  const sidebarLinks = [
    { href: '/offshore/rope-access/inspecao', label: 'Inspeção' },
    { href: '/offshore/rope-access/manutencao', label: 'Manutenção' },
    { href: '/offshore/rope-access/limpeza-pintura', label: 'Limpeza e Pintura' },
    { href: '/offshore/rope-access/montagem-reparacao', label: 'Montagem e Reparação' },
    { href: '/offshore/rope-access/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rope Access' },
    { label: 'Inspeção' }
  ];

  return (
    <SubPageLayout
      title="Inspeção NDT & Visual"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Técnico de Rope Access a realizar inspeção industrial"
        subtitle="Avaliação Rigorosa em Locais de Difícil Acesso"
        description="Realizamos inspeções técnicas especializadas em estruturas offshore e onshore, utilizando técnicas certificadas de rope access. A nossa equipa de profissionais qualificados garante avaliações precisas e detalhadas, minimizando tempos de paragem e maximizando a segurança operacional."
        features={[
          {
            icon: <Search className="w-5 h-5 text-[#1868B8]" />,
            title: "Ensaios Não Destrutivos (NDT)",
            description: "Avaliação da integridade de materiais e componentes sem alterar as suas características físicas, prevenindo falhas estruturais."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Inspeção de Soldaduras",
            description: "Verificação rigorosa de juntas soldadas em tubagens, tanques e estruturas metálicas cruciais para a segurança."
          },
          {
            icon: <Activity className="w-5 h-5 text-[#1868B8]" />,
            title: "Monitorização de Corrosão",
            description: "Identificação precoce de desgaste e corrosão em ambientes agressivos, como plataformas petrolíferas e marítimas."
          },
          {
            icon: <ClipboardCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Relatórios Detalhados",
            description: "Fornecimento de relatórios técnicos precisos com registo fotográfico e recomendações de intervenção corretiva."
          }
        ]}
      />
    </SubPageLayout>
  );
}
