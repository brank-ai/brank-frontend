'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const logos = [
  { name: 'Asics', src: '/images/brand-logos/Asics.svg' },
  { name: 'Coinbase', src: '/images/brand-logos/Coinbase.svg' },
  { name: 'Cult', src: '/images/brand-logos/Cult.svg' },
  { name: 'Decathlon', src: '/images/brand-logos/Decathlon.svg' },
  { name: 'LeetCode', src: '/images/brand-logos/LeetCode.svg' },
  { name: 'Nothing', src: '/images/brand-logos/Nothing.svg' },
  { name: 'Zerodha', src: '/images/brand-logos/Zerodha.svg' },
];

function TickerItem({ logo }: { logo: { name: string; src: string } }) {
  const [stats, setStats] = useState({ mentions: 0, citations: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Generate random stats on mount to avoid hydration mismatch
  useEffect(() => {
    setStats({
      mentions: Math.floor(Math.random() * 29) + 71, // 71% to 99%
      citations: Math.floor(Math.random() * 29) + 71, // 71% to 99%
    });
  }, []);

  return (
    <div
      className="relative flex items-center justify-center shrink-0 h-20 sm:h-24 md:h-28 px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: isHovered ? '240px' : '160px',
        transition: 'width 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
      }}
    >
      {/* Default Logo View */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${isHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
        `}
      >
        <div className="relative w-full h-12 sm:h-14 md:h-16 grayscale opacity-40 transition-all duration-300">
          <Image
            src={logo.src}
            alt={`${logo.name} logo`}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Expanded Card View - Volumetric Design */}
      <div
        className={`
          absolute inset-y-0 inset-x-0
          bg-bg-surface
          border border-subtle
          rounded-xl
          shadow-soft-tile-sm hover:shadow-soft-tile
          flex flex-col items-center justify-center
          p-4
          transition-all duration-300 ease-in-out
          overflow-hidden
          group/card
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        {/* Volumetric Accents (from MetricCard) */}
        {/* Left accent LED indicator */}
        <div
          className="
            absolute left-0 top-0 bottom-0 w-1
            bg-green-500
            shadow-glow-green
          "
        />

        {/* Subtle grid pattern texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '16px 16px',
            backgroundPosition: 'center',
          }}
        />

        {/* Small Logo at Top */}
        <div className="relative w-full h-8 mb-3 shrink-0 z-10">
          <Image
            src={logo.src}
            alt={logo.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-2 text-center z-10">
          <div className="flex flex-col items-center p-1.5 bg-bg-base/50 rounded-lg border border-subtle/50">
            <span className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Mentions</span>
            <span className="text-sm font-medium text-text-primary text-glow">{stats.mentions}%</span>
          </div>
          <div className="flex flex-col items-center p-1.5 bg-bg-base/50 rounded-lg border border-subtle/50">
            <span className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Citations</span>
            <span className="text-sm font-medium text-text-primary text-glow">{stats.citations}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LogoTicker() {
  return (
    <div className="w-full relative overflow-hidden group">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-gradient-to-r from-bg-base to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-gradient-to-l from-bg-base to-transparent pointer-events-none" />

      {/* 
        Container with pause on hover.
        Using group-hover:animate-pause on the scrolling container to stop movement 
        when the user hovers anywhere over the ticker section.
      */}
      <div className="flex w-fit animate-marquee group-hover:animate-pause items-center gap-8 sm:gap-12 md:gap-16">
        {[
          ...logos, ...logos, ...logos, ...logos,
          ...logos, ...logos, ...logos, ...logos,
          ...logos, ...logos, ...logos, ...logos
        ].map((logo, index) => (
          <TickerItem key={`${logo.name}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}
