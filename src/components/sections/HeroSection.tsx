'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/ui';

const brands = [
  { name: 'Asics', logo: '/images/brand-logos/Asics.svg', mentions: 82, citations: 76 },
  { name: 'Coinbase', logo: '/images/brand-logos/Coinbase.svg', mentions: 91, citations: 85 },
  { name: 'Cult', logo: '/images/brand-logos/Cult.svg', mentions: 78, citations: 72 },
  { name: 'Decathlon', logo: '/images/brand-logos/Decathlon.svg', mentions: 65, citations: 58 },
  { name: 'LeetCode', logo: '/images/brand-logos/LeetCode.svg', mentions: 88, citations: 81 },
  { name: 'Nothing', logo: '/images/brand-logos/Nothing.svg', mentions: 73, citations: 69 },
  { name: 'Zerodha', logo: '/images/brand-logos/Zerodha.svg', mentions: 79, citations: 74 },
];

export default function HeroSection() {
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
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-section-min.jpg')`
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black z-10" />

      {/* Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-8 md:px-16 lg:px-24 pb-32">
        {/* Main Headline - Centered with serif font */}
        <Reveal trigger="mount" variant="fadeIn" duration={2.0} initiallyVisible={false}>
          <div className="mb-6 max-w-4xl text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-normal leading-tight text-white">
              Measure and improve how
            </h1>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-normal leading-tight">
              <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent italic">AI recommends</span>
              <span className="text-white"> your brand.</span>
            </h1>
          </div>
        </Reveal>

        {/* Search Bar - Dark style with cyan arrow */}
        <Reveal trigger="mount" variant="fadeUp" delay={0.25} duration={2.0} y={16} initiallyVisible={false}>
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden w-full max-w-md md:max-w-2xl lg:max-w-6xl border border-white/10"
          >
            <input
              type="text"
              placeholder="Search your brand"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-400 px-2.5 py-2 sm:px-5 sm:py-3 text-[16px] leading-6 focus:outline-none"
            />
            <button 
              type="submit"
              className="shrink-0 bg-transparent text-gray-400 px-2.5 py-2 sm:px-4 sm:py-3 hover:[&>svg]:stroke-[url(#arrowGradient)] transition-all duration-150 group active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5 stroke-current group-hover:stroke-[#00FFBB]" strokeWidth="2">
                <defs>
                  <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#00FFBB', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#00B7FF', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path d="M5 12h14M12 5l7 7-7 7" className="group-hover:stroke-[url(#arrowGradient)]" />
              </svg>
            </button>
          </form>
        </Reveal>
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
                  <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 border border-white/20 min-w-[90px] sm:min-w-[110px] shadow-2xl shadow-black/50">
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-[#00FFBB]/10 blur-xl -z-10" />

                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <div className="flex items-center justify-between gap-2 sm:gap-4">
                        <span className="text-white/60 text-[10px] sm:text-xs">Mentions</span>
                        <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent text-xs sm:text-sm font-bold">{brand.mentions}%</span>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="flex items-center justify-between gap-2 sm:gap-4">
                        <span className="text-white/60 text-[10px] sm:text-xs">Citations</span>
                        <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent text-xs sm:text-sm font-bold">{brand.citations}%</span>
                      </div>
                    </div>

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
