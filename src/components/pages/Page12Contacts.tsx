import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ContactFormData } from '../../types';

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
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

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
        timestamp: new Date().toISOString()
      });
      sessionStorage.setItem('abybysita_session_leads', JSON.stringify(existingLeads.slice(-5)));
    } catch (err) {
      console.error('Erro ao guardar proposta na sessão:', err);
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_abybysita';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_abybysita';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Template parameters mapped for EmailJS notification templates
    const templateParams = {
      from_name: cleanName,
      from_email: cleanEmail,
      company: cleanEmpresa || 'N/A',
      phone: cleanPhone,
      service: cleanServico,
      message: cleanMensagem || 'Sem mensagem adicional.',
      to_email: 'info.geral@abybysita.com',
    };

    if (publicKey) {
      try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        setSubmitted(true);
      } catch (err: unknown) {
        console.warn('Erro ao enviar via EmailJS:', err);
        triggerMailtoFallback(cleanName, cleanEmpresa, cleanEmail, cleanPhone, cleanServico, cleanMensagem);
        setSubmitted(true);
      }
    } else {
      // Direct send fallback via mail client trigger + local leads register
      triggerMailtoFallback(cleanName, cleanEmpresa, cleanEmail, cleanPhone, cleanServico, cleanMensagem);
      setSubmitted(true);
    }

    setIsSubmitting(false);
  };

  const triggerMailtoFallback = (
    name: string,
    empresa: string,
    email: string,
    phone: string,
    servico: string,
    mensagem: string
  ) => {
    const subject = encodeURIComponent(`Solicitação de Proposta: ${servico} - ${empresa || name}`);
    const body = encodeURIComponent(
      `PEDIDO DE PROPOSTA COMERCIAL - ABYBY SITA\n` +
      `-----------------------------------------\n` +
      `Nome: ${name}\n` +
      `Empresa: ${empresa || 'N/A'}\n` +
      `Email: ${email}\n` +
      `Telefone: ${phone}\n` +
      `Serviço de Interesse: ${servico}\n\n` +
      `Mensagem / Especificação:\n${mensagem || 'Sem mensagem adicional.'}\n`
    );
    window.location.href = `mailto:info.geral@abybysita.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative w-full h-full min-h-[680px] bg-[#071B2E] text-[#EFF4F8] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
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
                <span className="font-mono text-[11px] text-[#7E92A6] uppercase block">SEDE CORPORATIVA (TALATONA)</span>
                <span className="font-mono text-[9px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  GPS: -8.922022, 13.220986
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-white leading-relaxed font-medium">
                Rua Direita do Patriota, Casa nº 18, Vila Kuditemo, Município de Talatona, Luanda, Angola
              </p>
              
              {/* Embedded Real Interactive Google Map */}
              <div className="mt-2.5 w-full h-48 rounded-xl overflow-hidden border border-[#1868B8]/60 shadow-[0_8px_25px_rgba(0,0,0,0.5)] relative group">
                <iframe
                  title="Localização Exacta Abyby Sita - Talatona Luanda"
                  src="https://maps.google.com/maps?q=-8.922022,13.220986+(Abyby+Sita+-+Rua+Direita+do+Patriota,+Casa+n%C2%BA+18,+Vila+Kuditemo,+Talatona,+Luanda)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-[1.05] brightness-[0.95]"
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=-8.922022,13.220986"
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
              <span className="font-mono text-[11px] text-[#7E92A6] uppercase block mb-0.5">TELEFONES DE CONTATO</span>
              <div className="flex flex-col font-mono text-xs md:text-sm text-white">
                <a href="tel:+244935403327" className="hover:text-[#1868B8] transition-colors">+244 935 403 327</a>
                <a href="tel:+244951058417" className="hover:text-[#1868B8] transition-colors">+244 951 058 417</a>
              </div>
            </div>
          </div>

          {/* Email & Web & NIF */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#0F3B63]/30 border border-[#7E92A6]/30">
              <Mail className="w-4 h-4 text-[#1868B8] mb-1" />
              <span className="font-mono text-[10px] text-[#7E92A6] uppercase block">EMAIL GERAL</span>
              <a href="mailto:info.geral@abybysita.com" className="font-mono text-xs text-white hover:text-[#1868B8] truncate block">
                info.geral@abybysita.com
              </a>
            </div>

            <div className="p-3 rounded-xl bg-[#0F3B63]/30 border border-[#7E92A6]/30">
              <Globe className="w-4 h-4 text-[#1868B8] mb-1" />
              <span className="font-mono text-[10px] text-[#7E92A6] uppercase block">WEBSITE & NIF</span>
              <span className="font-mono text-xs text-white block">www.abybysita.com</span>
              <span className="font-mono text-[10px] text-[#7E92A6]">NIF: 5417121665</span>
            </div>
          </div>

          {/* Direct Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/244935403327"
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

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#1868B8]/30 border border-[#1868B8] flex items-center justify-center text-[#1868B8]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">Pedido Enviado com Sucesso!</h4>
                <p className="font-sans text-xs text-[#EFF4F8]/80 max-w-sm">
                  Obrigado pelo contacto. A nossa equipa comercial entrará em contacto com a sua empresa em breve.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded bg-[#0F3B63] text-xs font-mono text-white hover:bg-[#1868B8] transition-colors cursor-pointer"
                >
                  Enviar Outra Mensagem
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
                    <option value="Aluguer & Rent-a-Car">Aluguer de Equipamentos & Rent-a-Car</option>
                    <option value="Equipamentos Pesados">Equipamentos Pesados e Transporte</option>
                    <option value="Fornecimento Industrial">Fornecimento Industrial / Tubagens</option>
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
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                      <span>A Enviar Pedido...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Pedido de Orçamento</span>
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
