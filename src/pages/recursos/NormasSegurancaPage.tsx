import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { ShieldCheck, HardHat, AlertTriangle, CheckSquare } from 'lucide-react';

export function NormasSegurancaPage() {
  const sidebarLinks = [
    { href: '/recursos/folheto', label: 'Folheto da Empresa' },
    { href: '/recursos/certificacoes', label: 'Certificações' },
    { href: '/recursos/normas-seguranca', label: 'Normas de Segurança' },
    { href: '/recursos/faq', label: 'FAQ' }
  ];
  
  const breadcrumbs = [
    { label: 'Recursos' },
    { label: 'Normas de Segurança' }
  ];

  return (
    <SubPageLayout
      title="Normas e Política de Segurança (HSE)"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Técnicos equipados com EPIs industriais e equipamentos de segurança"
        subtitle="Compromisso Incondicional com a Política 'Zero Acidentes'"
        description="A segurança e saúde no trabalho são a prioridade máxima em todas as nossas operações industriais, offshore e terrestres. Aplicamos os mais exigentes protocolos internacionais de prevenção e gestão de risco."
        features={[
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Política Zero Acidentes",
            description: "Cultura de prevenção focada na eliminação proativa de riscos e perigos nos locais de trabalho."
          },
          {
            icon: <HardHat className="w-5 h-5 text-[#1868B8]" />,
            title: "Uso de EPIs Certificados",
            description: "Equipamentos de Proteção Individual e Coletiva homologados pelas autoridades internacionais."
          },
          {
            icon: <AlertTriangle className="w-5 h-5 text-[#1868B8]" />,
            title: "Análise de Risco Prévias (APR)",
            description: "Avaliação minuciosa de cada tarefa antes da sua execução, garantindo procedimentos seguros."
          },
          {
            icon: <CheckSquare className="w-5 h-5 text-[#1868B8]" />,
            title: "Formação e Treino Contínuo",
            description: "Capacitação regular dos nossos técnicos em primeiros socorros, salvamento e segurança em altura."
          }
        ]}
      />
    </SubPageLayout>
  );
}
