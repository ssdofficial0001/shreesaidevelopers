import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What services does SHREE SAI DEVELOPERS provide?',
      answer:
        'SHREE SAI DEVELOPERS is a builder and developer firm providing comprehensive real-estate services across BUY, SELL, and RENT. We assist clients with verified property options, direct developer representation, title documentation support, and site visits.',
    },
    {
      question: 'Which areas do you serve?',
      answer:
        'Our primary on-ground operations and active project developments are centered in Evershine (Vasai) and Boisar, alongside property advisory and transaction representation across the wider Mumbai Metropolitan Region (MMR).',
    },
    {
      question: 'Can I enquire about buying a property?',
      answer:
        'Yes. You can explore our featured developments such as Shree Sai Apartment in Evershine, Vasai or submit an acquisition requirement through our consultation form. Our advisory team will guide you through unit availability, pricing structure, and documentation.',
    },
    {
      question: 'Can I list a property for sale?',
      answer:
        'Yes. We offer property divestment and listing advisory for property owners across Mumbai and MMR, connecting your residential or commercial asset with verified, qualified buyers.',
    },
    {
      question: 'Can I enquire about rental requirements?',
      answer:
        'Yes. Whether looking for a residential tenancy or listing a commercial space for lease, we provide structured rental support with clear tenancy agreements and paperwork.',
    },
    {
      question: 'How can I book a site visit?',
      answer:
        'You can click the "Book a Site Visit" button on this website, call our desk directly at +91 98674 78525, or message our official WhatsApp to schedule an accompanied on-ground walkthrough.',
    },
    {
      question: 'How can I contact SHREE SAI DEVELOPERS?',
      answer:
        'You can reach SHREE SAI DEVELOPERS by calling +91 98674 78525, messaging our official WhatsApp at +91 98674 78525, emailing shreesaideveloper.in@gmail.com, or submitting an enquiry through this website.',
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-[#111215] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-white/10 mb-16">
          <div className="flex items-center gap-4">
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#C5995B] uppercase font-sans-clean">
              CLIENT INQUIRIES
            </span>
            <span className="w-12 sm:w-20 h-[1px] bg-white/20" />
            <span className="text-xs text-[#8E8B87] font-mono tracking-widest uppercase">
              FREQUENTLY ASKED
            </span>
          </div>
          <p className="text-xs text-[#8E8B87] font-sans-clean tracking-wider uppercase">
            FACTUAL GUIDANCE
          </p>
        </div>

        {/* Section Headline */}
        <div className="max-w-2xl mb-12 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-normal font-syne text-white uppercase tracking-tight leading-[1.08]">
            Frequently Asked <br />
            <span className="text-[#8E8B87]">Questions.</span>
          </h2>
        </div>

        {/* Architectural Accordion */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const indexFormatted = String(index + 1).padStart(2, '0');

            return (
              <div key={index} className="py-6 sm:py-7">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer focus:outline-none"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="text-xs font-mono text-[#8E8B87] group-hover:text-[#C5995B] transition-colors shrink-0">
                      {indexFormatted}
                    </span>
                    <h3 className="text-base sm:text-lg lg:text-xl font-normal font-syne text-white uppercase tracking-tight group-hover:text-[#C5995B] transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-7 h-7 border border-white/15 group-hover:border-white/40 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-[#C5995B]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-white/70 group-hover:text-white" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pl-8 sm:pl-12 pr-4 text-xs sm:text-sm text-[#8E8B87] font-sans-clean leading-relaxed font-light">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
