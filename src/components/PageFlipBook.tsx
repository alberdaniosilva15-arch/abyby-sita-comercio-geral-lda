import React, { useEffect, useRef } from 'react';
import { Page01Hero } from './pages/Page01Hero';
import { Page02About } from './pages/Page02About';
import { Page03ServicesIndex } from './pages/Page03ServicesIndex';
import { Page12Contacts } from './pages/Page12Contacts';

interface PageFlipBookProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  isFlipping?: boolean;
  setIsFlipping?: (flipping: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SECTION_IDS = [
  'inicio',
  'sobre',
  'servicos',
  'contactos',
];

export const PageFlipBook: React.FC<PageFlipBookProps> = ({ onPageChange }) => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

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
      },
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
    { id: SECTION_IDS[3], component: <Page12Contacts /> },
  ];

  return (
    <div className="w-full flex flex-col scroll-smooth bg-[#071B2E]">
      {sections.map((sec, idx) => (
        <section
          key={sec.id}
          id={sec.id}
          data-section-index={idx}
          ref={(el) => {
            sectionRefs.current[idx] = el;
          }}
          className="w-full flex flex-col justify-center relative scroll-mt-20 overflow-hidden"
        >
          {sec.component}
        </section>
      ))}
    </div>
  );
};
