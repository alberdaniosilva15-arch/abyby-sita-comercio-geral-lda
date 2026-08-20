import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Building2, ShieldCheck, FileCheck2, Users } from 'lucide-react';

export function GovernoInstituicoesPage() {
  const sidebarLinks = [
    { href: '/solucoes/rent-a-car/suv', label: 'SUV' },
    { href: '/solucoes/rent-a-car/automoveis-ligeiros', label: 'Automóveis Ligeiros' },
    { href: '/solucoes/rent-a-car/vans-carrinhas', label: 'Vans / Carrinhas' },
    { href: '/solucoes/rent-a-car/comerciais', label: 'Comerciais' },
    { href: '/solucoes/rent-a-car/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Rent-a-Car' },
    { label: 'Governo e Instituições' }
  ];

  return (
    <SubPageLayout
      title="Mobilidade para Governo e Instituições"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Frota governamental e institucional de viaturas oficiais"
        subtitle="Soluções de Mobilidade Integrada para o Sector Público"
        description="Prestamos serviços especializados de aluguer e gestão de frotas para ministérios, embaixadas, organismos estatais e ONGs. Garantimos conformidade com os regulamentos de contratação pública, discrição e padrões elevados de segurança."
        features={[
          {
            icon: <Building2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Gestão Dedicada de Frotas",
            description: "Acompanhamento personalizado com gestores de conta dedicados às necessidades institucionais."
          },
          {
            icon: <FileCheck2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Conformidade e Transparência",
            description: "Processos contratuais totalmente auditáveis e alinhados com a legislação da contratação pública."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Viaturas Protocolares e Operacionais",
            description: "Desde sedans de representação oficial até frotas operacionais para missões no terreno."
          },
          {
            icon: <Users className="w-5 h-5 text-[#1868B8]" />,
            title: "Motoristas Qualificados",
            description: "Disponibilização de motoristas profissionais com formação em condução defensiva e sigilo institucional."
          }
        ]}
      />
    </SubPageLayout>
  );
}
