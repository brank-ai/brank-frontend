'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Reveal, RotatingText } from '@/components/ui';
import LogoTicker from '@/components/ui/LogoTicker';
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
    <section className="relative min-h-screen w-full overflow-hidden bg-bg-base">
      {/* Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="w-full flex flex-col items-center relative translate-y-16">
          {/* Main Headline - Positioned absolutely above the search bar */}
          <div className="absolute bottom-full w-full flex flex-col items-center mb-10 sm:mb-14 md:mb-18">
            {/* Animated Logo */}
            <Reveal trigger="mount" variant="fadeUp" delay={0.1} duration={2.0} y={16} initiallyVisible={false}>
              <div className="mb-2 sm:mb-4">
                 <div
                   className="
                     w-32 h-12 sm:w-48 sm:h-16 md:w-64 md:h-20
                     bg-[linear-gradient(to_right,white_0%,white_45%,#22c55e_49%,#22c55e_51%,white_55%,white_100%)]
                     bg-[length:400%_auto]
                     animate-shine-wave-slow
                   "
                   style={{
                     maskImage: 'url(/images/brank-logo.svg)',
                     maskRepeat: 'no-repeat',
                     maskPosition: 'center',
                     maskSize: 'contain',
                     WebkitMaskImage: 'url(/images/brank-logo.svg)',
                     WebkitMaskRepeat: 'no-repeat',
                     WebkitMaskPosition: 'center',
                     WebkitMaskSize: 'contain'
                   }}
                 />
              </div>
            </Reveal>

            <Reveal trigger="mount" variant="fadeUp" delay={0.25} duration={2.0} y={16} initiallyVisible={false}>
              <div className="w-full sm:w-[500px] md:w-[650px] lg:w-[800px] xl:w-[900px] overflow-visible">
                <h1 className="font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-text-primary flex flex-col sm:flex-row sm:items-center items-center gap-2 md:gap-3 sm:pl-24 md:pl-32 lg:pl-40 overflow-visible">
                  <span className="shrink-0 text-glow">Track your brand across</span>
                  <RotatingText
                    items={[
                      { name: 'ChatGPT', logo: '/images/LLMs/chatgpt.svg' },
                      { name: 'Gemini', logo: '/images/LLMs/gemini.svg' },
                      { name: 'Grok', logo: '/images/LLMs/grok.svg' },
                      { name: 'Perplexity', logo: '/images/LLMs/perplexity.svg' },
                    ]}
                    rotationInterval={2500}
                    className="font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl"
                  />
                </h1>
              </div>
            </Reveal>
          </div>

          {/* Search Bar - Deep Field (Depressed) Style */}
          <Reveal trigger="mount" variant="fadeIn" duration={2.0} initiallyVisible={false}>
            <form
              onSubmit={handleSubmit}
              className="
                flex items-center
                rounded-full
                w-[85vw] sm:w-[500px] md:w-[650px] lg:w-[800px] xl:w-[900px]
                bg-bg-surface
                shadow-soft-tile-sm
                border border-subtle
              "
            >
              <input
                type="text"
                placeholder="Get Brank's analysis of your brand."
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="
                  flex-1 min-w-0
                  bg-transparent
                  text-text-primary/80
                  placeholder-text-subtle
                  pl-[5%] pr-2
                  py-2 text-sm
                  sm:py-3 md:py-4
                  sm:text-base md:text-lg lg:text-xl
                  font-sans
                  focus:outline-none
                "
              />
              <button
                type="submit"
                className="
                  pr-3 sm:pr-5 md:pr-6
                  flex items-center shrink-0
                  text-text-muted
                  hover:text-text-primary
                  transition-colors duration-300
                "
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </form>
          </Reveal>

          {/* Logo Ticker - Infinite scroll of trusted brands */}
          <Reveal trigger="mount" variant="fadeIn" delay={0.5} duration={2.0} initiallyVisible={false}>
            <div className="w-full mt-6 sm:mt-8 md:mt-10">
              <LogoTicker />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
