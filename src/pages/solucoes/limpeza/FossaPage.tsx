import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { Page09SepticService } from '../../../components/pages/Page09SepticService';

export function FossaPage() {
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
    { label: 'Limpeza de Fossa' }
  ];

  return (
    <SubPageLayout
      title="Limpeza de Fossa"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
        <Page09SepticService />
      </div>
    </SubPageLayout>
  );
}
