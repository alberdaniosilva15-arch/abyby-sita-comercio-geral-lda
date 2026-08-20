import { Link } from 'react-router-dom';
import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ImageWithLoader } from '../../components/ImageWithLoader';
import { ArrowRight, Cog, Apple } from 'lucide-react';
import equipamentosMateriaisImg from '../../assets/images/equipamentos_materiais.png';

export function SetoresAtuacaoPage() {
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
    { label: 'Setores de Atuação' }
  ];

  const cards = [
    {
      href: '/sobre/setores-atuacao/equipamentos-industriais',
      title: 'Equipamentos Industriais',
      tag: 'CATÁLOGO DE PRODUTOS & EQUIPAMENTOS',
      description:
        'Linha completa de fornecimento de equipamentos industriais e material ferroso para estaleiros, mineração, bases petrolíferas e construção civil em Angola.',
      features: ['Maquinaria e ferramentas', 'Material ferroso e tubagens', 'Certificados de conformidade'],
      image: equipamentosMateriaisImg,
      imageAlt: 'Equipamentos industriais pesados em armazém',
      icon: Cog,
    },
    {
      href: '/sobre/setores-atuacao/frescos-bens-alimentares',
      title: 'Frescos e Bens Alimentares',
      tag: 'ABASTECIMENTO ESSENCIAL',
      description:
        'Fornecimento de frescos e bens alimentares essenciais: arroz, feijão, proteínas, hortícolas, frutas e kits de abastecimento periódico.',
      features: ['Cereais e leguminosas', 'Proteínas e hortícolas', 'Kits e fornecimento periódico'],
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Mercado de frescos, frutas e legumes tropicais',
      icon: Apple,
    },
  ];

  return (
    <SubPageLayout
      title="Setores de Atuação"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            to={card.href}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#7E92A6]/20 bg-white/[0.03] transition-all duration-300 hover:border-[#1868B8]/40 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(24,104,184,0.15)]"
          >
            <div className="relative h-44 overflow-hidden">
              <ImageWithLoader
                src={card.image}
                alt={card.imageAlt}
                imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-[#071B2E]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 font-semibold mb-1">
                  {card.tag}
                </p>
                <h3 className="font-display font-bold text-white text-lg md:text-xl tracking-tight">
                  {card.title}
                </h3>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <p className="text-sm text-[#B0C4D8] leading-relaxed mb-5">
                {card.description}
              </p>
              <ul className="space-y-2 mb-6">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-[#7E92A6]">
                    <card.icon className="w-4 h-4 text-[#1868B8] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-[#1868B8] group-hover:text-cyan-300 transition-colors">
                <span>Explorar Secção</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SubPageLayout>
  );
}