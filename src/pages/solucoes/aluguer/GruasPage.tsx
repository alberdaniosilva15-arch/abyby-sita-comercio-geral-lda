import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Settings, CheckSquare, Weight, ArrowUpRight } from 'lucide-react';

export function GruasPage() {
  const sidebarLinks = [
    { href: '/solucoes/aluguer-equipamentos/gruas', label: 'Gruas' },
    { href: '/solucoes/aluguer-equipamentos/camioes-trailer', label: 'Camiões Trailer' },
    { href: '/solucoes/aluguer-equipamentos/transportes-maritimos', label: 'Transportes Marítimos' },
    { href: '/solucoes/aluguer-equipamentos/porta-contentores', label: 'Porta-Contentores' },
    { href: '/solucoes/aluguer-equipamentos/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Aluguer de Equipamentos' },
    { label: 'Gruas' }
  ];

  return (
    <SubPageLayout
      title="Aluguer de Gruas"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1544464506-69539f074d20?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Gruas industriais a operar num estaleiro"
        subtitle="Elevação e Movimentação de Cargas Pesadas"
        description="A nossa frota de gruas móveis e sobre rastos oferece as melhores soluções para elevação de cargas pesadas em projetos de construção, mineração e oil & gas. Disponibilizamos equipamentos modernos e inspecionados."
        features={[
          {
            icon: <Weight className="w-5 h-5 text-[#1868B8]" />,
            title: "Alta Capacidade",
            description: "Gruas com diversas capacidades de elevação para satisfazer as necessidades específicas de projetos de pequena ou grande escala."
          },
          {
            icon: <Settings className="w-5 h-5 text-[#1868B8]" />,
            title: "Operadores Certificados",
            description: "Equipamentos alugados com ou sem operadores (riggers) altamente qualificados e certificados internacionalmente."
          },
          {
            icon: <CheckSquare className="w-5 h-5 text-[#1868B8]" />,
            title: "Inspeções Regulares",
            description: "Garantimos a segurança em obra através de rigorosas manutenções e inspeções periódicas aos nossos equipamentos de elevação."
          },
          {
            icon: <ArrowUpRight className="w-5 h-5 text-[#1868B8]" />,
            title: "Flexibilidade",
            description: "Planos de aluguer flexíveis adaptados aos prazos do seu projeto (diário, semanal ou mensal)."
          }
        ]}
      />
    </SubPageLayout>
  );
}
