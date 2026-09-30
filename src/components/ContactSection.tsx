import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { BUSINESS_INFO, PREFERRED_LOCATIONS } from '../data/propertyData';
import { sendEnquiry } from '../services/enquiryService';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    requirement: 'Buy' as 'Buy' | 'Sell' | 'Rent' | 'Heavy Deposit',
    preferredLocation: initialSubject.includes('Boisar')
      ? 'Boisar'
      : initialSubject.includes('Vasai')
      ? 'Vasai'
      : '',
    message: initialSubject ? `Regarding: ${initialSubject}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { fullName?: string; phone?: string } = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await sendEnquiry({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        requirement: `${formData.requirement} Property`,
        preferredLocation: formData.preferredLocation.trim() || 'Mumbai & MMR',
        message: formData.message.trim(),
        source: 'Website Enquiry Form',
      });

      if (response.success) {
        setSubmitStatus('success');
        setStatusMessage('Your enquiry has been received. Our advisory team will contact you shortly.');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          requirement: 'Buy',
          preferredLocation: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(response.message || 'Unable to submit enquiry. Please call or WhatsApp us directly.');
      }
    } catch (err: any) {
      setSubmitStatus('error');
      setStatusMessage('Network issue. Please contact us directly via WhatsApp or Phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-20 lg:py-24 bg-[#0B1325] text-[#E2E8F0] border-b border-[rgba(212,175,55,0.15)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Direct Contact Details & Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] font-montserrat">
                Advisory Desk
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#D4AF37] tracking-tight leading-tight font-cinzel">
                Shree Sai Developers
                <span className="block text-base sm:text-lg font-medium text-[#CBD5E1] mt-1 font-montserrat">
                  (Builders &amp; Developers)
                </span>
              </h2>
              <p className="text-sm text-[#CBD5E1] font-light leading-relaxed font-montserrat">
                Connect directly with our leadership and advisory team for verified property guidance across Mumbai &amp; MMR.
              </p>
            </div>

            <div className="space-y-4 pt-2 border-t border-[rgba(212,175,55,0.15)]">
              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-[4px] bg-[#1C2541] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-sm">
                  <Phone className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs uppercase tracking-wider text-[#94A3B8] font-montserrat">Phone / Call</p>
                  <a
                    href={BUSINESS_INFO.callUrl}
                    className="text-base text-[#FFFFFF] hover:text-[#D4AF37] transition-colors font-bold font-montserrat"
                  >
                    +91 98674 78525
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-[4px] bg-[#1C2541] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-sm">
                  <Mail className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs uppercase tracking-wider text-[#94A3B8] font-montserrat">Email</p>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-base text-[#FFFFFF] hover:text-[#D4AF37] transition-colors font-bold break-all font-montserrat"
                  >
                    shreesaideveloper.in@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-[4px] bg-[#1C2541] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs uppercase tracking-wider text-[#94A3B8] font-montserrat">Service Region</p>
                  <p className="text-base text-[#FFFFFF] font-bold font-montserrat">
                    Mumbai &amp; MMR
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs: CALL NOW, WHATSAPP */}
            <div className="pt-2 flex flex-row items-center gap-3 font-montserrat">
              <a
                href={BUSINESS_INFO.callUrl}
                className="flex-1 sm:flex-initial justify-center px-6 py-3 rounded-[4px] border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C2340] text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 stroke-[2]" />
                <span>CALL NOW</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial justify-center px-6 py-3 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] text-[#0C2340] text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-[#0C2340]" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Column: Premium Simple Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="card-hw bg-[#1C2541] rounded-[4px] border border-[rgba(212,175,55,0.15)] p-6 sm:p-8 lg:p-10 shadow-2xl">
              <div className="space-y-1 mb-6">
                <h3 className="text-2xl font-bold text-[#FFFFFF] tracking-tight font-cinzel">
                  Start Your Property Enquiry
                </h3>
                <p className="text-xs text-[#CBD5E1] font-montserrat">
                  Submit your property requirement below for confidential advisory and verified listings.
                </p>
              </div>

              {submitStatus === 'success' ? (
                <div className="p-8 rounded-[4px] bg-[#0B1325] border border-[#D4AF37] text-center space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mx-auto stroke-[2]" />
                  <h4 className="text-lg font-bold text-white font-cinzel">Enquiry Submitted</h4>
                  <p className="text-sm text-[#CBD5E1] max-w-md mx-auto font-montserrat">
                    {statusMessage}
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-4 px-6 py-2.5 rounded-[4px] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C2340] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer font-montserrat"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-montserrat">
                  {submitStatus === 'error' && (
                    <div className="p-3.5 rounded-[4px] bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {/* Requirement Selector: Buy / Sell / Rent / Heavy Deposit */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold">
                      Requirement
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['Buy', 'Sell', 'Rent', 'Heavy Deposit'] as const).map((req) => (
                        <button
                          key={req}
                          type="button"
                          onClick={() => setFormData({ ...formData, requirement: req })}
                          className={`py-2 px-2 text-[11px] font-bold uppercase tracking-wider rounded-[4px] border transition-all cursor-pointer truncate ${
                            formData.requirement === req
                              ? 'bg-[#D4AF37] text-[#0C2340] border-[#D4AF37] shadow-sm'
                              : 'bg-[#0B1325] text-[#CBD5E1] border-[#2A3454] hover:border-[#D4AF37]'
                          }`}
                        >
                          {req}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Two-Column: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 bg-[#0B1325] border border-[#2A3454] focus:border-[#D4AF37] rounded-[4px] text-sm text-[#FFFFFF] placeholder-[#64748B] focus:outline-none transition-colors"
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-400">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 bg-[#0B1325] border border-[#2A3454] focus:border-[#D4AF37] rounded-[4px] text-sm text-[#FFFFFF] placeholder-[#64748B] focus:outline-none transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-400">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Two-Column: Email Address & Preferred Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#0B1325] border border-[#2A3454] focus:border-[#D4AF37] rounded-[4px] text-sm text-[#FFFFFF] placeholder-[#64748B] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="location" className="block text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold">
                        Preferred Location
                      </label>
                      <div className="relative flex items-center">
                        <select
                          id="location"
                          value={formData.preferredLocation}
                          onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#0B1325] border border-[#2A3454] focus:border-[#D4AF37] rounded-[4px] text-sm text-[#FFFFFF] focus:outline-none transition-colors cursor-pointer appearance-none pr-10"
                        >
                          <option value="" disabled className="bg-[#0B1325] text-[#94A3B8]">
                            Select Preferred Location
                          </option>
                          {PREFERRED_LOCATIONS.map((loc) => (
                            <option key={loc} value={loc} className="bg-[#0B1325] text-white">
                              {loc}
                            </option>
                          ))}
                          {formData.preferredLocation && !PREFERRED_LOCATIONS.includes(formData.preferredLocation as any) && (
                            <option value={formData.preferredLocation} className="bg-[#0B1325] text-white">
                              {formData.preferredLocation}
                            </option>
                          )}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#D4AF37] absolute right-3 pointer-events-none stroke-[2]" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[#CBD5E1] font-semibold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify any preferences or questions..."
                      className="w-full px-3.5 py-2.5 bg-[#0B1325] border border-[#2A3454] focus:border-[#D4AF37] rounded-[4px] text-sm text-[#FFFFFF] placeholder-[#64748B] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] text-[#0C2340] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#0C2340]" />
                        <span className="text-[#0C2340]">PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5] text-[#0C2340]" />
                        <span className="text-[#0C2340]">SEND ENQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
