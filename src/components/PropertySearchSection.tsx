import React, { useState } from 'react';
import { SHOWCASE_PROJECTS, POPULAR_MUMBAI_LOCATIONS, getWhatsAppUrl, generateSearchWhatsAppUrl } from '../data/propertyData';
import { ShowcaseProject } from '../types';
import { Search, MapPin, Building, Banknote, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PropertySearchSectionProps {
  onOpenDetails: (project: ShowcaseProject) => void;
  onEnquire: (projectName?: string) => void;
}

export const PropertySearchSection: React.FC<PropertySearchSectionProps> = ({
  onOpenDetails,
  onEnquire,
}) => {
  const [activeReq, setActiveReq] = useState<string>('Buy');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');

  const [hasSearched, setHasSearched] = useState(false);
  const [searchSummary, setSearchSummary] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const summary = `${activeReq} • ${selectedLocation || 'Mumbai & MMR'} • ${selectedType || 'All Types'} • ${selectedBudget || 'Any Budget'}`;
    setSearchSummary(summary);
  };

  // Filter confirmed projects
  const matchingProjects = SHOWCASE_PROJECTS.filter((project) => {
    if (!selectedLocation) return true;
    const locLower = selectedLocation.toLowerCase();
    if (locLower.includes('vasai') && project.id === 'shree-sai-apartment') return true;
    if (locLower.includes('evershine') && project.id === 'shree-sai-apartment') return true;
    if (locLower.includes('boisar') && project.id === 'boisar-property') return true;
    return false;
  });

  return (
    <section id="search-console" className="py-24 sm:py-32 bg-[#FDFDFD] text-[#1A1A1A] border-b border-[#e8e8e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[4px] bg-[#ffffff] border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold tracking-wide shadow-xs">
            <span>Portfolio Search</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight"
          >
            Find Your Property
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto" />
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Filter our confirmed developments or request customized options across Mumbai &amp; MMR.
          </p>
        </div>

        {/* Filter Console Form */}
        <div className="card-hw bg-[#ffffff] border border-[#e8e8e8] rounded-[4px] p-7 sm:p-9.5 shadow-xs">
          {/* Top Segment Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#e8e8e8]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#1A1A1A] tracking-wide">Requirement:</span>
              <div className="inline-flex p-1 rounded-[4px] bg-[#FDFDFD] border border-[#e8e8e8]">
                {['Buy', 'Sell', 'Rent'].map((req) => (
                  <button
                    key={req}
                    type="button"
                    onClick={() => setActiveReq(req)}
                    className={`px-4 py-1.5 rounded-[4px] text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      activeReq === req
                        ? 'bg-[#0C2340] text-white shadow-xs'
                        : 'text-[#414042] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {req}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#C5A059] font-semibold">
              <ShieldCheck className="w-4 h-4 stroke-[2] text-[#C5A059]" />
              <span>Direct Developer Consultation</span>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSearchSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5 tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] stroke-[2]" />
                <span>Preferred Location</span>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#FDFDFD] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
              >
                <option value="">All Mumbai &amp; MMR Areas</option>
                <option value="Evershine, Vasai">Evershine, Vasai (Verified Project)</option>
                <option value="Boisar">Boisar (Verified Project)</option>
                {POPULAR_MUMBAI_LOCATIONS.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5 tracking-wide">
                <Building className="w-3.5 h-3.5 text-[#C5A059] stroke-[2]" />
                <span>Property Type</span>
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#FDFDFD] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
              >
                <option value="">All Property Types</option>
                <option value="Residential Flat">Residential Flat (1/2/3 BHK)</option>
                <option value="Commercial Shop">Commercial Shop / Showroom</option>
                <option value="Office Space">Commercial Office</option>
                <option value="Plot / Land">Plot / Land Parcel</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5 tracking-wide">
                <Banknote className="w-3.5 h-3.5 text-[#C5A059] stroke-[2]" />
                <span>Budget Range</span>
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-[#FDFDFD] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] px-4 py-3 text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
              >
                <option value="">Any Budget</option>
                <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs – ₹50 Lakhs</option>
                <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs – ₹1 Crore</option>
                <option value="Above ₹1 Crore">Above ₹1 Crore</option>
                <option value="Rental: Below ₹15,000 / mo">Rental: Under ₹15,000/mo</option>
                <option value="Rental: ₹15,000 - ₹35,000 / mo">Rental: ₹15,000 – ₹35,000/mo</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn-hw-primary py-3 px-6 text-xs font-bold tracking-wide shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 h-[44px]"
              >
                <Search className="w-4 h-4 stroke-[2] text-white" />
                <span className="text-white">Search Portfolio</span>
              </button>
            </div>
          </form>
        </div>

        {/* Search Results / Advisory Outcome */}
        {hasSearched && (
          <div className="mt-8 card-hw bg-[#ffffff] border border-[#e8e8e8] rounded-[4px] p-7 sm:p-9.5 shadow-xs animate-in fade-in-50 duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#e8e8e8]">
              <div>
                <p className="text-xs font-bold text-[#C5A059] tracking-wide">Search Outcome</p>
                <p className="text-sm font-bold text-[#1A1A1A] mt-1">{searchSummary}</p>
              </div>

              <a
                href={generateSearchWhatsAppUrl({
                  requirement: activeReq,
                  location: selectedLocation,
                  propertyType: selectedType,
                  budget: selectedBudget,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-transparent hover:bg-[#FDFDFD] border border-[#25D366] text-[#25D366] hover:text-[#1ebd59] text-xs font-semibold tracking-wide transition-colors self-start md:self-auto shadow-xs"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Send Search to WhatsApp</span>
              </a>
            </div>

            {matchingProjects.length > 0 ? (
              <div className="mt-6">
                <p className="text-xs font-bold text-[#1A1A1A] tracking-wide mb-4">
                  Confirmed Properties Matching Criteria ({matchingProjects.length}):
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchingProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => onEnquire(project.name)}
                      className="card-hw p-6 rounded-[4px] bg-[#ffffff] border border-[#e8e8e8] hover:border-[#C5A059] transition-all flex flex-col sm:flex-row items-center gap-5 cursor-pointer group shadow-xs"
                    >
                      <img
                        src={project.coverImage}
                        alt={project.name}
                        referrerPolicy="no-referrer"
                        className="w-full sm:w-32 h-24 object-cover rounded-[4px] shrink-0 group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold tracking-wide text-[#C5A059]">
                          Verified Project
                        </span>
                        <h4
                          className="text-base font-bold text-[#1A1A1A] mt-0.5"
                        >
                          {project.name}
                        </h4>
                        <p className="text-xs text-[#666666] mt-0.5">{project.location}</p>
                        <div className="mt-3 flex items-center gap-2.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenDetails(project);
                            }}
                            className="btn-hw-outline px-4 py-1.5 text-xs font-bold tracking-wide cursor-pointer shadow-xs"
                          >
                            Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEnquire(project.name);
                            }}
                            className="btn-hw-primary px-4 py-1.5 text-xs font-bold tracking-wide cursor-pointer shadow-xs"
                          >
                            <span className="text-white">Enquire</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6 text-center py-9 bg-[#ffffff] rounded-[4px] border border-dashed border-[#e8e8e8] space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#C5A059] stroke-[1.5] mx-auto" />
                <h4
                  className="text-base font-bold text-[#1A1A1A]"
                >
                  Custom Property Search Assistance
                </h4>
                <p className="text-xs text-[#666666] max-w-lg mx-auto leading-relaxed">
                  We have direct developer inventory and title-verified listings across Mumbai &amp; MMR. Submit your requirements and our advisors will provide verified matching properties.
                </p>
                <button
                  onClick={() => onEnquire(activeReq)}
                  className="btn-hw-primary px-7 py-3 text-xs font-bold tracking-wide transition-all cursor-pointer shadow-xs text-white"
                >
                  Submit Requirement for Free Consultation
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
