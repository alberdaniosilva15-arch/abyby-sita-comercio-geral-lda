import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Briefcase, Users, GraduationCap, Award } from 'lucide-react';

export function VagasPage() {
  const sidebarLinks = [
    { href: '/carreiras/vagas', label: 'Vagas' },
    { href: '/carreiras/candidatura', label: 'Enviar Candidatura' }
  ];
  
  const breadcrumbs = [
    { label: 'Carreiras' },
    { label: 'Vagas' }
  ];

  return (
    <SubPageLayout
      title="Oportunidades de Emprego"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Oportunidades de trabalho e vagas na Abybysita"
        subtitle="Junte-se à Nossa Equipa Multidisciplinar"
        description="Consulte as oportunidades de carreira disponíveis na Abybysita. Procuramos profissionais talentosos e empenhados para integrar projetos de engenharia, rigging, montagem industrial e suporte logístico em Angola."
        features={[
          {
            icon: <Briefcase className="w-5 h-5 text-[#1868B8]" />,
            title: "Técnicos de Acesso por Corda (IRATA)",
            description: "Oportunidades para inspetores e técnicos qualificados em plataformas offshore e infraestruturas industriais."
          },
          {
            icon: <Users className="w-5 h-5 text-[#1868B8]" />,
            title: "Operadores de Gruas Pesadas",
            description: "Vagas para manobradores experientes com certificação profissional válida e rigor no cumprimento de regras de segurança."
          },
          {
            icon: <GraduationCap className="w-5 h-5 text-[#1868B8]" />,
            title: "Engenheiros e Supervisores Industriais",
            description: "Recrutamento de quadros técnicos para liderar equipas em projetos de tubagem, estruturas e serviços marítimos."
          },
          {
            icon: <Award className="w-5 h-5 text-[#1868B8]" />,
            title: "Desenvolvimento Profissional Contínuo",
            description: "Oferecemos planos de carreira dinâmicos, programas de formação técnica e um ambiente de trabalho motivador."
          }
        ]}
      />
    </SubPageLayout>
  );
}

