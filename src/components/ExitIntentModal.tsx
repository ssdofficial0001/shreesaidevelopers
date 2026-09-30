import React, { useState, useEffect } from 'react';
import { Gift, X, CheckCircle2 } from 'lucide-react';

interface ExitIntentModalProps {
  onSuccess?: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves towards top of screen (exit intent)
      if (e.clientY <= 15) {
        const hasSeen = sessionStorage.getItem('ssd_exit_intent_dismissed');
        if (!hasSeen) {
          setIsOpen(true);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('ssd_exit_intent_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = fullName.trim();
    const cleanPhone = phone.replace(/\D/g, '');

    if (!trimmedName) {
      setError('Please enter your name');
      return;
    }

    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    const message = `*Exclusive Exit Deal Enquiry - Shree Sai Developers*\n\n*Name:* ${trimmedName}\n*Phone:* ${cleanPhone}\n*Interested In:* Exclusive Boisar Plot & Property Offers\n*Requirement:* Best deal before exit`;

    const whatsappUrl = `https://wa.me/919867478525?text=${encodeURIComponent(message)}`;

    setIsSubmitted(true);
    sessionStorage.setItem('ssd_exit_intent_dismissed', 'true');

    if (onSuccess) {
      onSuccess();
    }

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 600);

    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFullName('');
      setPhone('');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="exit-intent-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
    >
      {/* Popup Box: bg #1C2541 border [rgba(212,175,55,0.25)] */}
      <div
        id="exit-intent-popup"
        className="relative w-full max-w-[480px] bg-[#1C2541] border border-[rgba(212,175,55,0.25)] rounded-[4px] p-7 sm:p-9 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200 transition-colors card-hw font-montserrat"
      >
        {/* Close button */}
        <button
          id="exit-intent-close-btn"
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#0B1325] transition-colors duration-200 cursor-pointer rounded-[4px]"
          aria-label="Close offer popup"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        {isSubmitted ? (
          <div className="py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-[4px] bg-[#0B1325] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md">
              <CheckCircle2 className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-cinzel">
              Exclusive Deal Unlocked!
            </h3>
            <p className="text-sm text-[#CBD5E1] max-w-sm mx-auto">
              Connecting you directly with our property director on WhatsApp for instant Boisar deal details...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-center font-montserrat">
            {/* 1. Icon box with gift/offers icon */}
            <div className="w-[50px] h-[50px] mx-auto rounded-[4px] bg-[#0B1325] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37] mb-4 shadow-sm">
              <Gift className="w-5 h-5 stroke-[2]" />
            </div>

            {/* 2. Tag: Direct Advisory */}
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] block mb-2 uppercase font-cinzel">
              Wait, before you leave
            </span>

            {/* 3. Title */}
            <h3
              id="exit-modal-title"
              className="text-[22px] font-bold text-[#FFFFFF] text-center leading-snug mb-2 font-cinzel"
            >
              Planning to Exit? Grab Best Deal Before You Go!
            </h3>

            {/* 4. Subtitle */}
            <p className="text-[14px] text-[#CBD5E1] text-center mb-6 leading-relaxed">
              Get exclusive Boisar plot offers directly on WhatsApp
            </p>

            {error && (
              <div className="mb-4 text-xs font-medium text-red-200 bg-red-950/50 border border-red-800 rounded-[4px] py-2.5 px-3">
                {error}
              </div>
            )}

            <div className="space-y-3.5 mb-5 text-left">
              {/* 5. Input: Name */}
              <div>
                <input
                  id="exit-intent-name-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Full Name"
                  required
                  className="w-full bg-[#0B1325] border border-[#2A3454] rounded-[4px] px-4.5 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              {/* 6. Input: Mobile Number */}
              <div>
                <input
                  id="exit-intent-phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="WhatsApp Mobile Number"
                  required
                  maxLength={14}
                  className="w-full bg-[#0B1325] border border-[#2A3454] rounded-[4px] px-4.5 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            {/* 7. Button */}
            <button
              id="exit-intent-submit-btn"
              type="submit"
              className="w-full py-3.5 px-6 rounded-[4px] bg-[#D4AF37] hover:bg-[#e5c158] text-[#0C2340] text-sm font-bold uppercase tracking-wider shadow-md cursor-pointer transition-all block"
            >
              <span>Get Best Deal on WhatsApp</span>
            </button>

            {/* 8. Bottom note */}
            <p className="text-xs text-[#94A3B8] text-center mt-3.5 tracking-wide">
              Direct connection with authorized developers
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
