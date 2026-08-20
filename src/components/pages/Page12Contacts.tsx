import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  MessageSquare,
  Loader2,
  AlertCircle,
  FileText,
  Wand2,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { ContactFormData, OpenQuotePayload, EnhancedQuoteDocument } from '../../types';
import { COMPANY } from '../../lib/company';
import { QuotePDFTemplate } from '../QuotePDFTemplate';

export const Page12Contacts: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    servico: 'Oil & Gas',
    mensagem: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiDocument, setAiDocument] = useState<EnhancedQuoteDocument | null>(null);
  const [submissionState, setSubmissionState] = useState<'idle' | 'success' | 'fallback' | 'error'>(
    'idle',
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);

  const pdfTemplateRef = useRef<HTMLDivElement>(null);
  const pdfWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenQuote = (e: CustomEvent<OpenQuotePayload>) => {
      const { message } = e.detail;

      setFormData((prev) => ({
        ...prev,
        servico: 'Fornecimento de Frescos e Bens Alimentares',
        mensagem: prev.mensagem ? `${prev.mensagem}\n\n--- NOVO PEDIDO ---\n${message}` : message,
      }));

      setTimeout(() => {
        const nameInput = document.getElementById('nome');
        if (nameInput) {
          nameInput.focus();
        }
      }, 500);
    };

    window.addEventListener('open-quote', handleOpenQuote as EventListener);
    return () => {
      window.removeEventListener('open-quote', handleOpenQuote as EventListener);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage(null);
    setSubmissionState('idle');

    // Sanitize and trim inputs
    const cleanName = formData.nome.trim();
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.telefone.trim();
    const cleanEmpresa = formData.empresa ? formData.empresa.trim() : '';
    const cleanServico = formData.servico ? formData.servico.trim() : 'Oil & Gas';
    const cleanMensagem = formData.mensagem ? formData.mensagem.trim() : '';

    // Frontend Input Validations
    if (!cleanName || cleanName.length < 2) {
      setErrorMessage('Por favor, introduza um nome válido (mínimo 2 caracteres).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage('Por favor, introduza um endereço de e-mail válido.');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 6) {
      setErrorMessage('Por favor, introduza um número de telefone válido.');
      return;
    }

    if (cleanMensagem.length > 2000) {
      setErrorMessage('A mensagem excede o limite máximo de 2000 caracteres.');
      return;
    }

    setIsSubmitting(true);

    // Save sanitized proposal request lead in sessionStorage (cleared when browser tab closes)
    try {
      const existingLeads = JSON.parse(sessionStorage.getItem('abybysita_session_leads') || '[]');
      existingLeads.push({
        nome: cleanName,
        empresa: cleanEmpresa,
        email: cleanEmail,
        telefone: cleanPhone,
        servico: cleanServico,
        mensagem: cleanMensagem,
        timestamp: new Date().toISOString(),
      });
      sessionStorage.setItem('abybysita_session_leads', JSON.stringify(existingLeads.slice(-5)));
    } catch (err) {
      console.error('Erro ao guardar proposta na sessão:', err);
    }

    // 0. Enhance message with AI (best-effort — never blocks the PDF)
    let mensagemFinal = cleanMensagem;
    setAiDocument(null);
    setIsEnhancing(true);
    try {
      const enhanceController = new AbortController();
      // Model latency via NVIDIA can exceed 30s — wait up to 60s before aborting.
      const enhanceTimer = setTimeout(() => enhanceController.abort(), 60000);
      const enhanceRes = await fetch('/api/enhance-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servico: cleanServico, mensagem: cleanMensagem }),
        signal: enhanceController.signal,
      });
      clearTimeout(enhanceTimer);
      if (enhanceRes.ok) {
        const enhanceData = await enhanceRes.json();
        const doc = enhanceData.documento as EnhancedQuoteDocument | undefined;
        if (doc && (doc.resumo || (doc.objectivos && doc.objectivos.length > 0))) {
          setAiDocument(doc);
          mensagemFinal = enhanceData.textoPlano || cleanMensagem;
        }
      } else {
        console.warn('IA de melhoramento indisponível, a usar mensagem original.');
      }
    } catch (enhanceError) {
      console.warn(
        'Erro na IA de melhoramento (não crítico), a usar mensagem original:',
        enhanceError,
      );
    } finally {
      setIsEnhancing(false);
    }

    try {
      // 1. Generate PDF first (primary deliverable)
      const pdfOk = await generatePDF();

      if (!pdfOk) {
        // PDF generation failed — show error, don't try server sync
        setErrorMessage(
          'Ocorreu um erro ao gerar o PDF. Por favor, tente novamente mais tarde ou contacte-nos diretamente.',
        );
        setIsSubmitting(false);
        return;
      }

      // 2. Sync to server (best-effort, non-critical)
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: cleanName,
            empresa: cleanEmpresa,
            email: cleanEmail,
            telefone: cleanPhone,
            servico: cleanServico,
            mensagem: mensagemFinal,
          }),
        });
        if (!response.ok) {
          console.warn('Backend indisponível, a continuar apenas com PDF local.');
        }
      } catch (syncError) {
        console.warn('Erro ao sincronizar com servidor (não crítico):', syncError);
      }

      setSubmissionState('success');
      setShowPdfModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = async (): Promise<boolean> => {
    if (!pdfTemplateRef.current || !pdfWrapperRef.current) {
      console.error('Referências do PDF não disponíveis.');
      return false;
    }
    try {
      // Traz o template para a área visível (fora de qualquer overflow ancestor)
      pdfWrapperRef.current.style.left = '0px';

      // Aguarda renderização
      await new Promise((resolve) => setTimeout(resolve, 200));

      const canvas = await html2canvas(pdfTemplateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Voltar a esconder
      pdfWrapperRef.current.style.left = '-9999px';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      const blobUrl = pdf.output('bloburl');
      setPdfDataUrl(blobUrl.toString());

      // Auto-download first time (link no DOM + remove — evita a navegação do jsPDF save() com link desconectado)
      const link = document.createElement('a');
      link.href = blobUrl.toString();
      link.download = 'Pedido_Orcamento_AbybySita.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl.toString()), 10000);

      return true;
    } catch (err) {
      console.error('Erro ao gerar PDF', err);

      if (pdfWrapperRef.current) {
        pdfWrapperRef.current.style.left = '-9999px';
      }

      return false;
    }
  };

  const handleShareWhatsApp = async () => {
    const texto =
      'Olá, acabei de solicitar um orçamento no site da Abyby Sita.\n\n📄 Segue em anexo o PDF com os detalhes do meu pedido.\n\nAguardo o vosso contacto. Obrigado!';

    // 1. Web Share API — envia o PDF como anexo nativo (telemóvel/desktop com suporte)
    try {
      if (pdfDataUrl && navigator.canShare) {
        const res = await fetch(pdfDataUrl);
        const blob = await res.blob();
        const file = new File([blob], 'Pedido_Orcamento_AbybySita.pdf', {
          type: 'application/pdf',
        });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Pedido de Orçamento Abyby Sita',
            text: texto,
          });
          return;
        }
      }
    } catch (shareError) {
      console.warn('Partilha nativa indisponível ou cancelada:', shareError);
    }

    // 2. Fallback — abre o WhatsApp com a mensagem preparada para anexar o PDF descarregado
    window.open(`${COMPANY.whatsapp.url}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <div className="relative w-full h-full min-h-[680px] bg-[#071B2E] text-[#EFF4F8] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* PDF template renderizado via portal direto no body para evitar overflow clipping */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={pdfWrapperRef}
            style={{
              position: 'fixed',
              top: '0px',
              left: '-9999px',
              zIndex: -9999,
              pointerEvents: 'none',
              visibility: 'visible',
            }}
          >
            <QuotePDFTemplate
              ref={pdfTemplateRef}
              nome={formData.nome || 'Cliente'}
              empresa={formData.empresa}
              email={formData.email}
              telefone={formData.telefone}
              servico={formData.servico}
              mensagem={formData.mensagem}
              documento={aiDocument}
              date={new Date().toLocaleDateString('pt-PT')}
            />
          </div>,
          document.body,
        )}

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            CONTACTOS & SOLICITAÇÃO DE PROPOSTA
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-white tracking-tight">
          Fale Connosco
        </h2>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Column: Official Contact Info */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Address Box */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0F3B63]/30 border border-[#7E92A6]/30">
            <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="w-full">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-mono text-[11px] text-[#7E92A6] uppercase block">
                  SEDE CORPORATIVA (TALATONA / PATRIOTA)
                </span>
                <span className="font-mono text-[9px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  Condomínio Vila Kuditemo
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-white leading-relaxed font-medium">
                Rua Direita do Patriota, Condomínio Vila Kuditemo, Casa nº 18, Lar do Patriota, Talatona, Luanda,
                Angola
              </p>

              {/* Embedded Real Interactive Google Map */}
              <div className="mt-2.5 w-full h-48 rounded-xl overflow-hidden border border-[#1868B8]/60 shadow-[0_8px_25px_rgba(0,0,0,0.5)] relative group">
                <iframe
                  title="Localização Exacta Abyby Sita - Condomínio Vila Kuditemo, Patriota, Luanda"
                  src="https://maps.google.com/maps?q=Condom%C3%ADnio+Vila+Kuditemo,+Rua+Direita+do+Patriota,+Talatona,+Luanda&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-[1.05] brightness-[0.95]"
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Condom%C3%ADnio+Vila+Kuditemo,+Rua+Direita+do+Patriota,+Talatona,+Luanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-[#071B2E]/90 hover:bg-[#1868B8] border border-cyan-400/40 text-white font-mono text-[10px] flex items-center gap-1.5 transition-all shadow-xl z-10 hover:scale-105"
                >
                  <MapPin className="w-3 h-3 text-cyan-300" />
                  <span>Abrir no Google Maps ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Phones Box */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0F3B63]/30 border border-[#7E92A6]/30">
            <Phone className="w-5 h-5 text-[#1868B8] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[11px] text-[#7E92A6] uppercase block mb-0.5">
                TELEFONES DE CONTATO
              </span>
              <div className="flex flex-col font-mono text-xs md:text-sm text-white">
                {COMPANY.phones.commercial.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="hover:text-[#1868B8] transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Email & Web & NIF */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#0F3B63]/30 border border-[#7E92A6]/30">
              <Mail className="w-4 h-4 text-[#1868B8] mb-1" />
              <span className="font-mono text-[10px] text-[#7E92A6] uppercase block">
                EMAIL GERAL
              </span>
              <a
                href={`mailto:${COMPANY.email}`}
                className="font-mono text-xs text-white hover:text-[#1868B8] truncate block"
              >
                {COMPANY.email}
              </a>
            </div>

            <div className="p-3 rounded-xl bg-[#0F3B63]/30 border border-[#7E92A6]/30">
              <Globe className="w-4 h-4 text-[#1868B8] mb-1" />
              <span className="font-mono text-[10px] text-[#7E92A6] uppercase block">
                WEBSITE & NIF
              </span>
              <span className="font-mono text-xs text-white block">www.abybysita.com</span>
              <span className="font-mono text-[10px] text-[#7E92A6]">NIF: {COMPANY.nif}</span>
            </div>
          </div>

          {/* Direct Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={COMPANY.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-lg bg-[#25D366]/20 border border-[#25D366] text-[#25D366] font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#25D366] hover:text-black transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>
            <a
              href="tel:+244935403327"
              className="flex-1 py-2.5 px-3 rounded-lg bg-[#1868B8]/20 border border-[#1868B8] text-white font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#1868B8] transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Ligar Agora</span>
            </a>
          </div>
        </div>

        {/* Right Column: Liquid Refractive Glass Form Panel */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 md:p-8 rounded-2xl relative shadow-2xl">
            <h3 className="font-display font-bold text-xl text-white mb-1">
              Solicitar Orçamento / Proposta Comercial
            </h3>
            <p className="font-sans text-xs text-[#7E92A6] mb-5">
              Preencha os dados da sua empresa para receber uma proposta personalizada.
            </p>

            {submissionState === 'success' && showPdfModal ? (
              <div className="py-10 text-center flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-2">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="font-display font-bold text-2xl text-white">
                  O seu orçamento foi gerado com sucesso!
                </h4>
                <p className="font-sans text-sm text-[#EFF4F8]/80 max-w-sm mb-4">
                  O ficheiro PDF já foi descarregado para o seu dispositivo.
                </p>

                {aiDocument && (
                  <div className="flex items-start gap-2 w-full max-w-md p-3 rounded-xl bg-[#1868B8]/10 border border-[#1868B8]/30 text-left mb-2">
                    <FileText className="w-4 h-4 text-[#1868B8] flex-shrink-0 mt-0.5" />
                    <p className="font-sans text-xs text-slate-300">
                      <strong className="text-white">
                        A sua mensagem foi organizada
                      </strong>{' '}
                      e estruturada num documento profissional com as suas próprias palavras,
                      incluído no PDF.
                    </p>
                  </div>
                )}

                {/* Lembrete WhatsApp */}
                <div className="w-full max-w-md p-4 rounded-xl bg-[#25D366]/10 border-2 border-[#25D366]/60 mb-2">
                  <p className="font-mono text-xs uppercase tracking-wider text-[#25D366] font-bold mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" /> PASSO FINAL — ENVIE-NOS O PDF
                  </p>
                  <p className="font-sans text-xs text-[#EFF4F8]/90">
                    Para acelerarmos a sua proposta, envie o PDF que descarregou para o nosso
                    WhatsApp. Toque no botão abaixo e escolha o WhatsApp.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <button
                    onClick={handleShareWhatsApp}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#25D366]/90 text-black font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#25D366]/30"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enviar PDF pelo WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      if (pdfDataUrl) {
                        const a = document.createElement('a');
                        a.href = pdfDataUrl;
                        a.download = 'Pedido_Orcamento_AbybySita.pdf';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                      }
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#0F3B63] hover:bg-[#1868B8] text-white font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#1868B8]/50 shadow-lg"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Baixar PDF Novamente</span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    setSubmissionState('idle');
                    setShowPdfModal(false);
                    setAiDocument(null);
                  }}
                  className="mt-6 text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Voltar ao formulário
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#7E92A6] block mb-1">
                      NOME COMPLETO *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: Manuel Silva"
                      className="w-full px-3 py-2 rounded-lg bg-[#071B2E]/80 border border-[#7E92A6]/40 text-white placeholder-[#7E92A6]/50 focus:outline-none focus:border-[#1868B8]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#7E92A6] block mb-1">
                      EMPRESA / INSTITUIÇÃO
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Ex: Sonangol / Chevron"
                      className="w-full px-3 py-2 rounded-lg bg-[#071B2E]/80 border border-[#7E92A6]/40 text-white placeholder-[#7E92A6]/50 focus:outline-none focus:border-[#1868B8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#7E92A6] block mb-1">
                      EMAIL CORPORATIVO *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nome@empresa.co.ao"
                      className="w-full px-3 py-2 rounded-lg bg-[#071B2E]/80 border border-[#7E92A6]/40 text-white placeholder-[#7E92A6]/50 focus:outline-none focus:border-[#1868B8]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#7E92A6] block mb-1">
                      TELEFONE DE CONTACTO *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="+244 9XX XXX XXX"
                      className="w-full px-3 py-2 rounded-lg bg-[#071B2E]/80 border border-[#7E92A6]/40 text-white placeholder-[#7E92A6]/50 focus:outline-none focus:border-[#1868B8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase text-[#7E92A6] block mb-1">
                    SERVIÇO DE INTERESSE
                  </label>
                  <select
                    value={formData.servico}
                    onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#071B2E]/80 border border-[#7E92A6]/40 text-white focus:outline-none focus:border-[#1868B8]"
                  >
                    <option value="Oil & Gas">Oil & Gas / Rope Access</option>
                    <option value="Aluguer & Rent-a-Car">
                      Aluguer de Equipamentos & Rent-a-Car
                    </option>
                    <option value="Equipamentos Pesados">Equipamentos Pesados e Transporte</option>
                    <option value="Fornecimento Industrial">
                      Fornecimento Industrial / Tubagens
                    </option>
                    <option value="Fornecimento de Frescos e Bens Alimentares">
                      Frescos & Bens Alimentares
                    </option>
                    <option value="Produtos">Produtos & Containers</option>
                    <option value="Limpeza de Fossa">Serviço de Limpeza de Fossa</option>
                    <option value="Blue Energy">Blue Energy / Simple Green®</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase text-[#7E92A6] block mb-1">
                    MENSAGEM / ESPECIFICAÇÃO
                  </label>
                  <textarea
                    rows={3}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    placeholder="Descreva brevemente a sua necessidade operacional..."
                    className="w-full px-3 py-2 rounded-lg bg-[#071B2E]/80 border border-[#7E92A6]/40 text-white placeholder-[#7E92A6]/50 focus:outline-none focus:border-[#1868B8]"
                  />
                  <p className="flex items-center gap-1.5 font-sans text-[10px] text-slate-400 mt-1">
                    <FileText className="w-3 h-3" />
                    Escreva apenas o essencial — a sua mensagem será organizada e estruturada num
                    documento profissional no PDF.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-900/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-[#1868B8] hover:bg-[#1868B8]/90 disabled:opacity-60 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-[#1868B8]/40 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <>
                      {isEnhancing ? (
                        <>
                          <Wand2 className="w-4 h-4 animate-pulse text-white" />
                          <span>A preparar a sua proposta...</span>
                        </>
                      ) : (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                          <span>A Gerar PDF...</span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Gerar Proposta com IA</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="relative z-10 pt-4 border-t border-[#7E92A6]/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#7E92A6]">
        <span>© 2026 ABYBY SITA COMÉRCIO GERAL, LDA. TODOS OS DIREITOS RESERVADOS.</span>
        <span>TALATONA, LUANDA — ANGOLA</span>
      </div>
    </div>
  );
};
