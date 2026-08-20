import { forwardRef } from 'react';
import { COMPANY } from '../lib/company';
import type { EnhancedQuoteDocument } from '../types';

interface QuotePDFTemplateProps {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  servico: string;
  mensagem: string;
  documento: EnhancedQuoteDocument | null;
  date: string;
}

const DOC_WIDTH = 800;

/**
 * Modelo de PDF executivo para solicitação de orçamento / proposta comercial.
 * Renderiza o documento estruturado pela IA (resumo, objectivos, requisitos)
 * com as próprias palavras do cliente, elevadas a um registo institucional.
 */
export const QuotePDFTemplate = forwardRef<HTMLDivElement, QuotePDFTemplateProps>(
  ({ nome, empresa, email, telefone, servico, mensagem, documento, date }, ref) => {
    // Dados efetivos para renderização — usa o documento da IA quando disponível,
    // caso contrário cai graciosamente para a mensagem original do cliente.
    const titulo = documento?.titulo || `Pedido de Orçamento — ${servico}`;
    const resumo = documento?.resumo || '';
    const objectivos = documento?.objectivos || [];
    const requisitos = documento?.requisitos || [];
    const detalhes = documento?.detalhes || '';
    const temDocumentoIA = Boolean(documento?.resumo || documento?.objectivos?.length);
    const corpoLivre = !temDocumentoIA ? mensagem : '';

    const refNum = `ORC-${date.replace(/\D/g, '').slice(-6)}-${(nome || 'X')
      .slice(0, 2)
      .toUpperCase()}`;

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-block w-1 h-4 rounded-full"
          style={{ backgroundColor: '#0F3B63' }}
        />
        <h3
          className="text-[13px] font-bold uppercase tracking-[0.14em] m-0"
          style={{ color: '#0F3B63', fontFamily: "'Zilla Slab', serif" }}
        >
          {children}
        </h3>
      </div>
    );

    return (
      <div
        ref={ref}
        className="relative bg-white text-slate-800 overflow-hidden"
        style={{
          width: `${DOC_WIDTH}px`,
          minHeight: '1131px',
          fontFamily: "'IBM Plex Sans', sans-serif",
          boxSizing: 'border-box',
        }}
      >
        {/* ==== Top brand band ==== */}
        <div className="w-full" style={{ backgroundColor: '#0F3B63', height: '10px' }} />
        <div className="w-full" style={{ backgroundColor: '#1868B8', height: '3px' }} />

        {/* ==== Header ==== */}
        <div className="px-12 pt-9 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <img
                src="/abybysita_logo.png"
                alt="Logotipo Abybysita — Comércio Geral, LDA"
                className="object-contain"
                style={{ width: '300px', height: '200px', display: 'block' }}
              />
              <p
                className="font-semibold mt-3 m-0"
                style={{ color: '#475569', fontSize: '16px', fontFamily: "'Times New Roman', Times, serif" }}
              >
                {COMPANY.slogan}
              </p>
            </div>
            <div className="text-right">
              <div
                className="px-4 py-1.5 rounded-md text-white font-bold uppercase mb-2 inline-block"
                style={{ backgroundColor: '#0F3B63', fontSize: '16px', fontFamily: "'Times New Roman', Times, serif" }}
              >
                Solicitação de Proposta
              </div>
              <div
                className="flex flex-col gap-0.5"
                style={{ color: '#334155', fontSize: '16px', fontFamily: "'Times New Roman', Times, serif" }}
              >
                <p className="m-0">
                  <strong>Data:</strong> {date}
                </p>
                <p className="m-0">
                  <strong>Ref:</strong> {refNum}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==== Title block ==== */}
        <div
          className="mx-12 mb-6 px-6 py-4 rounded-lg"
          style={{ backgroundColor: '#F1F5F9', borderLeft: '4px solid #1868B8' }}
        >
          <p
            className="text-[9px] uppercase tracking-[0.22em] font-bold m-0 mb-1"
            style={{ color: '#1868B8' }}
          >
            Assunto
          </p>
          <h2
            className="text-[19px] font-bold leading-snug m-0"
            style={{ color: '#0F3B63', fontFamily: "'Zilla Slab', serif" }}
          >
            {titulo}
          </h2>
        </div>

        {/* ==== Client / Company details ==== */}
        <div className="mx-12 mb-6 grid grid-cols-2 gap-5">
          <div className="p-4 rounded-lg border" style={{ borderColor: '#E2E8F0', backgroundColor: '#FAFBFC' }}>
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.14em] mb-2.5 m-0"
              style={{ color: '#0F3B63' }}
            >
              Dados do Cliente
            </h3>
            <div className="text-[11.5px] flex flex-col gap-1.5 text-slate-700">
              <p className="m-0">
                <strong>Nome:</strong> {nome}
              </p>
              <p className="m-0">
                <strong>Empresa:</strong> {empresa || '—'}
              </p>
              <p className="m-0">
                <strong>Email:</strong> {email}
              </p>
              <p className="m-0">
                <strong>Telefone:</strong> {telefone}
              </p>
            </div>
          </div>
          <div className="p-4 rounded-lg border" style={{ borderColor: '#E2E8F0', backgroundColor: '#FAFBFC' }}>
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.14em] mb-2.5 m-0"
              style={{ color: '#0F3B63' }}
            >
              Informações da Empresa
            </h3>
            <div className="text-[11.5px] flex flex-col gap-1.5 text-slate-700">
              <p className="m-0">
                <strong>Sede:</strong> {COMPANY.address.full}
              </p>
              <p className="m-0">
                <strong>NIF:</strong> {COMPANY.nif}
              </p>
              <p className="m-0">
                <strong>Contacto:</strong> {COMPANY.phones.primary}
              </p>
              <p className="m-0">
                <strong>Email:</strong> {COMPANY.email}
              </p>
            </div>
          </div>
        </div>

        {/* ==== Executive summary (AI) ==== */}
        {(resumo || corpoLivre) && (
          <div className="mx-12 mb-6">
            <SectionTitle>{temDocumentoIA ? 'Resumo do Pedido' : 'Mensagem / Especificações'}</SectionTitle>
            <div
              className="p-4 rounded-lg text-[12.5px] leading-relaxed text-slate-700"
              style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}
            >
              {resumo || corpoLivre}
            </div>
          </div>
        )}

        {/* ==== Objectives (AI) ==== */}
        {objectivos.length > 0 && (
          <div className="mx-12 mb-6">
            <SectionTitle>Objectivos</SectionTitle>
            <div className="flex flex-col gap-2">
              {objectivos.map((obj, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-px"
                    style={{ backgroundColor: '#1868B8' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[12.5px] leading-snug text-slate-700 m-0">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==== Requirements (AI) ==== */}
        {requisitos.length > 0 && (
          <div className="mx-12 mb-6">
            <SectionTitle>Requisitos & Especificações</SectionTitle>
            <div className="flex flex-col gap-1.5">
              {requisitos.map((req, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-sm flex-shrink-0 mt-[3px] flex items-center justify-center"
                    style={{ backgroundColor: '#0F3B63' }}
                  >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.2L4 7.2L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-[12.5px] leading-snug text-slate-700 m-0">{req}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==== Additional details (AI) ==== */}
        {detalhes && (
          <div className="mx-12 mb-6">
            <SectionTitle>Informações Adicionais</SectionTitle>
            <div className="text-[12.5px] leading-relaxed text-slate-700">{detalhes}</div>
          </div>
        )}

        {/* ==== Service tag ==== */}
        <div className="mx-12 mb-6 flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: '#0F3B63', color: '#FFFFFF' }}
          >
            {servico}
          </span>
          {temDocumentoIA && (
            <span
              className="px-3 py-1 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: '#E0F2FE', color: '#075985' }}
            >
              Documento organizado por IA
            </span>
          )}
        </div>

        {/* ==== Footer ==== */}
        <div
          className="absolute bottom-0 left-0 right-0 px-12 pt-5 pb-6"
          style={{ borderTop: '1px solid #E2E8F0' }}
        >
          <div className="flex justify-between items-end mb-3">
            <div className="text-[10.5px] text-slate-500 flex flex-col gap-0.5">
              <p className="m-0 font-bold uppercase tracking-wider" style={{ color: '#0F3B63' }}>
                Abybysita — Comércio Geral, LDA
              </p>
              <p className="m-0">{COMPANY.address.street}, {COMPANY.address.municipality}</p>
              <p className="m-0">
                {COMPANY.phones.commercial.join(' · ')} · {COMPANY.email}
              </p>
            </div>
            <div className="text-right text-[9px] text-slate-400 max-w-[260px]">
              <p className="m-0 leading-snug">
                A Abyby Sita entrará em contacto o mais breve possível com uma proposta comercial
                ou pedido de esclarecimento.
              </p>
            </div>
          </div>
          <div
            className="w-full h-[2px] rounded-full mb-2"
            style={{ background: 'linear-gradient(90deg, #0F3B63 0%, #1868B8 55%, #0F3B63 100%)' }}
          />
          <p className="text-center text-[8.5px] text-slate-400 m-0">
            Documento gerado automaticamente através do portal {COMPANY.website} · © {new Date().getFullYear()}{' '}
            {COMPANY.name}
          </p>
        </div>
      </div>
    );
  },
);

QuotePDFTemplate.displayName = 'QuotePDFTemplate';
