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
        'bg-gray-900 border border-gray-800 rounded-lg p-6',
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
            className="text-gray-400"
          >
            <path
              d="M3 13h8v8H3v-8zm10-10h8v18h-8V3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4 className="text-white text-lg font-medium">{title}</h4>
        </div>
        {subtitle && (
          <p className="text-gray-500 text-xs ml-6">{subtitle}</p>
        )}
      </div>

      {/* Items */}
      <div className="space-y-2">
        {type === 'brand' &&
          (items as BrandRank[]).map((item, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center justify-between py-2',
                item.isUser && 'bg-gray-800 -mx-2 px-2 rounded'
              )}
            >
              <span
                className={cn(
                  'text-sm',
                  item.isUser ? 'text-white font-medium' : 'text-gray-300'
                )}
              >
                {item.name}
              </span>
              <span
                className={cn(
                  'text-sm',
                  item.isUser ? 'text-white font-bold' : 'text-gray-400'
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
                <span className="text-gray-300 text-sm">{item.name}</span>
              </div>
              <span className="text-white text-sm font-medium">
                #{item.rank}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export { RankingCard };

