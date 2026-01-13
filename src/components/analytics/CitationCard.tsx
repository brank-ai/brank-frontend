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
          'bg-[#2F2F2F33] border border-gray-800 p-6 relative',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={llm.icon}
            alt={llm.name}
            width={24}
            height={24}
            className="object-contain"
          />
          <h4 className="text-white text-lg font-medium">{llm.name}</h4>
        </div>

        {/* Content Container with Blur */}
        <div className="relative">
          {/* Subtitle */}
          <p className={cn("text-gray-500 text-xs mb-4", shouldBlur && "blur-sm select-none")}>{llm.subtitle}</p>

          {/* Sources */}
          <div className={cn("space-y-2", shouldBlur && "blur-sm select-none")}>
            {llm.sources.map((source, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="text-gray-300 text-sm">{source.url}</span>
                </div>
                <span className="text-gray-400 text-sm">{source.count}</span>
              </div>
            ))}
          </div>

          {/* Pro Button Overlay */}
          {shouldBlur && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none">
              <button
                onClick={() => setIsProModalOpen(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] text-black text-sm font-medium hover:opacity-90 transition-all duration-150 rounded-md pointer-events-auto active:scale-95"
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

