import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Ship, Anchor, Globe, PackageCheck } from 'lucide-react';

export function TransportesMaritimosPage() {
  const sidebarLinks = [
    { href: '/solucoes/aluguer-equipamentos/gruas', label: 'Gruas' },
    { href: '/solucoes/aluguer-equipamentos/camioes-trailer', label: 'Camiões Trailer' },
    { href: '/solucoes/aluguer-equipamentos/transportes-maritimos', label: 'Transportes Marítimos' },
    { href: '/solucoes/aluguer-equipamentos/porta-contentores', label: 'Porta-Contentores' },
    { href: '/solucoes/aluguer-equipamentos/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Aluguer de Equipamentos' },
    { label: 'Transportes Marítimos' }
  ];

  return (
    <SubPageLayout
      title="Transportes Marítimos"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Navio de transporte marítimo e logística offshore"
        subtitle="Logística Marítima Segura e Eficiente"
        description="Serviços de transporte marítimo de mercadorias, equipamentos pesados e pessoal para plataformas offshore e bases de apoio. Garantimos embarcações seguras, certificadas e com tripulação altamente qualificada, respondendo às exigências rigorosas da indústria do petróleo e gás."
        features={[
          {
            icon: <Ship className="w-5 h-5 text-[#1868B8]" />,
            title: "Embarcações Especializadas",
            description: "Frota adaptada para diferentes tipos de carga, desde contentores a equipamentos pesados sobredimensionados."
          },
          {
            icon: <PackageCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Logística Integrada",
            description: "Soluções 'door-to-deck' conectando o transporte terrestre ao marítimo sem interrupções."
          },
          {
            icon: <Anchor className="w-5 h-5 text-[#1868B8]" />,
            title: "Apoio Offshore",
            description: "Abastecimento regular de plataformas e FPSOs com suprimentos essenciais e materiais de perfuração."
          },
          {
            icon: <Globe className="w-5 h-5 text-[#1868B8]" />,
            title: "Cobertura Nacional",
            description: "Rotas estabelecidas ao longo da costa angolana, garantindo conectividade entre os principais portos e bases logísticas."
          }
        ]}
      />
    </SubPageLayout>
  );
}
