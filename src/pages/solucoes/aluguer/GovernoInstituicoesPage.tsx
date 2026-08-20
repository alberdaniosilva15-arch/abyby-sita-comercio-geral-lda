import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Building2, ShieldCheck, Flag, HardHat } from 'lucide-react';

export function GovernoInstituicoesPage() {
  const sidebarLinks = [
    { href: '/solucoes/aluguer-equipamentos/gruas', label: 'Gruas' },
    { href: '/solucoes/aluguer-equipamentos/camioes-trailer', label: 'Camiões Trailer' },
    { href: '/solucoes/aluguer-equipamentos/transportes-maritimos', label: 'Transportes Marítimos' },
    { href: '/solucoes/aluguer-equipamentos/porta-contentores', label: 'Porta-Contentores' },
    { href: '/solucoes/aluguer-equipamentos/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Aluguer de Equipamentos' },
    { label: 'Governo e Instituições' }
  ];

  return (
    <SubPageLayout
      title="Apoio Logístico a Entidades Governamentais"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Equipamentos pesados em projeto infraestrutural"
        subtitle="Fornecimento Confiável para Projetos Nacionais"
        description="Estabelecemos fortes parcerias com instituições do Governo de Angola e empresas públicas, fornecendo equipamento logístico e maquinaria pesada para projetos de desenvolvimento de infraestruturas, saúde, educação e saneamento básico em todo o território."
        features={[
          {
            icon: <Flag className="w-5 h-5 text-[#1868B8]" />,
            title: "Projetos Nacionais",
            description: "Apoio a obras públicas essenciais: estradas, pontes, hospitais e programas de construção sustentável."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Contratação Pública",
            description: "Empresa elegível e experiente no cumprimento de rigorosos cadernos de encargos em concursos públicos."
          },
          {
            icon: <Building2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Aluguer de Frota",
            description: "Disponibilizamos frotas inteiras para suportar campanhas estatais prolongadas, com assistência técnica incluída."
          },
          {
            icon: <HardHat className="w-5 h-5 text-[#1868B8]" />,
            title: "Garantia de Fiabilidade",
            description: "Equipamento recente e operadores certificados para garantir que os prazos das obras estatais são cumpridos."
          }
        ]}
      />
    </SubPageLayout>
  );
}
