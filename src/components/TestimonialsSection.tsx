import React from 'react';
import { Star, ShieldCheck, MapPin, Calendar, Quote } from 'lucide-react';
import { CLIENT_REVIEWS } from '../data/testimonialsData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials"
      className="py-24 sm:py-32 bg-[#FDFDFD] text-[#1A1A1A] border-b border-[#e8e8e8] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[4px] bg-[#ffffff] border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold tracking-wide shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] stroke-[2]" />
            <span>Genuine Client Feedback</span>
          </div>

          {/* Exact Heading: "What Our Clients Say ★ 4.8/5 (127 Reviews)" */}
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight"
          >
            What Our Clients Say{' '}
            <span className="inline-flex items-center gap-1.5 text-[#C5A059] whitespace-nowrap text-xl sm:text-2xl lg:text-3xl font-bold align-middle">
              <Star className="w-6 h-6 fill-[#C5A059] text-[#C5A059] inline stroke-[1.5]" />
              <span>4.8/5</span>
            </span>{' '}
            <span className="text-[#666666] text-base sm:text-lg lg:text-xl font-normal whitespace-nowrap">
              (127 Reviews)
            </span>
          </h2>

          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto" />

          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Real experiences from verified home buyers, investors, and families across Vasai, Virar, and Mumbai MMR.
          </p>
        </div>

        {/* 10 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENT_REVIEWS.map((review, index) => (
            <div
              key={review.id}
              id={`testimonial-card-${review.id}`}
              className="card-hw bg-[#ffffff] border border-[#e8e8e8] rounded-[4px] p-7 sm:p-8 shadow-xs hover:border-[#C5A059] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Initials Circle + Name + Location & Verified Badge */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Initials box */}
                    <div
                      className="w-10 h-10 rounded-[4px] bg-[#ffffff] text-[#0C2340] border border-[#e8e8e8] flex items-center justify-center text-xs font-bold shrink-0 select-none shadow-xs"
                      aria-label={`Initials ${review.initials}`}
                    >
                      {review.initials}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#1A1A1A] truncate">
                        {review.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#666666] mt-0.5">
                        <MapPin className="w-3 h-3 text-[#C5A059] stroke-[2] shrink-0" />
                        <span className="truncate">{review.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Buyer Badge */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] text-[10px] font-bold tracking-wide bg-[#ffffff] text-[#C5A059] border border-[#C5A059]/40 shrink-0">
                    <ShieldCheck className="w-3 h-3 text-[#C5A059] stroke-[2]" />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059] stroke-[1.5]"
                    />
                  ))}
                  <span className="text-xs font-bold text-[#C5A059] ml-1.5">
                    5.0
                  </span>
                </div>

                {/* Review Text */}
                <div className="relative">
                  <Quote className="w-5 h-5 text-[#C5A059] absolute -top-1 -left-1 opacity-25 pointer-events-none stroke-[2]" />
                  <p className="text-xs sm:text-sm text-[#414042] leading-relaxed pl-3 italic border-l-2 border-[#C5A059]">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer: Date */}
              <div className="mt-6 pt-4 border-t border-[#e8e8e8] flex items-center justify-between text-xs text-[#666666]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059] stroke-[2]" />
                  <span>{review.date}</span>
                </div>
                <span className="text-[11px] tracking-wide text-[#666666] font-medium">
                  Review #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
