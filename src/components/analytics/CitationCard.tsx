'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CitationCardProps } from '@/types';
import { cn } from '@/lib/utils';
import { ProModal } from '@/components/ui';

const CitationCard: React.FC<CitationCardProps> = ({ llm, className }) => {
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const shouldBlur = llm.name === 'Grok' || llm.name === 'Perplexity';

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

          {/* Sources */}
          <div className={cn('space-y-2', shouldBlur && 'blur-sm select-none')}>
            {llm.sources.map((source, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-text-subtle"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="text-text-secondary text-xs sm:text-sm truncate">
                    {source.url}
                  </span>
                </div>
                <span className="text-text-muted text-xs sm:text-sm flex-shrink-0 pl-2">
                  {source.count}%
                </span>
              </div>
            ))}
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
