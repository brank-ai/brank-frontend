'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ComparisonCardProps } from '@/types';
import { cn } from '@/lib/utils';
import { ProModal, Tooltip } from '@/components/ui';

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  comparisons,
  insight,
  tooltip,
  className,
}) => {
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const shouldShowProButton = (llmName: string) => {
    return llmName === 'Grok' || llmName === 'Perplexity';
  };

  // Determine performance level based on value and metric type
  const getPerformanceLevel = (
    value: number
  ): { label: string; color: string } => {
    // For Mentions Rate and Sentiment Score
    if (title.includes('Rate') || title.includes('Sentiment')) {
      if (value < 30) {
        return { label: 'Poor', color: 'text-red-500' };
      } else if (value >= 30 && value < 90) {
        return { label: 'Fair', color: 'text-orange-400' };
      } else {
        return { label: 'Excellent', color: 'text-green-500' };
      }
    }

    // Default: no level indicator
    return { label: '', color: '' };
  };

  return (
    <>
      <div
        className={cn(
          // Soft Tile Style v2.0
          'rounded-xl',
          'shadow-soft-tile-sm',
          'p-4 sm:p-6 md:p-12',
          className
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Left Side: Title + AI Insight - Deep Field Style */}
          <div
            className="
              flex flex-col
              bg-bg-depressed
              -m-4 p-4
              sm:-m-6 sm:p-6
              md:-m-12 md:p-12 md:pr-6
              md:justify-between
              rounded-xl md:rounded-l-xl md:rounded-r-none
              shadow-deep-field
            "
          >
            {/* Title with Info Icon */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-text-primary text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-none">
                {title}
              </h3>
              {tooltip && (
                <Tooltip content={tooltip} position="bottom">
                  <button className="text-text-subtle hover:text-text-muted transition-all duration-300 active:scale-95 flex items-center">
                    <svg
                      className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </button>
                </Tooltip>
              )}
            </div>

            {/* AI Insight */}
            <div className="flex flex-col gap-3 md:mt-auto">
              <div className="flex items-center gap-2">
                {/* Sparkle Icon */}
                <div className="flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2799 4.52692C21.6647 3.48715 23.1353 3.48716 23.5201 4.52692L27.8543 16.2401C27.9753 16.567 28.233 16.8247 28.5599 16.9457L40.2731 21.2799C41.3128 21.6647 41.3128 23.1353 40.2731 23.5201L28.5599 27.8543C28.233 27.9753 27.9753 28.233 27.8543 28.5599L23.5201 40.2731C23.1353 41.3128 21.6647 41.3128 21.2799 40.2731L16.9457 28.5599C16.8247 28.233 16.567 27.9753 16.2401 27.8543L4.52692 23.5201C3.48715 23.1353 3.48716 21.6647 4.52692 21.2799L16.2401 16.9457C16.567 16.8247 16.8247 16.567 16.9457 16.2401L21.2799 4.52692Z"
                      fill="#EAEAEA"
                    />
                    <path
                      d="M34.777 5.29256C34.8625 5.06157 35.1892 5.06157 35.2747 5.29256L36.2375 7.89468C36.2644 7.96731 36.3217 8.02456 36.3943 8.05144L38.9964 9.01431C39.2274 9.09978 39.2274 9.42649 38.9964 9.51196L36.3943 10.4748C36.3217 10.5017 36.2644 10.559 36.2375 10.6316L35.2747 13.2337C35.1892 13.4647 34.8625 13.4647 34.777 13.2337L33.8141 10.6316C33.7873 10.559 33.73 10.5017 33.6574 10.4748L31.0553 9.51196C30.8243 9.42649 30.8243 9.09978 31.0553 9.01431L33.6574 8.05144C33.73 8.02456 33.7873 7.96731 33.8141 7.89468L34.777 5.29256Z"
                      fill="#EAEAEA"
                    />
                  </svg>
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-text-primary whitespace-nowrap">
                  AI INSIGHT
                </h4>
              </div>
              <div className="text-text-muted text-sm leading-relaxed space-y-1">
                {insight.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Comparison List */}
          <div className="pl-0 md:pl-12">
            {/* Comparison Header */}
            <div className="flex items-center gap-2 mb-6 md:mt-0 mt-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-text-subtle"
              >
                <rect x="3" y="3" width="7" height="7" fill="currentColor" />
                <rect x="14" y="3" width="7" height="7" fill="currentColor" />
                <rect x="3" y="14" width="7" height="7" fill="currentColor" />
                <rect x="14" y="14" width="7" height="7" fill="currentColor" />
              </svg>
              <span className="text-text-subtle text-xs uppercase tracking-wider">
                COMPARISON
              </span>
            </div>

            {/* Comparisons List - Enhanced Card Style */}
            <div className="space-y-3">
              {comparisons.map((comparison, index) => (
                <div
                  key={index}
                  className="
                    flex items-center justify-between
                    bg-bg-elevated
                    border border-subtle
                    rounded-xl
                    px-4 py-3
                    shadow-soft-tile-xs
                    hover:shadow-soft-tile-sm
                    transition-all duration-300
                  "
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Image
                      src={comparison.icon}
                      alt={comparison.llm}
                      width={20}
                      height={20}
                      className="object-contain opacity-90 flex-shrink-0"
                    />
                    <span className="text-text-primary text-xs sm:text-sm uppercase tracking-wide truncate font-medium">
                      {comparison.llm}
                    </span>
                  </div>
                  {shouldShowProButton(comparison.llm) ? (
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
                      "
                    >
                      Pro
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 flex-shrink-0 pl-3">
                      {(title.includes('Rate') ||
                        title.includes('Sentiment')) && (
                        <>
                          <span className="text-text-primary text-sm font-medium">
                            {comparison.value}
                            {title.includes('Rate') ||
                            title.includes('Sentiment')
                              ? '%'
                              : ''}
                          </span>
                          <span
                            className={cn(
                              'flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide',
                              getPerformanceLevel(comparison.value).color,
                              getPerformanceLevel(comparison.value).color ===
                                'text-green-500' && 'bg-green-500/10',
                              getPerformanceLevel(comparison.value).color ===
                                'text-orange-400' && 'bg-orange-400/10',
                              getPerformanceLevel(comparison.value).color ===
                                'text-red-500' && 'bg-red-500/10'
                            )}
                          >
                            <span
                              className={cn(
                                'w-1.5 h-1.5 rounded-full',
                                getPerformanceLevel(comparison.value).color ===
                                  'text-green-500' && 'bg-green-500',
                                getPerformanceLevel(comparison.value).color ===
                                  'text-orange-400' && 'bg-orange-400',
                                getPerformanceLevel(comparison.value).color ===
                                  'text-red-500' && 'bg-red-500'
                              )}
                            />
                            {getPerformanceLevel(comparison.value).label}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </>
  );
};

export { ComparisonCard };
