'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CitationCardProps } from '@/types';
import { cn } from '@/lib/utils';
import { ProModal } from '@/components/ui';

const CitationCard: React.FC<CitationCardProps> = ({ llm, className }) => {
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const shouldBlur = llm.name === 'Grok' || llm.name === 'Perplexity';

  // Determine impact level based on ranking position
  const getImpactLevel = (index: number): { label: string; color: string; bgColor: string; dotColor: string } => {
    const rank = index + 1; // Convert 0-based index to 1-based rank
    
    if (rank === 1) {
      return { 
        label: 'HIGH IMPACT', 
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        dotColor: 'bg-green-500'
      };
    } else if (rank === 2 || rank === 3) {
      return { 
        label: 'MEDIUM IMPACT', 
        color: 'text-orange-400',
        bgColor: 'bg-orange-400/10',
        dotColor: 'bg-orange-400'
      };
    } else {
      return { 
        label: 'LOW IMPACT', 
        color: 'text-gray-400',
        bgColor: 'bg-gray-400/10',
        dotColor: 'bg-gray-400'
      };
    }
  };

  return (
    <>
      <div
        className={cn(
          // Soft Tile Style v2.0
          'rounded-xl',
          'shadow-soft-tile-sm',
          'p-4 sm:p-6',
          'relative',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={llm.icon}
            alt={llm.name}
            width={20}
            height={20}
            className="object-contain"
          />
          <h4 className="text-text-primary text-base sm:text-lg font-medium tracking-tight">
            {llm.name}
          </h4>
        </div>

        {/* Content Container with Blur */}
        <div className="relative">
          {/* Subtitle */}
          <p
            className={cn(
              'text-text-subtle text-xs mb-4',
              shouldBlur && 'blur-sm select-none'
            )}
          >
            {llm.subtitle}
          </p>

          {/* Sources - Enhanced Card Style */}
          <div className={cn('space-y-3', shouldBlur && 'blur-sm select-none')}>
            {llm.sources.map((source, index) => {
              const impact = getImpactLevel(index);
              return (
                <a
                  key={index}
                  href={source.url.startsWith('http') ? source.url : `https://${source.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center justify-between
                    bg-bg-elevated
                    border border-subtle
                    rounded-xl
                    px-4 py-3
                    shadow-soft-tile-xs
                    hover:shadow-soft-tile-sm
                    hover:border-text-muted/30
                    transition-all duration-300
                    cursor-pointer
                    group
                  "
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-text-subtle group-hover:text-text-primary flex-shrink-0 transition-colors duration-300"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span className="text-text-primary group-hover:text-white text-xs sm:text-sm truncate font-medium transition-colors duration-300">
                      {source.url}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-shrink-0 pl-3">
                    <span className="text-text-primary text-sm font-medium">
                      {source.count}%
                    </span>
                    <span className={cn(
                      'flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide',
                      impact.color,
                      impact.bgColor
                    )}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', impact.dotColor)} />
                      {impact.label}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Pro Button Overlay */}
          {shouldBlur && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-bg-base/60 via-transparent to-transparent pointer-events-none rounded-lg">
              <button
                onClick={() => setIsProModalOpen(true)}
                className="
                  px-4 py-1.5
                  bg-bg-elevated
                  text-text-primary
                  text-xs font-medium
                  border border-subtle
                  rounded-lg
                  shadow-soft-tile-xs
                  hover:bg-bg-surface
                  hover:border-text-muted/20
                  active:scale-[0.98]
                  transition-all duration-300
                  pointer-events-auto
                "
              >
                Pro
              </button>
            </div>
          )}
        </div>
      </div>

      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </>
  );
};

export { CitationCard };
