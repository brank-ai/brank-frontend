'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui';

/* ============================================
   SUB-COMPONENTS: Command Console Design System
   ============================================ */

interface BadgeProps {
  children: React.ReactNode;
}

function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-bg-surface border border-white/[0.05] text-text-secondary shadow-soft-tile-xs mb-6 tracking-wide uppercase">
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  children: React.ReactNode;
}

function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-text-primary text-glow mb-4 sm:mb-6 leading-tight leading-[1.2]">
      {children}
    </h2>
  );
}

interface SectionTextProps {
  children: React.ReactNode;
}

function SectionText({ children }: SectionTextProps) {
  return (
    <p className="md:text-base text-xs text-text-secondary leading-relaxed mb-8">
      {children}
    </p>
  );
}

interface FeatureListButtonProps {
  title: string;
  description: string;
  active: boolean;
  onClick?: () => void;
}

function FeatureListButton({
  title,
  description,
  active,
  onClick,
}: FeatureListButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer
        ${
          active
            ? 'bg-gradient-surface shadow-soft-tile-sm border-white/[0.05]'
            : 'border-white/[0.02] hover:bg-bg-surface-light hover:border-white/[0.05]'
        }
      `}
    >
      {/* Active LED indicator */}
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full md:h-8 bg-[#22C55E] rounded-r-full shadow-glow-cyan" />
      )}

      <h3
        className={`text-base sm:text-lg font-medium mb-1 transition-colors duration-300 ${active ? 'text-text-primary' : 'text-text-muted group-hover:text-text-primary'}`}
      >
        {title}
      </h3>
      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface MobileExpandableCardProps {
  title: string;
  description: string;
  active: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

function MobileExpandableCard({
  title,
  description,
  active,
  onClick,
  children,
}: MobileExpandableCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
        ${
          active
            ? 'bg-gradient-surface shadow-soft-tile-sm border-white/[0.05]'
            : 'border-white/[0.02] hover:bg-bg-surface-light hover:border-white/[0.05]'
        }
      `}
    >
      {/* Header - Always visible */}
      <div className="p-4 relative">
        {/* Active LED indicator */}
        {active && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-[#22C55E] rounded-r-full shadow-glow-cyan" />
        )}

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3
              className={`text-base font-medium mb-1 transition-colors duration-300 ${active ? 'text-text-primary' : 'text-text-muted group-hover:text-text-primary'}`}
            >
              {title}
            </h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              {description}
            </p>
          </div>
          <svg
            className={`w-4 h-4 text-text-muted transition-transform duration-300 ml-2 flex-shrink-0 ${active ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Expandable Content - Image */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${active ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-3 pb-2">
          <div className="bg-gradient-surface p-2 rounded-xl shadow-soft-tile border border-white/[0.02]">
            <ConsoleScreen>{children}</ConsoleScreen>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ConsoleScreenProps {
  children: React.ReactNode;
  className?: string;
}

function ConsoleScreen({ children, className = '' }: ConsoleScreenProps) {
  return (
    <div
      className={`relative w-full rounded-2xl bg-bg-base border border-white/[0.05] shadow-deep-field p-4 sm:p-6 flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Grid Texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
      {children}

      {/* Screen Glare/Reflection highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
    </div>
  );
}

/* ============================================
   MOCK VISUALS FOR CONSOLE SCREENS
   ============================================ */

/* LLM Icons */
function ChatGPTIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

function GeminiIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="currentColor">
      <path d="M14 28C14 21.373 8.627 16 2 16C8.627 16 14 10.627 14 4C14 10.627 19.373 16 26 16C19.373 16 14 21.373 14 28Z" />
    </svg>
  );
}

function GrokIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.5 11.5L12 3l8.5 8.5L12 20 3.5 11.5zm8.5-5.657L6.157 11.5 12 17.343l5.843-5.843L12 5.843z" />
    </svg>
  );
}

function PerplexityIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

function GridIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function LinkIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

interface KnowScreenContentProps {
  activeFeature: number;
}

