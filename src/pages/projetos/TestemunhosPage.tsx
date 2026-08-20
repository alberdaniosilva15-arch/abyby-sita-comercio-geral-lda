import { SubPageLayout } from '../../layouts/SubPageLayout';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  sector: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'A equipa da Abyby Sita concluiu a campanha de inspecção NDT no nosso FPSO dentro do prazo acordado. Os técnicos IRATA demonstraram bom domínio dos procedimentos de segurança em altura.',
    name: 'Eng. Manuel Domingos',
    role: 'Coordenador de Manutenção Offshore',
    company: 'Operadora de E&P — Bloco 17',
    sector: 'Oil & Gas',
  },
  {
    quote:
      'Alugámos uma grua de 100T durante 3 semanas para elevação de módulos no porto de Luanda. O equipamento chegou ao local no dia combinado e o rigger era experiente.',
    name: 'Carlos Mendes',
    role: 'Gestor de Obra',
    company: 'Construtora de Infra-Estruturas Portuárias',
    sector: 'Construção',
  },
  {
    quote:
      'A qualidade das viaturas 4x4 disponibilizadas para o transporte da equipa de engenheiros entre Luanda e o Soyo foi satisfatória. Mantivemos o contrato por mais dois trimestres.',
    name: 'Ana Beatriz Ferreira',
    role: 'Directora de Operações',
    company: 'Empresa de Serviços Integrados',
    sector: 'Logística',
  },
  {
    quote:
      'Forneceram-nos 200 metros de tubagem SCH 80 em aço carbono A106 Gr. B com certificados 3.1 dentro de 10 dias úteis. A documentação estava completa e o material conforme.',
    name: 'Eng. Paulo Rodrigues',
    role: 'Responsável de Procurement',
    company: 'Projecto de Refinação Industrial',
    sector: 'Indústria',
  },
];

export function TestemunhosPage() {
  const sidebarLinks = [
    { href: '/projetos/realizados', label: 'Projetos Realizados' },
    { href: '/projetos/galeria', label: 'Galeria de Imagens' },
    { href: '/projetos/testemunhos', label: 'Testemunhos' },
    { href: '/projetos/estudos-de-caso', label: 'Estudos de Caso' },
  ];

  const breadcrumbs = [{ label: 'Projetos' }, { label: 'Testemunhos' }];

  return (
    <SubPageLayout
      title="Testemunhos de Clientes"
      breadcrumbs={breadcrumbs}
      sidebarLinks={sidebarLinks}
    >
      <div className="w-full flex flex-col gap-0 rounded-2xl overflow-hidden border border-[#7E92A6]/20 bg-white/[0.03]">
        {/* Header */}
        <div className="p-6 md:p-10 border-b border-[#7E92A6]/15">
          <p className="font-mono text-xs uppercase tracking-widest text-[#1868B8] font-semibold mb-3">
            Projetos
          </p>
          <h2 className="font-display text-xl md:text-2xl text-white/90 font-bold mb-2">
            O que dizem os nossos clientes
          </h2>
          <p className="text-[#B0C4D8] text-sm md:text-base leading-relaxed max-w-3xl">
            Avaliações de responsáveis de operações, gestores de procurement e directores
            de projecto sobre o trabalho realizado pela Abyby Sita em Angola.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white/[0.04] border border-[#7E92A6]/10 flex flex-col gap-4"
            >
              <Quote className="w-6 h-6 text-[#1868B8]/40" />
              <p className="text-[#B0C4D8] text-sm leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto pt-4 border-t border-[#7E92A6]/10">
                <p className="font-display font-bold text-sm text-white">{t.name}</p>
                <p className="text-[#7E92A6] text-xs mt-0.5">{t.role}</p>
                <p className="text-[#7E92A6] text-xs">{t.company}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#1868B8]/10 border border-[#1868B8]/20 text-[10px] font-mono text-[#1868B8] uppercase tracking-wider">
                  {t.sector}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}
