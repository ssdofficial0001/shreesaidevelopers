import React, { useState } from 'react';
import { Sparkles, MapPin, Building, Key, CheckCircle2, Phone, ArrowRight, ShieldAlert, RotateCcw } from 'lucide-react';
import { BUSINESS_INFO, SHOWCASE_PROJECTS, generateSearchWhatsAppUrl, generateProjectWhatsAppUrl } from '../data/propertyData';
import { ProjectPhoto, ShowcaseProject } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface RequirementFinderSectionProps {
  onOpenDetails: (project: ShowcaseProject) => void;
  onOpenLightbox?: (photo: ProjectPhoto) => void;
  onEnquire: (context?: string) => void;
}

export const RequirementFinderSection: React.FC<RequirementFinderSectionProps> = ({
  onOpenDetails,
  onOpenLightbox,
  onEnquire,
}) => {
  const [requirement, setRequirement] = useState<'BUY' | 'RENT'>('BUY');
  const [location, setLocation] = useState<string>('Vasai');
  const [propertyType, setPropertyType] = useState<string>('1 BHK');
  const [configuration, setConfiguration] = useState<string>('Ready Possession');
  const [budget, setBudget] = useState<string>('₹25 Lakh - ₹50 Lakh');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleFindProperty = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetFinder = () => {
    setSubmitted(false);
  };

  // Anti-Fabrication match logic
  const isVasaiMatch =
    (location === 'Vasai' || location === 'Evershine, Vasai') &&
    (propertyType === '1 BHK' || propertyType === '2 BHK' || propertyType === '1 RK' || propertyType === 'Other');

  const isBoisarMatch =
    location === 'Boisar' &&
    (propertyType === '1 BHK' || propertyType === '2 BHK' || propertyType === '1 RK' || propertyType === 'Other');

  const matchedProject = isVasaiMatch
    ? SHOWCASE_PROJECTS.find((p) => p.id === 'shree-sai-apartment')
    : isBoisarMatch
    ? SHOWCASE_PROJECTS.find((p) => p.id === 'boisar-property')
    : null;

  const searchWaUrl = generateSearchWhatsAppUrl({
    requirement,
    location,
    propertyType,
    budget: `${budget} (${configuration})`,
  });

  return (
    <section id="requirement-finder" className="py-16 md:py-24 bg-[#FDFDFD] border-b border-[#e8e8e8] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#ffffff] text-[#C5A059] border border-[#C5A059]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>PERSONALIZED PROPERTY MATCH</span>
          </div>
          <h2
            id="requirement-finder-heading"
            className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight font-serif"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Tell Us What You're Looking For
          </h2>
          <p className="mt-3 text-base text-[#666666]">
            Select your preferences below to discover matching verified properties or request personalized sourcing across Mumbai & MMR.
          </p>
        </div>

        {/* Main Interactive Card */}
        <div className="bg-[#ffffff] rounded-[4px] p-6 sm:p-8 lg:p-10 border border-[#e8e8e8] shadow-md max-w-4xl mx-auto">
          {!submitted ? (
            <form id="requirement-finder-form" onSubmit={handleFindProperty} className="space-y-6 sm:space-y-8">
              {/* Step 1: BUY or RENT */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  1. I want to:
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <button
                    type="button"
                    id="finder-step1-buy"
                    onClick={() => setRequirement('BUY')}
                    className={`py-3 px-4 rounded-[4px] text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      requirement === 'BUY'
                        ? 'bg-[#0C2340] text-white border-[#0C2340] shadow-xs'
                        : 'bg-[#FDFDFD] text-[#1A1A1A] border-[#e8e8e8] hover:bg-[#ffffff]'
                    }`}
                  >
                    <Key className="w-4 h-4" />
                    <span>BUY A PROPERTY</span>
                  </button>

                  <button
                    type="button"
                    id="finder-step1-rent"
                    onClick={() => setRequirement('RENT')}
                    className={`py-3 px-4 rounded-[4px] text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      requirement === 'RENT'
                        ? 'bg-[#0C2340] text-white border-[#0C2340] shadow-xs'
                        : 'bg-[#FDFDFD] text-[#1A1A1A] border-[#e8e8e8] hover:bg-[#ffffff]'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>RENT A PROPERTY</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Preferred Location */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  2. Preferred Location:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { label: 'Vasai (Evershine)', val: 'Vasai' },
                    { label: 'Boisar', val: 'Boisar' },
                    { label: 'Virar', val: 'Virar' },
                    { label: 'Nalasopara', val: 'Nalasopara' },
                    { label: 'Mumbai Suburbs', val: 'Mumbai' },
                    { label: 'Other MMR', val: 'Other' },
                  ].map((loc) => (
                    <button
                      key={loc.val}
                      type="button"
                      id={`finder-loc-${loc.val}`}
                      onClick={() => setLocation(loc.val)}
                      className={`py-2.5 px-3 rounded-[4px] text-xs font-bold border text-left flex items-center justify-between transition-all cursor-pointer ${
                        location === loc.val
                          ? 'bg-[#ffffff] text-[#0C2340] border-[#C5A059] ring-1 ring-[#C5A059]'
                          : 'bg-[#FDFDFD] text-[#1A1A1A] border-[#e8e8e8] hover:bg-[#ffffff]'
                      }`}
                    >
                      <span>{loc.label}</span>
                      {location === loc.val && <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Property Type */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  3. Property Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['1 RK', '1 BHK', '2 BHK', 'Shop', 'Office', 'Plot', 'Other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      id={`finder-type-${type.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => setPropertyType(type)}
                      className={`py-2.5 px-3 rounded-[4px] text-xs font-bold border text-center transition-all cursor-pointer ${
                        propertyType === type
                          ? 'bg-[#ffffff] text-[#0C2340] border-[#C5A059] ring-1 ring-[#C5A059]'
                          : 'bg-[#FDFDFD] text-[#1A1A1A] border-[#e8e8e8] hover:bg-[#ffffff]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4 & Step 5 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Step 4: Configuration / Status */}
                <div className="space-y-1.5">
                  <label htmlFor="finder-config-select" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                    4. Possession Preference
                  </label>
                  <select
                    id="finder-config-select"
                    value={configuration}
                    onChange={(e) => setConfiguration(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-[4px] border border-[#e8e8e8] bg-[#ffffff] text-[#1A1A1A] text-sm font-medium focus:ring-1 focus:ring-[#0C2340] focus:border-[#0C2340]"
                  >
                    <option value="Ready Possession">Ready Possession / Completed</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Any Preference">Any Preference</option>
                  </select>
                </div>

                {/* Step 5: Budget */}
                <div className="space-y-1.5">
                  <label htmlFor="finder-budget-select" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                    5. Budget Range
                  </label>
                  <select
                    id="finder-budget-select"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-[4px] border border-[#e8e8e8] bg-[#ffffff] text-[#1A1A1A] text-sm font-medium focus:ring-1 focus:ring-[#0C2340] focus:border-[#0C2340]"
                  >
                    {requirement === 'BUY' ? (
                      <>
                        <option value="Under ₹25 Lakh">Under ₹25 Lakh</option>
                        <option value="₹25 Lakh - ₹50 Lakh">₹25 Lakh - ₹50 Lakh</option>
                        <option value="₹50 Lakh - ₹1 Crore">₹50 Lakh - ₹1 Crore</option>
                        <option value="Above ₹1 Crore">Above ₹1 Crore</option>
                      </>
                    ) : (
                      <>
                        <option value="Under ₹10,000 / mo">Under ₹10,000 / month</option>
                        <option value="₹10,000 - ₹20,000 / mo">₹10,000 - ₹20,000 / month</option>
                        <option value="₹20,000 - ₹35,000 / mo">₹20,000 - ₹35,000 / month</option>
                        <option value="Above ₹35,000 / mo">Above ₹35,000 / month</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-[#e8e8e8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#666666]">
                  Instant matching with genuine on-ground projects.
                </p>
                <button
                  id="finder-submit-btn"
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[4px] bg-[#0C2340] hover:bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>FIND MY PROPERTY</span>
                </button>
              </div>
            </form>
          ) : (
            /* Results View */
            <div id="finder-results-view" className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-[#e8e8e8]">
                <div className="text-xs text-[#666666]">
                  Showing results for <strong className="text-[#1A1A1A] font-semibold">{requirement}</strong> in <strong className="text-[#1A1A1A] font-semibold">{location}</strong> ({propertyType}, {budget})
                </div>
                <button
                  id="finder-modify-btn"
                  onClick={resetFinder}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0C2340] hover:text-[#C5A059] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Modify Criteria</span>
                </button>
              </div>

              {matchedProject ? (
                /* Matching Confirmed Project Card */
                <div className="bg-[#FDFDFD] rounded-[4px] border border-[#e8e8e8] p-6 space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/2 aspect-[16/10] rounded-[4px] overflow-hidden shadow-sm bg-[#0C2340]">
                      <img
                        src={matchedProject.coverImage}
                        alt={matchedProject.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full md:w-1/2 space-y-3">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-[#ffffff] border border-[#C5A059]/40 text-[#C5A059] text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Project Listing</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1A1A1A] font-serif">
                        {matchedProject.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C5A059]">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>{matchedProject.location}</span>
                      </div>
                      <p className="text-xs text-[#666666]">
                        Status: <span className="font-semibold text-[#1A1A1A]">{matchedProject.status}</span>
                      </p>
                      <p className="text-xs text-[#666666]">
                        Detailed layout plans and unit pricing available upon direct consultation.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#e8e8e8]">
                    <button
                      id="finder-matched-details-btn"
                      onClick={() => onOpenDetails(matchedProject)}
                      className="px-5 py-2.5 rounded-[4px] bg-[#ffffff] hover:bg-[#FDFDFD] text-[#1A1A1A] font-bold text-xs border border-[#e8e8e8] transition-colors cursor-pointer"
                    >
                      View Property Details
                    </button>

                    <button
                      id="finder-matched-enquire-btn"
                      onClick={() => onEnquire(`Matched property: ${matchedProject.name}`)}
                      className="px-5 py-2.5 rounded-[4px] bg-[#0C2340] hover:bg-[#1A1A1A] text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                    >
                      Enquire Now
                    </button>

                    <a
                      id="finder-matched-wa-btn"
                      href={generateProjectWhatsAppUrl(matchedProject.name, matchedProject.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[4px] bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>WhatsApp Details</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* No matching property is currently listed (Anti-Fabrication Fallback) */
                <div className="text-center py-6 space-y-5">
                  <div className="w-14 h-14 rounded-[4px] bg-[#ffffff] text-[#C5A059] border border-[#C5A059] flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-7 h-7 text-[#C5A059]" />
                  </div>

                  <div className="max-w-md mx-auto space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] font-serif">
                      No matching property is currently listed
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666666]">
                      Submit your requirement and our team will contact you with suitable options matching your criteria in <strong className="text-[#1A1A1A] font-semibold">{location}</strong>.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      id="finder-fallback-submit-req-btn"
                      onClick={() => onEnquire(`Custom Requirement: ${requirement} in ${location}, Type: ${propertyType}, Budget: ${budget}`)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-[#0C2340] hover:bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      <span>Submit Requirement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      id="finder-fallback-wa-btn"
                      href={searchWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>WhatsApp Us</span>
                    </a>

                    <a
                      id="finder-fallback-call-btn"
                      href={BUSINESS_INFO.callUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-[#ffffff] hover:bg-[#FDFDFD] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider transition-all border border-[#e8e8e8]"
                    >
                      <Phone className="w-4 h-4 text-[#0C2340]" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
