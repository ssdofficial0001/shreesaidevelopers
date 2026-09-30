import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Mail, Phone, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/propertyData';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
  onOpenTerms?: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToHome, onOpenTerms }) => {
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
            <Shield className="w-3.5 h-3.5 text-[#D4AF37] stroke-[2]" />
            <span>Data Protection &amp; Transparency</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-[#D4AF37] tracking-tight mb-3 font-cinzel">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            Effective Date: September 2026 | Shree Sai Developers (Builders &amp; Developers)
          </p>

          <div className="mt-6 pt-6 border-t border-[#2A3454] text-xs sm:text-sm text-[#CBD5E1] leading-relaxed space-y-3 font-light">
            <p>
              At Shree Sai Developers (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we respect your privacy and are committed to protecting any personal data you share with us through our website. This Privacy Policy outlines our transparent practices regarding data collection, usage, safeguarding, and your rights as a visitor or prospective property purchaser.
            </p>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="card-hw bg-[#1C2541] border border-[rgba(212,175,55,0.15)] rounded-[4px] p-6 sm:p-10 shadow-2xl space-y-8 sm:space-y-10 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-light">
          {/* Section 1: Data Collection */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <FileText className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                1. What Personal Data We Collect
              </h2>
            </div>
            <p>
              We only collect personal information that you voluntarily submit to us through forms on our website (such as contact forms, property consultation forms, one-click inquiry popups, or project brochure download requests). This information may include:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#E2E8F0]">
              <li>Full Name</li>
              <li>Phone / Mobile Number (including WhatsApp contact)</li>
              <li>Email Address</li>
              <li>Property preferences (e.g., configuration, budget range, preferred location)</li>
              <li>Specific inquiries or comments regarding residential or commercial properties</li>
            </ul>
          </section>

          {/* Section 2: Data Usage */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <CheckCircle2 className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                2. How Your Information Is Used
              </h2>
            </div>
            <p>
              The personal details you provide are utilized exclusively to fulfill your real estate requirements, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#E2E8F0]">
              <li>Responding directly to your property inquiries and providing authentic project information.</li>
              <li>Sharing relevant details with our authorized internal sales and customer support representatives.</li>
              <li>Arranging and scheduling requested on-ground site visits or property walkthroughs.</li>
              <li>Sending requested digital project brochures, floor layouts, or pricing summaries.</li>
            </ul>
          </section>

          {/* Section 3: Data Protection & Non-Sale */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Lock className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                3. No Sale of Personal Data
              </h2>
            </div>
            <p>
              We value your trust. <strong className="font-bold text-[#FFFFFF]">We do not sell, rent, trade, or lease your personal information to any third-party marketing firms, advertisers, or unaffiliated commercial entities.</strong> Your information is accessed strictly on a need-to-know basis by authorized team members directly involved in serving your property requirement.
            </p>
          </section>

          {/* Section 4: Cookies & Site Functionality */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Eye className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                4. Use of Cookies
              </h2>
            </div>
            <p>
              Our website uses basic session cookies and local browser storage strictly necessary for core functionality, such as maintaining navigation state, modal interactions, and remembering your display preferences. We do not use intrusive cross-site tracking cookies or third-party behavioral profiling scripts. You may adjust your web browser settings to block cookies if you prefer, although certain interactive website functions may operate with reduced efficiency.
            </p>
          </section>

          {/* Section 5: Data Security */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Shield className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                5. Data Security Measures
              </h2>
            </div>
            <p>
              We implement reasonable administrative, technical, and physical security measures to safeguard the information collected against unauthorized access, loss, alteration, or misuse. While no Internet-based transmission is completely impenetrable, we strive to utilize commercially acceptable methods to protect your personal data.
            </p>
          </section>

          {/* Section 6: Contact for Privacy Inquiries */}
          <section className="space-y-3 pt-6 border-t border-[#2A3454]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Mail className="w-4 h-4 stroke-[2] text-[#D4AF37]" />
              <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-cinzel">
                6. Contact for Privacy-Related Questions
              </h2>
            </div>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or wish to request the update or removal of your contact details from our records, please reach out to our team:
            </p>
            <div className="mt-3 p-4 bg-[#0B1325] rounded-[4px] border border-[#2A3454] space-y-2">
              <p className="flex items-center gap-2 text-[#FFFFFF] font-bold">
                <span className="text-[#94A3B8] font-normal">Company:</span> Shree Sai Developers
              </p>
              <p className="flex items-center gap-2 text-[#E2E8F0] font-medium">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 stroke-[2]" />
                <a href={BUSINESS_INFO.callUrl} className="hover:text-[#D4AF37] transition-colors">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2 text-[#E2E8F0] font-medium">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 stroke-[2]" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <p className="text-xs text-[#94A3B8]">
                Operational Region: Mumbai &amp; MMR (Evershine Vasai, Boisar, Palghar, Maharashtra)
              </p>
            </div>
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
            <span className="text-white font-bold uppercase tracking-wider">Privacy Policy</span>
            <span className="text-[#2A3454] select-none">•</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-[#D4AF37] hover:text-[#e5c158] transition-colors cursor-pointer font-bold hover:underline underline-offset-4 uppercase tracking-wider"
            >
              Terms &amp; Conditions
            </button>
          </div>
          <p className="text-[11px] text-[#64748B] pt-3 border-t border-[#2A3454]">
            © {new Date().getFullYear()} Shree Sai Developers. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
