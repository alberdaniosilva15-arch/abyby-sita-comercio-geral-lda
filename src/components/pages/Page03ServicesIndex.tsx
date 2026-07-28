import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../../types';

interface PageProps {
  onNavigate: (index: number) => void;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    folio: '01',
    title: 'Oil & Gas / Rope Access',
    subtitle: 'Acesso por cordas certificado, inspeção técnica e manutenção industrial em altura.',
    targetPageIndex: 3,
  },
  {
    folio: '02',
    title: 'Aluguer & Rent-a-Car',
    subtitle: 'Navios, gruas de 50/100t, camiões trailer e frota Rent-a-Car comercial e passageiro.',
    targetPageIndex: 4,
  },
  {
    folio: '03',
    title: 'Equipamentos Pesados e Transporte',
    subtitle: 'Operações industriais, movimentação de cargas pesadas em terra e transporte marítimo.',
    targetPageIndex: 5,
  },
  {
    folio: '04',
    title: 'Fornecimento Industrial (Tubagens / Pipes)',
    subtitle: 'Venda de tubagens de aço carbono e inoxidável com certificação internacional.',
    targetPageIndex: 6,
  },
  {
    folio: '05',
    title: 'Produtos & Material Ferroso',
    subtitle: 'Talhas, balanças, containers standard e refrigerados, kits de soldadura.',
    targetPageIndex: 7,
  },
  {
    folio: '06',
    title: 'Serviço de Limpeza de Fossa',
    subtitle: 'Remoção e descarte ambientalmente responsável para setores industrial e residencial.',
    targetPageIndex: 8,
  },
  {
    folio: '07',
    title: 'Blue Energy (Parceria Oficial Simple Green)',
    subtitle: 'Soluções sustentáveis de limpeza industrial e consultoria ambiental HSE.',
    targetPageIndex: 9,
  },
];

export const Page03ServicesIndex: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full h-full min-h-[680px] bg-[#F4F7FA] text-[#071B2E] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Page Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            ÍNDICE DE SERVIÇOS & OPERAÇÕES
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[#071B2E] tracking-tight">
          Nossos Serviços
        </h2>
        <p className="font-sans text-xs md:text-sm text-slate-600 mt-1 max-w-xl">
          Selecione qualquer área de atuação para visualizar a especificação operacional detalhada.
        </p>
      </div>

      {/* Services List */}
      <div className="relative z-10 flex-1 my-2 flex flex-col justify-center divide-y divide-slate-200 border-y border-slate-200">
        {SERVICES_LIST.map((srv) => (
          <button
            key={srv.folio}
            onClick={() => onNavigate(srv.targetPageIndex)}
            className="group py-3 px-3 md:px-4 flex items-center justify-between hover:bg-white hover:shadow-md transition-all text-left rounded-lg cursor-pointer"
          >
            <div className="flex items-center gap-4 md:gap-6">
              {/* Folio Number */}
              <span className="font-mono text-sm md:text-base text-[#1868B8] font-bold bg-[#1868B8]/10 px-2.5 py-1 rounded">
                {srv.folio}
              </span>
              <div>
                <h3 className="font-sans font-bold text-sm md:text-base text-[#071B2E] group-hover:text-[#1868B8] transition-colors flex items-center gap-2">
                  {srv.title}
                </h3>
                <p className="font-sans text-xs text-slate-500 line-clamp-1">
                  {srv.subtitle}
                </p>
              </div>
            </div>

            {/* Jump Arrow */}
            <div className="w-8 h-8 rounded-full bg-slate-200 group-hover:bg-[#1868B8] flex items-center justify-center text-slate-600 group-hover:text-white transition-colors flex-shrink-0 ml-2">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 pt-4 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>SERVIÇOS DE LOGÍSTICA, MARÍTIMO & OFFSHORE</span>
        <span>7 CATEGORIAS OPERACIONAIS</span>
      </div>
    </div>
  );
};
