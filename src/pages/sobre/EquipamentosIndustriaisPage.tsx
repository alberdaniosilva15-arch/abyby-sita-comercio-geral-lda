import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { ImageWithLoader } from '../../components/ImageWithLoader';
import { ShieldCheck, Cog, Package, Truck, Award } from 'lucide-react';
import equipamentosMateriaisImg from '../../assets/images/equipamentos_materiais.png';

export function EquipamentosIndustriaisPage() {
  const sidebarLinks = [
    { href: '/sobre/perfil', label: 'Perfil da Empresa' },
    { href: '/sobre/missao-visao-valores', label: 'Missão, Visão e Valores' },
    { href: '/sobre/industrias', label: 'As Nossas Indústrias' },
    { href: '/sobre/setores-atuacao', label: 'Setores de Atuação' },
    { href: '/sobre/setores-atuacao/equipamentos-industriais', label: 'Equipamentos Industriais' },
    { href: '/sobre/setores-atuacao/frescos-bens-alimentares', label: 'Frescos e Bens Alimentares' }
  ];
  
  const breadcrumbs = [
    { label: 'Sobre Nós' },
    { label: 'Setores de Atuação', href: '/sobre/setores-atuacao' },
    { label: 'Equipamentos Industriais' }
  ];

  return (
    <SubPageLayout
      title="Equipamentos Industriais"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Equipamentos industriais pesados em armazém"
        subtitle="Fornecimento de Equipamentos e Material Ferroso para a Indústria Angolana"
        description="A Abybysita — Comércio Geral, LDA dispõe de uma linha completa de fornecimento de equipamentos industriais e material ferroso para estaleiros, projectos de mineração, bases petrolíferas e construção civil em Angola. Trabalhamos com fabricantes reconhecidos e garantimos produtos de qualidade, com certificados de conformidade e normas internacionais em vigor."
        secondaryDescription="Do planeamento à entrega, a nossa equipa assegura o fornecimento atempado de máquinas, ferramentas e materiais, acompanhando cada cliente em todo o processo de aquisição e logística."
        features={[
          {
            icon: <Package className="w-5 h-5 text-[#1868B8]" />,
            title: "Catálogo Industrial Completo",
            description: "Máquinas, ferramentas, tubagens e material ferroso para os mais variados sectores industriais."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Certificação e Conformidade",
            description: "Todos os produtos acompanham certificados de garantia e conformidade com as normas internacionais em vigor."
          },
          {
            icon: <Cog className="w-5 h-5 text-[#1868B8]" />,
            title: "Adequação ao Projeto",
            description: "Seleção de equipamentos adaptada às especificidades técnicas de cada obra e sector de atuação."
          },
          {
            icon: <Truck className="w-5 h-5 text-[#1868B8]" />,
            title: "Logística e Entrega",
            description: "Coordenação logística que garante a disponibilidade dos materiais no local e no prazo pretendido."
          },
          {
            icon: <Award className="w-5 h-5 text-[#1868B8]" />,
            title: "Parceiros Reconhecidos",
            description: "Fornecimento garantido através de rede consolidada de fabricantes e distribuidores de confiança."
          },
          {
            icon: <ShieldCheck className="w-5 h-5 text-[#1868B8]" />,
            title: "Apoio Técnico",
            description: "Acompanhamento técnico na escolha, utilização e manutenção dos equipamentos fornecidos."
          }
        ]}
      />

      <div className="mt-10 rounded-2xl overflow-hidden border border-[#7E92A6]/20 bg-white/[0.03]">
        <div className="p-6 md:p-10">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#1868B8] font-semibold mb-6">
            Catálogo de Produtos & Equipamentos
          </h3>
          <div className="rounded-xl overflow-hidden border border-[#7E92A6]/20 bg-white p-2">
            <ImageWithLoader
              src={equipamentosMateriaisImg}
              alt="Equipamentos e Materiais Industriais em Angola"
              imageClassName="w-full h-auto object-contain"
            />
          </div>
          <div className="mt-6 flex items-start gap-2 text-xs font-mono text-[#7E92A6] bg-white/[0.04] p-4 rounded-lg border border-[#7E92A6]/10">
            <ShieldCheck className="w-5 h-5 text-[#1868B8] shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Todos os produtos industriais acompanham certificados de garantia e conformidade com as normas internacionais em vigor.
            </span>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}