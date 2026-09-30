import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Phone, ShieldCheck, Locate, Loader2, ChevronDown } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppUrl, PREFERRED_LOCATIONS } from '../data/propertyData';
import { sendEnquiry } from '../services/enquiryService';
import { detectCurrentLocation } from '../utils/geolocation';
import { validateName, validatePhone } from '../utils/validation';
import { WhatsAppIcon } from './WhatsAppIcon';

interface RequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'buy' | 'sell' | 'rent';
  initialLocation?: string;
  initialPropertyInterest?: string;
}

export const RequirementModal: React.FC<RequirementModalProps> = ({
  isOpen,
  onClose,
  initialType = 'buy',
  initialLocation = '',
  initialPropertyInterest = '',
}) => {
  const [reqType, setReqType] = useState<'buy' | 'sell' | 'rent'>(initialType);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: initialType === 'buy' ? 'Buy Property' : initialType === 'sell' ? 'Sell Property' : 'Rent Property',
    location: initialLocation || '',
    budget: '',
    message: initialPropertyInterest ? `Enquiring about: ${initialPropertyInterest}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    try {
      const locationName = await detectCurrentLocation();
      const matched = PREFERRED_LOCATIONS.find((loc) =>
        locationName.toLowerCase().includes(loc.toLowerCase()) || loc.toLowerCase().includes(locationName.toLowerCase())
      );
      setFormData((prev) => ({
        ...prev,
        location: matched || locationName,
      }));
    } catch (err: any) {
      console.warn('Geolocation detection error:', err);
      alert(err.message || 'Unable to detect location. Please check your browser location permissions.');
    } finally {
      setIsDetectingLocation(false);
    }
  };

  useEffect(() => {
    setReqType(initialType);
    setFormData((prev) => ({
      ...prev,
      requirement: initialType === 'buy' ? 'Buy Property' : initialType === 'sell' ? 'Sell Property' : 'Rent Property',
      location: initialLocation || prev.location,
      message: initialPropertyInterest ? `Enquiring about: ${initialPropertyInterest}` : prev.message,
    }));
  }, [initialType, initialLocation, initialPropertyInterest]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    // 1. Prevent default submission
    e.preventDefault();

    // 2. Get values from fields name, phone, requirement, location, budget
    const form = e.currentTarget as HTMLFormElement;
    const formElements = form?.elements as any;

    const name = (formElements?.name?.value ?? formData.name ?? '').trim();
    const phone = (formElements?.phone?.value ?? formData.phone ?? '').trim();
    const requirement = (
      formElements?.requirement?.value ??
      formData.requirement ??
      (reqType === 'buy' ? 'Buy Property' : reqType === 'sell' ? 'Sell Property' : 'Rent Property')
    ).trim();
    const location = (formElements?.location?.value ?? formData.location ?? 'Mumbai & MMR').trim();
    const budget = (formElements?.budget?.value ?? formData.budget ?? 'As per requirement').trim();

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

    // 3. Create this message format:
    // *New Property Enquiry*
    // Name: [name value]
    // Mobile: [phone value]
    // Requirement: [requirement value]
    // Location: [location value]
    // Budget: [budget value]
    const message = `*New Property Enquiry*
Name: ${name}
Mobile: ${phone}
Requirement: ${requirement}
Location: ${location}
Budget: ${budget}`;

    // 4. Also show an alert: "Thank you! Redirecting to WhatsApp, please press SEND."
    alert('Thank you! Redirecting to WhatsApp, please press SEND.');

    // 5. Then redirect user to https://wa.me/919867478525?text= with encodeURIComponent(message) in a new tab using window.open.
    const waUrl = `https://wa.me/919867478525?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 6. Save to Supabase in background
    try {
      const response = await sendEnquiry({
        name,
        phone,
        email: formData.email,
        requirement,
        preferredLocation: location,
        budget,
        message: formData.message,
        source: 'Requirement Modal',
      });

      if (response.success) {
        setSubmitStatus('success');
        setStatusMessage('Your requirement has been saved and redirected to our WhatsApp desk.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          requirement: reqType === 'buy' ? 'Buy Property' : reqType === 'sell' ? 'Sell Property' : 'Rent Property',
          location: '',
          budget: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(response.message || 'Saved for WhatsApp follow-up.');
      }
    } catch {
      setSubmitStatus('success');
      setStatusMessage('Enquiry opened in WhatsApp. Our team will contact you shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const titles = {
    buy: {
      title: 'Buy Verified Property',
      desc: 'Tell us what you are looking for in Mumbai & MMR.',
      budgetLabel: 'Budget Range (e.g. ₹35L - ₹50L)',
    },
    sell: {
      title: 'Sell / List Your Property',
      desc: 'Submit your flat, shop, or plot details for verified buyer matching.',
      budgetLabel: 'Expected Price & Carpet Area',
    },
    rent: {
      title: 'Rent / Heavy Deposit Requirement',
      desc: 'Find verified rental flats, commercial units, or heavy deposit opportunities.',
      budgetLabel: 'Monthly Rent or Deposit Range',
    },
  };

  return (
    <div
      id="requirement-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        id="requirement-modal-container"
        className="relative card-hw bg-[#1C2541] text-[#E2E8F0] w-full max-w-lg max-h-[94vh] overflow-y-auto rounded-[4px] border border-[rgba(212,175,55,0.25)] shadow-2xl p-6 sm:p-8 transition-colors my-auto font-montserrat"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#2A3454]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase font-cinzel">
                Shree Sai Developers Desk
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight font-cinzel">
              {titles[reqType].title}
            </h3>
            <p className="text-xs text-[#CBD5E1] mt-1 font-montserrat">{titles[reqType].desc}</p>
            {initialPropertyInterest && (
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0B1325] border border-[rgba(212,175,55,0.3)] rounded-[4px] text-[11px] text-[#D4AF37] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Enquiring about: <strong className="text-white">{initialPropertyInterest}</strong></span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[4px] text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#0B1325] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="mt-4 flex rounded-[4px] bg-[#0B1325] p-1 border border-[#2A3454]">
          {(['buy', 'sell', 'rent'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setReqType(mode)}
              className={`flex-1 py-2 text-xs font-bold tracking-wide rounded-[4px] transition-all cursor-pointer uppercase ${
                reqType === mode
                  ? 'bg-[#D4AF37] text-[#0C2340] shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#FFFFFF]'
              }`}
            >
              {mode === 'rent' ? 'Rent / Deposit' : mode}
            </button>
          ))}
        </div>

        {/* Success/Error Alerts */}
        {submitStatus === 'success' && (
          <div className="mt-4 p-4 rounded-[4px] bg-[#0B1325] border border-[#D4AF37] flex items-start gap-2.5 text-[#E2E8F0] text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 stroke-[2]" />
            <div>
              <p className="font-bold text-[#D4AF37] font-cinzel">Requirement Received!</p>
              <p className="mt-0.5 text-[#CBD5E1]">{statusMessage}</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-4 rounded-[4px] bg-red-950/50 border border-red-800 flex items-start gap-2.5 text-red-200 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5 stroke-[2]" />
            <div>
              <p className="font-bold text-red-200 font-cinzel">Notice</p>
              <p className="mt-0.5 text-red-300">{statusMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4.5 space-y-4 font-montserrat">
          <input type="hidden" name="requirement" value={formData.requirement} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label htmlFor="modal-name" className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">
                Your Name <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="modal-name"
                required
                value={formData.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({ ...prev, name: val }));
                  if (formErrors.name) {
                    const err = validateName(val);
                    setFormErrors((prev) => ({ ...prev, name: err || undefined }));
                  }
                }}
                placeholder="Full Name"
                className={`w-full bg-[#0B1325] border ${
                  formErrors.name
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-[#2A3454] focus:border-[#D4AF37]'
                } rounded-[4px] px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:outline-none placeholder-[#64748B] transition-colors`}
              />
              {formErrors.name && (
                <p id="modal-name-error" className="text-[11px] font-medium text-red-400 flex items-center gap-1 mt-1 animate-in fade-in">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{formErrors.name}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="modal-phone" className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">
                Mobile Number <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                id="modal-phone"
                required
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({ ...prev, phone: val }));
                  if (formErrors.phone) {
                    const err = validatePhone(val);
                    setFormErrors((prev) => ({ ...prev, phone: err || undefined }));
                  }
                }}
                placeholder="e.g. 9867478525"
                className={`w-full bg-[#0B1325] border ${
                  formErrors.phone
                    ? 'border-red-500 ring-1 ring-red-500'
                    : 'border-[#2A3454] focus:border-[#D4AF37]'
                } rounded-[4px] px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:outline-none placeholder-[#64748B] transition-colors`}
              />
              {formErrors.phone && (
                <p id="modal-phone-error" className="text-[11px] font-medium text-red-400 flex items-center gap-1 mt-1 animate-in fade-in">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{formErrors.phone}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="modal-location" className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">
                  Preferred Location <span className="text-[#D4AF37]">*</span>
                </label>
                <button
                  type="button"
                  id="modal-gps-btn"
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  title="Auto-detect current area/city with GPS"
                  className="inline-flex items-center gap-1 text-[11px] text-[#D4AF37] hover:text-[#e5c158] transition-colors cursor-pointer disabled:opacity-60 font-semibold"
                >
                  {isDetectingLocation ? (
                    <>
                      <Loader2 className="w-2.5 h-2.5 animate-spin" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <>
                      <Locate className="w-2.5 h-2.5 stroke-[2]" />
                      <span>Auto GPS</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative flex items-center">
                <select
                  name="location"
                  id="modal-location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={isDetectingLocation}
                  className="w-full bg-[#0B1325] border border-[#2A3454] focus:border-[#D4AF37] rounded-[4px] pl-3.5 pr-9 py-2.5 text-xs text-[#FFFFFF] focus:outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="" disabled className="bg-[#0B1325] text-[#64748B]">
                    Select Preferred Location
                  </option>
                  {PREFERRED_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#0B1325] text-white">
                      {loc}
                    </option>
                  ))}
                  {formData.location && !PREFERRED_LOCATIONS.includes(formData.location as any) && (
                    <option value={formData.location} className="bg-[#0B1325] text-white">
                      {formData.location}
                    </option>
                  )}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] absolute right-3 pointer-events-none stroke-[2]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">
                {titles[reqType].budgetLabel} <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                name="budget"
                id="modal-budget"
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="e.g. ₹35L - ₹50L / 1-2 BHK"
                className="w-full bg-[#0B1325] border border-[#2A3454] focus:border-[#D4AF37] rounded-[4px] px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:outline-none placeholder-[#64748B]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">
              Specific Requirements or Notes
            </label>
            <textarea
              name="message"
              id="modal-message"
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any details about timeline, unit preferences, floor, etc..."
              className="w-full bg-[#0B1325] border border-[#2A3454] focus:border-[#D4AF37] rounded-[4px] px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:outline-none placeholder-[#64748B] resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] text-[#0C2340] font-bold text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50 transition-all shadow-md"
            >
              {isSubmitting ? <span>Sending...</span> : <span>Submit Requirement</span>}
            </button>

            <a
              href={getWhatsAppUrl(reqType === 'buy' ? 'BUY' : reqType === 'sell' ? 'SELL' : 'RENT')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[4px] border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C2340] font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0 fill-[#D4AF37] group-hover:fill-[#0C2340]" />
              <span>Or WhatsApp Us Directly</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
