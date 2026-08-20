import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { ImageWithLoader } from './ImageWithLoader';
import { COMPANY } from '../lib/company';

export interface ServiceFeature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface ServicePageContentProps {
  heroImage: string;
  heroImageAlt: string;
  subtitle: string;
  description: string;
  secondaryDescription?: string;
  features: ServiceFeature[];
  ctaText?: string;
  ctaLink?: string;
}

export const ServicePageContent: React.FC<ServicePageContentProps> = ({
  heroImage,
  heroImageAlt,
  subtitle,
  description,
  secondaryDescription,
  features,
  ctaText = 'Solicitar Orçamento',
  ctaLink,
}) => {
  return (
    <div className="w-full flex flex-col gap-0 rounded-2xl overflow-hidden border border-white/15 liquid-glass-clear">
      {/* Hero Image Section */}
      <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
        <ImageWithLoader
          src={heroImage}
          alt={heroImageAlt}
          imageClassName="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B2E] via-[#071B2E]/60 to-transparent" />
        {/* Subtitle over image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-[#38bdf8] font-semibold mb-2 text-readable">
            Os Nossos Serviços
          </p>
          <p className="font-display text-xl md:text-2xl text-white font-bold max-w-2xl leading-snug text-readable-heading">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div className="p-6 md:p-10 border-b border-white/10">
        <p className="text-slate-100 text-sm md:text-base leading-relaxed max-w-3xl text-readable-light font-sans">
          {description}
        </p>
        {secondaryDescription && (
          <p className="text-slate-200/90 text-sm leading-relaxed max-w-3xl mt-4 text-readable-light">
            {secondaryDescription}
          </p>
        )}
      </div>

      {/* Features Grid */}
      <div className="p-6 md:p-10">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[#38bdf8] font-semibold mb-6 text-readable">
          Características do Serviço
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 rounded-xl liquid-glass-clear-card border border-white/15 hover:border-[#1868B8]/50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1868B8]/30 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform text-white shadow-inner">
                {feature.icon || <CheckCircle className="w-5 h-5 text-[#38bdf8]" />}
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-base mb-1 text-readable">
                  {feature.title}
                </h4>
                <p className="text-slate-200/90 group-hover:text-white text-xs leading-relaxed text-readable-light">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-6 md:p-10 bg-gradient-to-r from-[#0F3B63]/60 via-[#1868B8]/30 to-[#0F3B63]/60 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
        <div>
          <p className="font-display font-bold text-white text-lg text-readable">
            Precisa deste serviço?
          </p>
          <p className="text-slate-200 text-xs mt-1 text-readable-light">
            Entre em contacto connosco para um orçamento personalizado.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${COMPANY.phones.primary}`}
            className="glass-button px-5 py-3 rounded-full flex items-center gap-2 text-xs font-mono tracking-wider text-white font-semibold hover:scale-105 transition-transform text-readable"
          >
            <Phone className="w-4 h-4" />
            Ligar Agora
          </a>
          <Link
            to={ctaLink || '/'}
            onClick={(e) => {
              if (!ctaLink) {
                e.preventDefault();
                const el = document.getElementById('page-12-contacts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/';
              }
            }}
            className="px-5 py-3 rounded-full bg-white/10 border border-white/25 text-white hover:bg-[#1868B8]/30 hover:border-[#1868B8] text-xs font-mono tracking-wider font-semibold transition-all flex items-center gap-2 text-readable shadow-sm"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
