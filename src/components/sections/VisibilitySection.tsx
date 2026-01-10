'use client';

import { useState, useEffect } from 'react';

const metrics = [
  {
    name: 'Mention Rate',
    description: 'Gives an insight into the LLM recall of your brand',
    icon: 'quote'
  },
  {
    name: 'Citations',
    description: 'An idea into the sources from where LLM is picking you its answers',
    icon: 'heart'
  },
  {
    name: 'Sentiment',
    description: 'How does LLM perceive your brand',
    icon: 'at'
  },
  {
    name: 'Rank',
    description: 'Ranking of your brand among your competitors',
    icon: 'eye'
  },
  {
    name: 'LLM redirects',
    description: 'Number of redirects from LLM',
    icon: 'chart'
  },
  {
    name: 'LLM talk score',
    description: 'Number of times llm bots crawled your website in last week',
    icon: 'star'
  }
];

export default function VisibilitySection() {
  const [activeMetric, setActiveMetric] = useState(0);

  const handleLoaderComplete = () => {
    setActiveMetric((prev) => (prev + 1) % metrics.length);
  };

  const renderIcon = (size: number = 120) => {
    switch (activeMetric) {
      case 0: // Quote
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M14.017 21v-7.391c0-1.188.09-2.344.273-3.468.184-1.125.461-2.172.832-3.142C15.493 6.029 16 5.142 16.5 4.375c.5-.766 1.094-1.359 1.781-1.78C19.969 1.573 21 1.875 21 2.781v2.812L20.031 8.5c-.219.469-.453.969-.703 1.5-.25.531-.484 1.125-.703 1.781-.219.656-.383 1.5-.492 2.531C18.023 15.344 18 16.438 18 17.75V21h-3.984v.001zM3.984 21v-7.391c0-1.188.094-2.344.281-3.468.188-1.125.469-2.172.844-3.142.375-.969.875-1.828 1.5-2.578.625-.75 1.359-1.344 2.203-1.781C10.656 1.573 11.781 1.875 12 2.781v2.812L11.047 8.5c-.234.469-.469.969-.703 1.5-.234.531-.469 1.125-.703 1.781-.234.656-.406 1.5-.516 2.531C9.016 15.344 8.984 16.438 8.984 17.75V21H3.984z" fill="currentColor"/>
          </svg>
        );
      case 1: // Heart
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>
          </svg>
        );
      case 2: // At Symbol
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-white">
            <circle cx="12" cy="12" r="4" fill="currentColor"/>
            <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );
      case 3: // Eye
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 4: // Chart
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="m19 9-5 5-4-4-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );
      case 5: // Star
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-white">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-black py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main headline */}
        <h2 className="text-white text-4xl md:text-5xl font-light leading-tight mb-4 text-center">
          Learn what you can do for{' '}
          <span className="text-teal-400 italic">your brand's visibility.</span>
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
              {metrics[activeMetric].name}
            </h3>
            <p className="text-gray-400 text-base max-w-md transition-opacity duration-300">
              {metrics[activeMetric].description}
            </p>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Quote Icon */}
          <div 
            className={`relative w-24 h-24 border flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
              activeMetric === 0 ? 'border-white' : 'border-gray-700 hover:border-gray-500'
            }`}
            onClick={() => setActiveMetric(0)}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M14.017 21v-7.391c0-1.188.09-2.344.273-3.468.184-1.125.461-2.172.832-3.142C15.493 6.029 16 5.142 16.5 4.375c.5-.766 1.094-1.359 1.781-1.78C19.969 1.573 21 1.875 21 2.781v2.812L20.031 8.5c-.219.469-.453.969-.703 1.5-.25.531-.484 1.125-.703 1.781-.219.656-.383 1.5-.492 2.531C18.023 15.344 18 16.438 18 17.75V21h-3.984v.001zM3.984 21v-7.391c0-1.188.094-2.344.281-3.468.188-1.125.469-2.172.844-3.142.375-.969.875-1.828 1.5-2.578.625-.75 1.359-1.344 2.203-1.781C10.656 1.573 11.781 1.875 12 2.781v2.812L11.047 8.5c-.234.469-.469.969-.703 1.5-.234.531-.469 1.125-.703 1.781-.234.656-.406 1.5-.516 2.531C9.016 15.344 8.984 16.438 8.984 17.75V21H3.984z" fill="currentColor"/>
            </svg>
            
            {/* Loader bar */}
            {activeMetric === 0 && (
              <div 
                key="loader-0" 
                className="absolute bottom-0 left-0 h-1 bg-white w-full origin-left animate-loader"
                onAnimationEnd={handleLoaderComplete}
              ></div>
            )}
          </div>

          {/* Heart Icon */}
          <div 
            className={`relative w-24 h-24 border flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
              activeMetric === 1 ? 'border-white' : 'border-gray-700 hover:border-gray-500'
            }`}
            onClick={() => setActiveMetric(1)}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>
            </svg>
            
            {/* Loader bar */}
            {activeMetric === 1 && (
              <div 
                key="loader-1" 
                className="absolute bottom-0 left-0 h-1 bg-white w-full origin-left animate-loader"
                onAnimationEnd={handleLoaderComplete}
              ></div>
            )}
          </div>

          {/* At Symbol */}
          <div 
            className={`relative w-24 h-24 border flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
              activeMetric === 2 ? 'border-white' : 'border-gray-700 hover:border-gray-500'
            }`}
            onClick={() => setActiveMetric(2)}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            
            {/* Loader bar */}
            {activeMetric === 2 && (
              <div 
                key="loader-2" 
                className="absolute bottom-0 left-0 h-1 bg-white w-full origin-left animate-loader"
                onAnimationEnd={handleLoaderComplete}
              ></div>
            )}
          </div>

          {/* Eye Icon */}
          <div 
            className={`relative w-24 h-24 border flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
              activeMetric === 3 ? 'border-white' : 'border-gray-700 hover:border-gray-500'
            }`}
            onClick={() => setActiveMetric(3)}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            
            {/* Loader bar */}
            {activeMetric === 3 && (
              <div 
                key="loader-3" 
                className="absolute bottom-0 left-0 h-1 bg-white w-full origin-left animate-loader"
                onAnimationEnd={handleLoaderComplete}
              ></div>
            )}
          </div>

          {/* Chart Icon */}
          <div 
            className={`relative w-24 h-24 border flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
              activeMetric === 4 ? 'border-white' : 'border-gray-700 hover:border-gray-500'
            }`}
            onClick={() => setActiveMetric(4)}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="m19 9-5 5-4-4-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            
            {/* Loader bar */}
            {activeMetric === 4 && (
              <div 
                key="loader-4" 
                className="absolute bottom-0 left-0 h-1 bg-white w-full origin-left animate-loader"
                onAnimationEnd={handleLoaderComplete}
              ></div>
            )}
          </div>

          {/* Star Icon */}
          <div 
            className={`relative w-24 h-24 border flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
              activeMetric === 5 ? 'border-white' : 'border-gray-700 hover:border-gray-500'
            }`}
            onClick={() => setActiveMetric(5)}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor"/>
            </svg>
            
            {/* Loader bar */}
            {activeMetric === 5 && (
              <div 
                key="loader-5" 
                className="absolute bottom-0 left-0 h-1 bg-white w-full origin-left animate-loader"
                onAnimationEnd={handleLoaderComplete}
              ></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}