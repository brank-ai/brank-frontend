'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

// ------------------------------------------------------------------
// ICON OPTION 1: MINIMAL MONOCHROME (Active)
// Clean, high-end, matches the dark theme aesthetic.
// ------------------------------------------------------------------

const MentionsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Network Nodes */}
    <circle cx="6" cy="7" r="2" />
    <circle cx="12" cy="5" r="2" />
    <circle cx="8" cy="13" r="2" />

    {/* Connections */}
    <path d="M7.5 6.5L10.5 5.5" className="opacity-70" />
    <path d="M6.5 8.5L7.5 11.5" className="opacity-70" />
    <path d="M12 7L9 12" className="opacity-50" />

    {/* Data Decor - Top Right */}
    <path d="M17 5h4" className="opacity-50" />
    <path d="M17 8h3" className="opacity-50" />

    {/* Search Lens Overlay */}
    <path d="M15 15l6 6" strokeWidth="2" />
    <circle cx="14" cy="14" r="5" />
  </svg>
);

const SentimentIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Heart Icon - Top Right */}
    <path
      d="M15.5 5.5C14 5.5 13.5 7 13.5 7S13 5.5 11.5 5.5C10 5.5 9.5 7.5 9.5 8.5c0 2 4 4.5 4 4.5s4-2.5 4-4.5c0-1-.5-3-2-3z"
      fill="currentColor"
      fillOpacity="0.1"
    />

    {/* Analysis Lines */}
    <path d="M4 6h3" className="opacity-50" />
    <path d="M4 9h2" className="opacity-50" />

    {/* Wave Graph */}
    <path d="M3 15c3 0 5-4 9-4s6 6 9 2" />

    {/* Graph Dots */}
    <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="21" cy="13" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const GeoSearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Compass Body */}
    <circle cx="12" cy="10" r="6" />

    {/* Compass Needle (Star) */}
    <path
      d="M12 7l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"
      fill="currentColor"
      fillOpacity="0.2"
      strokeLinejoin="miter"
    />

    {/* Search Bar Container */}
    <rect x="4" y="18" width="16" height="4" rx="2" />

    {/* Search Detail */}
    <path d="M7 20h6" className="opacity-50" />
    <circle cx="17" cy="20" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const AIReadinessIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Brain Circuit Outline */}
    <path d="M6 10c0-3 2-5 6-5 2.5 0 4.5 1.5 5 3.5.5 1.5 1 2 1 4.5" />
    <path d="M6 10c-1.5.5-2 2-2 4 0 2.5 1.5 4 4 4h2" />

    {/* Neural Nodes */}
    <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="13" cy="9" r="1" fill="currentColor" stroke="none" />
    <circle cx="10" cy="15" r="1" fill="currentColor" stroke="none" />

    {/* Synapse Connections */}
    <path d="M9 11l4-2" className="opacity-60" />
    <path d="M9 11l1 4" className="opacity-60" />
    <path d="M13 9l-3 6" className="opacity-60" />

    {/* Checkmark Badge */}
    <circle
      cx="17"
      cy="17"
      r="4"
      fill="currentColor"
      className="text-bg-surface"
      stroke="none"
    />
    <circle cx="17" cy="17" r="4" />
    <path d="M15.5 17l1 1 2.5-2.5" />
  </svg>
);

const mentionPhrases = [
  'Trending in AI conversations',
  'Frequently recommended',
  'Top-of-mind for users',
  'Highly discussed brand',
  'Rising in AI visibility',
  'Gaining momentum fast',
  'Dominating discussions',
];

const sentimentPhrases = [
  'Overwhelmingly positive',
  'Strong brand affinity',
  'Highly favorable tone',
  'Trusted & respected',
  'Positive perception',
  'Well-regarded brand',
  'Excellent reputation',
];

interface BrandInsight {
  phrase: string;
  percent: number;
}

interface BrandInsights {
  mentions: BrandInsight;
  sentiment: BrandInsight;
}

