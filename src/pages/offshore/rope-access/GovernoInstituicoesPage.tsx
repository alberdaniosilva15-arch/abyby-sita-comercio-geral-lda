import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Building2, ShieldCheck, Flag, HardHat } from 'lucide-react';

export function GovernoInstituicoesPage() {
  const sidebarLinks = [
    { href: '/offshore/rope-access/inspecao', label: 'Inspeção' },
    { href: '/offshore/rope-access/manutencao', label: 'Manutenção' },
    { href: '/offshore/rope-access/limpeza-pintura', label: 'Limpeza e Pintura' },
    { href: '/offshore/rope-access/montagem-reparacao', label: 'Montagem e Reparação' },
    { href: '/offshore/rope-access/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rope Access' },
    { label: 'Governo e Instituições' }
  ];

  return (
    <SubPageLayout
      title="Projetos Governamentais & Instituições"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Edifício governamental / institucional"
        subtitle="Parcerias Estratégicas e Infraestruturas Públicas"
        description="Colaboramos em projetos estratégicos para entidades governamentais e instituições públicas em Angola, fornecendo serviços de rope access certificados para manutenção e inspeção de infraestruturas estatais vitais (barragens, pontes, e edifícios públicos)."
        features={[
          {
            icon: <Flag className="w-5 h-5 text-[#1868B8]" />,
            title: "Serviços Públicos",
            description: "Intervenções essenciais em infraestruturas públicas onde os acessos convencionais são impossíveis."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Compliance e Transparência",
            description: "Total cumprimento de normas governamentais de segurança, conformidade e transparência em concursos públicos."
          },
          {
            icon: <Building2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Manutenção de Edifícios Oficiais",
            description: "Limpeza de fachadas, inspeção estrutural e reabilitação em sedes institucionais de relevo."
          },
          {
            icon: <HardHat className="w-5 h-5 text-[#1868B8]" />,
            title: "Equipas Dedicadas",
            description: "Profissionais rigorosamente selecionados com experiência comprovada em projetos de interesse nacional."
          }
        ]}
      />
    </SubPageLayout>
  );
}
