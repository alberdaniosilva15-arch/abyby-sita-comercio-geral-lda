export interface ActivityVideo {
  id: string;
  title: string;
  category: string;
  description: string; // Legenda/descrição técnica ("DIZER")
  videoUrl: string;
  tag: string;
  row: 'top' | 'bottom';
}

export const ACTIVITIES_VIDEOS: ActivityVideo[] = [
  // ── LINHA SUPERIOR (Frota, Autocarros, Gruas & Movimentação Pesada) ────────
  {
    id: 'act-porta-maquinas',
    title: 'Porta-Máquinas e Movimentação Pesada',
    category: 'Logística & Frota Pesada',
    tag: 'FROTA & CARGA PESADA',
    description: 'Operações de mobilização especializada com porta-máquinas de alta tonelagem para transporte seguro de equipamentos industriais pesados.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787317148/PORTA_containers_sem_som_wp6dw5.mp4',
    row: 'top',
  },
  {
    id: 'act-autocarros-frota',
    title: 'Aluguer de Autocarros para Transporte Corporativo',
    category: 'Transporte de Pessoal',
    tag: 'FROTA DE PASSAGEIROS',
    description: 'Disponibilização de autocarros modernos e climatizados para transporte de equipas industriais, delegações e logística de pessoal em Luanda e províncias.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787320267/autocarros_sem_som_xdxaci.mp4',
    row: 'top',
  },
  {
    id: 'act-autocarros-interior',
    title: 'Conforto e Segurança no Transporte de Equipas',
    category: 'Logística de Pessoal',
    tag: 'TRANSPORTE EXECUTIVO',
    description: 'Interior equipado com elevados padrões de ergonomia, cintos de segurança certificados e climatização contínua para viagens de curta e longa distância.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787327361/autocarros_sem_som2_xkeniv.mp4',
    row: 'top',
  },
  {
    id: 'act-aluguer-gruas',
    title: 'Aluguer de Gruas e Máquinas Pesadas',
    category: 'Equipamentos Pesados',
    tag: 'ELEVAÇÃO & GRUAS',
    description: 'Içamento técnico e elevação de cargas industriais com gruas certificadas e operadores qualificados para operações de alta complexidade em obra.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787327102/aluguer_de_maquinas_sem_son_webiq3.mp4',
    row: 'top',
  },

  // ── LINHA INFERIOR (Pipes, Sucatas, Tubagens & Distribuição) ───────────────
  {
    id: 'act-sucatas',
    title: 'Compra de Sucatas em Grandes Quantidades',
    category: 'Metalomecânica & Reciclagem',
    tag: 'RECICLAGEM & SUCATAS',
    description: 'Triagem, recolha técnica e aquisição industrial em grande escala de sucatas ferrosas e estruturas metálicas desativadas.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787318488/compras_de_sucatas_bwfqrv.mp4',
    row: 'bottom',
  },
  {
    id: 'act-pipes-escala',
    title: 'Compra e Venda de Pipes em Grande Escala',
    category: 'Oil & Gas / Tubagens',
    tag: 'PIPES & FITTINGS',
    description: 'Comercialização a granel de tubagens de aço carbono e ligas especiais para infraestruturas petrolíferas e industriais.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787319592/compras_de_pipes_em_grande_escala_mfqrs7.mp4',
    row: 'bottom',
  },
  {
    id: 'act-transporte-pipes',
    title: 'Transporte e Distribuição de Pipes',
    category: 'Transporte Industrial',
    tag: 'LOGÍSTICA DE TUBOS',
    description: 'Carregamento e distribuição rodoviária de tubos com amarração técnica certificada para garantir total estabilidade e integridade.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787319759/vendas_de_pipes_sem_som_evxkbw.mp4',
    row: 'bottom',
  },
  {
    id: 'act-vendas-pipes',
    title: 'Transporte e Vendas de Tubagens Estruturais',
    category: 'Suprimentos Estruturais',
    tag: 'TUBAGENS INDUSTRIAIS',
    description: 'Logística integrada e fornecimento de tubagens estruturais de alta resistência para projetos de engenharia e construção.',
    videoUrl: 'https://res.cloudinary.com/vgxylpmd/video/upload/v1787320146/transporte_e_vendas_de_pipes_kmfudo.mp4',
    row: 'bottom',
  },
];

/**
 * Gera URL de poster JPG ultra-leve a partir de vídeo do Cloudinary
 */
export function getVideoPosterUrl(videoUrl: string): string {
  if (videoUrl.includes('cloudinary.com') && videoUrl.endsWith('.mp4')) {
    return videoUrl
      .replace('/upload/', '/upload/so_1.5,w_450,c_scale,q_auto,f_auto/')
      .replace('.mp4', '.jpg');
  }
  return '';
}
