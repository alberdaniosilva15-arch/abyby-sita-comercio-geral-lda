export interface NavItem {
  id: string;
  label: string;
  pageIndex: number; // 0-indexed (0 to 11)
}

export interface ServiceItem {
  folio: string;
  title: string;
  subtitle: string;
  targetPageIndex?: number;
  targetPath?: string;
}

export interface ContactFormData {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  servico: string;
  mensagem: string;
}

export interface FleetSpec {
  tipo: string;
  portas?: string;
  capacidade: string;
  detalhes: string;
}

export type FoodCategory =
  'proteinas' | 'arroz-feijao-cereais' | 'frutas-horticolas' | 'essenciais' | 'kits';

export interface FoodProduct {
  id: string;
  name: string;
  category: FoodCategory;
  description: string;
  nutrients: string[];
  badge?: string;
  image?: string;
  availability: 'sob-consulta' | 'sazonal' | 'confirmar-stock';
  quoteLabel: string;
}

export interface OpenQuotePayload {
  productName: string;
  category: string;
  message: string;
}

/**
 * Documento estruturado devolvido pela IA na rota /api/enhance-quote.
 * Organiza as ideias do cliente em secções profissionais, preservando as
 * próprias palavras, quantidades e factos fornecidos pelo utilizador.
 */
export interface EnhancedQuoteDocument {
  titulo: string;
  resumo: string;
  objectivos: string[];
  requisitos: string[];
  detalhes: string;
}

declare global {
  interface WindowEventMap {
    'open-quote': CustomEvent<OpenQuotePayload>;
  }
}
