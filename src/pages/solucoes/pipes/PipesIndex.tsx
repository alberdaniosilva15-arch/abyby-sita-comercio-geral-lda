import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { Page07IndustrialSupply } from '../../../components/pages/Page07IndustrialSupply';

export function PipesIndex() {
  const sidebarLinks = [
    { href: '/solucoes/venda-pipes/aco-carbono', label: 'Aço Carbono' },
    { href: '/solucoes/venda-pipes/aco-inoxidavel', label: 'Aço Inoxidável' },
    { href: '/solucoes/venda-pipes/outros-materiais', label: 'Outros Materiais & Ligas' }
  ];

  const breadcrumbs = [
    { label: 'Nossas Soluções', href: '/#servicos' },
    { label: 'Vendas de Pipes' }
  ];

  return (
    <SubPageLayout
      title="Vendas de Pipes & Tubagens Industriais"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
        <Page07IndustrialSupply />
      </div>
    </SubPageLayout>
  );
}
