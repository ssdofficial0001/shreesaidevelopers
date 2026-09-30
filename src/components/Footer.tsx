import React from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/propertyData';
import { Phone, Mail, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenRequirementModal: (action: 'buy' | 'sell' | 'rent') => void;
  onOpenLegalPage?: (page: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenRequirementModal,
  onOpenLegalPage,
}) => {
  const navItems = [
    { label: 'Properties', sectionId: 'properties' },
    { label: 'Buy', action: 'buy' as const },
    { label: 'Sell', action: 'sell' as const },
    { label: 'Rent', action: 'rent' as const },
    { label: 'About', sectionId: 'about' },
    { label: 'Gallery', sectionId: 'gallery' },
    { label: 'Contact', sectionId: 'contact' },
    { label: 'FAQ', sectionId: 'faq' },
  ];

  return (
    <footer className="bg-[#0D0E11] text-white border-t border-white/10 pt-20 pb-12 font-sans-clean">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand & Wordmark */}
          <div className="lg:col-span-5 space-y-5">
            <Logo variant="footer" />
            <p className="text-xs sm:text-sm text-[#8E8B87] font-light leading-relaxed max-w-sm">
              SHREE SAI DEVELOPERS is an established builder and developer firm providing verified on-ground residential developments, transaction advisory, and property solutions across Mumbai &amp; MMR.
            </p>
            <div className="space-y-1 pt-1 select-none">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5995B] uppercase">
                BUILDERS &amp; DEVELOPERS
              </p>
              <p className="text-[11px] text-[#8E8B87] uppercase tracking-wider">
                MUMBAI &amp; MMR • BUY • SELL • RENT
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5995B]">
              Directory
            </p>
            <ul className="space-y-2.5 text-xs text-[#8E8B87]">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      if (item.action) {
                        onOpenRequirementModal(item.action);
                      } else if (item.sectionId) {
                        onNavigate(item.sectionId);
                      }
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left font-medium uppercase tracking-wider text-[11px]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5995B]">
              Advisory Desk
            </p>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-[#C5995B] shrink-0" />
                <a
                  href={BUSINESS_INFO.callUrl}
                  className="text-white hover:text-[#C5995B] transition-colors"
                >
                  +91 98674 78525
                </a>
              </div>

              <div className="flex items-center gap-3">
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366] shrink-0" />
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#25D366] transition-colors"
                >
                  +91 98674 78525 (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-[#C5995B] shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-white hover:text-[#C5995B] transition-colors break-all"
                >
                  shreesaideveloper.in@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-[#8E8B87]">
                <MapPin className="w-3.5 h-3.5 text-[#C5995B] shrink-0" />
                <span>Evershine, Vasai · Boisar · Mumbai &amp; MMR</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Architectural Baseline Credit (Matching Reference Studio Footer) */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E8B87] font-mono uppercase tracking-wider">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} SHREE SAI DEVELOPERS</span>
            <span>/</span>
            <button
              onClick={() => onOpenLegalPage?.('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>/</span>
            <button
              onClick={() => onOpenLegalPage?.('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
            <span>/</span>
            <a
              href="#/admin"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Admin Portal
            </a>
          </div>

          <div>
            <p>
              Website Design &amp; Development by{' '}
              <span className="text-white font-semibold">
                ANURAG WEB WORKS
              </span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
