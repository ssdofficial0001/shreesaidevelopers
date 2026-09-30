import React from 'react';
import { Train, Route, BookOpen, Hospital, Check } from 'lucide-react';

interface ConnectivityCard {
  id: string;
  tag: string;
  title: string;
  points: string[];
  icon: React.ElementType;
}

const CONNECTIVITY_ITEMS: ConnectivityCard[] = [
  {
    id: 'railway',
    tag: 'Transit Accessibility',
    title: 'Railway Connectivity',
    points: [
      'Accessible to local railway corridors',
      'Daily transit convenience for commuters',
    ],
    icon: Train,
  },
  {
    id: 'roadways',
    tag: 'Road Corridors',
    title: 'Road Access',
    points: [
      'Connected via primary arterial routes',
      'Direct link to suburban MMR roads',
    ],
    icon: Route,
  },
  {
    id: 'neighborhood',
    tag: 'Neighborhood Convenience',
    title: 'Essential Services',
    points: [
      'Everyday retail and markets in vicinity',
      'Established residential surroundings',
    ],
    icon: BookOpen,
  },
  {
    id: 'civic',
    tag: 'Civic Surroundings',
    title: 'Local Facilities',
    points: [
      'Convenient access to local amenities',
      'Growing suburban infrastructure',
    ],
    icon: Hospital,
  },
];

export const ConnectivitySection: React.FC = () => {
  return (
    <section
      id="connectivity"
      className="py-12 sm:py-20 lg:py-24 bg-[#0B1325] text-[#E2E8F0] border-b border-[rgba(212,175,55,0.15)]"
      aria-label="Connectivity &amp; Convenience"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[4px] bg-[#1C2541] border border-[rgba(212,175,55,0.3)] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider shadow-sm font-montserrat">
            <span>Location &amp; Accessibility</span>
          </div>
          <h2
            id="connectivity-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4AF37] tracking-tight font-cinzel mt-2"
          >
            Connectivity &amp; Convenience
          </h2>
          <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed max-w-xl mx-auto font-montserrat">
            Explore property opportunities across Evershine, Vasai and Boisar, with locations selected for everyday convenience, transit accessibility, and connectivity across Mumbai and the MMR.
          </p>
        </div>

        {/* 4 Cards Layout with subtle professional hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {CONNECTIVITY_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="card-hw card-hw-interactive p-6 sm:p-7 flex flex-col justify-between group rounded-[4px]"
              >
                <div>
                  {/* Top Icon */}
                  <div className="w-12 h-12 rounded-[4px] bg-[#0B1325] border border-[rgba(212,175,55,0.25)] group-hover:border-[rgba(212,175,55,0.5)] flex items-center justify-center text-[#D4AF37] mb-4 shadow-sm transition-colors">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Tag Line */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] block mb-1 font-montserrat">
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] tracking-tight mb-3 font-cinzel">
                    {item.title}
                  </h3>

                  {/* Divider */}
                  <div className="border-t border-[#2A3454] pt-3.5 mt-1">
                    {/* Bullet Points */}
                    <div className="space-y-2">
                      {item.points.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#CBD5E1] leading-relaxed font-montserrat">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
