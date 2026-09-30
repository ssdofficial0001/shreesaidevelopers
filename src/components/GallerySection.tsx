import React, { useState } from 'react';
import { Eye, ArrowUpRight } from 'lucide-react';
import { ALL_PROJECT_PHOTOS } from '../data/propertyData';
import { ProjectPhoto } from '../types';

interface GallerySectionProps {
  onOpenLightbox: (photo: ProjectPhoto) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [filter, setFilter] = useState<'all' | 'vasai' | 'boisar'>('all');
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Real supplied photographs only (brochure 4.png is kept separate in dedicated section)
  const photos = ALL_PROJECT_PHOTOS.filter((p) => p.id !== 'sai-brochure');

  const filteredPhotos = photos.filter((p) => {
    if (filter === 'vasai') return p.category === 'evershine_vasai';
    if (filter === 'boisar') return p.category === 'boisar';
    return true;
  });

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#111215] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-8 border-b border-white/10 mb-16">
          <div className="flex items-center gap-4">
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-[#C5995B] uppercase font-sans-clean">
              PHOTOGRAPHY EXHIBITION
            </span>
            <span className="w-12 sm:w-20 h-[1px] bg-white/20" />
            <span className="text-xs text-[#8E8B87] font-mono tracking-widest uppercase">
              ACTUAL ON-GROUND IMAGERY
            </span>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex items-center gap-4 font-sans-clean">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'vasai', label: 'Evershine, Vasai' },
              { id: 'boisar', label: 'Boisar' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as 'all' | 'vasai' | 'boisar')}
                className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors py-1 relative ${
                  filter === tab.id
                    ? 'text-white'
                    : 'text-[#8E8B87] hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                {filter === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5995B]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Gallery Composition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {filteredPhotos.map((photo, index) => {
            const isFailed = failedImages.has(photo.id);
            // Dynamic column spans for architectural rhythm: 1st is 7 cols, 2nd is 5 cols, 3rd is 12 cols or 6 cols
            const colSpan =
              index === 0
                ? 'md:col-span-7'
                : index === 1
                ? 'md:col-span-5'
                : 'md:col-span-6';

            return (
              <div
                key={photo.id}
                className={`${colSpan} group cursor-pointer flex flex-col justify-between`}
                onClick={() => !isFailed && onOpenLightbox(photo)}
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[#181A1F] border border-white/10">
                  {isFailed ? (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#8E8B87] uppercase tracking-widest">
                      Photo Coming Soon
                    </div>
                  ) : (
                    <>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        onError={() =>
                          setFailedImages((prev) => new Set(prev).add(photo.id))
                        }
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#111215]/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute top-3 right-3 w-8 h-8 bg-[#111215]/80 border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </>
                  )}
                </div>

                {/* Clean Architectural Caption Beneath */}
                <div className="pt-4 flex items-baseline justify-between gap-4 font-sans-clean">
                  <div>
                    <h4 className="text-base sm:text-lg font-normal font-syne text-white uppercase group-hover:text-[#C5995B] transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-[#8E8B87] mt-0.5">
                      {photo.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8B87] shrink-0">
                    {photo.category === 'evershine_vasai' ? 'Vasai' : 'Boisar'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
