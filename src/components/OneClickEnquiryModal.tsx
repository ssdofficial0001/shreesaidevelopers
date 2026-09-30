import React, { useState, useEffect } from 'react';
import { X, Building2, Phone, User, Check, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { validateName, validatePhone } from '../utils/validation';
import { sendEnquiry } from '../services/enquiryService';

interface OneClickEnquiryModalProps {
  isOpen: boolean;
  projectName: string;
  projectLocation?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const OneClickEnquiryModal: React.FC<OneClickEnquiryModalProps> = ({
  isOpen,
  projectName,
  projectLocation,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sendWhatsApp, setSendWhatsApp] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setSendWhatsApp(true);
      setErrors({});
      setIsSubmitted(false);
      setIsSubmitting(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(name);
    const phoneError = validatePhone(phone);

    if (nameError || phoneError) {
      setErrors({
        name: nameError || undefined,
        phone: phoneError || undefined,
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    // 1. Send enquiry to backend/local store
    await sendEnquiry({
      name: trimmedName,
      phone: trimmedPhone,
      email: '',
      requirement: `One-Click Enquiry: ${projectName}`,
      preferredLocation: projectLocation || 'Mumbai & MMR',
      propertyInterest: projectName,
      budget: 'Direct Enquiry',
      message: `Enquiry submitted for ${projectName} with WhatsApp updates ${sendWhatsApp ? 'ENABLED' : 'DISABLED'}.`,
    });

    // 2. If WhatsApp checkbox is enabled, launch WhatsApp pre-filled chat
    if (sendWhatsApp) {
      const waText = `*New Property Enquiry*\n*Property:* ${projectName}\n*Name:* ${trimmedName}\n*Mobile:* ${trimmedPhone}\n*Request:* Please send brochure, pricing, and site visit details.`;
      const waUrl = `https://wa.me/919867478525?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    if (onSuccess) {
      onSuccess();
    }

    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="oneclick-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#1C2541] border border-[rgba(212,175,55,0.25)] rounded-[4px] shadow-2xl overflow-hidden transition-all animate-in zoom-in-95 duration-200 card-hw font-montserrat"
      >
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full bg-[#D4AF37]" />

        {/* Close Button */}
        <button
          id="oneclick-modal-close-btn"
          onClick={onClose}
          aria-label="Close enquiry popup"
          className="absolute top-4 right-4 p-2 rounded-[4px] bg-[#0B1325] hover:bg-[#1C2541] text-[#94A3B8] hover:text-[#FFFFFF] transition-colors cursor-pointer z-10 border border-[#2A3454]"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-7">
          {/* Header & Auto-filled Property Name */}
          <div className="mb-5 pr-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#0B1325] border border-[rgba(212,175,55,0.3)] text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm font-cinzel">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37] stroke-[2]" />
              <span>Instant Property Enquiry</span>
            </div>

            {/* Auto-filled Property Name */}
            <h2
              id="oneclick-modal-title"
              className="text-lg sm:text-xl font-bold text-[#FFFFFF] tracking-tight font-cinzel"
            >
              {projectName || 'Selected Property'}
            </h2>

            {projectLocation && (
              <p className="text-xs text-[#CBD5E1] mt-0.5 font-medium">
                Location: {projectLocation}
              </p>
            )}

            <p className="text-xs text-[#CBD5E1] mt-1 leading-relaxed">
              Enter your contact details to receive full property brochure, current pricing, and verified site availability.
            </p>
          </div>

          {/* Success State */}
          {isSubmitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-[4px] bg-[#0B1325] border border-[#D4AF37] text-[#D4AF37] mx-auto flex items-center justify-center shadow-md">
                <Check className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-white font-cinzel">
                Enquiry Submitted Successfully!
              </h3>
              <p className="text-xs text-[#CBD5E1] max-w-xs mx-auto">
                Thank you, <span className="font-bold text-white">{name}</span>. Our Shree Sai Developers property advisor will connect with you on <span className="font-bold text-[#D4AF37]">{phone}</span> shortly.
              </p>
              {sendWhatsApp && (
                <p className="text-xs text-[#D4AF37] font-medium flex items-center justify-center gap-1">
                  <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-[#D4AF37]" />
                  <span>Connecting to WhatsApp for instant brochure download...</span>
                </p>
              )}
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 rounded-[4px] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C2340] text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            /* Form with Only 2 Fields + Checkbox + Submit Button */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="oneclick-name"
                  className="block text-xs font-semibold tracking-wide text-[#CBD5E1] uppercase"
                >
                  Full Name <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <User className="w-4 h-4 stroke-[2]" />
                  </div>
                  <input
                    type="text"
                    id="oneclick-name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        const err = validateName(e.target.value);
                        setErrors((prev) => ({ ...prev, name: err || undefined }));
                      }
                    }}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-3.5 py-3 rounded-[4px] border text-xs text-white bg-[#0B1325] focus:outline-none placeholder-[#64748B] transition-colors ${
                      errors.name
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-[#2A3454] focus:border-[#D4AF37]'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p
                    id="oneclick-name-error"
                    className="text-[11px] font-medium text-red-400 flex items-center gap-1 mt-1 animate-in fade-in"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0 stroke-[2]" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Field 2: Mobile Number */}
              <div className="space-y-1.5">
                <label
                  htmlFor="oneclick-phone"
                  className="block text-xs font-semibold tracking-wide text-[#CBD5E1] uppercase"
                >
                  Mobile Number <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Phone className="w-4 h-4 stroke-[2]" />
                  </div>
                  <input
                    type="tel"
                    id="oneclick-phone"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) {
                        const err = validatePhone(e.target.value);
                        setErrors((prev) => ({ ...prev, phone: err || undefined }));
                      }
                    }}
                    placeholder="e.g. 9867478525"
                    className={`w-full pl-10 pr-3.5 py-3 rounded-[4px] border text-xs text-white bg-[#0B1325] focus:outline-none placeholder-[#64748B] transition-colors ${
                      errors.phone
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-[#2A3454] focus:border-[#D4AF37]'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p
                    id="oneclick-phone-error"
                    className="text-[11px] font-medium text-red-400 flex items-center gap-1 mt-1 animate-in fade-in"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0 stroke-[2]" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Checkbox: Send details on WhatsApp */}
              <div className="pt-1">
                <label
                  htmlFor="oneclick-whatsapp-checkbox"
                  className="flex items-center gap-2.5 p-3 rounded-[4px] bg-[#0B1325] border border-[#2A3454] cursor-pointer select-none transition-colors hover:border-[#D4AF37]/50"
                >
                  <input
                    type="checkbox"
                    id="oneclick-whatsapp-checkbox"
                    checked={sendWhatsApp}
                    onChange={(e) => setSendWhatsApp(e.target.checked)}
                    className="w-4 h-4 rounded-[4px] text-[#D4AF37] border-[#2A3454] cursor-pointer accent-[#D4AF37]"
                  />
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#E2E8F0]">
                    <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-[#D4AF37]" />
                    <span>Send details on WhatsApp</span>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="oneclick-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4.5 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] text-[#0C2340] text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 select-none"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <span>Get Details Now</span>
                  )}
                </button>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-center text-[#94A3B8] pt-1">
                Direct developer enquiry • No spam • Confidential
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
