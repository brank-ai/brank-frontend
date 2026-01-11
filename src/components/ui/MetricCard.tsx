import React from 'react';
import { MetricCardProps } from '@/types';
import { cn } from '@/lib/utils';

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  info,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-gray-900 border border-gray-800 rounded-lg p-6 flex flex-col items-center justify-center',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          {label}
        </span>
        {info && (
          <button
            className="text-gray-500 hover:text-gray-300 transition-colors"
            title={info}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
        )}
      </div>
      <div className="text-white text-4xl font-bold">{value}</div>
    </div>
  );
};

export { MetricCard };

