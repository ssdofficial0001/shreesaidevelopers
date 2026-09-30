import React from 'react';
import { Shield, MessageSquare, Layers, MapPin } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const trustPillars = [
    {
      icon: Shield,
      title: 'VERIFIED INFORMATION',
      description: 'Clear and relevant property information.',
    },
    {
      icon: MessageSquare,
      title: 'TRANSPARENT GUIDANCE',
      description: 'Straightforward communication throughout the process.',
    },
    {
      icon: Layers,
      title: 'BUY • SELL • RENT',
      description: 'Support for different property requirements.',
    },
    {
      icon: MapPin,
      title: 'MUMBAI & MMR',
      description: 'Property assistance across the wider Mumbai Metropolitan Region.',
    },
  ];

  return (
    <section
      id="why-sai"
      className="py-12 sm:py-20 lg:py-24 bg-[#0A0F1D] text-[#E2E8F0] border-b border-[rgba(212,175,55,0.15)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] font-montserrat">
            Foundation &amp; Principles
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4AF37] tracking-tight font-cinzel">
            Why Shree Sai Developers
          </h2>
        </div>

        {/* 4 Clean Editorial Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="card-hw card-hw-interactive p-6 sm:p-7 flex flex-col justify-between space-y-5 rounded-[4px] group"
              >
                <div className="w-12 h-12 rounded-[4px] bg-[#0B1325] border border-[rgba(212,175,55,0.3)] group-hover:border-[rgba(212,175,55,0.6)] flex items-center justify-center text-[#D4AF37] shadow-sm transition-colors">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold tracking-wider text-[#FFFFFF] group-hover:text-[#D4AF37] transition-colors uppercase font-cinzel">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed font-montserrat">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
