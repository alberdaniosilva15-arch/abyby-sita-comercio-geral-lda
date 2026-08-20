import React from 'react';
import { motion } from 'motion/react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  area: string;
  onAreaChange: (value: string) => void;
  experience: string;
  onExperienceChange: (value: string) => void;
}

interface FilterChip {
  label: string;
  onClear: () => void;
}

export const FilterBarRecrutamento: React.FC<FilterBarProps> = ({
  search, onSearchChange,
  type, onTypeChange,
  area, onAreaChange,
  experience, onExperienceChange,
}) => {
  const activeFilters: FilterChip[] = [];
  if (type) activeFilters.push({ label: type, onClear: () => onTypeChange('') });
  if (area) activeFilters.push({ label: area, onClear: () => onAreaChange('') });
  if (experience) activeFilters.push({ label: experience, onClear: () => onExperienceChange('') });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12"
    >
      {/* Filter Panel */}
      <div className="liquid-glass rounded-2xl p-6 md:p-8 specular-edge">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-[#1868B8]/20 border border-[#1868B8]/20 flex items-center justify-center text-[#1868B8]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <span className="text-[#7E92A6] text-xs font-mono uppercase tracking-[0.2em] font-bold">
            Filtrar Oportunidades
          </span>
        </div>

        {/* Search + Dropdowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7E92A6]" />
            <input
              type="text"
              placeholder="Procurar vagas..."
              className="w-full bg-[#071B2E]/50 border border-[#7E92A6]/20 rounded-xl py-3.5 pl-11 pr-4 text-[#EFF4F8] text-sm placeholder-[#7E92A6]/60 focus:outline-none focus:border-[#1868B8]/60 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {search && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7E92A6] hover:text-[#1868B8] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type Select */}
          <div className="relative">
            <select
              className="w-full bg-[#071B2E]/50 border border-[#7E92A6]/20 rounded-xl py-3.5 px-4 text-[#EFF4F8] text-sm focus:outline-none focus:border-[#1868B8]/60 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300 appearance-none cursor-pointer"
              value={type}
              onChange={(e) => onTypeChange(e.target.value)}
            >
              <option value="" className="bg-[#071B2E]">Qualquer Tipo</option>
              <option value="Offshore" className="bg-[#071B2E]">Offshore</option>
              <option value="Onshore" className="bg-[#071B2E]">Onshore</option>
            </select>
            <ChevronIcon />
          </div>

          {/* Area Select */}
          <div className="relative">
            <select
              className="w-full bg-[#071B2E]/50 border border-[#7E92A6]/20 rounded-xl py-3.5 px-4 text-[#EFF4F8] text-sm focus:outline-none focus:border-[#1868B8]/60 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300 appearance-none cursor-pointer"
              value={area}
              onChange={(e) => onAreaChange(e.target.value)}
            >
              <option value="" className="bg-[#071B2E]">Qualquer Área</option>
              <option value="Operações e Produção" className="bg-[#071B2E]">Operações e Produção</option>
              <option value="Manutenção e Integridade" className="bg-[#071B2E]">Manutenção e Integridade</option>
              <option value="Engenharia" className="bg-[#071B2E]">Engenharia (Mecânica, Elétrica, etc.)</option>
              <option value="Perfuração e Completação" className="bg-[#071B2E]">Perfuração e Completação</option>
              <option value="Geociências" className="bg-[#071B2E]">Geociências (Geologia, Geofísica)</option>
              <option value="HSE" className="bg-[#071B2E]">HSE (Saúde, Segurança e Ambiente)</option>
              <option value="QA/QC" className="bg-[#071B2E]">QA/QC (Garantia de Qualidade)</option>
              <option value="Logística e Supply Chain" className="bg-[#071B2E]">Logística e Supply Chain</option>
              <option value="Serviços Marítimos e Offshore" className="bg-[#071B2E]">Serviços Marítimos e Offshore</option>
              <option value="Fornecimento de Produtos" className="bg-[#071B2E]">Fornecimento de Produtos</option>
              <option value="Gestão de Frotas / Rent-a-Car" className="bg-[#071B2E]">Gestão de Frotas / Rent-a-Car</option>
              <option value="Tecnologia da Informação" className="bg-[#071B2E]">Tecnologia da Informação</option>
              <option value="Recursos Humanos e Formação" className="bg-[#071B2E]">Recursos Humanos e Formação</option>
              <option value="Administração e Finanças" className="bg-[#071B2E]">Administração e Finanças</option>
              <option value="Comercial e Contratos" className="bg-[#071B2E]">Comercial e Contratos</option>
            </select>
            <ChevronIcon />
          </div>

          {/* Experience Select */}
          <div className="relative">
            <select
              className="w-full bg-[#071B2E]/50 border border-[#7E92A6]/20 rounded-xl py-3.5 px-4 text-[#EFF4F8] text-sm focus:outline-none focus:border-[#1868B8]/60 focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300 appearance-none cursor-pointer"
              value={experience}
              onChange={(e) => onExperienceChange(e.target.value)}
            >
              <option value="" className="bg-[#071B2E]">Qualquer Experiência</option>
              <option value="Júnior" className="bg-[#071B2E]">Júnior</option>
              <option value="Pleno" className="bg-[#071B2E]">Pleno</option>
              <option value="Sénior" className="bg-[#071B2E]">Sénior</option>
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[#7E92A6]/10">
            <span className="text-[#7E92A6] text-xs font-mono uppercase tracking-wider self-center mr-2">
              Ativos:
            </span>
            {activeFilters.map((chip) => (
              <button
                key={chip.label}
                onClick={chip.onClear}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1868B8]/10 border border-[#1868B8]/30 text-[#1868B8] text-xs font-mono font-bold tracking-wider hover:bg-[#1868B8]/20 transition-colors cursor-pointer group"
              >
                {chip.label}
                <X className="w-3 h-3 group-hover:rotate-90 transition-transform" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Small chevron indicator for select dropdowns
const ChevronIcon: React.FC = () => (
  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7E92A6]">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);
