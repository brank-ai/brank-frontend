'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PricingCard } from '@/components/pricing/PricingCard';
import { Reveal } from '@/components/ui';

const pricingTiers = [
  {
    title: 'Lite',
    price: '$99',
    period: 'month',
    badge: 'For early teams',
    description: 'Get started with AI visibility tracking.',
    features: [
      'Track brand analytics across ChatGPT',
      '1 brand',
      'Track Mentions',
      'Competitor Comparision',
      'Sentiment analysis',
      '100 custom prompts',
    ],
    ctaText: 'Contact Us',
    isPopular: false,
  },
  {
    title: 'Pro',
    price: '$199',
    period: 'month',
    badge: 'Most Popular',
    isPopular: true,
    description: 'For growth teams serious about AI search.',
    features: [
      'Track across ChatGPT, Claude, Gemini, Perplexity, Grok',
      'Up to 5 brands',
      'Daily visibility tracking',
      'Prompt-level analytics',
      'Citation & source analysis',
      'Export reports (CSV / PDF)',
      'Content recommendations for LLM pickup',
    ],
    ctaText: 'Contact Us',
  },
  {
    title: 'Advanced',
    price: 'Custom',
    badge: 'Enterprise',
    description: 'Custom AEO infrastructure for serious brands.',
    features: [
      'Unlimited brands',
      'Custom AI engine coverage',
      'Fine-tuned prompt monitoring',
      'Automated Content creation',
      'Deploy ChatGpt app for your brand',
      'API access',
      'Dedicated Slack / support',
    ],
    ctaText: 'Contact Us',
    isPopular: false,
  },
];

export default function PricingPage() {
  const handleCtaClick = () => {
    // TODO: Add action later
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24">
        {/* Hero Section */}
        <Reveal variant="fadeIn" duration={1.0} initiallyVisible>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 sm:mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Choose the plan that's right for your team. All plans include a
              14-day free trial.
            </p>
          </div>
        </Reveal>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Reveal
              key={tier.title}
              variant="fadeUp"
              delay={0.1 * (index + 1)}
              duration={1.0}
              y={20}
              initiallyVisible
            >
              <PricingCard
                title={tier.title}
                price={tier.price}
                period={tier.period}
                badge={tier.badge}
                description={tier.description}
                features={tier.features}
                ctaText={tier.ctaText}
                isPopular={tier.isPopular}
                onCtaClick={handleCtaClick}
              />
            </Reveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
