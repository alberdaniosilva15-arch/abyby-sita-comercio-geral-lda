import React, { useState } from 'react';
import { ShoppingCart, Info } from 'lucide-react';
import { FoodProduct } from '../../types';

interface FoodProductCardProps {
  product: FoodProduct;
  onQuoteRequest: (product: FoodProduct) => void;
}

/**
 * Returns a category-specific SVG placeholder that visually represents
 * the type of food item when no real image is available.
 */
const FoodPlaceholderSVG: React.FC<{ productId: string; category: string }> = ({
  productId,
  category,
}) => {
  // Map individual products to specific placeholder icons
  const getPlaceholder = () => {
    // Specific product placeholders
    switch (productId) {
      // ── PROTEÍNAS ──
      case 'carne-vermelha':
        return (
          <g>
            <rect x="25" y="30" width="50" height="35" rx="6" fill="#991B1B" opacity="0.6" />
            <rect x="30" y="35" width="40" height="25" rx="4" fill="#DC2626" opacity="0.5" />
            <path
              d="M35 40 Q50 50 65 40"
              stroke="#FCA5A5"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              CARNE
            </text>
          </g>
        );
      case 'peixe':
        return (
          <g>
            <ellipse cx="50" cy="45" rx="22" ry="12" fill="#0EA5E9" opacity="0.5" />
            <path d="M72 45 L82 35 L82 55 Z" fill="#0EA5E9" opacity="0.4" />
            <circle cx="36" cy="42" r="2" fill="#E0F2FE" opacity="0.8" />
            <path
              d="M42 50 Q50 55 60 50"
              stroke="#7DD3FC"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M30 45 Q50 38 70 45"
              stroke="#BAE6FD"
              strokeWidth="0.8"
              fill="none"
              opacity="0.3"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              PEIXE
            </text>
          </g>
        );
      case 'ovos':
        return (
          <g>
            <ellipse cx="38" cy="48" rx="10" ry="14" fill="#FDE68A" opacity="0.5" />
            <ellipse cx="55" cy="50" rx="10" ry="14" fill="#FEF3C7" opacity="0.5" />
            <ellipse cx="70" cy="48" rx="9" ry="13" fill="#FDE68A" opacity="0.4" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              OVOS
            </text>
          </g>
        );
      case 'frango':
        return (
          <g>
            <ellipse cx="50" cy="42" rx="20" ry="18" fill="#FB923C" opacity="0.4" />
            <path d="M30 42 Q50 60 70 42" fill="#FDBA74" opacity="0.3" />
            <circle cx="50" cy="38" r="8" fill="#F97316" opacity="0.3" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              FRANGO
            </text>
          </g>
        );
      case 'feijao-proteina':
        return (
          <g>
            <ellipse cx="36" cy="42" rx="7" ry="5" fill="#92400E" opacity="0.6" />
            <ellipse cx="50" cy="38" rx="7" ry="5" fill="#DC2626" opacity="0.5" />
            <ellipse cx="64" cy="43" rx="7" ry="5" fill="#1C1917" opacity="0.5" />
            <ellipse cx="43" cy="52" rx="7" ry="5" fill="#F5F5DC" opacity="0.5" />
            <ellipse cx="58" cy="54" rx="7" ry="5" fill="#92400E" opacity="0.4" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              FEIJÃO
            </text>
          </g>
        );
      case 'leite-derivados':
        return (
          <g>
            <rect x="38" y="25" width="24" height="38" rx="3" fill="#E0E7FF" opacity="0.5" />
            <rect x="41" y="20" width="18" height="8" rx="2" fill="#C7D2FE" opacity="0.6" />
            <rect x="43" y="30" width="14" height="8" rx="1" fill="#818CF8" opacity="0.3" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              LÁCTEO
            </text>
          </g>
        );
      case 'iogurte-natural':
        return (
          <g>
            <rect x="35" y="30" width="30" height="28" rx="4" fill="#E0E7FF" opacity="0.5" />
            <ellipse cx="50" cy="30" rx="15" ry="4" fill="#C7D2FE" opacity="0.6" />
            <ellipse cx="50" cy="44" rx="10" ry="6" fill="#F0FDF4" opacity="0.4" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              IOGURTE
            </text>
          </g>
        );
      case 'aveia':
        return (
          <g>
            <path d="M35 55 L30 30 L70 30 L65 55 Z" fill="#D4A574" opacity="0.5" />
            <ellipse cx="50" cy="30" rx="20" ry="5" fill="#C2A061" opacity="0.5" />
            <circle cx="42" cy="40" r="3" fill="#92400E" opacity="0.4" />
            <circle cx="50" cy="38" r="2.5" fill="#A16207" opacity="0.4" />
            <circle cx="58" cy="42" r="3" fill="#92400E" opacity="0.3" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              AVEIA
            </text>
          </g>
        );
      case 'amendoim-frutos-secos':
        return (
          <g>
            <ellipse cx="38" cy="42" rx="8" ry="5" fill="#D4A574" opacity="0.5" />
            <ellipse cx="52" cy="40" rx="7" ry="4.5" fill="#C2A061" opacity="0.5" />
            <ellipse cx="62" cy="45" rx="6" ry="4" fill="#D4A574" opacity="0.4" />
            <ellipse cx="45" cy="52" rx="7" ry="4.5" fill="#A16207" opacity="0.4" />
            <circle cx="56" cy="53" r="4" fill="#92400E" opacity="0.35" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              FRUTOS SECOS
            </text>
          </g>
        );
      case 'batata-doce':
        return (
          <g>
            <ellipse cx="50" cy="45" rx="22" ry="14" fill="#C2410C" opacity="0.4" />
            <ellipse cx="50" cy="43" rx="20" ry="12" fill="#EA580C" opacity="0.35" />
            <path
              d="M50 30 Q55 25 52 20"
              stroke="#16A34A"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              BATATA-DOCE
            </text>
          </g>
        );

      // ── ARROZ, FEIJÃO & CEREAIS ──
      case 'arroz-branco':
        return (
          <g>
            <path d="M30 50 Q30 35 50 32 Q70 35 70 50 Z" fill="#F1F5F9" opacity="0.5" />
            <ellipse cx="50" cy="50" rx="20" ry="6" fill="#E2E8F0" opacity="0.5" />
            {[40, 44, 48, 52, 56, 60].map((x, i) => (
              <ellipse
                key={i}
                cx={x}
                cy={42 + (i % 2) * 3}
                rx="2"
                ry="1.2"
                fill="#F8FAFC"
                opacity="0.7"
              />
            ))}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              ARROZ
            </text>
          </g>
        );
      case 'arroz-integral':
        return (
          <g>
            <path d="M30 50 Q30 35 50 32 Q70 35 70 50 Z" fill="#A16207" opacity="0.4" />
            <ellipse cx="50" cy="50" rx="20" ry="6" fill="#92400E" opacity="0.4" />
            {[40, 44, 48, 52, 56, 60].map((x, i) => (
              <ellipse
                key={i}
                cx={x}
                cy={42 + (i % 2) * 3}
                rx="2"
                ry="1.2"
                fill="#D4A574"
                opacity="0.6"
              />
            ))}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              INTEGRAL
            </text>
          </g>
        );
      case 'feijao-preto':
        return (
          <g>
            {[36, 44, 52, 60, 40, 48, 56].map((x, i) => (
              <ellipse
                key={i}
                cx={x}
                cy={40 + (i > 3 ? 10 : 0)}
                rx="6"
                ry="4.5"
                fill="#1C1917"
                opacity={0.6 - i * 0.03}
              />
            ))}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="7"
              fontFamily="monospace"
              opacity="0.6"
            >
              FEIJÃO PRETO
            </text>
          </g>
        );
      case 'feijao-carioca':
        return (
          <g>
            {[36, 44, 52, 60, 40, 48, 56].map((x, i) => (
              <ellipse
                key={i}
                cx={x}
                cy={40 + (i > 3 ? 10 : 0)}
                rx="6"
                ry="4.5"
                fill="#D4A574"
                opacity={0.6 - i * 0.03}
              />
            ))}
            {[38, 46, 54, 42, 50].map((x, i) => (
              <path
                key={`s${i}`}
                d={`M${x - 3} ${41 + (i > 2 ? 10 : 0)} Q${x} ${38 + (i > 2 ? 10 : 0)} ${x + 3} ${41 + (i > 2 ? 10 : 0)}`}
                stroke="#92400E"
                strokeWidth="0.8"
                fill="none"
                opacity="0.4"
              />
            ))}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="7"
              fontFamily="monospace"
              opacity="0.6"
            >
              CARIOCA
            </text>
          </g>
        );
      case 'feijao-branco':
        return (
          <g>
            {[36, 44, 52, 60, 40, 48, 56].map((x, i) => (
              <ellipse
                key={i}
                cx={x}
                cy={40 + (i > 3 ? 10 : 0)}
                rx="6"
                ry="4.5"
                fill="#F5F5DC"
                opacity={0.6 - i * 0.02}
              />
            ))}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="7"
              fontFamily="monospace"
              opacity="0.6"
            >
              FEIJÃO BRANCO
            </text>
          </g>
        );
      case 'feijao-vermelho':
        return (
          <g>
            {[36, 44, 52, 60, 40, 48, 56].map((x, i) => (
              <ellipse
                key={i}
                cx={x}
                cy={40 + (i > 3 ? 10 : 0)}
                rx="6"
                ry="4.5"
                fill="#DC2626"
                opacity={0.5 - i * 0.03}
              />
            ))}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="7"
              fontFamily="monospace"
              opacity="0.6"
            >
              VERMELHO
            </text>
          </g>
        );
      case 'milho-derivados':
        return (
          <g>
            <ellipse cx="50" cy="42" rx="12" ry="22" fill="#FBBF24" opacity="0.5" />
            <ellipse cx="50" cy="42" rx="10" ry="20" fill="#F59E0B" opacity="0.35" />
            {[30, 35, 40, 45, 50, 54].map((y, i) => (
              <path
                key={i}
                d={`M42 ${y} Q50 ${y - 2} 58 ${y}`}
                stroke="#D97706"
                strokeWidth="0.8"
                fill="none"
                opacity="0.4"
              />
            ))}
            <path
              d="M50 18 Q45 12 42 8"
              stroke="#16A34A"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M50 18 Q55 12 58 10"
              stroke="#16A34A"
              strokeWidth="1.2"
              fill="none"
              opacity="0.4"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              MILHO
            </text>
          </g>
        );
      case 'farinha-cereais':
        return (
          <g>
            <path d="M32 55 L28 28 L72 28 L68 55 Z" fill="#F5F5DC" opacity="0.5" />
            <ellipse cx="50" cy="28" rx="22" ry="5" fill="#E8E0D0" opacity="0.5" />
            <rect x="38" y="35" width="24" height="10" rx="2" fill="#D4A574" opacity="0.3" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              FARINHA
            </text>
          </g>
        );

      // ── FRUTAS & HORTÍCOLAS ──
      case 'banana':
        return (
          <g>
            <path d="M35 55 Q30 35 45 25 Q55 22 60 30 Q55 50 40 58" fill="#FBBF24" opacity="0.55" />
            <path
              d="M35 55 Q30 35 45 25"
              stroke="#F59E0B"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              BANANA
            </text>
          </g>
        );
      case 'laranja':
        return (
          <g>
            <circle cx="50" cy="44" r="18" fill="#F97316" opacity="0.5" />
            <circle cx="50" cy="44" r="15" fill="#FB923C" opacity="0.35" />
            <path
              d="M50 26 Q52 20 48 18"
              stroke="#16A34A"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <ellipse cx="48" cy="20" rx="4" ry="2.5" fill="#16A34A" opacity="0.4" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              LARANJA
            </text>
          </g>
        );
      case 'maca':
        return (
          <g>
            <circle cx="50" cy="45" r="17" fill="#DC2626" opacity="0.5" />
            <circle cx="50" cy="45" r="14" fill="#EF4444" opacity="0.35" />
            <path
              d="M50 28 Q52 22 50 18"
              stroke="#92400E"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <ellipse cx="53" cy="22" rx="4" ry="2.5" fill="#16A34A" opacity="0.5" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              MAÇÃ
            </text>
          </g>
        );
      case 'manga':
        return (
          <g>
            <ellipse cx="50" cy="44" rx="18" ry="15" fill="#FBBF24" opacity="0.5" />
            <ellipse cx="48" cy="42" rx="15" ry="12" fill="#F59E0B" opacity="0.35" />
            <path
              d="M65 35 Q70 28 68 22"
              stroke="#16A34A"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              MANGA
            </text>
          </g>
        );
      case 'tomate':
        return (
          <g>
            <circle cx="50" cy="46" r="17" fill="#DC2626" opacity="0.5" />
            <circle cx="50" cy="46" r="14" fill="#EF4444" opacity="0.35" />
            <path
              d="M42 30 Q50 26 58 30"
              stroke="#16A34A"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M46 30 Q50 24 54 30"
              stroke="#22C55E"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            <circle cx="50" cy="29" r="1.5" fill="#16A34A" opacity="0.5" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              TOMATE
            </text>
          </g>
        );
      case 'cebola':
        return (
          <g>
            <circle cx="50" cy="46" r="17" fill="#D4A574" opacity="0.4" />
            <circle cx="50" cy="46" r="14" fill="#C2A061" opacity="0.35" />
            <circle cx="50" cy="46" r="10" fill="#F5F5DC" opacity="0.3" />
            <path
              d="M50 28 Q52 22 50 18"
              stroke="#16A34A"
              strokeWidth="1.2"
              fill="none"
              opacity="0.5"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              CEBOLA
            </text>
          </g>
        );
      case 'cenoura':
        return (
          <g>
            <path d="M50 60 L38 28 L62 28 Z" fill="#F97316" opacity="0.5" />
            <path d="M50 60 L40 30 L60 30 Z" fill="#FB923C" opacity="0.35" />
            <path
              d="M46 25 Q44 18 40 14"
              stroke="#16A34A"
              strokeWidth="1.2"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M50 25 Q52 16 50 12"
              stroke="#22C55E"
              strokeWidth="1.2"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M54 25 Q56 18 60 14"
              stroke="#16A34A"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              CENOURA
            </text>
          </g>
        );
      case 'couve':
        return (
          <g>
            <circle cx="50" cy="44" r="18" fill="#16A34A" opacity="0.4" />
            <circle cx="50" cy="44" r="14" fill="#22C55E" opacity="0.35" />
            <circle cx="50" cy="44" r="9" fill="#4ADE80" opacity="0.3" />
            <path
              d="M36 38 Q50 30 64 38"
              stroke="#15803D"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              COUVE
            </text>
          </g>
        );
      case 'alface':
        return (
          <g>
            <ellipse cx="50" cy="44" rx="20" ry="16" fill="#22C55E" opacity="0.35" />
            <path d="M35 42 Q42 32 50 38 Q58 32 65 42" fill="#4ADE80" opacity="0.3" />
            <path
              d="M38 48 Q50 40 62 48"
              stroke="#16A34A"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              ALFACE
            </text>
          </g>
        );
      case 'batata':
        return (
          <g>
            <ellipse cx="50" cy="45" rx="22" ry="14" fill="#D4A574" opacity="0.5" />
            <ellipse cx="50" cy="43" rx="20" ry="12" fill="#C2A061" opacity="0.4" />
            <circle cx="42" cy="40" r="1.5" fill="#92400E" opacity="0.3" />
            <circle cx="55" cy="42" r="1.5" fill="#92400E" opacity="0.25" />
            <circle cx="48" cy="48" r="1" fill="#92400E" opacity="0.25" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              BATATA
            </text>
          </g>
        );
      case 'alho':
        return (
          <g>
            <circle cx="50" cy="46" r="15" fill="#F1F5F9" opacity="0.5" />
            <path d="M42 38 Q50 28 58 38" fill="#E2E8F0" opacity="0.4" />
            <path
              d="M44 46 L50 34 L56 46"
              stroke="#CBD5E1"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M50 30 Q52 24 50 20"
              stroke="#A16207"
              strokeWidth="1.2"
              fill="none"
              opacity="0.4"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              ALHO
            </text>
          </g>
        );
      case 'pimento':
        return (
          <g>
            <ellipse cx="50" cy="46" rx="14" ry="18" fill="#DC2626" opacity="0.45" />
            <ellipse cx="44" cy="46" rx="10" ry="16" fill="#EF4444" opacity="0.35" />
            <ellipse cx="56" cy="46" rx="10" ry="16" fill="#F97316" opacity="0.3" />
            <path
              d="M50 28 Q52 22 50 16"
              stroke="#16A34A"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              PIMENTO
            </text>
          </g>
        );

      // ── ESSENCIAIS ──
      case 'oleo':
        return (
          <g>
            <rect x="40" y="24" width="20" height="35" rx="3" fill="#F59E0B" opacity="0.45" />
            <rect x="44" y="18" width="12" height="8" rx="2" fill="#FBBF24" opacity="0.5" />
            <rect x="47" y="14" width="6" height="6" rx="1" fill="#D97706" opacity="0.4" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              ÓLEO
            </text>
          </g>
        );
      case 'sal':
        return (
          <g>
            <path d="M35 55 Q35 35 50 30 Q65 35 65 55 Z" fill="#F1F5F9" opacity="0.5" />
            <ellipse cx="50" cy="55" rx="15" ry="4" fill="#E2E8F0" opacity="0.4" />
            {[42, 46, 50, 54, 58].map((x, i) => (
              <rect
                key={i}
                x={x}
                y={44 + (i % 2) * 3}
                width="2"
                height="2"
                fill="#CBD5E1"
                opacity="0.5"
              />
            ))}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              SAL
            </text>
          </g>
        );
      case 'acucar':
        return (
          <g>
            <path d="M32 55 L28 25 L72 25 L68 55 Z" fill="#F5F5DC" opacity="0.5" />
            <ellipse cx="50" cy="25" rx="22" ry="5" fill="#FEFCE8" opacity="0.5" />
            <rect x="40" y="32" width="20" height="10" rx="2" fill="#FDE68A" opacity="0.3" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              AÇÚCAR
            </text>
          </g>
        );
      case 'agua':
        return (
          <g>
            <rect x="38" y="22" width="24" height="40" rx="4" fill="#0EA5E9" opacity="0.35" />
            <rect x="41" y="16" width="18" height="8" rx="3" fill="#38BDF8" opacity="0.4" />
            <rect x="42" y="30" width="16" height="12" rx="1" fill="#BAE6FD" opacity="0.3" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              ÁGUA
            </text>
          </g>
        );
      case 'conservas':
        return (
          <g>
            <rect x="34" y="30" width="32" height="28" rx="4" fill="#94A3B8" opacity="0.45" />
            <rect x="34" y="28" width="32" height="6" rx="2" fill="#64748B" opacity="0.5" />
            <rect x="38" y="38" width="24" height="8" rx="1" fill="#F59E0B" opacity="0.3" />
            <ellipse cx="50" cy="28" rx="4" ry="2" fill="#475569" opacity="0.5" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              CONSERVA
            </text>
          </g>
        );
      case 'massa':
        return (
          <g>
            {[40, 44, 48, 52, 56, 60].map((x, i) => (
              <path
                key={i}
                d={`M${x} 22 Q${x + 2} 42 ${x - 1} 62`}
                stroke="#FBBF24"
                strokeWidth="1.5"
                fill="none"
                opacity={0.5 - i * 0.04}
              />
            ))}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              MASSA
            </text>
          </g>
        );
      case 'temperos':
        return (
          <g>
            <rect x="38" y="30" width="24" height="28" rx="3" fill="#92400E" opacity="0.4" />
            <rect x="42" y="24" width="16" height="8" rx="2" fill="#A16207" opacity="0.5" />
            <circle cx="44" cy="42" r="2" fill="#DC2626" opacity="0.4" />
            <circle cx="50" cy="40" r="2" fill="#16A34A" opacity="0.4" />
            <circle cx="56" cy="43" r="2" fill="#F59E0B" opacity="0.4" />
            <circle cx="47" cy="48" r="1.5" fill="#7C3AED" opacity="0.3" />
            <circle cx="53" cy="49" r="1.5" fill="#EA580C" opacity="0.3" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              TEMPEROS
            </text>
          </g>
        );

      // ── KITS ──
      case 'kit-familia':
        return (
          <g>
            <path d="M28 50 L28 32 L72 32 L72 50 Z" fill="#1868B8" opacity="0.4" />
            <path d="M28 50 L22 55 L78 55 L72 50 Z" fill="#0F3B63" opacity="0.4" />
            <path
              d="M36 28 Q50 20 64 28"
              stroke="#0EA5E9"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            <rect x="34" y="36" width="8" height="6" rx="1" fill="#F59E0B" opacity="0.4" />
            <rect x="46" y="36" width="8" height="6" rx="1" fill="#22C55E" opacity="0.4" />
            <rect x="58" y="36" width="8" height="6" rx="1" fill="#DC2626" opacity="0.4" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="7"
              fontFamily="monospace"
              opacity="0.6"
            >
              KIT FAMÍLIA
            </text>
          </g>
        );
      case 'kit-performance':
        return (
          <g>
            <rect x="30" y="28" width="40" height="30" rx="4" fill="#1868B8" opacity="0.4" />
            <circle cx="50" cy="40" r="10" fill="#0EA5E9" opacity="0.35" />
            <path
              d="M45 40 L48 36 L50 42 L52 34 L55 40"
              stroke="#22D3EE"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="7"
              fontFamily="monospace"
              opacity="0.6"
            >
              KIT PROTEÍNA
            </text>
          </g>
        );
      case 'kit-empresa':
        return (
          <g>
            <rect x="28" y="30" width="44" height="28" rx="3" fill="#1868B8" opacity="0.4" />
            <rect x="32" y="26" width="36" height="6" rx="2" fill="#0F3B63" opacity="0.5" />
            <rect x="34" y="36" width="14" height="10" rx="1" fill="#0EA5E9" opacity="0.3" />
            <rect x="52" y="36" width="14" height="10" rx="1" fill="#0EA5E9" opacity="0.3" />
            <rect x="34" y="48" width="32" height="4" rx="1" fill="#22D3EE" opacity="0.25" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="7"
              fontFamily="monospace"
              opacity="0.6"
            >
              KIT EMPRESA
            </text>
          </g>
        );

      default:
        break;
    }

    // Category-based fallback placeholders
    switch (category) {
      case 'proteinas':
        return (
          <g>
            <rect x="30" y="30" width="40" height="30" rx="5" fill="#DC2626" opacity="0.3" />
            <path
              d="M35 45 Q50 55 65 45"
              stroke="#FCA5A5"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              PROTEÍNA
            </text>
          </g>
        );
      case 'arroz-feijao-cereais':
        return (
          <g>
            <path d="M35 55 L30 28 L70 28 L65 55 Z" fill="#D4A574" opacity="0.4" />
            <ellipse cx="50" cy="28" rx="20" ry="5" fill="#C2A061" opacity="0.5" />
            {[40, 45, 50, 55, 60].map((x, i) => (
              <circle key={i} cx={x} cy={38 + (i % 2) * 4} r="2.5" fill="#92400E" opacity="0.45" />
            ))}
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              CEREAIS
            </text>
          </g>
        );
      case 'frutas-horticolas':
        return (
          <g>
            <circle cx="40" cy="40" r="12" fill="#22C55E" opacity="0.4" />
            <circle cx="62" cy="42" r="10" fill="#F97316" opacity="0.35" />
            <circle cx="50" cy="55" r="8" fill="#EF4444" opacity="0.3" />
            <path
              d="M40 28 Q42 22 44 28"
              stroke="#16A34A"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              FRESCOS
            </text>
          </g>
        );
      case 'essenciais':
        return (
          <g>
            <rect x="30" y="28" width="16" height="32" rx="3" fill="#F59E0B" opacity="0.4" />
            <rect x="52" y="32" width="18" height="28" rx="2" fill="#E0E7FF" opacity="0.4" />
            <rect x="33" y="24" width="10" height="6" rx="2" fill="#FBBF24" opacity="0.5" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              ESSENCIAL
            </text>
          </g>
        );
      default:
        return (
          <g>
            <rect x="30" y="30" width="40" height="30" rx="6" fill="#1868B8" opacity="0.3" />
            <text
              x="50"
              y="82"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.6"
            >
              PRODUTO
            </text>
          </g>
        );
    }
  };

  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-20 h-20 md:w-24 md:h-24 opacity-80"
      aria-hidden="true"
    >
      {getPlaceholder()}
    </svg>
  );
};

