import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, RefreshCw, ChevronDown, MapPin, Phone, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AiChatWidgetProps {
  onNavigate?: (pageIndex: number) => void;
}

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Olá! Sou a Assistente Virtual com Inteligência Artificial da **Abyby Sita Comércio Geral, LDA**.\n\nComo posso ajudá-lo hoje com as nossas soluções de logística, operações marítimas, apoio offshore ou materiais industriais em Angola?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Quais são os vossos serviços?',
    'Onde fica a vossa sede em Luanda?',
    'Como solicitar um orçamento?',
    'Quais são os contactos comerciais?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    if (text.length > 1000) {
      alert('A sua mensagem é demasiado longa (máximo 1000 caracteres).');
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    // Format chat history for API endpoint
    const history = messages
      .filter((m) => m.id !== 'welcome-1')
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || 'Erro na resposta');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem para a IA:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lamento, ocorreu uma pequena oscilação na ligação. Pode ligar para o **+244 935 403 327** ou enviar email para **info.geral@abybysita.com**.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset-' + Date.now(),
        role: 'assistant',
        content: 'Conversa reiniciada. Como posso ajudá-lo com os serviços da **Abyby Sita**?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const formatContent = (text: string) => {
    // Basic bold and list line formatting helper
    return text.split('\n').map((line, idx) => {
      // Replace **text** with bold span
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <React.Fragment key={idx}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-cyan-200">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
          {idx < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#071B2E]/90 backdrop-blur-md border border-cyan-400/40 text-cyan-200 font-mono text-xs shadow-xl animate-bounce-slow">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Assistente IA Abyby Sita</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full bg-gradient-to-r from-[#1868B8] via-[#0F3B63] to-[#1868B8] text-white shadow-[0_8px_32px_rgba(24,104,184,0.6)] border border-cyan-300/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center relative group ${
            isOpen ? 'rotate-90' : ''
          }`}
          aria-label="Abrir Assistente com Inteligência Artificial"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-cyan-200" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-cyan-200" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-[#071B2E] animate-ping" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-[#071B2E]" />
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-22 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[430px] h-[560px] max-h-[82vh] rounded-2xl bg-[#030F1C]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#071B2E] via-[#0B2A4A] to-[#071B2E] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-[#1868B8]/30 border border-cyan-400/40">
                <Bot className="w-5 h-5 text-cyan-300" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#071B2E]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-sm text-white tracking-wide">
                    Assistente Abyby Sita
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-[10px] font-mono text-cyan-300 font-semibold">
                    IA
                  </span>
                </div>
                <p className="font-sans text-[11px] text-slate-300 flex items-center gap-1">
                  <span>Atendimento & Informação 24/7</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                title="Limpar Conversa"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Fechar Chat"
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Contact Bar */}
          <div className="px-4 py-1.5 bg-[#071B2E]/70 border-b border-white/5 flex items-center justify-between text-[11px] text-slate-300 font-mono">
            <div className="flex items-center gap-1 text-cyan-300">
              <MapPin className="w-3 h-3" />
              <span>Talatona, Luanda</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>+244 935 403 327</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-cyan-500/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-[#1868B8]/40 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-cyan-300" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#1868B8] to-[#0F3B63] text-white rounded-br-none border border-cyan-400/30 shadow-md'
                      : 'bg-slate-900/90 text-slate-100 rounded-bl-none border border-white/10 shadow-sm'
                  }`}
                >
                  <div className="space-y-1">{formatContent(msg.content)}</div>
                  <span
                    className={`block text-[9px] font-mono mt-1.5 text-right ${
                      msg.role === 'user' ? 'text-cyan-200/70' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-cyan-300" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-lg bg-[#1868B8]/40 border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
                </div>
                <div className="rounded-2xl p-3 bg-slate-900/90 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-300" />
                  <span className="ml-2 font-mono text-[10px] text-cyan-300/80">
                    A analisar informações...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Chips */}
          {messages.length < 5 && !isLoading && (
            <div className="px-3 py-2 bg-[#071B2E]/60 border-t border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 font-mono text-[10px] text-cyan-200 whitespace-nowrap transition-all cursor-pointer flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Action Navigation Shortcuts */}
          {onNavigate && (
            <div className="px-4 py-1.5 bg-[#020A14] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Ações Rápidas:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onNavigate(2); // Services page
                    setIsOpen(false);
                  }}
                  className="hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Ver Serviços</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => {
                    onNavigate(11); // Contacts / Proposal page
                    setIsOpen(false);
                  }}
                  className="hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Pedir Proposta</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#071B2E] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite a sua pergunta sobre a Abyby Sita..."
              maxLength={1000}
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 text-xs text-white placeholder-slate-400 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#1868B8] hover:bg-[#1868B8]/90 disabled:opacity-40 text-white shadow-md transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
