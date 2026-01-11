'use client';

import { useState } from 'react';
import Image from 'next/image';

const metrics = [
  {
    name: 'Mention Rate',
    description: 'Gives an insight into the LLM recall of your brand',
    icon: '/images/Metrics/mention_rate.svg'
  },
  {
    name: 'Citations',
    description: 'An idea into the sources from where LLM is picking you its answers',
    icon: '/images/Metrics/citations.svg'
  },
  {
    name: 'Sentiment',
    description: 'How does LLM perceive your brand',
    icon: '/images/Metrics/sentiment.svg'
  },
  {
    name: 'Rank',
    description: 'Ranking of your brand among your competitors',
    icon: '/images/Metrics/rank.svg'
  },
  {
    name: 'LLM redirects',
    description: 'Number of redirects from LLM',
    icon: '/images/Metrics/llm_redirects.svg'
  },
  {
    name: 'LLM talk score',
    description: 'Number of times llm bots crawled your website in last week',
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
    <section className="w-full bg-black py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main headline */}
        <h2 className="text-white text-4xl md:text-5xl font-light leading-tight mb-4 text-center">
          Learn what you can do for{' '}
          <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent italic">your brand's visibility.</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-16 text-center">
          By improving different metrics
        </p>
        
        {/* Citations Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-start gap-8 mb-20 max-w-6xl mx-auto">
          {/* Quote Icon Box */}
          <div className="flex-shrink-0">
            <div className="relative w-72 h-48 border border-gray-700 flex items-center justify-center">
              {/* Corner dots */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white"></div>
              
              {renderIcon(120)}
            </div>
          </div>
          
          {/* Metric Text */}
          <div className="text-left flex-1">
            <h3 className="text-white text-3xl font-light mb-4 transition-opacity duration-300">
              {metrics[activeMetric]?.name}
            </h3>
            <p className="text-gray-400 text-base max-w-md transition-opacity duration-300">
              {metrics[activeMetric]?.description}
            </p>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className={`relative w-24 h-24 border flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
                activeMetric === index ? 'border-white' : 'border-gray-700 hover:border-gray-500'
              }`}
              onClick={() => setActiveMetric(index)}
            >
              <Image
                src={metric.icon}
                alt={metric.name}
                width={40}
                height={40}
                className="object-contain"
              />
              
              {/* Loader bar */}
              {activeMetric === index && (
                <div 
                  key={`loader-${index}`}
                  className="absolute bottom-0 left-0 h-1 bg-white w-full origin-left animate-loader"
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