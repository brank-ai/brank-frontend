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
        'bg-[#2F2F2F33] border border-gray-800 p-3 sm:p-6 flex flex-col items-center justify-center',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider text-center">
          {label}
        </span>
        {info && (
          <button
            className="text-gray-500 hover:text-gray-300 transition-colors"
            title={info}
          >
            <svg
              width="12"
              height="12"
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
      <div className="text-white text-2xl sm:text-4xl font-bold leading-none">{value}</div>
    </div>
  );
};

export { MetricCard };

