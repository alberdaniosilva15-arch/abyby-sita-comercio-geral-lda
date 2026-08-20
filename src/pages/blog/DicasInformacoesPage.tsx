import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Lightbulb, FileText, HelpCircle, CheckCircle2 } from 'lucide-react';

export function DicasInformacoesPage() {
  const sidebarLinks = [
    { href: '/blog/noticias', label: 'Notícias' },
    { href: '/blog/artigos-setores', label: 'Artigos dos Setores' },
    { href: '/blog/dicas-informacoes', label: 'Dicas e Informações' }
  ];
  
  const breadcrumbs = [
    { label: 'Blog' },
    { label: 'Dicas e Informações' }
  ];

  return (
    <SubPageLayout
      title="Dicas e Informações"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Guias técnicos, dicas e informações úteis da Abybysita"
        subtitle="Guias Práticos e Recomendações Técnicas"
        description="Conselhos práticos, guias de manutenção e recomendações de segurança para otimizar os seus projetos industriais, operacionais e de aluguer de equipamentos em Angola."
        features={[
          {
            icon: <Lightbulb className="w-5 h-5 text-[#1868B8]" />,
            title: "Manutenção Preventiva de Equipamentos",
            description: "Dicas essenciais para aumentar o tempo de vida útil e rentabilidade de máquinas e frotas de elevação."
          },
          {
            icon: <FileText className="w-5 h-5 text-[#1868B8]" />,
            title: "Guias de Seleção de Tubagens",
            description: "Passo a passo para dimensionar e encomendar o tipo correto de tubos e conexões industriais segundo normas internacionais."
          },
          {
            icon: <HelpCircle className="w-5 h-5 text-[#1868B8]" />,
            title: "Recomendações para Aluguer de Viaturas",
            description: "Tudo o que precisa de saber para contratar veículos ligeiros, SUVs e vans comerciais para frotas corporativas."
          },
          {
            icon: <CheckCircle2 className="w-5 h-5 text-[#1868B8]" />,
            title: "Checklists de Segurança no Trabalho",
            description: "Boas práticas de SST para inspeções diárias em trabalhos em altura, instalações offshore e limpezas industriais."
          }
        ]}
      />
    </SubPageLayout>
  );
}

