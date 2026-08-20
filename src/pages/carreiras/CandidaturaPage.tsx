import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Send, ShieldCheck, UserCheck, Mail } from 'lucide-react';

export function CandidaturaPage() {
  const sidebarLinks = [
    { href: '/carreiras/vagas', label: 'Vagas' },
    { href: '/carreiras/candidatura', label: 'Enviar Candidatura' }
  ];
  
  const breadcrumbs = [
    { label: 'Carreiras' },
    { label: 'Enviar Candidatura' }
  ];

  return (
    <SubPageLayout
      title="Enviar Candidatura"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Processo de submissão de candidatura e seleção de pessoal"
        subtitle="Processo de Seleção e Submissão de CV"
        description="Submeta a sua candidatura espontânea ou responda a um anúncio de vaga na Abybysita. Valorizamos profissionais qualificados, orientados para a segurança, rigor técnico e excelência no trabalho."
        features={[
          {
            icon: <Send className="w-5 h-5 text-[#1868B8]" />,
            title: "Submissão de Candidatura Espontânea",
            description: "Envie o seu Curriculum Vitae atualizado e cartas de recomendação para a nossa equipa de Recursos Humanos."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Validação de Certificados Técnicos",
            description: "Análise cuidada de credenciais profissionais tais como certificações IRATA, manobrador de gruas, HSE ou soldadura."
          },
          {
            icon: <UserCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Entrevistas e Avaliação de Competências",
            description: "Processo de recrutamento transparente com foco no perfil técnico, ético e na capacidade de trabalho em equipa."
          },
          {
            icon: <Mail className="w-5 h-5 text-[#1868B8]" />,
            title: "Bolsa de Talentos Contínua",
            description: "Mesmo sem vagas imediatas para a sua área, mantemos o seu perfil na nossa base de dados para recrutamentos futuros."
          }
        ]}
      />
    </SubPageLayout>
  );
}

