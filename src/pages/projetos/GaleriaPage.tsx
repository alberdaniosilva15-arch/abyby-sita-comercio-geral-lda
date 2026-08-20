import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { Image, Camera, Eye, Layers } from 'lucide-react';

export function GaleriaPage() {
  const sidebarLinks = [
    { href: '/projetos/realizados', label: 'Projetos Realizados' },
    { href: '/projetos/galeria', label: 'Galeria de Imagens' },
    { href: '/projetos/testemunhos', label: 'Testemunhos' },
    { href: '/projetos/estudos-de-caso', label: 'Estudos de Caso' }
  ];
  
  const breadcrumbs = [
    { label: 'Projetos' },
    { label: 'Galeria de Imagens' }
  ];

  return (
    <SubPageLayout
      title="Galeria Fotográfica de Projetos"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Registo fotográfico das operações industriais da Abybysita"
        subtitle="Registo Visual das Nossas Operações e Equipamentos"
        description="Explore a nossa galeria fotográfica com registos de intervenções em plataformas petrolíferas, frotas de aluguer, tubagens em stock e operações de transporte pesado por toda Angola."
        features={[
          {
            icon: <Camera className="w-5 h-5 text-[#1868B8]" />,
            title: "Operações em Rope Access",
            description: "Fotografias de alta resolução de intervenções técnicas em plataformas e estruturas elevadas."
          },
          {
            icon: <Image className="w-5 h-5 text-[#1868B8]" />,
            title: "Equipamentos e Frota",
            description: "Registos detalhados da nossa frota de gruas, camiões, porta-contentores e viaturas 4x4."
          },
          {
            icon: <Layers className="w-5 h-5 text-[#1868B8]" />,
            title: "Tubagens e Armazéns",
            description: "Visão fotográfica das instalações de armazenamento e stocks de tubagens de aço carbono e inox."
          },
          {
            icon: <Eye className="w-5 h-5 text-[#1868B8]" />,
            title: "Eventos e Formação",
            description: "Registos de sessões de formação de segurança e participação em feiras e fóruns industriais."
          }
        ]}
      />
    </SubPageLayout>
  );
}
