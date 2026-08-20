import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Award, ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';

export function CertificacoesPage() {
  const sidebarLinks = [
    { href: '/recursos/folheto', label: 'Folheto da Empresa' },
    { href: '/recursos/certificacoes', label: 'Certificações' },
    { href: '/recursos/normas-seguranca', label: 'Normas de Segurança' },
    { href: '/recursos/faq', label: 'FAQ' }
  ];
  
  const breadcrumbs = [
    { label: 'Recursos' },
    { label: 'Certificações' }
  ];

  return (
    <SubPageLayout
      title="Certificações e Qualidade"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Documentação e auditoria de qualidade ISO"
        subtitle="Certificações Internacionais e Padrões de Excelência"
        description="A Abybysita possui certificações rigorosas nas áreas de Gestão de Qualidade (ISO 9001), Segurança no Trabalho (ISO 45001), Gestão Ambiental (ISO 14001) e IRATA para trabalhos em altura, assegurando total conformidade internacional."
        features={[
          {
            icon: <Award className="w-5 h-5 text-[#1868B8]" />,
            title: "ISO 9001:2015",
            description: "Sistema de Gestão da Qualidade focado na melhoria contínua e satisfação total do cliente."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "ISO 45001 & ISO 14001",
            description: "Padrões internacionais de Segurança e Saúde Ocupacional e Gestão Ambiental responsável."
          },
          {
            icon: <CheckCircle2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Certificação IRATA International",
            description: "Habilitação oficial de técnicos para intervenções seguras em Rope Access no sector petrolífero."
          },
          {
            icon: <FileCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Rastreabilidade e Auditoria",
            description: "Processos internos submetidos a auditorias periódicas independentes de conformidade."
          }
        ]}
      />
    </SubPageLayout>
  );
}
