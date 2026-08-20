import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { Page06HeavyEquipment } from '../../../components/pages/Page06HeavyEquipment';

export function AluguerIndex() {
  const sidebarLinks = [
    { href: '/solucoes/aluguer-equipamentos/gruas', label: 'Gruas' },
    { href: '/solucoes/aluguer-equipamentos/camioes-trailer', label: 'Camiões Trailer' },
    { href: '/solucoes/aluguer-equipamentos/porta-contentores', label: 'Porta-Contentores' },
    { href: '/solucoes/aluguer-equipamentos/transportes-maritimos', label: 'Transportes Marítimos' },
    { href: '/solucoes/aluguer-equipamentos/governo-instituicoes', label: 'Governo e Instituições' }
  ];

  const breadcrumbs = [
    { label: 'Nossas Soluções', href: '/#servicos' },
    { label: 'Aluguer de Equipamentos' }
  ];

  return (
    <SubPageLayout
      title="Aluguer de Equipamentos Pesados & Maquinaria"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/50">
        <Page06HeavyEquipment />
      </div>
    </SubPageLayout>
  );
}
