import React, { useState } from 'react';
import { Building2, Phone, Send, CheckCircle2, Loader2, AlertCircle, Locate, ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { RentFormData } from '../types';
import { BUSINESS_INFO, generateRentWhatsAppUrl, PREFERRED_LOCATIONS, getWhatsAppUrl } from '../data/propertyData';
import { sendEnquiry } from '../services/enquiryService';
import { detectCurrentLocation } from '../utils/geolocation';
import { validateName, validatePhone } from '../utils/validation';

interface RentSectionProps {
  onSuccessSubmit?: (details: { type: string; summary: string; waUrl: string }) => void;
}

export const RentSection: React.FC<RentSectionProps> = ({ onSuccessSubmit }) => {
  const [formData, setFormData] = useState<RentFormData>({
    name: '',
    phone: '',
    email: '',
    preferredLocation: '',
    propertyType: 'Apartment / Flat',
    bhk: '1 BHK',
    monthlyBudget: '₹10,000 - ₹20,000 / month',
    additionalRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      const loc = await detectCurrentLocation();
      const matched = PREFERRED_LOCATIONS.find((l) =>
        loc.toLowerCase().includes(l.toLowerCase()) || l.toLowerCase().includes(loc.toLowerCase())
      );
      setFormData((prev) => ({ ...prev, preferredLocation: matched || loc }));
    } catch (err: any) {
      alert(err.message || 'Unable to detect location.');
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errorMessage) setErrorMessage('');
    if (formErrors[name as 'name' | 'phone']) {
      if (name === 'name') {
        const err = validateName(value);
        setFormErrors((prev) => ({ ...prev, name: err || undefined }));
      } else if (name === 'phone') {
        const err = validatePhone(value);
        setFormErrors((prev) => ({ ...prev, phone: err || undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const phone = formData.phone.trim();

    // Validation: Phone must be 10 digits starting with 6-9, Name minimum 3 characters
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);

    if (nameError || phoneError) {
      setFormErrors({
        name: nameError || undefined,
        phone: phoneError || undefined,
      });
      return; // Do NOT allow submit
    }
    setFormErrors({});
    const requirement = `Rent / Lease (${formData.bhk} ${formData.propertyType})`.trim();
    const location = (formData.preferredLocation || 'Mumbai & MMR').trim();
    const budget = (formData.monthlyBudget || 'As per requirement').trim();

    const message = `*New Property Enquiry*
Name: ${name}
Mobile: ${phone}
Requirement: ${requirement}
Location: ${location}
Budget: ${budget}`;

    alert('Thank you! Redirecting to WhatsApp, please press SEND.');

    const waUrl = `https://wa.me/919867478525?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await sendEnquiry({
        fullName: name,
        phone,
        email: formData.email,
        requirement: 'Rent',
        preferredLocation: location,
        propertyType: formData.propertyType,
        bhk: formData.bhk,
        budget,
        message: formData.additionalRequirements,
        source: 'Rent Property Section',
      });

      if (result.success) {
        setDeliveryStatus(result.message);
        setSubmitted(true);

        if (onSuccessSubmit) {
          onSuccessSubmit({
            type: 'Rent Property Requirement',
            summary: `Looking for rental ${formData.bhk} in ${location} with budget ${budget}`,
            waUrl,
          });
        }
      } else {
        setDeliveryStatus('Saved and redirected to WhatsApp desk.');
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Rent enquiry submission error:', err);
      setDeliveryStatus('Enquiry forwarded to WhatsApp.');
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const directWaUrl = generateRentWhatsAppUrl(formData);

  return (
    <section id="rent" className="py-16 md:py-24 bg-[#FDFDFD] border-b border-[#e8e8e8] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#ffffff] border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>RENT PROPERTY SERVICE</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight font-serif"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Find a Property on Rent
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#666666]">
            Tell us your preferred location and requirements to explore suitable rental properties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Interactive Rent Form */}
          <div className="lg:col-span-8 bg-[#ffffff] rounded-[4px] p-6 sm:p-8 border border-[#e8e8e8] shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-[#0C2340]/10 text-[#0C2340] rounded-[4px] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">Rental Requirement Delivered!</h3>
                <p className="text-[#666666] max-w-md mx-auto text-sm">
                  {deliveryStatus || `Thank you, ${formData.name}. Your rental requirement has been delivered to shreesaideveloper.in@gmail.com. We will share available rental flats matching your location.`}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    id="rent-submitted-wa-btn"
                    href={directWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-sm shadow-md"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>Send Requirement on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        preferredLocation: '',
                        propertyType: 'Apartment / Flat',
                        bhk: '1 BHK',
                        monthlyBudget: '₹10,000 - ₹20,000 / month',
                        additionalRequirements: '',
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-[4px] bg-[#FDFDFD] hover:bg-[#ffffff] text-[#1A1A1A] border border-[#e8e8e8] font-semibold text-sm cursor-pointer"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              </div>
            ) : (
              <form id="rent-property-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="rent-name" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="rent-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-[4px] border ${
                        formErrors.name
                          ? 'border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#e8e8e8] focus:border-[#0C2340] focus:ring-1 focus:ring-[#0C2340]'
                      } bg-[#ffffff] text-[#1A1A1A] text-sm transition-colors`}
                    />
                    {formErrors.name && (
                      <p id="rent-name-error" className="text-xs font-semibold text-red-600 flex items-center gap-1 mt-1.5 animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="rent-phone" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="rent-phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9867478525"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-[4px] border ${
                        formErrors.phone
                          ? 'border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#e8e8e8] focus:border-[#0C2340] focus:ring-1 focus:ring-[#0C2340]'
                      } bg-[#ffffff] text-[#1A1A1A] text-sm transition-colors`}
                    />
                    {formErrors.phone && (
                      <p id="rent-phone-error" className="text-xs font-semibold text-red-600 flex items-center gap-1 mt-1.5 animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="rent-email" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-[#666666] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="rent-email"
                      type="email"
                      name="email"
                      placeholder="e.g. priya@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-[4px] border border-[#e8e8e8] bg-[#ffffff] text-[#1A1A1A] focus:ring-1 focus:ring-[#0C2340] focus:border-[#0C2340] text-sm"
                    />
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="rent-location" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                        Preferred Location
                      </label>
                      <button
                        type="button"
                        id="rent-gps-btn"
                        onClick={handleDetectLocation}
                        disabled={isDetectingLocation}
                        title="Auto-detect current area with GPS"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#FDFDFD] hover:bg-[#ffffff] text-[#1A1A1A] border border-[#e8e8e8] text-[11px] font-semibold transition-all disabled:opacity-75 cursor-pointer shadow-2xs"
                      >
                        {isDetectingLocation ? (
                          <>
                            <Loader2 className="w-2.5 h-2.5 animate-spin text-[#C5A059]" />
                            <span className="text-[#C5A059]">Detecting...</span>
                          </>
                        ) : (
                          <>
                            <Locate className="w-2.5 h-2.5 text-[#C5A059]" />
                            <span>GPS</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative flex items-center">
                      <select
                        id="rent-location"
                        name="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={handleChange}
                        disabled={isDetectingLocation}
                        className="w-full pl-4 pr-10 py-2.5 rounded-[4px] border border-[#e8e8e8] bg-[#ffffff] text-[#1A1A1A] focus:ring-1 focus:ring-[#0C2340] focus:border-[#0C2340] text-sm transition-all cursor-pointer appearance-none"
                      >
                        <option value="" disabled>
                          Select Preferred Location
                        </option>
                        {PREFERRED_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                        {formData.preferredLocation && !PREFERRED_LOCATIONS.includes(formData.preferredLocation as any) && (
                          <option value={formData.preferredLocation}>{formData.preferredLocation}</option>
                        )}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#666666] absolute right-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Property Type */}
                  <div>
                    <label htmlFor="rent-type" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Property Type
                    </label>
                    <select
                      id="rent-type"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-[4px] border border-[#e8e8e8] bg-[#ffffff] text-[#1A1A1A] focus:ring-1 focus:ring-[#0C2340] focus:border-[#0C2340] text-sm"
                    >
                      <option value="Apartment / Flat">Apartment / Flat</option>
                      <option value="Independent House / Villa">Independent House / Villa</option>
                      <option value="Commercial Shop / Office">Commercial Shop / Office</option>
                      <option value="Shared Space / 1 RK">1 RK / Studio</option>
                    </select>
                  </div>

                  {/* BHK */}
                  <div>
                    <label htmlFor="rent-bhk" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      BHK Configuration
                    </label>
                    <select
                      id="rent-bhk"
                      name="bhk"
                      value={formData.bhk}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-[4px] border border-[#e8e8e8] bg-[#ffffff] text-[#1A1A1A] focus:ring-1 focus:ring-[#0C2340] focus:border-[#0C2340] text-sm"
                    >
                      <option value="1 RK">1 RK</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="Commercial Space">Commercial Shop</option>
                    </select>
                  </div>

                  {/* Monthly Budget */}
                  <div>
                    <label htmlFor="rent-budget" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                      Monthly Budget
                    </label>
                    <select
                      id="rent-budget"
                      name="monthlyBudget"
                      value={formData.monthlyBudget}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-[4px] border border-[#e8e8e8] bg-[#ffffff] text-[#1A1A1A] focus:ring-1 focus:ring-[#0C2340] focus:border-[#0C2340] text-sm"
                    >
                      <option value="Under ₹8,000 / month">Under ₹8,000 / month</option>
                      <option value="₹8,000 - ₹15,000 / month">₹8,000 - ₹15,000 / month</option>
                      <option value="₹15,000 - ₹25,000 / month">₹15,000 - ₹25,000 / month</option>
                      <option value="₹25,000 - ₹40,000 / month">₹25,000 - ₹40,000 / month</option>
                      <option value="Above ₹40,000 / month">Above ₹40,000 / month</option>
                    </select>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <label htmlFor="rent-requirements" className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                    Additional Requirements <span className="text-[#666666] font-normal">(Furnished / Unfurnished, family / bachelors, move-in date)</span>
                  </label>
                  <textarea
                    id="rent-requirements"
                    name="additionalRequirements"
                    rows={2}
                    placeholder="Specify preferences such as furnished/unfurnished, family or bachelor preference, deposit budget, etc."
                    value={formData.additionalRequirements}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-[4px] border border-[#e8e8e8] bg-[#ffffff] text-[#1A1A1A] focus:ring-1 focus:ring-[#0C2340] focus:border-[#0C2340] text-sm"
                  />
                </div>

                {/* Error Notification Banner */}
                {errorMessage && (
                  <div id="rent-error-banner" className="p-4 rounded-[4px] bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm space-y-2">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-rose-900">{errorMessage}</p>
                        <p className="text-xs text-rose-700 mt-1">
                          You can instantly send your rental requirements directly to our team on WhatsApp:
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        id="rent-error-wa-btn"
                        href={directWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                        <span>Send on WhatsApp</span>
                      </a>
                      <a
                        id="rent-error-call-btn"
                        href={BUSINESS_INFO.callUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#0C2340] hover:bg-[#1A1A1A] text-white font-bold text-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    id="rent-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] text-sm font-bold text-white bg-[#0C2340] hover:bg-[#1A1A1A] transition-all shadow-md disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
                        <span>DELIVERING REQUIREMENT...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>FIND RENTAL PROPERTY</span>
                      </>
                    )}
                  </button>

                  <a
                    id="rent-whatsapp-direct-btn"
                    href={directWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[4px] text-sm font-bold text-white bg-[#25D366] hover:bg-[#1ebd59] transition-all shadow-xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                    <span>Send on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right: Rental Info Desk */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#ffffff] rounded-[4px] p-6 sm:p-7 border border-[#e8e8e8] shadow-sm">
              <h3 className="text-lg font-bold font-serif text-[#1A1A1A] mb-2">
                Rental Assistance Desk
              </h3>
              <p className="text-xs text-[#666666] mb-6 leading-relaxed">
                Looking for a quick rental home in Vasai, Boisar, or anywhere in Mumbai? Connect directly with our leasing coordinators.
              </p>

              <div className="space-y-3 mb-6">
                <a
                  id="rent-sidebar-call-btn"
                  href={BUSINESS_INFO.callUrl}
                  className="flex items-center gap-3 p-3 rounded-[4px] bg-[#FDFDFD] hover:bg-[#ffffff] transition-colors border border-[#e8e8e8]"
                >
                  <div className="w-9 h-9 rounded-[4px] bg-[#0C2340]/10 text-[#0C2340] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#0C2340]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider">Call Rental Desk</p>
                    <p className="text-sm font-bold text-[#1A1A1A]">{BUSINESS_INFO.phoneDisplay}</p>
                  </div>
                </a>

                <a
                  id="rent-sidebar-wa-btn"
                  href={getWhatsAppUrl('RENT')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-[4px] bg-[#FDFDFD] hover:bg-[#ffffff] transition-colors border border-[#e8e8e8]"
                >
                  <div className="w-9 h-9 rounded-[4px] bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#25D366] tracking-wider">WhatsApp Rental Chat</p>
                    <p className="text-sm font-bold text-[#1A1A1A]">Instant Options</p>
                  </div>
                </a>
              </div>

              <div className="border-t border-[#e8e8e8] pt-4 text-xs text-[#666666] space-y-2">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>Verified rental inventory with clear terms</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  <span>Agreement & tenant assistance</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
