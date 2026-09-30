import React from 'react';
import { Key, Tag, Building2, ArrowRight } from 'lucide-react';

interface QuickRequirementsProps {
  onSelectOption: (type: 'buy' | 'sell' | 'rent') => void;
  activeOption: 'buy' | 'sell' | 'rent';
}

export const QuickRequirements: React.FC<QuickRequirementsProps> = ({
  onSelectOption,
  activeOption,
}) => {
  const options = [
    {
      id: 'buy' as const,
      title: 'BUY',
      description: 'Find a property that fits your requirements.',
      icon: Key,
      actionText: 'Explore Buy Requirements',
    },
    {
      id: 'sell' as const,
      title: 'SELL',
      description: 'List your property and connect with genuine buyers.',
      icon: Tag,
      actionText: 'List Your Property',
    },
    {
      id: 'rent' as const,
      title: 'RENT',
      description: 'Find tenants or rental properties based on your requirement.',
      icon: Building2,
      actionText: 'Find Rental Properties',
    },
  ];

  return (
    <section id="services-summary" className="py-16 md:py-24 bg-[#FDFDFD] relative border-b border-[#e8e8e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#ffffff] text-[#C5A059] border border-[#C5A059]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <span>REAL ESTATE SERVICES</span>
          </div>
          <h2
            id="quick-requirements-heading"
            className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight font-serif"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Buy • Sell • Rent
          </h2>
          <p className="mt-3 text-base text-[#666666]">
            Choose your requirement to get direct assistance from Shree Sai Developers across Mumbai & MMR.
          </p>
        </div>

        {/* Three Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = activeOption === opt.id;

            return (
              <div
                key={opt.id}
                id={`service-card-${opt.id}`}
                onClick={() => onSelectOption(opt.id)}
                className={`cursor-pointer group relative rounded-[4px] p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#ffffff] border-[#C5A059] shadow-md ring-2 ring-[#C5A059]/20'
                    : 'bg-[#ffffff] border-[#e8e8e8] hover:border-[#0C2340] hover:shadow-md'
                }`}
              >
                <div>
                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 rounded-[4px] flex items-center justify-center transition-all mb-6 ${
                      isSelected
                        ? 'bg-[#0C2340] text-[#C5A059] shadow-sm'
                        : 'bg-[#FDFDFD] text-[#1A1A1A] border border-[#e8e8e8] group-hover:border-[#0C2340] group-hover:text-[#0C2340] shadow-2xs'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-[#1A1A1A] font-serif mb-2 group-hover:text-[#0C2340] transition-colors">
                    {opt.title}
                  </h3>
                  <p className="text-sm text-[#666666] mb-6 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <button
                  id={`service-action-btn-${opt.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectOption(opt.id);
                  }}
                  className={`w-full py-3.5 px-5 rounded-[4px] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0C2340] text-white shadow-xs'
                      : 'bg-[#0C2340] hover:bg-[#1A1A1A] text-white shadow-xs'
                  }`}
                >
                  <span className="text-white">{opt.actionText}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

