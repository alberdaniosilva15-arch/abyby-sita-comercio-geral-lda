import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Sparkles, Building2, ShieldCheck, Clock } from 'lucide-react';

export function ComercialPage() {
  const sidebarLinks = [
    { href: '/solucoes/limpeza/comercial', label: 'Comercial' },
    { href: '/solucoes/limpeza/industrial', label: 'Industrial' },
    { href: '/solucoes/limpeza/fossa', label: 'Limpeza de Fossa' }
  ];
  
  const breadcrumbs = [
    { label: 'Limpeza' },
    { label: 'Comercial' }
  ];

  return (
    <SubPageLayout
      title="Limpeza Comercial e Corporativa"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Equipa de limpeza comercial num edifício corporativo"
        subtitle="Serviços Profissionais de Higienização de Escritórios e Edifícios"
        description="Oferecemos soluções completas de limpeza e desinfeção comercial para escritórios, sedes empresariais, centros comerciais e edifícios públicos em Angola. Equipas qualificadas, produtos certificados e horários flexíveis."
        features={[
          {
            icon: <Building2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Edifícios e Escritórios",
            description: "Higienização diária de estações de trabalho, salas de reunião, instalações sanitárias e áreas comuns."
          },
          {
            icon: <Sparkles className="w-5 h-5 text-[#1868B8]" />,
            title: "Tratamento de Pavimentos e Vidros",
            description: "Vitrificação de solos, lavagem profunda de alcarpetes e limpeza técnica de vidros e fachadas."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Produtos Certificados",
            description: "Utilização de detergentes e desinfetantes biodegradáveis amigos do ambiente e de alta eficácia."
          },
          {
            icon: <Clock className="w-5 h-5 text-[#1868B8]" />,
            title: "Horários Adaptados",
            description: "Intervenções fora do horário de expediente para garantir o normal funcionamento do seu negócio."
          }
        ]}
      />
    </SubPageLayout>
  );
}