export const FoodProductCard: React.FC<FoodProductCardProps> = ({ product, onQuoteRequest }) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const hasRealImage = !!product.image && !imgError;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-[#0B2A4A]/60 border border-[#7E92A6]/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(24,104,184,0.2)]">
      {/* Image Area */}
      <div
        className="relative h-44 w-full overflow-hidden bg-[#071B2E]"
        style={{ aspectRatio: '16/10' }}
      >
        {/* Shimmer Skeleton while loading */}
        {hasRealImage && imgLoading && (
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#071B2E] via-[#0F3B63]/50 to-[#071B2E] animate-pulse flex items-center justify-center">
            <FoodPlaceholderSVG productId={product.id} category={product.category} />
          </div>
        )}

        {hasRealImage ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoading(false)}
            onError={() => {
              setImgError(true);
              setImgLoading(false);
            }}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${imgLoading ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}`}
          />
        ) : (
          /* SVG Placeholder Fallback */
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#071B2E] to-[#0B2A4A]">
            <FoodPlaceholderSVG productId={product.id} category={product.category} />
          </div>
        )}

        {/* Badge Overlay */}
        {product.badge && (
          <div className="absolute top-3 right-3 rounded-full bg-[#1868B8] px-2.5 py-1 font-mono text-[10px] font-bold text-white shadow-lg uppercase tracking-wider">
            {product.badge}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h4 className="mb-2 font-display text-lg font-bold text-white tracking-tight">
          {product.name}
        </h4>

        <p className="mb-4 text-xs md:text-sm text-slate-300 line-clamp-3">{product.description}</p>

        {/* Nutrients Highlight */}
        <div className="mb-4 flex flex-wrap gap-1.5 mt-auto">
          {product.nutrients.map((nutrient, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded bg-[#0F3B63] px-1.5 py-0.5 font-mono text-[10px] text-cyan-100 border border-[#7E92A6]/40"
            >
              {nutrient}
            </span>
          ))}
        </div>

        {/* Footer Area (Availability & Button) */}
        <div className="mt-auto border-t border-[#7E92A6]/20 pt-4">
          <div className="mb-3 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono text-[11px] text-cyan-300 uppercase tracking-wider">
              {product.availability === 'sob-consulta' && 'Sob Consulta'}
              {product.availability === 'sazonal' && 'Sazonal'}
              {product.availability === 'confirmar-stock' && 'Confirmar Stock'}
            </span>
          </div>

          <button
            onClick={() => onQuoteRequest(product)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600/20 px-4 py-2.5 font-mono text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500 hover:text-[#071B2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2A4A]"
            aria-label={product.quoteLabel}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Pedir Cotação</span>
          </button>
        </div>
      </div>
    </div>
  );
};
