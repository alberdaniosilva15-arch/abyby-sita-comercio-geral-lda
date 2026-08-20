import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Flame, Anchor, ShieldCheck, Wrench } from 'lucide-react';

export function OilGasPage() {
  const sidebarLinks = [
    { href: '/industrias/oil-gas', label: 'Oil & Gas' },
    { href: '/industrias/construcao', label: 'Construção' },
    { href: '/industrias/mineracao', label: 'Mineração' },
    { href: '/industrias/logistica', label: 'Logística' },
    { href: '/industrias/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Indústrias' },
    { label: 'Oil & Gas' }
  ];

  return (
    <SubPageLayout
      title="Soluções para Oil & Gas"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="/images/industrias/oil-gas.jpg"
        heroImageAlt="Plataforma petrolífera offshore e operações de exploração de Oil & Gas em Angola"
        subtitle="Soluções Integradas para a Indústria Petrolífera e de Gás"
        description="A Abybysita é um parceiro estratégico para as concessionárias e prestadoras de serviços do sector de Oil & Gas em Angola. Oferecemos intervenções de Rope Access certificadas, fornecimento de tubagens API, aluguer de equipamentos e soluções de apoio marítimo."
        features={[
          {
            icon: <Flame className="w-5 h-5 text-[#1868B8]" />,
            title: "Suporte Offshore e Onshore",
            description: "Serviços técnicos especializados para plataformas de exploração, FPSOs e refinarias terrestres."
          },
          {
            icon: <Anchor className="w-5 h-5 text-[#1868B8]" />,
            title: "Rope Access Certificado IRATA",
            description: "Inspeções NDT, pintura industrial e manutenção em altura sem necessidade de andaimes."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Pipes & Fittings API / ASTM",
            description: "Fornecimento prioritário de tubagens e conexões de alta pressão resistentes à corrosão."
          },
          {
            icon: <Wrench className="w-5 h-5 text-[#1868B8]" />,
            title: "Aluguer de Equipamentos Pesados",
            description: "Frota de gruas, camiões e embarcações para logística e movimentação de cargas petrolíferas."
          }
        ]}
      />
    </SubPageLayout>
  );
}
