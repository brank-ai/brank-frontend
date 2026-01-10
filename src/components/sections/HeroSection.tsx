'use client';

import { useState } from 'react';

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

  return (
    <section className="relative h-[calc(100vh-12rem)] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-section-min.jpg')`
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />

      {/* Content - Left aligned */}
      <div className="relative z-10 flex flex-col items-start justify-start px-8 md:px-16 lg:px-24 pt-32">
        {/* Main Headline - 2 lines */}
        <div className="mb-4 max-w-2xl">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
            Measure and improve how
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
            <span className="text-teal-400 italic">AI recommends</span>
            <span className="text-white"> your brand.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-gray-300 text-base md:text-lg mb-6 max-w-md">
          Track and improve how AI surfaces your brand.
        </p>

        {/* Search Bar - Dark style with teal arrow */}
        <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden w-full max-w-sm">
          <input
            type="text"
            placeholder="What's your brand?"
            className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 text-sm focus:outline-none"
          />
          <button className="bg-transparent text-teal-400 px-4 py-3 hover:text-teal-300 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>


      {/* Brand Scroll Marquee */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 py-4 bg-black/50"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredBrand(null);
        }}
      >
        <div
          className={`flex items-center gap-16 ${isPaused ? 'animate-pause' : 'animate-marquee'}`}
          style={{ width: 'max-content' }}
        >
          {/* Render brands 4 times for seamless infinite loop */}
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="relative flex items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setHoveredBrand(`${brand.name}-${index}`)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              {/* Tooltip */}
              {hoveredBrand === `${brand.name}-${index}` && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white/10 backdrop-blur-xl rounded-xl px-5 py-4 border border-white/30 min-w-[160px] animate-fadeIn z-50 shadow-lg shadow-black/20">
                  <div className="text-white text-base font-medium mb-3 text-center">{brand.name}</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-white/60">Mentions</span>
                      <span className="text-white font-semibold">{brand.mentions}%</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-white/60">Citations</span>
                      <span className="text-white font-semibold">{brand.citations}%</span>
                    </div>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/10" />
                </div>
              )}

              {/* Brand Logo */}
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Brand Name (fallback) + Percentage */}
              <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors whitespace-nowrap">
                {brand.mentions}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
