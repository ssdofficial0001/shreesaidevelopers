import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BUSINESS_INFO } from '../data/propertyData';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-40 flex flex-col items-center gap-2.5 select-none pointer-events-none">
      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 bg-[#181A1F] hover:bg-white/10 text-white flex items-center justify-center shadow-lg transition-all border border-white/15 hover:border-white cursor-pointer"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 stroke-[2]" />
        </button>
      )}

      {/* Official WhatsApp Floating Button (#25D366) */}
      <a
        href={BUSINESS_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl transition-all duration-200 cursor-pointer"
        title="WhatsApp Advisory"
      >
        <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 fill-white" />
        <span className="hidden sm:inline-block absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap bg-[#181A1F] text-white text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 shadow-xl border border-white/15">
          WhatsApp Advisory
        </span>
      </a>
    </div>
  );
};
