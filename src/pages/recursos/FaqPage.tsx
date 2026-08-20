import { useState } from 'react';
import { SubPageLayout } from '../../layouts/SubPageLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: 'Como solicitar um orçamento?',
    answer:
      'Pode solicitar um orçamento através do formulário de contacto no nosso site, por e-mail para comercial@abybysita.com ou ligando directamente para +244 923 456 789. A nossa equipa comercial responde em até 24 horas úteis.',
  },
  {
    question: 'Quais os prazos de resposta a propostas comerciais?',
    answer:
      'Respondemos a todas as solicitações comerciais no prazo máximo de 24 horas úteis. Para operações offshore urgentes, disponibilizamos contacto directo com o departamento de operações.',
  },
  {
    question: 'Os vossos técnicos de Rope Access possuem certificação IRATA?',
    answer:
      'Sim. Todos os técnicos de Acesso por Cordas da Abyby Sita são certificados pela IRATA International (níveis 1, 2 e 3) e cumprem os protocolos HSE exigidos pela indústria Oil & Gas em Angola.',
  },
  {
    question: 'Quais os tipos de tubagens disponíveis em stock?',
    answer:
      'Mantemos em stock tubagens em aço carbono (ASTM A106 Gr. B, A53) e aço inoxidável (304/316L), com diâmetros de 1/2" a 36" e schedules de SCH 40 a XXS. Contacte-nos para a disponibilidade de medidas específicas.',
  },
  {
    question: 'Disponibilizam aluguer de gruas com operador?',
    answer:
      'Sim. Oferecemos aluguer de gruas com ou sem operador (rigger) certificado. As nossas gruas têm capacidades de 25T a 250T e são inspeccionadas periodicamente conforme as normas de segurança.',
  },
  {
    question: 'Operam em que zonas de Angola?',
    answer:
      'A sede é em Talatona, Luanda. Temos capacidade de operação em todo o território nacional, incluindo Soyo, Cabinda, Lobito e Namibe. Para operações offshore, prestamos serviço nos blocos de concessão activos.',
  },
  {
    question: 'Fornecem EPIs certificados?',
    answer:
      'Sim. Fornecemos Equipamentos de Protecção Individual certificados para trabalho em altura, ambientes industriais e marítimos: capacetes, arneses, calçado ignífugo, protecção respiratória, óculos e luvas.',
  },
  {
    question: 'Como funciona o serviço de Rent-a-Car corporativo?',
    answer:
      'Disponibilizamos SUVs, pick-ups 4x4 e viaturas comerciais em regime de aluguer mensal ou por projecto, com manutenção incluída. O serviço é vocacionado para empresas com operações em campo.',
  },
];

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sidebarLinks = [
    { href: '/recursos/folheto', label: 'Folheto da Empresa' },
    { href: '/recursos/certificacoes', label: 'Certificações' },
    { href: '/recursos/normas-seguranca', label: 'Normas de Segurança' },
    { href: '/recursos/faq', label: 'FAQ' },
  ];

  const breadcrumbs = [{ label: 'Recursos' }, { label: 'FAQ' }];

  return (
    <SubPageLayout title="Perguntas Frequentes" breadcrumbs={breadcrumbs} sidebarLinks={sidebarLinks}>
      <div className="w-full flex flex-col gap-0 rounded-2xl overflow-hidden border border-[#7E92A6]/20 bg-white/[0.03]">
        {/* Header */}
        <div className="p-6 md:p-10 border-b border-[#7E92A6]/15">
          <p className="font-mono text-xs uppercase tracking-widest text-[#1868B8] font-semibold mb-3">
            Recursos
          </p>
          <h2 className="font-display text-xl md:text-2xl text-white/90 font-bold mb-2">
            Questões frequentes sobre os nossos serviços
          </h2>
          <p className="text-[#B0C4D8] text-sm md:text-base leading-relaxed max-w-3xl">
            Respostas directas sobre Rope Access, aluguer de equipamentos, fornecimento de tubagens,
            operações offshore e outros serviços prestados pela Abyby Sita em Angola.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-[#7E92A6]/15">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left px-6 md:px-10 py-5 flex flex-col gap-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display font-bold text-sm md:text-base text-white">
                    {faq.question}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#1868B8] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#7E92A6] flex-shrink-0" />
                  )}
                </div>
                {isOpen && (
                  <p className="text-[#B0C4D8] text-sm leading-relaxed mt-3 pr-8">
                    {faq.answer}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </SubPageLayout>
  );
}
