import { useState } from 'react';
import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ServicePageContent } from '../../components/ServicePageContent';
import { FreshFoodTrigger } from '../../components/fresh-food/FreshFoodTrigger';
import { FreshFoodDrawer } from '../../components/fresh-food/FreshFoodDrawer';
import { Apple, Fish, Wheat, ShoppingBasket } from 'lucide-react';

export function FrescosBensAlimentaresPage() {
  const [isFreshFoodOpen, setIsFreshFoodOpen] = useState(false);

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
    { label: 'Frescos e Bens Alimentares' }
  ];

  return (
    <SubPageLayout
      title="Frescos e Bens Alimentares"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <ServicePageContent
        heroImage="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
        heroImageAlt="Mercado de frescos com frutas e legumes tropicais"
        subtitle="Abastecimento Essencial — Energia para Cada Dia"
        description="A Abybysita — Comércio Geral, LDA assegura o fornecimento de frescos e bens alimentares essenciais, incluindo arroz, feijão, proteínas, hortícolas, frutas e géneros de primeira necessidade. O nosso serviço está desenhado para garantir a regularidade e a qualidade no abastecimento de residências, estaleiros, empresas e instituições."
        secondaryDescription="Explore o nosso catálogo completo de produtos alimentares, kits de refeição e soluções de abastecimento periódico, com abertura ao cliente através de um pedido de cotação simplificado."
        features={[
          {
            icon: <Wheat className="w-5 h-5 text-[#1868B8]" />,
            title: "Cereais e Leguminosas",
            description: "Arroz, feijão, massas e cereais de primeira qualidade para consumo diário e institucional."
          },
          {
            icon: <Fish className="w-5 h-5 text-[#1868B8]" />,
            title: "Proteínas",
            description: "Peixe, carne, ovos e outras fontes de proteína com controlo de frescura e procedência."
          },
          {
            icon: <Apple className="w-5 h-5 text-[#1868B8]" />,
            title: "Hortícolas e Frutas",
            description: "Seleção de frutas e vegetais tropicais frescos, com rotatividade garantida de stocks."
          },
          {
            icon: <ShoppingBasket className="w-5 h-5 text-[#1868B8]" />,
            title: "Kits e Abastecimento",
            description: "Kits de refeição configuráveis e planos de fornecimento periódico para equipas e empresas."
          }
        ]}
      />

      <div className="mt-10 flex flex-col items-center">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[#1868B8] font-semibold mb-6 text-center">
          Explorar o Catálogo de Frescos e Bens Alimentares
        </h3>
        <div className="w-full max-w-md">
          <FreshFoodTrigger onClick={() => setIsFreshFoodOpen(true)} />
        </div>
      </div>

      <FreshFoodDrawer isOpen={isFreshFoodOpen} onClose={() => setIsFreshFoodOpen(false)} />
    </SubPageLayout>
  );
}