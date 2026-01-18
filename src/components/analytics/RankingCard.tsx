import React from 'react';
import Image from 'next/image';
import { RankingCardProps, BrandRank, LLMRank } from '@/types';
import { cn } from '@/lib/utils';

const RankingCard: React.FC<RankingCardProps> = ({
  title,
  subtitle,
  items,
  type,
  className,
}) => {
  return (
    <div
      className={cn(
        // Soft Tile Style v2.0
        'rounded-xl',
        'shadow-soft-tile-sm',
        'p-6',
        className
      )}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
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
          <h4 className="text-text-primary text-lg font-medium tracking-tight">{title}</h4>
        </div>
        {subtitle && (
          <p className="text-text-subtle text-xs ml-6">{subtitle}</p>
        )}
      </div>

      {/* Items */}
      <div className="space-y-2">
        {type === 'brand' &&
          (items as BrandRank[]).map((item, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center justify-between py-2 transition-all duration-300',
                item.isUser && 'bg-bg-elevated -mx-2 px-2 rounded-lg shadow-deep-field-sm'
              )}
            >
              <span
                className={cn(
                  'text-sm',
                  item.isUser ? 'text-text-primary font-medium' : 'text-text-secondary'
                )}
              >
                {item.name}
              </span>
              <span
                className={cn(
                  'text-sm',
                  item.isUser ? 'text-text-primary font-medium' : 'text-text-muted'
                )}
              >
                #{item.rank}
              </span>
            </div>
          ))}

        {type === 'llm' &&
          (items as LLMRank[]).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span className="text-text-secondary text-sm">{item.name}</span>
              </div>
              <span className="text-text-primary text-sm font-medium">
                #{item.rank}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export { RankingCard };
