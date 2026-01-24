'use client';

import { Reveal } from '@/components/ui';

interface MetricCardProps {
  title: string;
  description: string;
}

function MetricCard({ title, description }: MetricCardProps) {
  return (
    <div
      className="
        relative
        rounded-xl
        p-6 sm:p-8
        shadow-soft-tile-sm
        overflow-hidden
        group
        transition-all duration-300
        hover:shadow-soft-tile
      "
    >
      {/* Left accent LED indicator */}
      <div
        className="
          absolute left-0 top-0 bottom-0 w-1
          bg-text-muted/30
          group-hover:bg-brand-blue-500
          group-hover:shadow-glow-cyan
          transition-all duration-300
        "
      />

      {/* Subtle grid pattern texture */}
      <div
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
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
      <div className="relative z-10 pl-4">
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

export default function MetricsSection() {
  const metrics = [
    {
      title: 'Mentions',
      description: 'Track how frequently your brand is mentioned across AI platforms and understand your visibility in AI-generated responses.',
    },
    {
      title: 'Compare with competitors',
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

  return (
    <section className="w-full bg-bg-base py-16 sm:py-20 md:py-24 px-4 sm:px-8">
      <Reveal variant="fadeUp" duration={1.5} y={30}>
        <div className="max-w-7xl mx-auto">
          {/* Main container - Soft Tile Style v2.0 */}
          <div
            className="
              rounded-2xl sm:rounded-3xl
              p-8 sm:p-10 md:p-12 lg:p-16
              shadow-soft-tile
            "
          >
            {/* Grid layout - stack on mobile, 2 columns on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left column - stacked cards */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {metrics.slice(0, 2).map((metric, index) => (
                  <Reveal
                    key={metric.title}
                    variant="fadeUp"
                    delay={0.1 * (index + 1)}
                    duration={1.2}
                    y={20}
                  >
                    <MetricCard
                      title={metric.title}
                      description={metric.description}
                    />
                  </Reveal>
                ))}
              </div>

              {/* Right column - stacked cards */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {metrics.slice(2, 4).map((metric, index) => (
                  <Reveal
                    key={metric.title}
                    variant="fadeUp"
                    delay={0.1 * (index + 3)}
                    duration={1.2}
                    y={20}
                  >
                    <MetricCard
                      title={metric.title}
                      description={metric.description}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
