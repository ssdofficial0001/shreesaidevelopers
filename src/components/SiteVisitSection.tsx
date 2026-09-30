import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/propertyData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface SiteVisitSectionProps {
  onBookSiteVisit?: () => void;
}

export const SiteVisitSection: React.FC<SiteVisitSectionProps> = ({
  onBookSiteVisit,
}) => {
  return (
    <section id="consultation" className="relative py-28 lg:py-36 bg-[#111215] text-white overflow-hidden border-t border-white/10">
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/1.png"
          alt="Shree Sai Developers Property Architecture"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-[0.75]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111215] via-[#111215]/85 to-[#111215]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#C5995B] uppercase font-sans-clean">
              READY TO EXPLORE?
            </span>
            <span className="w-12 h-[1px] bg-white/20" />
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal font-syne text-white uppercase tracking-tight leading-[1.04]">
            Let’s Find <br />
            The Right Property <br />
            <span className="text-[#8E8B87]">For You.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8E8B87] font-sans-clean font-light leading-relaxed max-w-xl">
            Direct developer guidance for buying, selling, and renting properties across Mumbai &amp; MMR. Schedule an on-ground site visit or connect via instant WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 font-sans-clean">
            <button
              onClick={() => {
                if (onBookSiteVisit) {
                  onBookSiteVisit();
                } else {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-arch group"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5995B]" />
              <span>BOOK A SITE VISIT</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-arch text-[#25D366] border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/10"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span>WHATSAPP US</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
