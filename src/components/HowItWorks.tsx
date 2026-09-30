import React from 'react';
import { ArrowRight, ClipboardList, Compass, MessageSquareCode, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onEnquire: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onEnquire }) => {
  const steps = [
    {
      num: '01',
      title: 'Share Your Requirement',
      desc: 'Tell us your preferred location in Mumbai or MMR, property type, budget, and specific preferences.',
      icon: ClipboardList,
    },
    {
      num: '02',
      title: 'Explore Suitable Options',
      desc: 'We match your criteria with confirmed developments and tailored residential or commercial options.',
      icon: Compass,
    },
    {
      num: '03',
      title: 'Connect & Discuss',
      desc: 'Speak directly with our team via Call or WhatsApp to discuss pricing, site visits, and clear titles.',
      icon: MessageSquareCode,
    },
    {
      num: '04',
      title: 'Take the Next Step',
      desc: 'Schedule an on-ground site visit and proceed with confidence and transparent documentation.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#ffffff] text-[#1A1A1A] border-b border-[#e8e8e8] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[4px] bg-[#FDFDFD] border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold tracking-wide shadow-xs">
            <span>Simple 4-Step Journey</span>
          </div>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-tight"
          >
            How It Works
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto" />
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            A transparent and straightforward process to assist you from inquiry to key handover.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                id={`how-step-${idx}`}
                className="card-hw relative bg-[#ffffff] rounded-[4px] p-7 sm:p-8 border border-[#e8e8e8] hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-[#C5A059] tracking-wider">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-[4px] bg-[#ffffff] border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666666] mt-2.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onEnquire}
            className="btn-hw-primary inline-flex items-center gap-2 py-3 px-8 text-xs font-bold tracking-wide shadow-xs cursor-pointer"
          >
            <span className="text-white">Start Your Property Inquiry</span>
            <ArrowRight className="w-4 h-4 stroke-[2] text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
