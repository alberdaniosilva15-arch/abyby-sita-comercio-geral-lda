import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Award, TrendingUp, Headphones } from 'lucide-react';

interface StatItem {
  value: string;
  numericPart: number;
  prefix: string;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    value: '+200',
    numericPart: 200,
    prefix: '+',
    suffix: '',
    label: 'Profissionais Colocados',
    icon: <Users className="w-7 h-7" />,
  },
  {
    value: '11+',
    numericPart: 11,
    prefix: '',
    suffix: '+',
    label: 'Anos de Experiência',
    icon: <Award className="w-7 h-7" />,
  },
  {
    value: '98%',
    numericPart: 98,
    prefix: '',
    suffix: '%',
    label: 'Taxa de Satisfação',
    icon: <TrendingUp className="w-7 h-7" />,
  },
  {
    value: '24/7',
    numericPart: 0, // special: no counting
    prefix: '',
    suffix: '',
    label: 'Suporte Operacional',
    icon: <Headphones className="w-7 h-7" />,
  },
];

// Animated counter hook
function useCountUp(target: number, isInView: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || target === 0) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
}

const StatCard: React.FC<{ stat: StatItem; index: number; isInView: boolean }> = ({
  stat,
  index,
  isInView,
}) => {
  const count = useCountUp(stat.numericPart, isInView);
  const displayValue = stat.numericPart === 0 ? stat.value : `${stat.prefix}${count}${stat.suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
      className="liquid-glass glow-border rounded-2xl p-8 text-center group hover:scale-[1.03] transition-transform duration-300"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-[#1868B8]/20 border border-[#1868B8]/20 flex items-center justify-center mx-auto mb-5 text-[#1868B8] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-shadow duration-300">
        {stat.icon}
      </div>

      {/* Number */}
      <div className="text-4xl md:text-5xl font-display font-bold text-[#EFF4F8] mb-2 tracking-tight">
        {displayValue}
      </div>

      {/* Label */}
      <div className="text-[#7E92A6] text-sm font-mono uppercase tracking-wider font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
};

export const StatsRecrutamento: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#1868B8] rounded-full filter blur-[200px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#1868B8] text-[11px] font-mono font-bold uppercase tracking-[0.3em] mb-4 block">
            Números que falam
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-[#EFF4F8] tracking-tight">
            Excelência comprovada no terreno
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};
