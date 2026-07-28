export interface NavItem {
  id: string;
  label: string;
  pageIndex: number; // 0-indexed (0 to 11)
}

export interface ServiceItem {
  folio: string;
  title: string;
  subtitle: string;
  targetPageIndex: number;
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
