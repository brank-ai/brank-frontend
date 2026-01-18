'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Reveal, RotatingText } from '@/components/ui';
import { LandingPageResponse } from '@/types/backend';

interface HeroSectionProps {
  brandData?: LandingPageResponse;
}

export default function HeroSection({ brandData }: HeroSectionProps) {
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
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-24">
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
    </section>
  );
}
