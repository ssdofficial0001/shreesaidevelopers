import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/propertyData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenRequirementModal: (action: 'buy' | 'sell' | 'rent') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeSection,
  onOpenRequirementModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When at the very top of the page, navbar must always be visible
      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling DOWN: smoothly slide upward and hide (unless mobile menu is open)
        if (!mobileMenuOpen) {
          setIsVisible(false);
        }
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling UP: smoothly slide back down into view immediately
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Strict user navigation links: Properties, Buy, Sell, Rent, About, Gallery, Contact
  const navItems = [
    { label: 'Properties', sectionId: 'properties' },
    { label: 'Buy', action: 'buy' as const },
    { label: 'Sell', action: 'sell' as const },
    { label: 'Rent', action: 'rent' as const },
    { label: 'About', sectionId: 'about' },
    { label: 'Gallery', sectionId: 'gallery' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    setIsVisible(true);
    if (item.action) {
      onOpenRequirementModal(item.action);
    } else if (item.sectionId) {
      onNavigate(item.sectionId);
    }
  };

  const showNavbar = isVisible || mobileMenuOpen;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
        showNavbar
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isScrolled
          ? 'bg-[#0B1325]/95 backdrop-blur-md border-b border-[rgba(212,175,55,0.2)] py-2.5 sm:py-3 shadow-[0_4px_28px_rgba(0,0,0,0.5)]'
          : 'bg-[#0B1325]/90 backdrop-blur-xs border-b border-[rgba(212,175,55,0.15)] py-3 sm:py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo Wordmark (Left Side: Original Gold Logo Asset Cleanly Padded) */}
          <div className="flex items-center justify-start flex-1 min-w-0 pr-4">
            <button
              onClick={() => onNavigate('hero')}
              className="cursor-pointer focus:outline-none flex items-center text-left shrink-0 transition-opacity duration-200 hover:opacity-95"
              aria-label="Shree Sai Developers Home"
            >
              <Logo variant="header" />
            </button>
          </div>

          {/* Absolute Center: Main Navigation Items Perfectly Centered */}
          <nav className="center-nav hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-initial font-montserrat font-medium">
            {navItems.map((item, idx) => {
              const isActive = item.sectionId && activeSection === item.sectionId;
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item)}
                  className={`text-xs xl:text-[13.5px] tracking-wide cursor-pointer py-1 font-montserrat font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#D4AF37] font-semibold active'
                      : 'text-[#E2E8F0] hover:text-[#D4AF37]'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side: Cleanly Grouped Contact Action Elements */}
          <div className="flex items-center justify-end flex-1 shrink-0 gap-2.5 pl-4">
            {/* Desktop Contact Buttons */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0 font-montserrat">
              <a
                href={BUSINESS_INFO.callUrl}
                className="px-3.5 py-2 rounded-[4px] border border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] text-[#E2E8F0] hover:text-[#D4AF37] text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 bg-[#1C2541]/60 hover:bg-[#1C2541] shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] stroke-[2]" />
                <span className="hidden xl:inline text-[#E2E8F0]">+91 98674 78525</span>
                <span className="xl:hidden text-[#E2E8F0]">Call</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] text-[#0B1325] text-xs font-bold tracking-wide uppercase transition-all duration-200 flex items-center gap-2 shadow-md"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-[#0B1325]" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile & Tablet Action Controls */}
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              {/* Quick WhatsApp button with clear touch hitbox */}
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-2.5 sm:px-3 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] active:scale-[0.98] text-[#0B1325] flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0 shadow-xs font-montserrat"
                aria-label="Direct WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-[#0B1325]" />
                <span className="text-[11px] font-bold uppercase hidden xs:inline text-[#0B1325]">WhatsApp</span>
              </a>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-[4px] text-[#E2E8F0] hover:text-[#D4AF37] border border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] bg-[#1C2541] flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0 shadow-xs active:scale-[0.98]"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Dark Luxury Theme) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[68px] bottom-0 bg-[#0B1325] border-t border-[rgba(212,175,55,0.2)] p-5 sm:p-8 flex flex-col justify-between overflow-y-auto z-50 animate-in fade-in duration-200 shadow-2xl font-montserrat">
          <div className="space-y-1.5 pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] px-3 pb-2 border-b border-[rgba(212,175,55,0.15)] font-cinzel">
              Navigation Menu
            </p>
            {navItems.map((item, idx) => {
              const isActive = item.sectionId && activeSection === item.sectionId;
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left px-3 py-3 rounded-[4px] text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-[#D4AF37] bg-[#1C2541] font-bold'
                      : 'text-[#E2E8F0] hover:text-[#D4AF37] hover:bg-[#1C2541]/60'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/50 stroke-[1.5]" />
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[rgba(212,175,55,0.15)] space-y-3">
            <div className="text-xs text-[#CBD5E1] px-1 space-y-1">
              <p className="text-[#D4AF37] font-bold font-cinzel">Shree Sai Developers</p>
              <p>Mumbai &amp; MMR • Verified Advisory</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <a
                href={BUSINESS_INFO.callUrl}
                className="w-full py-3 rounded-[4px] border border-[rgba(212,175,55,0.3)] text-[#E2E8F0] hover:text-[#D4AF37] text-xs font-semibold flex items-center justify-center gap-2 bg-[#1C2541] shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] stroke-[2]" />
                <span>Call Desk</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] text-[#0B1325] text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-xs"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-[#0B1325]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
