import React from 'react';
import { ShieldCheck, Trophy, Users, CheckCircle2, Check } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      id: 'rera-registered',
      title: 'RERA Registered',
      description: '100% Legal & Compliant',
      icon: ShieldCheck,
      badge: 'Certified',
    },
    {
      id: 'years-experience',
      title: '10+ Years Experience',
      description: 'Mumbai & MMR Mastery',
      icon: Trophy,
      badge: 'Est. 2014',
    },
    {
      id: 'happy-families',
      title: '500+ Happy Families',
      description: 'Delivered Homes Across MMR',
      icon: Users,
      badge: 'Trusted',
    },
    {
      id: 'verified-properties',
      title: 'Verified Properties',
      description: 'Clear Titles & Due Diligence',
      icon: CheckCircle2,
      badge: '100% Vetted',
    },
  ];

  return (
    <section
      id="trust-bar-section"
      aria-label="Trust & Credentials"
      className="relative z-20 bg-[#FDFDFD] border-y border-[#e8e8e8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Responsive Grid: 2x2 on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={`trust-item-${item.id}`}
                className="card-hw flex items-start gap-3.5 p-4 sm:p-5 rounded-[4px] bg-[#ffffff] border border-[#e8e8e8] hover:border-[#C5A059] transition-all duration-300 shadow-sm"
              >
                {/* Accent icon */}
                <div className="w-10 h-10 rounded-[4px] border border-[#C5A059]/30 flex items-center justify-center shrink-0 bg-[#ffffff]">
                  <Icon className="w-5 h-5 text-[#C5A059] stroke-[2]" />
                </div>

                {/* Text Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#1A1A1A] tracking-tight">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] border border-[#C5A059]/40 text-[#C5A059] text-[10px] font-semibold tracking-wide bg-[#ffffff] shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[2]" />
                      <span>{item.badge}</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#666666] font-normal leading-relaxed">
                    {item.description}
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