// Desktop Ticker Item - hover to expand, click to navigate
function DesktopTickerItem({ logo }: { logo: { name: string; src: string } }) {
  const router = useRouter();
  const [insights, setInsights] = useState<BrandInsights>({
    mentions: { phrase: '', percent: 0 },
    sentiment: { phrase: '', percent: 0 },
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getRandomPhrase = (phrases: readonly string[]): string => {
      const index = Math.floor(Math.random() * phrases.length);
      return phrases[index] ?? '';
    };

    setInsights({
      mentions: {
        phrase: getRandomPhrase(mentionPhrases),
        percent: Math.floor(Math.random() * 25) + 65,
      },
      sentiment: {
        phrase: getRandomPhrase(sentimentPhrases),
        percent: Math.floor(Math.random() * 20) + 75,
      },
    });
  }, []);

  const handleClick = () => {
    router.push(`/progress?brand=${encodeURIComponent(logo.name)}`);
  };

  return (
    <div
      className="relative flex items-center justify-center shrink-0 h-40 px-4 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        width: isHovered ? '280px' : '160px',
        transition: 'width 0.5s cubic-bezier(0.2, 0, 0.2, 1)',
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
        <div className="relative w-full h-16 grayscale opacity-40 transition-all duration-300">
          <Image
            src={logo.src}
            alt={`${logo.name} logo`}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Expanded Card View */}
      <div
        className={`
          absolute inset-0
          bg-bg-surface
          border border-white/10
          rounded-xl
          shadow-xl hover:shadow-2xl
          flex flex-col items-center justify-center
          px-4 py-2
          transition-all duration-500
          overflow-hidden
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.94] pointer-events-none'}
        `}
        style={{
          transitionTimingFunction: isHovered
            ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Overshoot
            : 'cubic-bezier(0.4, 0, 0.2, 1)', // Standard ease-out
        }}
      >
        {/* Small Logo at Top */}
        <div className="relative w-full h-5 mb-3 shrink-0 z-10">
          <Image
            src={logo.src}
            alt={logo.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Horizontal Metrics */}
        <div className="w-full grid grid-cols-2 gap-2 z-10 border-t border-white/5 pt-3">
          {/* Mentions */}
          <div className="flex flex-col items-center justify-center gap-1.5 border-r border-white/5">
            <MentionsIcon className="w-8 h-8 text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.6)]" />
            <div className="flex flex-col items-center">
              <span className="font-semibold text-lg text-text-primary tabular-nums">
                {insights.mentions.percent}%
              </span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-medium">
                Mentions
              </span>
            </div>
          </div>

          {/* Sentiment */}
          <div className="flex flex-col items-center justify-center gap-1.5">
            <SentimentIcon className="w-8 h-8 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.6)]" />
            <div className="flex flex-col items-center">
              <span className="font-semibold text-lg text-text-primary tabular-nums">
                {insights.sentiment.percent}%
              </span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-medium">
                Sentiment
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Card - updated to match desktop style
function MobileCard({ logo }: { logo: { name: string; src: string } }) {
  const router = useRouter();
  const [insights, setInsights] = useState<BrandInsights>({
    mentions: { phrase: '', percent: 0 },
    sentiment: { phrase: '', percent: 0 },
  });

  useEffect(() => {
    const getRandomPhrase = (phrases: readonly string[]): string => {
      const index = Math.floor(Math.random() * phrases.length);
      return phrases[index] ?? '';
    };

    setInsights({
      mentions: {
        phrase: getRandomPhrase(mentionPhrases),
        percent: Math.floor(Math.random() * 25) + 65,
      },
      sentiment: {
        phrase: getRandomPhrase(sentimentPhrases),
        percent: Math.floor(Math.random() * 20) + 75,
      },
    });
  }, []);

  const handleClick = () => {
    router.push(`/progress?brand=${encodeURIComponent(logo.name)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        w-[calc(100vw-4rem)] sm:w-[320px] shrink-0
        h-auto
        bg-bg-surface
        border border-white/10
        rounded-xl
        shadow-lg active:shadow-xl
        flex flex-col items-center justify-center
        p-5
        cursor-pointer
        relative
        overflow-hidden
        active:scale-[0.98]
        transition-all duration-300
      "
    >
      {/* Logo */}
      <div className="relative w-full h-8 mb-5 shrink-0">
        <Image src={logo.src} alt={logo.name} fill className="object-contain" />
      </div>

      {/* Horizontal Metrics */}
      <div className="w-full grid grid-cols-2 gap-4 border-t border-white/5 pt-5">
        {/* Mentions */}
        <div className="flex flex-col items-center justify-center gap-2 border-r border-white/5">
          <MentionsIcon className="w-7 h-7 text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.6)] mr-[4px]" />
          <div className="flex flex-col items-center">
            <span className="font-semibold text-xl text-text-primary tabular-nums">
              {insights.mentions.percent}%
            </span>
            <span className="text-[11px] text-text-muted uppercase tracking-wider font-medium">
              Mentions
            </span>
          </div>
        </div>

        {/* Sentiment */}
        <div className="flex flex-col items-center justify-center gap-2">
          <SentimentIcon className="w-8 h-8 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.6)] mr-[2px]" />
          <div className="flex flex-col items-center">
            <span className="font-semibold text-xl text-text-primary tabular-nums">
              {insights.sentiment.percent}%
            </span>
            <span className="text-[11px] text-text-muted uppercase tracking-wider font-medium">
              Sentiment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LogoTicker() {
  return (
    <>
      {/* Desktop Ticker - hidden on mobile */}
      <div className="hidden md:block w-full relative overflow-hidden group">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-bg-base to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-bg-base to-transparent pointer-events-none" />

        {/* Scrolling container */}
        <div className="flex w-fit animate-marquee group-hover:paused items-center gap-16">
          {[
            ...logos,
            ...logos,
            ...logos,
            ...logos,
            ...logos,
            ...logos,
            ...logos,
            ...logos,
            ...logos,
            ...logos,
            ...logos,
            ...logos,
          ].map((logo, index) => (
            <DesktopTickerItem key={`${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>

      {/* Mobile Ticker - visible only on mobile */}
      <div className="md:hidden w-full relative overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-bg-base to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-bg-base to-transparent pointer-events-none" />

        {/* Scrolling container */}
        <div className="flex w-fit animate-marquee items-center gap-4 py-2">
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <MobileCard key={`mobile-${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </>
  );
}