function KnowScreenContent({ activeFeature }: KnowScreenContentProps) {
  // Helper function for Mentions Rate performance level
  const getMentionsPerformanceLevel = (
    value: number
  ): { label: string; color: string } => {
    if (value >= 90) {
      return { label: 'Excellent', color: 'text-green-500' };
    } else if (value >= 30) {
      return { label: 'Fair', color: 'text-orange-400' };
    } else {
      return { label: 'Poor', color: 'text-red-500' };
    }
  };

  // Mentions Screen (Image 1) - Comparison with percentages
  if (activeFeature === 0) {
    const llmData = [
      { name: 'CHATGPT', value: 46, icon: ChatGPTIcon, hasValue: true },
      { name: 'GEMINI', value: 44, icon: GeminiIcon, hasValue: true },
      { name: 'GROK', value: 92, icon: GrokIcon, hasValue: true },
      { name: 'PERPLEXITY', value: 67, icon: PerplexityIcon, hasValue: true },
    ];

    return (
      <div className="relative z-10 w-full py-4 sm:py-6 px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <GridIcon className="w-4 h-4 text-text-muted" />
          <span className="text-text-muted text-xs uppercase tracking-wider">
            COMPARISON
          </span>
        </div>

        {/* LLM List - Enhanced Card Style */}
        <div className="space-y-3">
          {llmData.map((llm, i) => (
            <div
              key={i}
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
                <llm.icon className="w-5 h-5 text-text-muted flex-shrink-0" />
                <span className="text-text-primary text-xs sm:text-sm uppercase tracking-wide truncate font-medium">
                  {llm.name}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 pl-3">
                <span className="text-text-primary text-sm font-medium">
                  {llm.value}%
                </span>
                <span
                  className={`
                  flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide
                  ${getMentionsPerformanceLevel(llm.value).color}
                  ${getMentionsPerformanceLevel(llm.value).color === 'text-green-500' ? 'bg-green-500/10' : ''}
                  ${getMentionsPerformanceLevel(llm.value).color === 'text-orange-400' ? 'bg-orange-400/10' : ''}
                  ${getMentionsPerformanceLevel(llm.value).color === 'text-red-500' ? 'bg-red-500/10' : ''}
                `}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      getMentionsPerformanceLevel(llm.value).color ===
                      'text-green-500'
                        ? 'bg-green-500'
                        : getMentionsPerformanceLevel(llm.value).color ===
                            'text-orange-400'
                          ? 'bg-orange-400'
                          : 'bg-red-500'
                    }`}
                  />
                  {getMentionsPerformanceLevel(llm.value).label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Helper function for Sentiment Score performance level
  const getSentimentPerformanceLevel = (
    value: number
  ): { label: string; color: string } => {
    if (value >= 80) {
      return { label: 'Excellent', color: 'text-green-500' };
    } else if (value >= 40) {
      return { label: 'Fair', color: 'text-orange-400' };
    } else {
      return { label: 'Poor', color: 'text-red-500' };
    }
  };

  // Sentiment Score Screen (Image 2) - Comparison with numbers
  if (activeFeature === 1) {
    const llmData = [
      { name: 'CHATGPT', value: 61, icon: ChatGPTIcon, hasValue: true },
      { name: 'GEMINI', value: 73, icon: GeminiIcon, hasValue: true },
      { name: 'GROK', value: 85, icon: GrokIcon, hasValue: true },
      { name: 'PERPLEXITY', value: 52, icon: PerplexityIcon, hasValue: true },
    ];

    return (
      <div className="relative z-10 w-full py-4 sm:py-6 px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <GridIcon className="w-4 h-4 text-text-muted" />
          <span className="text-text-muted text-xs uppercase tracking-wider">
            COMPARISON
          </span>
        </div>

        {/* LLM List - Enhanced Card Style */}
        <div className="space-y-3">
          {llmData.map((llm, i) => (
            <div
              key={i}
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
                <llm.icon className="w-5 h-5 text-text-muted flex-shrink-0" />
                <span className="text-text-primary text-xs sm:text-sm uppercase tracking-wide truncate font-medium">
                  {llm.name}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 pl-3">
                <span className="text-text-primary text-sm font-medium">
                  {llm.value}%
                </span>
                <span
                  className={`
                  flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide
                  ${getSentimentPerformanceLevel(llm.value).color}
                  ${getSentimentPerformanceLevel(llm.value).color === 'text-green-500' ? 'bg-green-500/10' : ''}
                  ${getSentimentPerformanceLevel(llm.value).color === 'text-orange-400' ? 'bg-orange-400/10' : ''}
                  ${getSentimentPerformanceLevel(llm.value).color === 'text-red-500' ? 'bg-red-500/10' : ''}
                `}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      getSentimentPerformanceLevel(llm.value).color ===
                      'text-green-500'
                        ? 'bg-green-500'
                        : getSentimentPerformanceLevel(llm.value).color ===
                            'text-orange-400'
                          ? 'bg-orange-400'
                          : 'bg-red-500'
                    }`}
                  />
                  {getSentimentPerformanceLevel(llm.value).label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Helper function for Citation Impact level
  const getImpactLevel = (
    index: number
  ): { label: string; color: string; bgColor: string; dotColor: string } => {
    const rank = index + 1; // Convert 0-based index to 1-based rank

    if (rank === 1) {
      return {
        label: 'HIGH IMPACT',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        dotColor: 'bg-green-500',
      };
    } else if (rank === 2 || rank === 3) {
      return {
        label: 'MEDIUM IMPACT',
        color: 'text-orange-400',
        bgColor: 'bg-orange-400/10',
        dotColor: 'bg-orange-400',
      };
    } else {
      return {
        label: 'LOW IMPACT',
        color: 'text-gray-400',
        bgColor: 'bg-gray-400/10',
        dotColor: 'bg-gray-400',
      };
    }
  };

  // Citations Screen (Image 3) - Sources by relevance
  if (activeFeature === 2) {
    const sources = [
      { url: 'https://samsung.com', value: 37 },
      { url: 'https://techradar.com', value: 35 },
      { url: 'https://apple.com', value: 28.5 },
      { url: 'https://cnet.com', value: 28 },
      { url: 'https://store.google.com', value: 19.5 },
    ];

    return (
      <div className="relative z-10 w-full py-4 sm:py-6 px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <ChatGPTIcon className="w-5 h-5 sm:w-6 sm:h-6 text-text-muted" />
          <span className="text-text-primary text-base sm:text-lg font-medium">
            ChatGPT
          </span>
        </div>
        <p className="text-text-muted text-xs sm:text-sm mb-4 sm:mb-6">
          Showing top sources by relevance
        </p>

        {/* Sources List - Enhanced Card Style */}
        <div className="space-y-3">
          {sources.map((source, i) => {
            const impact = getImpactLevel(i);
            return (
              <div
                key={i}
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
                  group
                "
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <LinkIcon className="w-4 h-4 text-text-subtle group-hover:text-text-primary flex-shrink-0 transition-colors duration-300" />
                  <span className="text-text-primary group-hover:text-white text-xs sm:text-sm truncate font-medium transition-colors duration-300">
                    {source.url}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 pl-3">
                  <span className="text-text-primary text-sm font-medium">
                    {source.value}%
                  </span>
                  <span
                    className={`
                    flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide
                    ${impact.color}
                    ${impact.bgColor}
                  `}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${impact.dotColor}`}
                    />
                    {impact.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Helper function for Ranking performance level
  const getRankingPerformanceLevel = (
    rank: number
  ): { label: string; color: string } => {
    if (rank <= 2) {
      return { label: 'Excellent', color: 'text-green-500' };
    } else if (rank > 2 && rank < 5) {
      return { label: 'Fair', color: 'text-orange-400' };
    } else {
      return { label: 'Poor', color: 'text-red-500' };
    }
  };

  // Ranking Screen (Image 4) - Rank by LLMs
  const rankingLLMs = [
    { name: 'CHATGPT', rank: 3.5, icon: ChatGPTIcon, hasValue: true },
    { name: 'GEMINI', rank: 4.2, icon: GeminiIcon, hasValue: true },
    { name: 'GROK', rank: 1.8, icon: GrokIcon, hasValue: true },
    { name: 'PERPLEXITY', rank: 6.3, icon: PerplexityIcon, hasValue: true },
  ];

  return (
    <div className="relative z-10 w-full py-4 sm:py-6 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-text-muted"
        >
          <path
            d="M3 13h8v8H3v-8zm10-10h8v18h-8V3z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-text-muted text-xs uppercase tracking-wider">
          RANK BY LLMs
        </span>
      </div>

      {/* Rankings List - Enhanced Card Style */}
      <div className="space-y-3">
        {rankingLLMs.map((llm, index) => (
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
              <llm.icon className="w-5 h-5 text-text-muted flex-shrink-0" />
              <span className="text-text-primary text-xs sm:text-sm uppercase tracking-wide truncate font-medium">
                {llm.name}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 pl-3">
              <span className="text-text-primary text-sm font-medium">
                #{llm.rank.toFixed(1)}
              </span>
              <span
                className={`
                flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide
                ${getRankingPerformanceLevel(llm.rank).color}
                ${getRankingPerformanceLevel(llm.rank).color === 'text-green-500' ? 'bg-green-500/10' : ''}
                ${getRankingPerformanceLevel(llm.rank).color === 'text-orange-400' ? 'bg-orange-400/10' : ''}
                ${getRankingPerformanceLevel(llm.rank).color === 'text-red-500' ? 'bg-red-500/10' : ''}
              `}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    getRankingPerformanceLevel(llm.rank).color ===
                    'text-green-500'
                      ? 'bg-green-500'
                      : getRankingPerformanceLevel(llm.rank).color ===
                          'text-orange-400'
                        ? 'bg-orange-400'
                        : 'bg-red-500'
                  }`}
                />
                {getRankingPerformanceLevel(llm.rank).label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ImproveScreenContentProps {
  activeFeature: number;
}

function ImproveScreenContent({ activeFeature }: ImproveScreenContentProps) {
  // Source Analysis Screen - Sources with impact badges
  if (activeFeature === 0) {
    const sources = [
      {
        url: 'https://techradar.com',
        value: '56%',
        impact: 'HIGH IMPACT',
        impactColor: 'bg-[#22C55E]',
        dotColor: 'bg-[#22C55E]',
      },
      {
        url: 'https://cnet.com',
        value: '47%',
        impact: 'HIGH IMPACT',
        impactColor: 'bg-[#22C55E]',
        dotColor: 'bg-[#22C55E]',
      },
      {
        url: 'https://apple.com',
        value: '38%',
        impact: 'MEDIUM IMPACT',
        impactColor: 'bg-orange-500',
        dotColor: 'bg-orange-500',
      },
      {
        url: 'https://theverge.com',
        value: '25%',
        impact: 'LOW IMPACT',
        impactColor: 'bg-gray-500',
        dotColor: 'bg-gray-400',
      },
    ];

    return (
      <div className="relative z-10 w-full py-3 sm:py-4 px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <GeminiIcon className="w-5 h-5 sm:w-6 sm:h-6 text-text-muted" />
          <span className="text-text-primary text-base sm:text-lg font-medium">
            Gemini
          </span>
        </div>
        <p className="text-text-muted text-xs sm:text-sm mb-4 sm:mb-5">
          Showing top sources by relevance
        </p>

        {/* Sources List */}
        <div className="space-y-2 sm:space-y-3">
          {sources.map((source, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-bg-surface rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.03]"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <LinkIcon className="w-4 h-4 text-text-subtle flex-shrink-0" />
                <span className="text-text-secondary text-xs sm:text-sm font-medium truncate">
                  {source.url}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-2">
                <span className="text-text-muted text-xs sm:text-sm font-mono">
                  {source.value}
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-bg-base border border-white/[0.05]">
                  <div className={`w-2 h-2 rounded-full ${source.dotColor}`} />
                  <span className="text-text-secondary text-[9px] sm:text-[10px] font-medium tracking-wide whitespace-nowrap">
                    {source.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Gap Analysis Screen - Competitor comparison table
  const competitors = [
    { name: 'Samsung', chatgpt: '46%', gemini: '38%', perplexity: '41%' },
    { name: 'Apple', chatgpt: '52%', gemini: '61%', perplexity: '55%' },
    { name: 'Google', chatgpt: '38%', gemini: '72%', perplexity: '45%' },
  ];

  return (
    <div className="relative z-10 w-full py-3 sm:py-4 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 sm:mb-5">
        <GridIcon className="w-4 h-4 text-text-muted" />
        <span className="text-text-muted text-xs sm:text-sm font-medium tracking-wider uppercase">
          Competitor Analysis
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3 px-2 sm:px-3">
        <div className="text-text-subtle text-[10px] sm:text-xs font-medium uppercase tracking-wide">
          Brand
        </div>
        <div className="flex items-center justify-center gap-1">
          <ChatGPTIcon className="w-3 h-3 sm:w-4 sm:h-4 text-text-muted" />
          <span className="text-text-subtle text-[10px] sm:text-xs font-medium hidden sm:inline">
            ChatGPT
          </span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <GeminiIcon className="w-3 h-3 sm:w-4 sm:h-4 text-text-muted" />
          <span className="text-text-subtle text-[10px] sm:text-xs font-medium hidden sm:inline">
            Gemini
          </span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <PerplexityIcon className="w-3 h-3 sm:w-4 sm:h-4 text-text-muted" />
          <span className="text-text-subtle text-[10px] sm:text-xs font-medium hidden sm:inline">
            Perplexity
          </span>
        </div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {competitors.map((competitor, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-2 sm:gap-3 bg-bg-surface rounded-xl px-2 sm:px-3 py-2.5 sm:py-3 border border-white/[0.03] items-center"
          >
            <span className="text-text-secondary text-xs sm:text-sm font-medium truncate">
              {competitor.name}
            </span>
            <span className="text-text-primary text-xs sm:text-sm font-mono text-center">
              {competitor.chatgpt}
            </span>
            <span className="text-text-primary text-xs sm:text-sm font-mono text-center">
              {competitor.gemini}
            </span>
            <span className="text-text-primary text-xs sm:text-sm font-mono text-center">
              {competitor.perplexity}
            </span>
          </div>
        ))}
      </div>

      {/* Your Brand Row - Highlighted */}
      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3 bg-gradient-surface rounded-xl px-2 sm:px-3 py-2.5 sm:py-3 border border-[#22C55E]/20 items-center shadow-soft-tile-xs">
        <span className="text-[#22C55E] text-xs sm:text-sm font-medium">
          Your Brand
        </span>
        <span className="text-[#4ADE80] text-xs sm:text-sm font-mono text-center font-medium">
          61%
        </span>
        <span className="text-[#4ADE80] text-xs sm:text-sm font-mono text-center font-medium">
          58%
        </span>
        <span className="text-[#4ADE80] text-xs sm:text-sm font-mono text-center font-medium">
          64%
        </span>
      </div>
    </div>
  );
}

function BotIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13a1.5 1.5 0 0 0 0 3 1.5 1.5 0 0 0 0-3m9 0a1.5 1.5 0 0 0 0 3 1.5 1.5 0 0 0 0-3M12 17.5c-1.5 0-2.5-.5-2.5-.5v1s1 .5 2.5.5 2.5-.5 2.5-.5v-1s-1 .5-2.5.5z" />
    </svg>
  );
}

function UserIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function HackMDIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* Back square - darker */}
      <rect x="6" y="6" width="12" height="12" rx="3" fill="#4B5563" />
      {/* Front square - lighter/blue */}
      <rect x="8" y="8" width="12" height="12" rx="3" fill="#6366F1" />
    </svg>
  );
}

function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function MediumIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

function CreateScreenContent() {
  const contentTypes = ['Poster', 'Reel', 'Tweet', 'Post', 'Article / Blog'];
  const platforms = [
    { name: 'LinkedIn', icon: LinkedInIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Instagram', icon: InstagramIcon },
    { name: 'Medium', icon: MediumIcon },
    { name: 'HackMD.io', icon: HackMDIcon },
  ];

  return (
    <div className="relative z-10 w-full h-full flex flex-col py-2 sm:py-4 px-2 sm:px-6">
      {/* ===== MOBILE LAYOUT ===== */}
      <div className="flex flex-col h-full sm:hidden">
        {/* Mobile Header - Logo left, Create center, Post on right */}
        <div className="flex items-center justify-between mb-3 px-1">
          {/* Left - Small logo and title */}
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-white rounded flex items-center justify-center p-0.5">
              <Image
                src="/images/brank-logo.svg"
                alt="Brank"
                width={16}
                height={16}
                className="w-full h-full object-contain invert"
              />
            </div>
            <span className="text-text-primary text-[10px] font-medium">
              Content Assistant
            </span>
          </div>

          {/* Center - Create Dropdown */}
          <div className="flex items-center gap-1 px-2 py-1 bg-bg-surface rounded-md text-text-secondary text-[10px] border border-white/[0.05]">
            <span>Create: Poster</span>
            <svg
              className="w-2.5 h-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Right - Post on Dropdown */}
          <div className="flex items-center gap-1 px-2 py-1 bg-bg-surface rounded-md text-text-secondary text-[10px] border border-white/[0.05]">
            <span>Post on</span>
            <svg
              className="w-2.5 h-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Chat Messages - More space */}
        <div className="flex-1 space-y-2 overflow-hidden">
          {/* Bot Message */}
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-bg-surface rounded flex items-center justify-center flex-shrink-0">
              <BotIcon className="w-3 h-3 text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-text-muted text-[9px] mb-0.5 block">
                Bot
              </span>
              <div className="bg-bg-surface rounded-lg rounded-tl-sm p-2 border border-white/[0.03]">
                <p className="text-text-secondary text-[10px] leading-relaxed">
                  Hey there! You&apos;re wanting to create content and engage
                  your audience. Let me help you craft the perfect message for
                  your brand.
                </p>
              </div>
            </div>
          </div>

          {/* Bot Follow-up */}
          <div className="flex gap-2 pl-7">
            <div className="flex-1 min-w-0">
              <div className="bg-bg-surface/50 rounded-lg p-1.5 border border-white/[0.02] inline-block">
                <p className="text-text-muted text-[9px]">
                  What type of content would you like to create today?
                </p>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-bg-surface rounded flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-3 h-3 text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-text-muted text-[9px] mb-0.5 block">
                User
              </span>
              <div className="bg-bg-surface rounded-lg rounded-tl-sm p-2 border border-white/[0.03]">
                <p className="text-text-secondary text-[10px] leading-relaxed">
                  I need help creating a LinkedIn post about our new product
                  launch and its key features.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Bot Response for more height */}
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-bg-surface rounded flex items-center justify-center flex-shrink-0">
              <BotIcon className="w-3 h-3 text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-text-muted text-[9px] mb-0.5 block">
                Bot
              </span>
              <div className="bg-bg-surface rounded-lg rounded-tl-sm p-2 border border-white/[0.03]">
                <p className="text-text-secondary text-[10px] leading-relaxed">
                  Great choice! Here&apos;s a draft optimized for
                  LinkedIn&apos;s algorithm and AI discoverability...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Input */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 flex items-center bg-bg-surface rounded-lg px-2 py-2 border border-white/[0.05]">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-text-primary text-[10px] outline-none placeholder:text-text-muted"
              readOnly
            />
            <button className="ml-2 p-1 bg-white rounded hover:bg-gray-100 transition-colors">
              <svg
                className="w-3 h-3 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden sm:flex sm:flex-col sm:h-full">
        <div className="flex flex-1 min-h-0">
          {/* Left Side - Chat Interface */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1.5">
                  <Image
                    src="/images/brank-logo.svg"
                    alt="Brank"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain invert"
                  />
                </div>
                <span className="text-text-primary text-lg font-medium">
                  AI-First Content Assistant
                </span>
              </div>

              {/* Dropdown */}
              <div className="relative">
                <div className="flex items-center gap-2 px-3 py-2 bg-bg-surface rounded-lg text-text-secondary text-sm border border-white/[0.05]">
                  <span>Create: Poster</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Dropdown Menu (Visual Only) */}
                <div className="absolute right-0 top-full mt-1 bg-bg-surface rounded-lg border border-white/[0.05] overflow-hidden shadow-soft-tile-sm z-10">
                  {contentTypes.map((type, i) => (
                    <div
                      key={type}
                      className={`px-4 py-2 text-sm cursor-pointer ${
                        i === 0
                          ? 'bg-bg-elevated text-text-primary'
                          : 'text-text-secondary hover:bg-bg-elevated'
                      }`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-3 overflow-hidden">
              {/* Bot Message */}
              <div className="flex gap-3">
                <div className="w-7 h-7 bg-bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                  <BotIcon className="w-4 h-4 text-text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-text-muted text-xs mb-1 block">
                    Bot
                  </span>
                  <div className="bg-bg-surface rounded-xl rounded-tl-sm p-3 border border-white/[0.03]">
                    <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                      Hey there! You&apos;re wanting to content creating and
                      engage, the creative and target custom content
                      propositive...
                    </p>
                  </div>
                </div>
              </div>

              {/* Bot Follow-up */}
              <div className="flex gap-3 pl-10">
                <div className="flex-1 min-w-0">
                  <div className="bg-bg-surface/50 rounded-xl p-2.5 border border-white/[0.02] inline-block">
                    <p className="text-text-muted text-[10px]">
                      What type of content would you like to create today?
                    </p>
                  </div>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-3">
                <div className="w-7 h-7 bg-bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-4 h-4 text-text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-text-muted text-xs mb-1 block">
                    User
                  </span>
                  <div className="bg-bg-surface rounded-xl rounded-tl-sm p-3 border border-white/[0.03]">
                    <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
                      I need help creating a LinkedIn post about our new product
                      launch and its key features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Platform Buttons */}
          <div className="flex flex-col justify-center gap-3 ml-6">
            {platforms.map(platform => {
              const IconComponent = platform.icon;
              return (
                <div
                  key={platform.name}
                  className="flex items-center gap-2 px-4 py-3 bg-bg-surface rounded-xl border border-white/[0.03] text-text-secondary text-sm whitespace-nowrap hover:bg-bg-elevated transition-colors cursor-pointer"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{platform.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input Text Box at Bottom */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 flex items-center bg-bg-surface rounded-xl px-4 py-3 border border-white/[0.05] shadow-deep-field-sm">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-text-primary text-sm outline-none placeholder:text-text-muted"
              readOnly
            />
            <button className="ml-3 p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                className="w-4 h-4 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   MAIN COMPONENT: Feature Stack
   ============================================ */

export default function MainContentSection() {
  const [knowActiveFeature, setKnowActiveFeature] = useState(0);
  const [improveActiveFeature, setImproveActiveFeature] = useState(0);

  // Disrupt transition states
  const [knowDisplayed, setKnowDisplayed] = useState(0);
  const [knowVisible, setKnowVisible] = useState(true);
  const [improveDisplayed, setImproveDisplayed] = useState(0);
  const [improveVisible, setImproveVisible] = useState(true);

  // Disrupt transition for Know section
  useEffect(() => {
    if (knowActiveFeature === knowDisplayed) return;
    setKnowVisible(false);
    const timer = setTimeout(() => {
      setKnowDisplayed(knowActiveFeature);
      setTimeout(() => setKnowVisible(true), 60);
    }, 450);
    return () => clearTimeout(timer);
  }, [knowActiveFeature, knowDisplayed]);

  // Disrupt transition for Improve section
  useEffect(() => {
    if (improveActiveFeature === improveDisplayed) return;
    setImproveVisible(false);
    const timer = setTimeout(() => {
      setImproveDisplayed(improveActiveFeature);
      setTimeout(() => setImproveVisible(true), 60);
    }, 450);
    return () => clearTimeout(timer);
  }, [improveActiveFeature, improveDisplayed]);

  const knowFeatures = [
    {
      title: 'Mentions',
      description:
        'Track how frequently your brand is mentioned across AI platforms.',
    },
    {
      title: 'Sentiment Score',
      description:
        'Analyze whether AI responses about your brand are positive, negative, or neutral.',
    },
    // {
    //   title: 'Citations',
    //   description: 'Monitor which sources AI models cite when mentioning you.',
    // },
    {
      title: 'Ranking',
      description: "Find out your brand's ranking across LLMs.",
    },
  ];

  const improveFeatures = [
    {
      title: 'Source Analysis',
      description: 'Pinpoint high-authority domains influencing your brand.',
    },
    {
      title: 'Gap Analysis',
      description: 'See where competitors have an edge and close the gap.',
    },
  ];

  return (
    <div className="w-full bg-bg-base overflow-hidden">
      {/* ==========================================
          SECTION 1: KNOW (The Monitor)
         ========================================== */}
      <section className="pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto 2xl:min-h-screen 2xl:flex 2xl:flex-col 2xl:justify-center">
        <Reveal variant="fadeUp" duration={1.2} y={30}>
          {/* Desktop Layout */}
          <div className="hidden sm:grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="order-1">
              <Badge>Visibility Intelligence</Badge>
              <SectionHeading>
                Discover How AI models <br className="md:hidden" />
                <span className="text-text-muted">represent your brand.</span>
              </SectionHeading>
              <SectionText>
                Measure your brand's visibility, sentiment, and positioning across <br className='hidden md:block'/> AI responses 

              </SectionText>

              <div className="space-y-2 sm:space-y-3">
                {knowFeatures.map((feature, index) => (
                  <FeatureListButton
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                    active={knowActiveFeature === index}
                    onClick={() => setKnowActiveFeature(index)}
                  />
                ))}
              </div>
            </div>

            {/* Right: The Console Visual */}
            <div className="relative order-2">
              <div className="bg-gradient-surface p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-soft-tile border border-white/[0.02]">
                <ConsoleScreen className="aspect-[4/3]">
                  <div
                    className={`w-full transition-all duration-500 ${
                      knowVisible
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-[0.88] translate-y-4'
                    }`}
                    style={{
                      filter: knowVisible ? 'blur(0px) brightness(1)' : 'blur(14px) brightness(0.5)',
                      transitionTimingFunction: knowVisible
                        ? 'cubic-bezier(0.16, 1, 0.3, 1)'
                        : 'cubic-bezier(0.55, 0, 1, 0.45)',
                    }}
                  >
                    <KnowScreenContent activeFeature={knowDisplayed} />
                  </div>
                </ConsoleScreen>
              </div>
              <div className="absolute -inset-10 bg-[#22C55E]/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
            </div>
          </div>

          {/* Mobile Layout - Expandable Cards */}
          <div className="sm:hidden">
            <Badge>Visibility Intelligence</Badge>
            <SectionHeading>
              Discover How AI models <br className="md:hidden" />
              <span className="text-text-muted">represent your brand.</span>
            </SectionHeading>
               <SectionText>
                Measure your brand's visibility, sentiment, and positioning across <br className='hidden md:block'/> AI responses 
              </SectionText>

            <div className="space-y-2">
              {knowFeatures.map((feature, index) => (
                <MobileExpandableCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  active={knowActiveFeature === index}
                  onClick={() => setKnowActiveFeature(index)}
                >
                  <KnowScreenContent activeFeature={index} />
                </MobileExpandableCard>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==========================================
          SECTION 2: IMPROVE (The Tuner)
         ========================================== */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.02] 2xl:min-h-screen 2xl:flex 2xl:flex-col 2xl:justify-center">
        <Reveal variant="fadeUp" duration={1.2} y={30}>
          {/* Desktop Layout */}
          <div className="hidden sm:grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
            {/* Left: Visual (Zig-zag layout) */}
            <div className="relative lg:order-1">
              <div className="bg-gradient-surface p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-soft-tile border border-white/[0.02]">
                <ConsoleScreen className="aspect-[4/3]">
                  <div
                    className={`w-full transition-all duration-500 ${
                      improveVisible
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-[0.88] translate-y-4'
                    }`}
                    style={{
                      filter: improveVisible ? 'blur(0px) brightness(1)' : 'blur(14px) brightness(0.5)',
                      transitionTimingFunction: improveVisible
                        ? 'cubic-bezier(0.16, 1, 0.3, 1)'
                        : 'cubic-bezier(0.55, 0, 1, 0.45)',
                    }}
                  >
                    <ImproveScreenContent activeFeature={improveDisplayed} />
                  </div>
                </ConsoleScreen>
              </div>
              <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
            </div>

            {/* Right: Content */}
            <div className="lg:order-2">
              <Badge>Optimization Engine</Badge>
              <SectionHeading>
                Improve your rankings <br className="hidden sm:block" />
                <span className="text-text-muted">across all LLMs.</span>
              </SectionHeading>
              <SectionText>
                Identify the sources that matter. We tell you exactly which
                domains are feeding data to the models so you can dominate the
                input layer.
              </SectionText>

              <div className="space-y-2 sm:space-y-3">
                {improveFeatures.map((feature, index) => (
                  <FeatureListButton
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                    active={improveActiveFeature === index}
                    onClick={() => setImproveActiveFeature(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout - Expandable Cards */}
          <div className="sm:hidden">
            <Badge>Optimization Engine</Badge>
            <SectionHeading>
              Improve your rankings <br className="md:hidden" />
              <span className="text-text-muted">across all LLMs.</span>
            </SectionHeading>
            <SectionText>
              Identify the sources that matter. We tell you exactly which
              domains are feeding data to the models so you can dominate the
              input layer.
            </SectionText>

            <div className="space-y-2">
              {improveFeatures.map((feature, index) => (
                <MobileExpandableCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  active={improveActiveFeature === index}
                  onClick={() => setImproveActiveFeature(index)}
                >
                  <ImproveScreenContent activeFeature={index} />
                </MobileExpandableCard>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==========================================
          SECTION 3: CREATE (The Forge)
         ========================================== */}
      {/* <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.02]">
        <Reveal variant="fadeUp" duration={1.2} y={30}>

          <div className="text-left sm:text-center max-w-3xl mx-auto md:mb-10 mb-8">
            <Badge>Content Forge</Badge>
            <SectionHeading>
              Create AI-first content <br className="md:hidden" />
              <span className="text-text-muted">that bots love.</span>
            </SectionHeading>
            <SectionText>
              Don&apos;t guess. Generate content structured specifically to be
              scraped, indexed, and cited by Large Language Models.
            </SectionText>
          </div>


          <div className="bg-gradient-surface p-2 sm:p-4 rounded-2xl sm:rounded-[2rem] shadow-soft-tile border border-white/[0.02]">
            <ConsoleScreen className="aspect-[3/4] sm:aspect-[21/10] min-h-[380px] sm:min-h-[380px]">
              <CreateScreenContent />
            </ConsoleScreen>
          </div>


          <div className="relative">
            <div className="absolute -inset-20 bg-white/5 blur-[120px] -z-10 rounded-full pointer-events-none" />
          </div>
        </Reveal>
      </section> */}
    </div>
  );
}
