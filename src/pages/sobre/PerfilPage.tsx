import { SubPageLayout } from '../../layouts/SubPageLayout';
import { Page11WhyChooseUs } from '../../components/pages/Page11WhyChooseUs';

export function PerfilPage() {
  const sidebarLinks = [
  {
    "href": "/sobre/perfil",
    "label": "Perfil da Empresa"
  },
  {
    "href": "/sobre/missao-visao-valores",
    "label": "Missão, Visão e Valores"
  },
  {
    "href": "/sobre/industrias",
    "label": "As Nossas Indústrias"
  },
  {
    "href": "/sobre/setores-atuacao",
    "label": "Setores de Atuação"
  },
  {
    "href": "/sobre/setores-atuacao/equipamentos-industriais",
    "label": "Equipamentos Industriais"
  },
  {
    "href": "/sobre/setores-atuacao/frescos-bens-alimentares",
    "label": "Frescos e Bens Alimentares"
  }
];
  
  const breadcrumbs = [
    { label: 'Sobre Nós' },
    { label: 'Perfil da Empresa' }
  ];

  return (
    <SubPageLayout
      title="Perfil da Empresa"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
        <Page11WhyChooseUs />
      </div>
    </SubPageLayout>
  );
}
