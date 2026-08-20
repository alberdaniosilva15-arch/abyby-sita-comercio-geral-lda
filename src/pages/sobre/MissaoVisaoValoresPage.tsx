import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Target, Eye, ShieldCheck, HeartHandshake } from 'lucide-react';

export function MissaoVisaoValoresPage() {
  const sidebarLinks = [
    { href: '/sobre/perfil', label: 'Perfil da Empresa' },
    { href: '/sobre/missao-visao-valores', label: 'Missão, Visão e Valores' },
    { href: '/sobre/industrias', label: 'As Nossas Indústrias' },
    { href: '/sobre/setores-atuacao', label: 'Setores de Atuação' },
    { href: '/sobre/setores-atuacao/equipamentos-industriais', label: 'Equipamentos Industriais' },
    { href: '/sobre/setores-atuacao/frescos-bens-alimentares', label: 'Frescos e Bens Alimentares' }
  ];
  
  const breadcrumbs = [
    { label: 'Sobre Nós' },
    { label: 'Missão, Visão e Valores' }
  ];

  return (
    <SubPageLayout
      title="Missão, Visão e Valores"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Equipa profissional corporativa da Abybysita"
        subtitle="Os Pilares da Nossa Atuação e Identidade Corporativa"
        description="A Abybysita — Comércio Geral, LDA orienta todas as suas operações pelos mais elevados valores morais, éticos e profissionais. A nossa cultura corporativa visa entregar valor contínuo aos clientes, colaboradores e à sociedade angolana."
        features={[
          {
            icon: <Target className="w-5 h-5 text-[#1868B8]" />,
            title: "Nossa Missão",
            description: "Prestar serviços industriais e de comércio de excelência, superando as expectativas dos nossos parceiros com segurança e eficiência."
          },
          {
            icon: <Eye className="w-5 h-5 text-[#1868B8]" />,
            title: "Nossa Visão",
            description: "Ser reconhecida como a empresa angolana de referência no sector multissectorial, impulsionando a inovação e o progresso nacional."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Rigor e Segurança (HSE)",
            description: "Compromisso inegociável com a segurança física, saúde no trabalho e proteção ambiental em todas as vertentes."
          },
          {
            icon: <HeartHandshake className="w-5 h-5 text-[#1868B8]" />,
            title: "Ética e Integridade",
            description: "Relações comerciais transparentes, honestas e pautadas pela lealdade e respeito mútuo com clientes e fornecedores."
          }
        ]}
      />
    </SubPageLayout>
  );
}
