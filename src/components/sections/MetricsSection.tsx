'use client';

import { Reveal } from '@/components/ui';

interface MetricCardProps {
  title: string;
  description: string;
  index: number;
}

function MetricCard({ title, description, index }: MetricCardProps) {
  return (
    <div className="relative rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all overflow-hidden group bg-black/40">
      {/* Left accent border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/70 group-hover:bg-white transition-colors" />
      
      {/* Background texture/pattern with grid */}
      <div 
        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-3">
          {title}
        </h3>
        {description && (
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
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
      title: 'Sentiment score',
      description: 'Analyze the sentiment and context of AI responses about your brand to maintain a positive reputation.',
    },
  ];

  return (
    <section className="w-full bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-8">
      <Reveal variant="fadeUp" duration={1.5} y={30}>
        <div className="max-w-7xl mx-auto">
          {/* Main container card with rounded corners */}
          <div className="bg-black rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 md:p-12 lg:p-16 border border-white/10">
            {/* Grid layout - stack on mobile, 2 columns on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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
                      index={index}
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
                      index={index + 2}
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

