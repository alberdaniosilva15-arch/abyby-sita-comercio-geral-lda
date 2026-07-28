import React, { useEffect, useRef } from 'react';
import { Page01Hero } from './pages/Page01Hero';
import { Page02About } from './pages/Page02About';
import { Page03ServicesIndex } from './pages/Page03ServicesIndex';
import { Page04RopeAccess } from './pages/Page04RopeAccess';
import { Page05RentalFleet } from './pages/Page05RentalFleet';
import { Page06HeavyEquipment } from './pages/Page06HeavyEquipment';
import { Page07IndustrialSupply } from './pages/Page07IndustrialSupply';
import { Page08ProductsInventory } from './pages/Page08ProductsInventory';
import { Page09SepticService } from './pages/Page09SepticService';
import { Page10BlueEnergy } from './pages/Page10BlueEnergy';
import { Page11WhyChooseUs } from './pages/Page11WhyChooseUs';
import { Page12Contacts } from './pages/Page12Contacts';

interface PageFlipBookProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  isFlipping?: boolean;
  setIsFlipping?: (flipping: boolean) => void;
}

export const SECTION_IDS = [
  'inicio',
  'sobre',
  'servicos',
  'rope-access',
  'frota',
  'equipamentos',
  'tubagens',
  'produtos',
  'fossa',
  'blue-energy',
  'porque-nos',
  'contactos',
];

export const PageFlipBook: React.FC<PageFlipBookProps> = ({
  onPageChange,
}) => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth IntersectionObserver to update active navigation item during vertical scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute('data-section-index');
            if (indexStr !== null) {
              const idx = parseInt(indexStr, 10);
              onPageChange(idx);
            }
          }
        });
      },
      {
        threshold: 0.2, // Triggers smoothly when section is in view
        rootMargin: '-80px 0px -20% 0px', // Compensates for top navbar height
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [onPageChange]);

  const handleNavigateToSection = (index: number) => {
    const id = SECTION_IDS[index];
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const sections = [
    { id: SECTION_IDS[0], component: <Page01Hero onNavigate={handleNavigateToSection} /> },
    { id: SECTION_IDS[1], component: <Page02About /> },
    { id: SECTION_IDS[2], component: <Page03ServicesIndex onNavigate={handleNavigateToSection} /> },
    { id: SECTION_IDS[3], component: <Page04RopeAccess /> },
    { id: SECTION_IDS[4], component: <Page05RentalFleet /> },
    { id: SECTION_IDS[5], component: <Page06HeavyEquipment /> },
    { id: SECTION_IDS[6], component: <Page07IndustrialSupply /> },
    { id: SECTION_IDS[7], component: <Page08ProductsInventory /> },
    { id: SECTION_IDS[8], component: <Page09SepticService /> },
    { id: SECTION_IDS[9], component: <Page10BlueEnergy /> },
    { id: SECTION_IDS[10], component: <Page11WhyChooseUs /> },
    { id: SECTION_IDS[11], component: <Page12Contacts /> },
  ];

  return (
    <div className="w-full flex flex-col pt-20 scroll-smooth bg-[#071B2E]">
      {sections.map((sec, idx) => (
        <section
          key={sec.id}
          id={sec.id}
          data-section-index={idx}
          ref={(el) => (sectionRefs.current[idx] = el)}
          className="w-full flex flex-col justify-center relative scroll-mt-20 overflow-hidden"
        >
          {sec.component}
        </section>
      ))}
    </div>
  );
};
