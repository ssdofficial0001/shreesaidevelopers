import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, ShieldCheck, Award } from 'lucide-react';

interface HeroProps {
  onSelectAction?: (action: 'buy' | 'sell' | 'rent') => void;
  onExploreProperties: () => void;
  onOpenContact: () => void;
  onSearchSubmit?: (filters: { requirement: string; location: string; propertyType: string; budget: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProperties,
  onOpenContact,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle luxury parallax offset (desktop only)
  const textOffset = -Math.min(scrollY, 800) * 0.06;

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] sm:min-h-screen flex flex-col justify-end sm:justify-center pt-[72px] sm:pt-[100px] pb-6 sm:pb-[80px] overflow-hidden parallax-container"
      style={{
        backgroundAttachment: 'local',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {/* 1. Full-Bleed Architectural Image Asset Background (Cinematic crop, static on mobile to avoid continuous animation) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img
          src="/3.png"
          alt="Evershine, Vasai Verified Development - Shree Sai Apartment"
          className="w-full h-full object-cover object-[center_32%] sm:object-center sm:animate-slow-zoom"
          loading="eager"
        />
      </div>

      {/* 2. Measured Scrim System: Lighter at top to expose architecture, soft bottom contrast for crisp typography */}
      {/* Mobile-first directional scrim */}
      <div
        className="absolute inset-0 z-1 pointer-events-none sm:hidden"
        style={{
          background: 'linear-gradient(to top, rgba(11, 19, 37, 0.97) 0%, rgba(11, 19, 37, 0.88) 38%, rgba(11, 19, 37, 0.45) 65%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Desktop balanced gradient overlay */}
      <div
        className="hidden sm:block absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(11, 19, 37, 0.92) 0%, rgba(11, 19, 37, 0.78) 45%, rgba(11, 19, 37, 0.48) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="hidden sm:block absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(11, 19, 37, 0.88) 0%, transparent 60%, rgba(11, 19, 37, 0.45) 100%)',
        }}
        aria-hidden="true"
      />

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div
          className="max-w-2xl lg:max-w-3xl"
          style={{
            transform: `translate3d(0, ${textOffset}px, 0)`,
            willChange: 'transform',
          }}
        >
          {/* Editorial Kicker */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
            <span className="w-6 sm:w-10 h-[2px] bg-[#D4AF37] shrink-0" aria-hidden="true" />
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] font-montserrat">
              Shree Sai Developers · Mumbai &amp; MMR
            </p>
          </div>

          {/* Main Heading: Scaled to fit mobile screens elegantly without taking over the entire screen */}
          <h1
            className="text-[1.45rem] leading-[1.22] sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase font-cinzel drop-shadow-md text-balance"
            style={{
              fontFamily: "'Cinzel', Georgia, serif",
              fontWeight: 700,
              textTransform: 'uppercase',
              textShadow: '0px 2px 4px rgba(0,0,0,0.6)',
              color: '#D4AF37',
            }}
          >
            Shaping Mumbai&apos;s Finest Landscapes.
          </h1>

          {/* Clean Subtext: Short and crisp on mobile */}
          <p
            className="mt-2 sm:mt-3.5 mb-3.5 sm:mb-5 text-xs sm:text-sm md:text-base font-light tracking-wide leading-relaxed max-w-xl font-montserrat text-slate-200"
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <span className="sm:hidden">
              Residential and commercial property developments across Mumbai &amp; MMR.
            </span>
            <span className="hidden sm:inline">
              Direct developer portfolio featuring clear marketable titles, structural integrity, and verified developments across Mumbai and MMR.
            </span>
          </p>

          {/* Concise Unboxed Trust Indicators */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-[#CBD5E1] font-montserrat mb-4 sm:mb-6">
            <span className="flex items-center gap-1 text-[#E2E8F0] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              Direct Developer
            </span>
            <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#E2E8F0] font-medium">
              <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              Verified Titles
            </span>
            <span className="text-[#D4AF37]/50 hidden xs:inline" aria-hidden="true">·</span>
            <span className="text-slate-300 hidden xs:inline">Mumbai &amp; MMR</span>
          </div>

          {/* Full-width properly spaced action buttons on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
            {/* Primary Action Button: Full-width on mobile, comfortable 48px height */}
            <button
              onClick={onExploreProperties}
              className="w-full sm:w-auto h-12 px-6 rounded-[4px] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-lg cursor-pointer bg-[#D4AF37] hover:bg-[#E5C158] text-[#0C2340] border border-[#D4AF37] active:scale-[0.98]"
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <span>View Ongoing Projects</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#0C2340]" />
            </button>

            {/* Secondary Action Button: Full-width outline on mobile */}
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto h-12 px-6 rounded-[4px] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer bg-[#0B1325]/60 hover:bg-[#1C2541] border border-[rgba(212,175,55,0.6)] text-[#D4AF37] active:scale-[0.98]"
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <Phone className="w-4 h-4 stroke-[2.2] text-[#D4AF37]" />
              <span>Request Callback</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
