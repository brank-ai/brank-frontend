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

// Insightful phrases for each metric
const mentionPhrases = [
  'Trending in AI conversations',
  'Frequently recommended',
  'Top-of-mind for users',
  'Highly discussed brand',
  'Rising in AI visibility',
  'Gaining momentum fast',
  'Dominating discussions',
];

const citationPhrases = [
  'Cited as industry leader',
  'Referenced as top choice',
  'Trusted source in AI',
  'Go-to recommendation',
  'Preferred by AI models',
  'Consistently referenced',
  'Authority in category',
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

const scorePhrases = [
  'Outperforming competitors',
  'Category frontrunner',
  'Above industry average',
  'Strong market position',
  'Leading the pack',
  'Top-tier performance',
  'Exceptional visibility',
];

interface BrandInsight {
  phrase: string;
  percent: number;
}

interface BrandInsights {
  mentions: BrandInsight;
  citations: BrandInsight;
  sentiment: BrandInsight;
  score: BrandInsight;
}

// Desktop Ticker Item - hover to expand, click to navigate
function DesktopTickerItem({ logo }: { logo: { name: string; src: string } }) {
  const router = useRouter();
  const [insights, setInsights] = useState<BrandInsights>({
    mentions: { phrase: '', percent: 0 },
    citations: { phrase: '', percent: 0 },
    sentiment: { phrase: '', percent: 0 },
    score: { phrase: '', percent: 0 },
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
      citations: {
        phrase: getRandomPhrase(citationPhrases),
        percent: Math.floor(Math.random() * 25) + 70,
      },
      sentiment: {
        phrase: getRandomPhrase(sentimentPhrases),
        percent: Math.floor(Math.random() * 20) + 75,
      },
      score: {
        phrase: getRandomPhrase(scorePhrases),
        percent: Math.floor(Math.random() * 25) + 72,
      },
    });
  }, []);

  const handleClick = () => {
    router.push(`/progress?brand=${encodeURIComponent(logo.name)}`);
  };

  return (
    <div
      className="relative flex items-center justify-center shrink-0 h-36 px-4 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        width: isHovered ? '320px' : '160px',
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
          absolute inset-x-0 inset-y-0
          bg-bg-surface
          border border-subtle
          rounded-xl
          shadow-soft-tile-sm hover:shadow-soft-tile
          flex flex-col items-start justify-center
          px-4 py-2
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
      >
        {/* Left accent LED indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue-700" />

        {/* Small Logo at Top */}
        <div className="relative w-full h-5 mb-1.5 shrink-0 z-10">
          <Image src={logo.src} alt={logo.name} fill className="object-contain" />
        </div>

        {/* Insights List */}
        <div className="w-full flex flex-col gap-1 z-10 pl-2">
          <p className="text-xs leading-relaxed text-left">
            <span className="font-semibold text-brand-blue-500">{insights.mentions.percent}%</span>
            <span className="text-text-muted"> Mentions</span>
            <span className="text-text-secondary"> · {insights.mentions.phrase}</span>
          </p>
          <p className="text-xs leading-relaxed text-left">
            <span className="font-semibold text-brand-blue-500">{insights.citations.percent}%</span>
            <span className="text-text-muted"> Citations</span>
            <span className="text-text-secondary"> · {insights.citations.phrase}</span>
          </p>
          <p className="text-xs leading-relaxed text-left">
            <span className="font-semibold text-brand-blue-500">{insights.sentiment.percent}%</span>
            <span className="text-text-muted"> Sentiment</span>
            <span className="text-text-secondary"> · {insights.sentiment.phrase}</span>
          </p>
          <p className="text-xs leading-relaxed text-left">
            <span className="font-semibold text-brand-blue-500">{insights.score.percent}%</span>
            <span className="text-text-muted"> Score</span>
            <span className="text-text-secondary"> · {insights.score.phrase}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Mobile Card - always expanded, full width, 25vh height, click to navigate
function MobileCard({ logo }: { logo: { name: string; src: string } }) {
  const router = useRouter();
  const [insights, setInsights] = useState<BrandInsights>({
    mentions: { phrase: '', percent: 0 },
    citations: { phrase: '', percent: 0 },
    sentiment: { phrase: '', percent: 0 },
    score: { phrase: '', percent: 0 },
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
      citations: {
        phrase: getRandomPhrase(citationPhrases),
        percent: Math.floor(Math.random() * 25) + 70,
      },
      sentiment: {
        phrase: getRandomPhrase(sentimentPhrases),
        percent: Math.floor(Math.random() * 20) + 75,
      },
      score: {
        phrase: getRandomPhrase(scorePhrases),
        percent: Math.floor(Math.random() * 25) + 72,
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
        w-[calc(100vw-2rem)] shrink-0
        h-[25vh] min-h-[140px]
        bg-bg-surface
        border border-subtle
        rounded-xl
        shadow-soft-tile-sm active:shadow-soft-tile
        flex flex-col justify-center
        px-5 py-4
        cursor-pointer
        relative
        overflow-hidden
        active:scale-[0.98]
        transition-transform duration-150
      "
    >
      {/* Left accent LED indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue-700 rounded-l-xl" />

      {/* Logo */}
      <div className="relative w-full h-8 mb-3 shrink-0">
        <Image src={logo.src} alt={logo.name} fill className="object-contain" />
      </div>

      {/* Insights List */}
      <div className="w-full flex flex-col gap-2 pl-3">
        <p className="text-sm leading-relaxed text-left">
          <span className="font-semibold text-brand-blue-500">{insights.mentions.percent}%</span>
          <span className="text-text-muted"> Mentions</span>
          <span className="text-text-secondary"> · {insights.mentions.phrase}</span>
        </p>
        <p className="text-sm leading-relaxed text-left">
          <span className="font-semibold text-brand-blue-500">{insights.citations.percent}%</span>
          <span className="text-text-muted"> Citations</span>
          <span className="text-text-secondary"> · {insights.citations.phrase}</span>
        </p>
        <p className="text-sm leading-relaxed text-left">
          <span className="font-semibold text-brand-blue-500">{insights.sentiment.percent}%</span>
          <span className="text-text-muted"> Sentiment</span>
          <span className="text-text-secondary"> · {insights.sentiment.phrase}</span>
        </p>
        <p className="text-sm leading-relaxed text-left">
          <span className="font-semibold text-brand-blue-500">{insights.score.percent}%</span>
          <span className="text-text-muted"> Score</span>
          <span className="text-text-secondary"> · {insights.score.phrase}</span>
        </p>
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
            ...logos, ...logos, ...logos, ...logos,
            ...logos, ...logos, ...logos, ...logos,
            ...logos, ...logos, ...logos, ...logos
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
