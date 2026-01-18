'use client';

import { useState } from 'react';
import { Reveal } from '@/components/ui';

interface MetricCardProps {
  title: string;
  description: string;
  className?: string; // Add className prop support
}

function MetricCard({ title, description, className }: MetricCardProps) {
  return (
    <div
      className={`
        relative
        rounded-xl
        p-6 sm:p-8
        shadow-soft-tile-sm
        overflow-hidden
        group
        transition-all duration-300
        hover:shadow-soft-tile
        bg-bg-surface
        border border-subtle
        ${className || ''}
      `}
    >
      {/* Left accent LED indicator */}
      <div
        className="
          absolute left-0 top-0 bottom-0 w-1
          bg-text-muted/30
          group-hover:bg-green-500
          group-hover:shadow-glow-green
          transition-all duration-300
        "
      />

      {/* Subtle grid pattern texture */}
      <div
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 pl-4 h-full flex flex-col justify-start">
        <h3 className="text-text-primary text-xl sm:text-2xl font-medium tracking-tight mb-3">
          {title}
        </h3>
        {description && (
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MainContentSection() {
  const [activeTab, setActiveTab] = useState<'visibility' | 'improve' | 'create'>('visibility');

  const visibilityMetrics = [
    {
      title: 'Mentions',
      description: 'Track how frequently your brand is mentioned across AI platforms and understand your visibility in AI-generated responses.',
    },
    {
      title: 'Compare',
      description: 'Benchmark your brand performance against competitors and identify opportunities to improve your AI presence.',
    },
    {
      title: 'Citations',
      description: 'Monitor which sources AI models cite when mentioning your brand and optimize your content strategy accordingly.',
    },
    {
      title: 'Sentiment Score',
      description: 'Analyze the sentiment and context of AI responses about your brand to maintain a positive reputation.',
    },
  ];

  const improveMetrics = [
    {
      title: 'Sources',
      description: 'Understand which sources LLMs are using to fetch information regarding your industry and devise your content strategy accordingly',
    },
    {
      title: 'Sentiment',
      description: 'Understand which sources are bringing positive and negative sentiments about your brand for LLMs and get actionable items to improve your brand\'s sentiment',
    },
    {
      title: 'Compete',
      description: 'Understand where your competitors have an edge over you and close gaps',
    },
  ];

  const createMetrics = [
    {
      title: 'Bot Visibility',
      description: 'Create content that can be easily scraped by LLM Model\'s scraper bots',
    },
    {
      title: 'Ranking',
      description: 'Create content that will increase your ranking across all LLM search metrics',
    },
    {
      title: 'Unify',
      description: 'One stop shop for creating, managing and posting your brand\'s content using AI',
    },
  ];

  const tabs = [
    { id: 'visibility', label: 'Know' },
    { id: 'improve', label: 'Improve' },
    { id: 'create', label: 'Create' },
  ] as const;

  return (
    <section className="w-full bg-bg-base pt-8 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-8 flex flex-col">
      <Reveal variant="fadeUp" duration={1.5} y={30}>
        <div className="max-w-7xl mx-auto w-full">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-200 active:scale-[0.98]
                  ${
                    activeTab === tab.id
                      ? 'bg-text-primary text-bg-base shadow-[0_6px_0_0_rgba(255,255,255,0.5)] hover:shadow-[0_7px_0_0_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_0_rgba(255,255,255,0.5)]'
                      : 'text-text-muted hover:text-text-primary hover:bg-bg-surface-hover shadow-[0_4px_0_0_rgba(255,255,255,0.15)] hover:shadow-[0_5px_0_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'visibility' && (
              <div
                className="
                  rounded-2xl sm:rounded-3xl
                  px-8 pb-8 pt-2 sm:px-10 sm:pb-10 sm:pt-4 md:px-12 md:pb-12 md:pt-6 lg:px-16 lg:pb-16 lg:pt-8
                  shadow-soft-tile-glass
                  bg-bg-surface/50
                  backdrop-blur-sm
                  border border-subtle
                "
              >
                <div className="text-center mb-8 max-w-2xl mx-auto">
                  <h2 className="text-text-muted text-xl sm:text-2xl font-medium tracking-tight text-center">
                    Know what AI Models think about your brand.
                  </h2>
                </div>

                {/* Unified Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
                    {visibilityMetrics.map((metric, index) => (
                      <Reveal
                        key={metric.title}
                        variant="fadeUp"
                        delay={0.1 * (index + 1)}
                        duration={1.2}
                        y={20}
                        className="h-full"
                      >
                        <MetricCard
                          title={metric.title}
                          description={metric.description}
                          className="h-full"
                        />
                      </Reveal>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'improve' && (
              <div
                className="
                  rounded-2xl sm:rounded-3xl
                  px-8 pb-8 pt-2 sm:px-10 sm:pb-10 sm:pt-4 md:px-12 md:pb-12 md:pt-6 lg:px-16 lg:pb-16 lg:pt-8
                  shadow-soft-tile-glass
                  bg-bg-surface/50
                  backdrop-blur-sm
                  border border-subtle
                "
              >
                <div className="text-center mb-8 max-w-2xl mx-auto">
                  <h2 className="text-text-muted text-xl sm:text-2xl font-medium tracking-tight text-center">
                    Improve your brand's ranking's across all LLM Models
                  </h2>
                </div>

                {/* Unified Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
                    {improveMetrics.map((metric, index) => (
                      <Reveal
                        key={metric.title}
                        variant="fadeUp"
                        delay={0.1 * (index + 1)}
                        duration={1.2}
                        y={20}
                        className="h-full"
                      >
                        <MetricCard
                          title={metric.title}
                          description={metric.description}
                          className="h-full"
                        />
                      </Reveal>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'create' && (
              <div
                className="
                  rounded-2xl sm:rounded-3xl
                  px-8 pb-8 pt-2 sm:px-10 sm:pb-10 sm:pt-4 md:px-12 md:pb-12 md:pt-6 lg:px-16 lg:pb-16 lg:pt-8
                  shadow-soft-tile-glass
                  bg-bg-surface/50
                  backdrop-blur-sm
                  border border-subtle
                "
              >
                <div className="text-center mb-8 max-w-2xl mx-auto">
                  <h2 className="text-text-muted text-xl sm:text-2xl font-medium tracking-tight text-center">
                    Create AI first content for your brand.
                  </h2>
                </div>

                {/* Unified Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
                    {createMetrics.map((metric, index) => (
                      <Reveal
                        key={metric.title}
                        variant="fadeUp"
                        delay={0.1 * (index + 1)}
                        duration={1.2}
                        y={20}
                        className="h-full"
                      >
                        <MetricCard
                          title={metric.title}
                          description={metric.description}
                          className="h-full"
                        />
                      </Reveal>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
