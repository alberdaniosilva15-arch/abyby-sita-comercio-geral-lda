import React, { useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, ChevronRight, Zap } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  type: string;
  area: string;
  experience_level: string;
  location: string;
  short_description: string;
  shift_type: string;
}

interface JobCardProps {
  job: Job;
  index: number;
}

export const JobCardRecrutamento: React.FC<JobCardProps> = ({ job, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight effect — sets CSS custom properties for the radial gradient
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  }, []);

  const typeColor = job.type === 'Offshore'
    ? 'bg-[#1868B8]/15 text-[#1868B8] border-[#1868B8]/30'
    : 'bg-[#1868B8]/20 text-[#7EB8FF] border-[#1868B8]/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.08 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="spotlight-card liquid-glass glow-border rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer group hover:translate-y-[-4px] hover:shadow-[0_30px_80px_rgba(7,27,46,0.6)]"
      >
        <div className="relative z-[3] flex flex-col md:flex-row justify-between md:items-center gap-6">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            {/* Tags Row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              {/* Type Tag (Offshore/Onshore) */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-[0.15em] ${typeColor}`}>
                <Zap className="w-3 h-3" />
                {job.type}
              </span>

              {/* Area Tag */}
              <span className="px-3 py-1 rounded-lg bg-[#0F3B63]/60 border border-[#7E92A6]/20 text-[#EFF4F8] text-[10px] font-mono font-bold uppercase tracking-[0.15em]">
                {job.area}
              </span>

              {/* Experience Tag */}
              <span className="px-3 py-1 rounded-lg bg-[#1868B8]/8 border border-[#1868B8]/15 text-[#1868B8] text-[10px] font-mono font-bold uppercase tracking-[0.15em]">
                {job.experience_level}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-display font-bold text-[#EFF4F8] mb-3 group-hover:text-[#1868B8] transition-colors duration-300 truncate">
              {job.title}
            </h3>

            {/* Description */}
            <p className="text-[#7E92A6] text-sm md:text-base leading-relaxed mb-5 line-clamp-2 max-w-3xl">
              {job.short_description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-[#7E92A6]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1868B8]/60" />
                <span>{job.location}</span>
              </div>
              {job.shift_type && (
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#1868B8]/60" />
                  <span>{job.shift_type}</span>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Link
              to={`/recrutamentos/${job.id}`}
              className="shimmer-btn inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#1868B8] to-[#0F3B63] text-[#EFF4F8] font-bold text-sm tracking-wider uppercase transition-all duration-300 border border-white/10 hover:border-[#1868B8]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:scale-[1.03] active:scale-[0.98] w-full md:w-auto"
            >
              Ver Detalhes
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
