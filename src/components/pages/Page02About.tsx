import React, { useRef, useEffect, useState } from 'react';
import { Compass, ShieldCheck, Target, Award, MapPin, Anchor, PlayCircle } from 'lucide-react';

export const Page02About: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                setShowPlayOverlay(false);
              })
              .catch((err) => {
                console.warn('Reprodução automática de áudio bloqueada pelo navegador:', err);
                // Como o vídeo tem áudio, o navegador frequentemente bloqueia o autoplay sem interação.
                setShowPlayOverlay(true);
              });
          }
        } else {
          // Opcional: pausar se sair da visão para não gastar recursos
          if (videoRef.current && isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.3 },
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [isPlaying]);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayOverlay(false);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[680px] bg-white text-[#071B2E] p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none">
      {/* Page Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs text-[#1868B8] uppercase tracking-widest font-semibold">
            PERFIL INSTITUCIONAL
          </span>
          <div className="h-[1px] w-12 bg-[#1868B8]/40" />
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-[#071B2E] tracking-tight">
          Sobre A Abyby Sita
        </h2>
      </div>

      {/* Main Two Asymmetric Columns */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Column (Wider: 7 cols) - Institutional Text + Map + Missão/Visão/Valores */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative bg-[#F8FAFC] p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-[#1868B8]">
              <Compass className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                Apresentação da Empresa — Angola
              </span>
            </div>
            <p className="font-sans text-sm md:text-base text-slate-700 leading-relaxed">
              Somos uma empresa 100% Angolana, inscrita sob NIF{' '}
              <strong className="text-[#071B2E] font-mono">5417121665</strong>, com sede na Rua
              Direita do Patriota, Vila Kuditemo, Casa nº 18, Município de Talatona, Luanda –
              Angola. Vocacionada em actividades de Comércio Geral, Importação, Exportação,
              Prestação de Serviços e Procurement.
            </p>
            <p className="font-sans text-sm md:text-base text-slate-700 leading-relaxed mt-3">
              Destacamo-nos na comercialização e fornecimento de materiais e equipamentos para os
              sectores petrolífero, marítimo e industrial. Prestamos serviços de Rope Access,
              Man-Power e Supply Chain, além do aluguer de equipamentos pesados, gruas, viaturas e
              suporte logístico em todo o território nacional.
            </p>
          </div>

          {/* Real Google Maps Location Frame */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4 p-4 rounded-xl bg-[#071B2E] text-white border border-slate-700 shadow-lg relative overflow-hidden">
            <div className="w-full sm:w-48 h-36 rounded-lg overflow-hidden relative flex-shrink-0 border border-slate-600 shadow-inner">
              <iframe
                title="Sede Abyby Sita - Condomínio Vila Kuditemo, Patriota, Luanda"
                src="https://maps.google.com/maps?q=Condom%C3%ADnio+Vila+Kuditemo,+Rua+Direita+do+Patriota,+Talatona,+Luanda&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />
            </div>
            <div className="flex flex-col justify-between py-1 font-mono text-xs flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  SEDE CORPORATIVA & PRESENÇA OPERACIONAL
                </div>
                <div className="text-slate-200 text-xs pl-2 space-y-1.5 font-sans">
                  <p className="flex items-start gap-1.5 text-white font-medium">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Sede: Rua Direita do Patriota, Condomínio Vila Kuditemo, Casa nº 18, Lar do Patriota, Talatona, Luanda
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                    <Anchor className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span>Base Offshore & Logística: Cabinda, Angola</span>
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Condomínio Vila Kuditemo</span>
                <span className="text-emerald-400 font-bold">100% CAPITAL ANGOLANO</span>
              </div>
            </div>
          </div>

          {/* Missão, Visão e Valores (Moved to Left Column) */}
          <div className="flex flex-col xl:flex-row gap-6 md:gap-8 pt-4 border-t border-slate-100">
            <div className="flex-1 space-y-4">
              {/* Missão Block */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-[#1868B8]" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1868B8]">
                    MISSÃO
                  </span>
                </div>
                <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed pl-6">
                  Comercializar produtos industriais de qualidade e prestar serviços técnicos
                  especializados nos sectores marítimo, petrolífero e de construção em Angola.
                </p>
              </div>

              {/* Visão Block */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-[#1868B8]" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1868B8]">
                    VISÃO
                  </span>
                </div>
                <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed pl-6">
                  Ser uma referência no fornecimento de serviços industriais e soluções
                  logísticas para os sectores de Oil & Gas, Construção e Mineração em Angola.
                </p>
              </div>
            </div>

            <div className="flex-1">
              {/* Valores Block */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#1868B8]" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1868B8]">
                    VALORES
                  </span>
                </div>
                <ul className="font-sans text-xs text-slate-600 space-y-2 pl-6">
                  <li>
                    <strong className="text-[#071B2E] font-mono">Ética e Transparência:</strong>{' '}
                    Actuar com honestidade em todas as relações comerciais.
                  </li>
                  <li>
                    <strong className="text-[#071B2E] font-mono">Qualidade:</strong>{' '}
                    Cumprir os padrões técnicos exigidos pela indústria.
                  </li>
                  <li>
                    <strong className="text-[#071B2E] font-mono">Foco no Cliente:</strong> Adaptar
                    os serviços às necessidades específicas de cada projecto.
                  </li>
                  <li>
                    <strong className="text-[#071B2E] font-mono">Agilidade:</strong> Resposta
                    rápida na mobilização de equipamentos e equipas.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Narrower: 5 cols) - Video Block */}
        <div className="lg:col-span-5 flex flex-col h-full min-h-[300px]" ref={containerRef}>
          <div className="relative w-full h-full min-h-[300px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-black group flex items-center justify-center">
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/vgxylpmd/video/upload/v1785428265/a9cc1562835d4986a2dade5d680b0545_a2rf6o.mp4"
              className="w-full h-full object-cover absolute inset-0"
              controls={false}
              playsInline
              onEnded={() => {
                setIsPlaying(false);
                setShowPlayOverlay(true); // Mostrar o botão play no fim para permitir rever
              }}
            />

            {showPlayOverlay && (
              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity hover:bg-black/50 z-10"
                onClick={handleManualPlay}
              >
                <div className="bg-white/90 p-4 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
                  <PlayCircle className="w-12 h-12 text-[#1868B8]" />
                </div>
              </div>
            )}

            {/* Overlay para pausar se clicar no vídeo quando estiver a dar */}
            {isPlaying && (
              <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                    setShowPlayOverlay(true);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer Line */}
      <div className="relative z-10 pt-4 mt-6 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
        <span>ABYBY SITA COMÉRCIO GERAL, LDA</span>
        <span>LUANDA, ANGOLA</span>
      </div>
    </div>
  );
};
