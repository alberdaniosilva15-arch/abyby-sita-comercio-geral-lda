import React, { useState } from 'react';
import { SVGFilters } from './components/SVGFilters';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { PageFlipBook, SECTION_IDS } from './components/PageFlipBook';
import { AiChatWidget } from './components/AiChatWidget';

export function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleNavigate = (pageIndex: number) => {
    const id = SECTION_IDS[pageIndex];
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#071B2E] text-[#071B2E] font-sans antialiased overflow-x-hidden">
      {/* SVG Liquid Refraction Filter Definitions */}
      <SVGFilters />

      {/* Desktop Lens Custom Cursor */}
      <CustomCursor />

      {/* Fixed Liquid Refractive Glass Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Continuous Vertical Scrollable Sections */}
      <main className="w-full">
        <PageFlipBook
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>

      {/* Integrated AI Assistant Chatbot */}
      <AiChatWidget onNavigate={handleNavigate} />
    </div>
  );
}

export default App;

