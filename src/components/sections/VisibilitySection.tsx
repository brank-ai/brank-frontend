'use client';

import { useState } from 'react';
import Image from 'next/image';

const metrics = [
  {
    name: 'Mention Rate',
    description: 'See how often leading LLMs mention your brand in their responses.',
    improvement: 'Brank automatically publishes high-signal content and structured knowledge that LLMs are most likely to ingest, increasing brand mentions over time.',
    icon: '/images/Metrics/mention_rate.svg'
  },
  {
    name: 'Citations',
    description: 'Discover which sources LLMs rely on when generating answers in your category.',
    improvement: 'Brank identifies citation gaps and guides your brand to publish and distribute content in sources LLMs frequently reference.',
    icon: '/images/Metrics/citations.svg'
  },
  {
    name: 'Sentiment',
    description: 'Understand whether LLMs perceive your brand positively, neutrally, or negatively.',
    improvement: 'Brank analyzes sentiment drivers and recommends content and messaging changes that improve how LLMs describe your brand.',
    icon: '/images/Metrics/sentiment.svg'
  },
  {
    name: 'Rank',
    description: 'Track where your brand appears in LLM-generated recommendations.',
    improvement: 'Brank\'s AI agents continuously optimize your brand\'s authority signals to move you higher in LLM rankings.',
    icon: '/images/Metrics/rank.svg'
  },
  {
    name: 'LLM Redirects',
    description: 'See how many users reach your website through LLM-generated answers.',
    improvement: 'Brank increases LLM-driven traffic by ensuring your brand is the recommended destination in AI answers—through stronger citations, higher ranking, clearer brand attribution, and linkable reference content that LLMs are more likely to surface.',
    icon: '/images/Metrics/llm_redirects.svg'
  },
  {
    name: 'LLM Crawls',
    description: 'Monitor how frequently AI bots crawl your website over the last 7 days.',
    improvement: 'Brank improves crawlability through structured content, freshness signals, and AI-friendly publishing workflows.',
    icon: '/images/Metrics/llm_talk_score.svg'
  }
];

export default function VisibilitySection() {
  const [activeMetric, setActiveMetric] = useState(0);

  const handleLoaderComplete = () => {
    setActiveMetric((prev) => (prev + 1) % metrics.length);
  };

  const renderIcon = (size: number = 120) => {
    const currentMetric = metrics[activeMetric];
    if (!currentMetric) return null;
    
    return (
      <Image
        src={currentMetric.icon}
        alt={currentMetric.name}
        width={size}
        height={size}
        className="object-contain"
      />
    );
  };

  return (
    <section className="w-full bg-black py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main headline */}
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-3 sm:mb-4 text-center">
          Learn what you can do for{' '}
          <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent italic">your brand's visibility.</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-10 sm:mb-12 md:mb-16 text-center">
          By improving different metrics
        </p>
        
        {/* Citations Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-start gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20 max-w-6xl mx-auto">
          {/* Quote Icon Box */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-32 sm:w-60 sm:h-40 md:w-72 md:h-48 border border-gray-700 flex items-center justify-center">
              {/* Corner dots */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white"></div>
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white"></div>
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white"></div>
              
              <div className="block sm:hidden">{renderIcon(80)}</div>
              <div className="hidden sm:block md:hidden">{renderIcon(100)}</div>
              <div className="hidden md:block">{renderIcon(120)}</div>
            </div>
          </div>
          
          {/* Metric Text */}
          <div className="text-left flex-1 min-h-[280px] sm:min-h-[260px] md:min-h-[240px]">
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-light mb-3 sm:mb-4 transition-opacity duration-300">
              {metrics[activeMetric]?.name}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 transition-opacity duration-300">
              {metrics[activeMetric]?.description}
            </p>
            
            <h4 className="text-white text-sm sm:text-base font-bold mb-2 sm:mb-3 transition-opacity duration-300">
              How <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent">Brank</span> improves this:
            </h4>
            <p className="text-gray-400 text-sm sm:text-base transition-opacity duration-300">
              {metrics[activeMetric]?.improvement}
            </p>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
                activeMetric === index ? 'border-white' : 'border-gray-700 hover:border-gray-500'
              }`}
              onClick={() => setActiveMetric(index)}
            >
              <Image
                src={metric.icon}
                alt={metric.name}
                width={24}
                height={24}
                className="object-contain sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10"
              />
              
              {/* Loader bar */}
              {activeMetric === index && (
                <div 
                  key={`loader-${index}`}
                  className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-white w-full origin-left animate-loader"
                  onAnimationEnd={handleLoaderComplete}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}