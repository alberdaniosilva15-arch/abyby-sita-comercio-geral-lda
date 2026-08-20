import { SubPageLayout } from '../../../layouts/SubPageLayout';
import { ServicePageContent } from '../../../components/ServicePageContent';
import { Box, Truck, MapPin, FastForward } from 'lucide-react';

export function PortaContentoresPage() {
  const sidebarLinks = [
    { href: '/solucoes/aluguer-equipamentos/gruas', label: 'Gruas' },
    { href: '/solucoes/aluguer-equipamentos/camioes-trailer', label: 'Camiões Trailer' },
    { href: '/solucoes/aluguer-equipamentos/transportes-maritimos', label: 'Transportes Marítimos' },
    { href: '/solucoes/aluguer-equipamentos/porta-contentores', label: 'Porta-Contentores' },
    { href: '/solucoes/aluguer-equipamentos/governo-instituicoes', label: 'Governo e Instituições' }
  ];
  
  const breadcrumbs = [
    { label: 'Aluguer de Equipamentos' },
    { label: 'Porta-Contentores' }
  ];

  return (
    <SubPageLayout
      title="Camiões Porta-Contentores"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1586528116311-ad8ed7453303?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Camião porta-contentores num terminal logístico"
        subtitle="Transporte Terrestre Eficiente de Contentores"
        description="Oferecemos soluções de transporte rodoviário de contentores marítimos (20ft, 40ft e High Cube) entre portos, bases logísticas e as instalações dos clientes. A nossa frota pesada é moderna, mantida com rigor e rastreada por GPS."
        features={[
          {
            icon: <Truck className="w-5 h-5 text-[#1868B8]" />,
            title: "Frota Especializada",
            description: "Cavalos mecânicos e atrelados porta-contentores adequados a todos os tipos de contentores standard e refrigerados (reefers)."
          },
          {
            icon: <MapPin className="w-5 h-5 text-[#1868B8]" />,
            title: "Rastreio em Tempo Real",
            description: "Monitorização GPS contínua para garantir a segurança da carga e fornecer estimativas precisas de chegada."
          },
          {
            icon: <Box className="w-5 h-5 text-[#1868B8]" />,
            title: "Cargas Diversas",
            description: "Capacidade para transportar carga geral, mercadorias perigosas (ADR) e bens alimentares com temperatura controlada."
          },
          {
            icon: <FastForward className="w-5 h-5 text-[#1868B8]" />,
            title: "Eficiência Portuária",
            description: "Experiência consolidada em operações nos principais terminais portuários para levantamento e entrega rápida."
          }
        ]}
      />
    </SubPageLayout>
  );
}
