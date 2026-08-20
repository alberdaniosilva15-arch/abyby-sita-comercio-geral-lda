import { Page04RopeAccess } from '../../../components/pages/Page04RopeAccess';
import { SubPageLayout } from '../../../layouts/SubPageLayout';

export function RopeAccessIndex() {
  const sidebarLinks = [
    { href: '/offshore/rope-access/inspecao', label: 'Inspeção' },
    { href: '/offshore/rope-access/manutencao', label: 'Manutenção' },
    { href: '/offshore/rope-access/limpeza-pintura', label: 'Limpeza e Pintura' },
    { href: '/offshore/rope-access/montagem-reparacao', label: 'Montagem e Reparação' },
    { href: '/offshore/rope-access/governo-instituicoes', label: 'Governo e Instituições' },
  ];

  return (
    <SubPageLayout 
      title="Rope Access" 
      breadcrumbs={[
        { label: 'Offshore' },
        { label: 'Rope Access' }
      ]}
      sidebarLinks={sidebarLinks}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
        <Page04RopeAccess />
      </div>
    </SubPageLayout>
  );
}
