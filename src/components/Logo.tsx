import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer' | 'compact' | 'hero' | 'about' | 'header';
  className?: string;
  showTagline?: boolean;
}

/**
 * Shree Sai Developers Official Brand Wordmark
 * Integrates the authentic brand logo asset cleanly into the dark luxury website theme.
 * Renders as a native brand wordmark with transparent background, strict aspect ratio preservation,
 * and responsive scaling across desktop, tablet, and mobile.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  className = '',
}) => {
  const isFooter = variant === 'footer';
  const isAbout = variant === 'about';
  const isCompact = variant === 'compact';
  const isHeader = variant === 'header';

  // Responsive height scale strictly adhering to specification:
  // Desktop logo height: approximately 44–48px (lg:h-[45px] xl:h-[48px])
  // Tablet: approximately 40–44px (sm:h-[40px] md:h-[44px])
  // Mobile: approximately 32–36px (h-[34px])
  // Footer: grounded presence (h-[46px] sm:h-[52px])
  const heightClasses = isFooter
    ? 'h-[46px] sm:h-[52px] md:h-[56px]'
    : isAbout
    ? 'h-[40px] sm:h-[44px]'
    : isCompact
    ? 'h-[32px]'
    : 'h-[34px] sm:h-[40px] md:h-[44px] lg:h-[45px] xl:h-[48px]';

  return (
    <div
      className={`inline-flex items-center shrink-0 select-none ${className}`}
    >
      <img
        src="/shree_sai_brand_logo.png"
        alt="Shree Sai Developers"
        width={1443}
        height={747}
        className={`${heightClasses} w-auto max-w-full object-contain shrink-0`}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  );
};

// Backwards-compatible export for any legacy references
export const LogoMark = Logo;

