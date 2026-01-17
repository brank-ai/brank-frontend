'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Reveal, RotatingText } from '@/components/ui';
import { LandingPageResponse } from '@/types/backend';
import { BRAND_KEY_MAP } from '@/lib/backend';

interface HeroSectionProps {
  brandData?: LandingPageResponse;
}

// Static brand information (logos and names)
const BRAND_INFO = [
  { name: 'Asics', logo: '/images/brand-logos/Asics.svg' },
  { name: 'Coinbase', logo: '/images/brand-logos/Coinbase.svg' },
  { name: 'Cult', logo: '/images/brand-logos/Cult.svg' },
  { name: 'Decathlon', logo: '/images/brand-logos/Decathlon.svg' },
  { name: 'LeetCode', logo: '/images/brand-logos/LeetCode.svg' },
  { name: 'Nothing', logo: '/images/brand-logos/Nothing.svg' },
  { name: 'Zerodha', logo: '/images/brand-logos/Zerodha.svg' },
];

// Mock data as fallback
const MOCK_MENTIONS: Record<string, number> = {
  'Asics': 82,
  'Coinbase': 91,
  'Cult': 78,
  'Decathlon': 65,
  'LeetCode': 88,
  'Nothing': 73,
  'Zerodha': 79,
};

export default function HeroSection({ brandData }: HeroSectionProps) {
  // Merge static brand info with dynamic data from backend
  const brands = BRAND_INFO.map(brand => {
    const backendKey = BRAND_KEY_MAP[brand.name];
    const mentions = brandData?.[backendKey as keyof LandingPageResponse] || MOCK_MENTIONS[brand.name] || 0;
    return {
      ...brand,
      mentions: Math.round(mentions),
    };
  });
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [brandName, setBrandName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brandName.trim()) {
      const brand = brandName.trim();
      
      // Fire-and-forget prefetch to warm backend cache
      fetch(`/api/prefetch-metric?website=${encodeURIComponent(brand)}`).catch(() => {
        // Silently ignore prefetch errors
      });
      
      router.push(`/progress?brand=${encodeURIComponent(brand)}`);
    }
  };

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-black">
      {/* Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-8 md:px-16 lg:px-24 pb-32">
        <div className="w-full flex flex-col items-center">
          {/* Search Bar - White border with search icon */}
          <Reveal trigger="mount" variant="fadeIn" duration={2.0} initiallyVisible={false}>
            <form
              onSubmit={handleSubmit}
              className="flex items-center border-2 border-white rounded-full mb-8 sm:mb-10 md:mb-12 w-[95%] sm:w-[500px] md:w-[650px] lg:w-[800px] xl:w-[900px]"
            >
              <input
                type="text"
                placeholder="Get Brank's analysis of your brand."
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-white placeholder-white/70 pl-4 sm:pl-6 md:pl-8 pr-2 py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl lg:text-2xl focus:outline-none"
              />
              <button 
                type="submit"
                className="pr-3 sm:pr-5 md:pr-6 flex items-center shrink-0 hover:opacity-80 transition-opacity"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </form>
          </Reveal>

          {/* Main Headline - Centered with serif font */}
          <Reveal trigger="mount" variant="fadeUp" delay={0.25} duration={2.0} y={16} initiallyVisible={false}>
            <div className="text-center">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-[2.75rem] lg:text-[3.375rem] font-normal leading-relaxed text-white flex flex-wrap items-center justify-center gap-2 md:gap-3">
                <span>Track your brand across</span>
                <RotatingText 
                  texts={['ChatGPT', 'Gemini', 'Grok', 'Perplexity']}
                  rotationInterval={2500}
                  className="font-serif text-2xl sm:text-3xl md:text-[2.75rem] lg:text-[3.375rem]"
                />
              </h1>
            </div>
          </Reveal>
        </div>
      </div>


      {/* Brand Scroll Marquee */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 py-3 sm:py-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredBrand(null);
        }}
      >
        <div
          className={`flex items-center gap-8 sm:gap-16 ${isPaused ? 'animate-pause' : 'animate-marquee'}`}
          style={{ width: 'max-content' }}
        >
          {/* Render brands 4 times for seamless infinite loop */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="relative flex items-center gap-2 sm:gap-3 cursor-pointer group"
              onMouseEnter={() => setHoveredBrand(`${brand.name}-${index}`)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              {/* Tooltip */}
              {hoveredBrand === `${brand.name}-${index}` && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 sm:mb-8 animate-fadeIn z-50">
                  <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-lg px-4 py-3 sm:px-5 sm:py-4 border border-white/20 shadow-2xl shadow-black/50 w-[260px] sm:w-[320px] flex items-center">
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-[#00FFBB]/10 blur-xl -z-10" />

                    <p className="text-white/90 text-xs sm:text-sm leading-snug text-center line-clamp-2 w-full">
                      Out of 100 user prompts LLMs recall{' '}
                      <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent font-bold">
                        {brand.name}
                      </span>
                      {' '}{brand.mentions} times
                    </p>

                    {/* Tooltip arrow */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-white/20" />
                  </div>
                </div>
              )}

              {/* Brand Logo */}
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-6 sm:h-10 w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Percentage */}
              <span className="text-white/70 text-xs sm:text-sm font-medium group-hover:text-white transition-colors whitespace-nowrap">
                {brand.mentions}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
