import React from 'react';
import Image from 'next/image';
import { CitationCardProps } from '@/types';
import { cn } from '@/lib/utils';

const CitationCard: React.FC<CitationCardProps> = ({ llm, className }) => {
  return (
    <div
      className={cn(
        'bg-gray-900 border border-gray-800 rounded-lg p-6',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image
            src={llm.icon}
            alt={llm.name}
            width={24}
            height={24}
            className="object-contain"
          />
          <h4 className="text-white text-lg font-medium">{llm.name}</h4>
        </div>
        <span className="text-white text-xl font-bold">{llm.total}</span>
      </div>

      {/* Subtitle */}
      <p className="text-gray-500 text-xs mb-4">{llm.subtitle}</p>

      {/* Sources */}
      <div className="space-y-2">
        {llm.sources.map((source, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
          >
            <span className="text-gray-300 text-sm">{source.url}</span>
            <span className="text-gray-400 text-sm">{source.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CitationCard };

