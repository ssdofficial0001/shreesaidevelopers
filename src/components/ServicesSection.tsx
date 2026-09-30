import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: 'buy' | 'sell' | 'rent') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  const services = [
    {
      id: 'buy' as const,
      index: '01',
      title: 'BUY',
      subhead: 'Property Acquisition',
      description:
        'Find the right property with professional guidance and transparent information.',
      cta: 'Enquire to Buy',
    },
    {
      id: 'sell' as const,
      index: '02',
      title: 'SELL',
      subhead: 'Property Listing & Divestment',
      description:
        'List your property and connect with genuine enquiries.',
      cta: 'List Your Property',
    },
    {
      id: 'rent' as const,
      index: '03',
      title: 'RENT',
      subhead: 'Leasing & Tenancy',
      description:
        'Explore rental opportunities with professional assistance.',
      cta: 'Explore Rentals',
    },
  ];

  return (
    <section
      id="services"
      className="py-12 sm:py-20 lg:py-24 bg-[#0A0F1D] text-[#E2E8F0] border-b border-[rgba(212,175,55,0.15)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl pb-8 sm:pb-12 border-b border-[rgba(212,175,55,0.15)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 font-montserrat">
            Core Operations
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4AF37] tracking-tight font-cinzel">
            Real-Estate Services Across Mumbai &amp; MMR
          </h2>
        </div>

        {/* 3 Distinct Elevated Service Cards */}
        <div className="pt-8 sm:pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="card-hw card-hw-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6 group rounded-[4px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A3454]">
                  <span className="text-xs font-bold text-[#D4AF37] tracking-widest font-cinzel">
                    {service.index}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] font-montserrat">
                    {service.subhead}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight group-hover:text-[#D4AF37] transition-colors font-cinzel">
                  {service.title}
                </h3>

                <p className="text-sm text-[#CBD5E1] font-normal leading-relaxed font-montserrat">
                  {service.description}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3 px-4 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] hover:shadow-[0_4px_16px_rgba(212,175,55,0.35)] text-[#0C2340] cursor-pointer shadow-md group/btn uppercase tracking-wider font-montserrat transition-all duration-200 active:scale-[0.98]"
                >
                  <span className="text-[#0C2340]">{service.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] text-[#0C2340] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
