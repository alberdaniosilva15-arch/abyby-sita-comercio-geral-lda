export interface ActivityVideo {
  id: string;
  title: string;
  category: string;
  description: string; // O campo "DIZER" com legenda e descrição profissional
  videoUrl: string;
  thumbnailUrl?: string;
  tag: string;
  row: 'top' | 'bottom'; // 'top' para a linha que roda para a direita, 'bottom' para a que roda para a esquerda
}

export const ACTIVITIES_VIDEOS: ActivityVideo[] = [
  // ── LINHA SUPERIOR (Rola para a Direita ➡️) ──────────────────────────────────
  {
    id: 'act-1',
    title: 'Porta-Máquinas e Movimentação Pesada',
    category: 'Logística & Frota Pesada',
    tag: 'LOGÍSTICA PESADA',
    description: 'Operações de transporte especializado com porta-máquinas de alta tonelagem para mobilização segura de equipamentos industriais pesados em todo o território nacional.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787317148/PORTA_containers_sem_som_wp6dw5.mp4',
    row: 'top',
  },
  {
    id: 'act-2',
    title: 'Compra de Sucatas Industriais em Grandes Quantidades',
    category: 'Metalomecânica & Reciclagem',
    tag: 'SUCATAS & FERROSOS',
    description: 'Recolha, triagem técnica e aquisição em grande escala de sucatas metálicas e estruturas desativadas, cumprindo rigorosos padrões ambientais e de conformidade.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787318488/compras_de_sucatas_bwfqrv.mp4',
    row: 'top',
  },
  {
    id: 'act-3',
    title: 'Gestão e Fornecimento de Contentores Ferrosos',
    category: 'Saneamento & Material Ferroso',
    tag: 'CONTENTORES & FERROS',
    description: 'Fornecimento e logística de contentores metálicos industriais para recolha e gestão de resíduos em estaleiros de obras públicas e instalações fabris.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787319592/compras_de_pipes_em_grande_escala_mfqrs7.mp4',
    row: 'top',
  },
  {
    id: 'act-4',
    title: 'Mobilização de Frota e Carga Marítima',
    category: 'Apoio Marítimo & Portuário',
    tag: 'APOIO MARÍTIMO',
    description: 'Manobras de atracação e transporte marítimo costeiro de mercadorias estratégicas com acompanhamento técnico contínuo.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787317148/PORTA_containers_sem_som_wp6dw5.mp4',
    row: 'top',
  },

  // ── LINHA INFERIOR (Rola para a Esquerda ⬅️) ──────────────────────────────────
  {
    id: 'act-5',
    title: 'Compra e Venda de Pipes em Grande Escala',
    category: 'Oil & Gas / Pipes & Fittings',
    tag: 'TUBAGENS DE ALTA PRESSÃO',
    description: 'Comercialização, inspeção dimensional e fornecimento a granel de tubagens de aço carbono e ligas especiais para infraestruturas de petróleo e gás.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787319592/compras_de_pipes_em_grande_escala_mfqrs7.mp4',
    row: 'bottom',
  },
  {
    id: 'act-6',
    title: 'Transporte e Distribuição Estrutural de Pipes',
    category: 'Distribuição Industrial',
    tag: 'TRANSPORTE DE TUBOS',
    description: 'Carregamento, amarração certificada e distribuição rodoviária de tubos de grande diâmetro com garantia de integridade geométrica.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787319759/vendas_de_pipes_sem_som_evxkbw.mp4',
    row: 'bottom',
  },
  {
    id: 'act-7',
    title: 'Logística Integrada e Venda de Tubagens de Aço',
    category: 'Suprimentos Industriais',
    tag: 'TUBAGENS & FITTINGS',
    description: 'Armazenamento estratégico e entrega rápida de pipes, flanges e conexões para projetos de saneamento, mineração e refinarias em Angola.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787320146/transporte_e_vendas_de_pipes_kmfudo.mp4',
    row: 'bottom',
  },
  {
    id: 'act-8',
    title: 'Operações de Içamento e Elevação Pesada',
    category: 'Equipamentos Pesados',
    tag: 'ELEVAÇÃO & GRUAS',
    description: 'Movimentação segura de cargas sobredimensionadas com recurso a gruas telescópicas e equipas de rigger qualificadas.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787319759/vendas_de_pipes_sem_som_evxkbw.mp4',
    row: 'bottom',
  },
];
