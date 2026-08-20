import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { Page06HeavyEquipment } from '../../../components/pages/Page06HeavyEquipment';

export function CamioesTrailerPage() {
  const sidebarLinks = [
  {
    "href": "/solucoes/aluguer-equipamentos/gruas",
    "label": "Gruas"
  },
  {
    "href": "/solucoes/aluguer-equipamentos/camioes-trailer",
    "label": "Camiões Trailer"
  },
  {
    "href": "/solucoes/aluguer-equipamentos/transportes-maritimos",
    "label": "Transportes Marítimos"
  },
  {
    "href": "/solucoes/aluguer-equipamentos/porta-contentores",
    "label": "Porta-Contentores"
  },
  {
    "href": "/solucoes/aluguer-equipamentos/governo-instituicoes",
    "label": "Governo e Instituições"
  }
];
  
  const breadcrumbs = [
    { label: 'Aluguer de Equipamentos' },
    { label: 'Camiões Trailer' }
  ];

  return (
    <SubPageLayout
      title="Camiões Trailer"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
        <Page06HeavyEquipment />
      </div>
    </SubPageLayout>
  );
}
