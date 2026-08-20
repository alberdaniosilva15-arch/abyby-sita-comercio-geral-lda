import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { Page10BlueEnergy } from '../../../components/pages/Page10BlueEnergy';

export function IndustrialPage() {
  const sidebarLinks = [
  {
    "href": "/solucoes/limpeza/comercial",
    "label": "Comercial"
  },
  {
    "href": "/solucoes/limpeza/industrial",
    "label": "Industrial"
  },
  {
    "href": "/solucoes/limpeza/fossa",
    "label": "Limpeza de Fossa"
  }
];
  
  const breadcrumbs = [
    { label: 'Limpeza' },
    { label: 'Industrial' }
  ];

  return (
    <SubPageLayout
      title="Industrial"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
        <Page10BlueEnergy />
      </div>
    </SubPageLayout>
  );
}
