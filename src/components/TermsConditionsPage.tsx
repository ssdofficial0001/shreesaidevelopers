import React, { useEffect } from 'react';
import { ArrowLeft, Scale, AlertCircle, FileCheck, HelpCircle, ShieldAlert } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/propertyData';

interface TermsConditionsPageProps {
  onBackToHome: () => void;
  onOpenPrivacy?: () => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({ onBackToHome, onOpenPrivacy }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1325] text-[#E2E8F0] flex flex-col selection:bg-[#D4AF37]/30 font-montserrat">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0F1D]/95 backdrop-blur-md border-b border-[rgba(212,175,55,0.15)] py-3.5 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="cursor-pointer focus:outline-none flex items-center text-left"
            aria-label="Return to Shree Sai Developers Homepage"
          >
            <Logo variant="header" />
          </button>

          <button
            onClick={onBackToHome}
            className="px-4 py-2 rounded-[4px] border border-[rgba(212,175,55,0.3)] text-[#E2E8F0] hover:text-[#D4AF37] hover:border-[#D4AF37] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2] text-[#D4AF37]" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16">
        {/* Breadcrumb & Navigation Link */}
        <div className="mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#e5c158] transition-colors cursor-pointer font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Header Block */}
        <div className="card-hw bg-[#1C2541] border border-[rgba(212,175,55,0.15)] rounded-[4px] p-6 sm:p-10 shadow-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0B1325] border border-[rgba(212,175,55,0.3)] text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5 text-[#D4AF37] stroke-[2]" />
            <span>Legal Notice &amp; Terms of Use</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-[#D4AF37] tracking-tight mb-3 font-cinzel">
            Terms &amp; Conditions
          </h1>

          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            Effective Date: September 2026 | Shree Sai Developers (Builders &amp; Developers)
          </p>

          <div className="mt-6 pt-6 border-t border-[#2A3454] text-xs sm:text-sm text-[#CBD5E1] leading-relaxed space-y-3 font-light">
            <p>
              Welcome to the official website of Shree Sai Developers (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using this website, you acknowledge that you have read, understood, and agreed to be bound by the following terms, conditions, and notices. If you do not agree with any part of these terms, please refrain from using our digital portal.
            </p>
          </div>
        </div>

        {/* Detailed Terms Sections */}
        <div className="card-hw bg-[#1C2541] border border-[rgba(212,175,55,0.15)] rounded-[4px] p-6 sm:p-10 shadow-2xl space-y-8 sm:space-y-10 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-light">
          {/* Section 1: Informational Purposes Only */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <AlertCircle className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                1. Informational Purposes Only
              </h2>
            </div>
            <p>
              The materials, visual imagery, architectural depictions, project summaries, and geographical overviews presented on this website are provided solely for general informational and conceptual representation purposes. While reasonable care is taken to provide accurate and up-to-date information, the content does not constitute professional, financial, or architectural advice.
            </p>
          </section>

          {/* Section 2: Property Details and Pricing Modifications */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <FileCheck className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                2. Property Details &amp; Pricing Subject to Change
              </h2>
            </div>
            <p>
              All property specifications, layouts, elevations, amenities, availability, possession timelines, and pricing details mentioned on this website are indicative and subject to change, modification, addition, or deletion without prior notice, at the sole discretion of the developer or in accordance with municipal and statutory requirements.
            </p>
          </section>

          {/* Section 3: No Offer or Binding Contract */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Scale className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                3. No Legal Offer or Contract
              </h2>
            </div>
            <p>
              Nothing published on this website constitutes an offer, tender, warranty, guarantee, or legally binding contract of any nature between Shree Sai Developers and prospective purchasers, tenants, investors, or website visitors. Any mutual legal rights, obligations, or purchase commitments will be governed exclusively by the definitive, signed, and registered Sale/Allotment Agreement entered into between the parties.
            </p>
          </section>

          {/* Section 4: Independent Verification Mandate */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <HelpCircle className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                4. Mandatory Independent Verification
              </h2>
            </div>
            <p>
              Prospective purchasers, clients, and visitors are strongly advised to exercise independent due diligence and verify all property details, layout plans, sanctioned approvals, title deeds, construction status, and municipal clearances directly with our authorized sales office or through independent legal and technical advisors before executing any financial transaction or making a conclusive buying decision.
            </p>
          </section>

          {/* Section 5: Limitation of Liability */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <ShieldAlert className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                5. Limitation of Liability
              </h2>
            </div>
            <p>
              Under no circumstances shall Shree Sai Developers, its partners, promoters, employees, or authorized agents be held liable for any direct, indirect, incidental, special, or consequential damages, losses, or expenses arising out of the use of, or inability to use, this website or reliance placed upon any representations, graphics, dimensions, or text contained herein.
            </p>
          </section>

          {/* Section 6: Governing Law & Jurisdiction */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Scale className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                6. Governing Law &amp; Jurisdiction
              </h2>
            </div>
            <p>
              These Terms &amp; Conditions and any disputes arising in connection with the use of this website shall be governed by and interpreted in accordance with the laws of the State of Maharashtra, India. The competent courts situated in Mumbai/Thane/Palghar, Maharashtra shall have exclusive jurisdiction over all matters relating hereto.
            </p>
          </section>
        </div>

        {/* Bottom Back to Home Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] text-[#0C2340] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </main>

      {/* Footer with Legal Disclaimer and Links */}
      <footer className="bg-[#070C18] border-t border-[rgba(212,175,55,0.15)] py-8 px-4 text-center text-xs text-[#94A3B8]">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-[11px] sm:text-xs leading-relaxed text-[#CBD5E1]">
            Disclaimer: The plans, specifications, elevation, conceptual designs, visuals, images, dimensions, furniture, fixtures, amenities, and facilities shown are strictly for representation purposes only and are subject to necessary approvals from competent authorities unless otherwise stated. This does not constitute an offer or contract of any nature between the company and prospective purchasers/customers. Customers are advised to independently verify all details before making any conclusive decision.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-[#D4AF37] hover:text-[#e5c158] transition-colors cursor-pointer font-bold hover:underline underline-offset-4 uppercase tracking-wider"
            >
              Home
            </button>
            <span className="text-[#2A3454] select-none">•</span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-[#D4AF37] hover:text-[#e5c158] transition-colors cursor-pointer font-bold hover:underline underline-offset-4 uppercase tracking-wider"
            >
              Privacy Policy
            </button>
            <span className="text-[#2A3454] select-none">•</span>
            <span className="text-white font-bold uppercase tracking-wider">Terms &amp; Conditions</span>
          </div>
          <p className="text-[11px] text-[#64748B] pt-3 border-t border-[#2A3454]">
            © {new Date().getFullYear()} Shree Sai Developers. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
