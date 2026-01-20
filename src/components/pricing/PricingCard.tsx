'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  badge?: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  onCtaClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  badge,
  description,
  features,
  ctaText,
  isPopular = false,
  onCtaClick,
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col',
        'rounded-2xl p-6 sm:p-8',
        'bg-bg-elevated',
        'border transition-all duration-300',
        isPopular
          ? 'border-green-500/50 shadow-soft-tile hover:shadow-soft-tile-sm hover:border-green-500/70 scale-105 sm:scale-110'
          : 'border-subtle shadow-soft-tile-sm hover:shadow-soft-tile hover:border-white/20',
        'group'
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-green-500 text-bg-base px-4 py-1 rounded-full text-xs font-semibold shadow-glow-green">
            {badge}
          </div>
        </div>
      )}

      {/* Badge for non-popular plans */}
      {!isPopular && badge && (
        <div className="mb-4">
          <span className="text-text-muted text-xs font-medium uppercase tracking-wider">
            {badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-text-primary text-2xl sm:text-3xl font-semibold mb-2">
        {title}
      </h3>

      {/* Price */}
      <div className="mb-4">
        {price === 'Custom' ? (
          <div className="text-text-primary text-4xl sm:text-5xl font-bold">
            Custom
          </div>
        ) : (
          <div className="flex items-baseline">
            <span className="text-text-primary text-4xl sm:text-5xl font-bold">
              {price}
            </span>
            {period && (
              <span className="text-text-muted text-lg ml-2">/ {period}</span>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-text-muted text-sm sm:text-base mb-6 sm:mb-8">
        {description}
      </p>

      {/* CTA Button */}
      <Button
        variant={isPopular ? 'white' : 'primary'}
        size="lg"
        className="w-full mb-6 sm:mb-8"
        onClick={onCtaClick}
      >
        {ctaText}
      </Button>

      {/* Features List */}
      <div className="flex-1">
        <ul className="space-y-3 sm:space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-text-secondary text-sm sm:text-base leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative gradient overlay on hover */}
      {isPopular && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
};

export { PricingCard };

