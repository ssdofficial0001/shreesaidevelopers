import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section
      id="about"
      className="py-12 sm:py-20 lg:py-24 bg-[#0B1325] text-[#E2E8F0] border-b border-[rgba(212,175,55,0.15)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Real Architectural On-Ground Photography (/2.png) */}
          <div className="lg:col-span-5 relative">
            <div className="card-hw card-hw-interactive p-2 sm:p-3 shadow-2xl w-full bg-[#1C2541] border border-[rgba(212,175,55,0.15)] rounded-[4px] overflow-hidden">
              <div className="relative rounded-[2px] overflow-hidden">
                <img
                  src="/2.png"
                  alt="Shree Sai Developers Architectural Project"
                  className="w-full h-auto block object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[4px] bg-[#0B1325]/95 border border-[rgba(212,175,55,0.2)] backdrop-blur-xs shadow-md">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] font-montserrat">
                    On-Ground Development
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-[#FFFFFF] mt-0.5 font-cinzel">
                    Shree Sai Developers
                  </p>
                  <p className="text-[11px] text-[#CBD5E1] font-montserrat">
                    Mumbai &amp; MMR · Verified Advisory
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] font-montserrat">
                About Shree Sai Developers
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4AF37] tracking-tight leading-[1.15] font-cinzel">
                Built Around Trust.{' '}
                <span className="text-[#FFFFFF] block sm:inline">Focused on Property.</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#CBD5E1] font-light leading-relaxed font-montserrat">
              <p>
                “From finding the right home to making a confident investment, Shree Sai Developers (Builders &amp; Developers) provides trusted real-estate solutions across Mumbai &amp; MMR. Whether you are looking to buy, sell, rent, or explore property opportunities, our approach is built around verified information, transparent guidance, and a professional experience from enquiry to transaction.”
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[rgba(212,175,55,0.15)]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1 stroke-[2.5]" />
                <div>
                  <h4 className="text-sm font-bold text-[#FFFFFF] font-cinzel">Direct Advisory</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5 font-montserrat">Straightforward engagement without ambiguous middlemen.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1 stroke-[2.5]" />
                <div>
                  <h4 className="text-sm font-bold text-[#FFFFFF] font-cinzel">Regional Expertise</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5 font-montserrat">Comprehensive presence across the Mumbai Metropolitan Region.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] active:scale-[0.98] text-[#0C2340] font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer transition-all duration-200 group font-montserrat"
              >
                <span className="text-[#0C2340]">CONNECT WITH OUR TEAM</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#0C2340] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
