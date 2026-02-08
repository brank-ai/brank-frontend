import React from 'react';
import Image from 'next/image';
import { MetricCardProps } from '@/types';
import { cn } from '@/lib/utils';
import { Tooltip } from './Tooltip';

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  info,
  className,
}) => {
  return (
    <div
      className={cn(
        // Volumetric Soft Tile Style
        'bg-bg-surface',
        'rounded-xl',
        'p-4 sm:p-6',
        'shadow-soft-tile-sm',
        'border border-subtle',
        'flex flex-col items-center justify-center',
        'transition-all duration-300',
        'hover:shadow-soft-tile',
        'h-full min-h-[120px] sm:min-h-[140px]',
        className
      )}
    >
      <div className="flex items-center gap-1 sm:gap-2 mb-3">
        <span className="text-text-muted text-[10px] sm:text-xs uppercase tracking-wider text-center font-medium leading-tight">
          {label}
        </span>
        {info && (
          <Tooltip content={info}>
            <button className="text-text-subtle hover:text-text-muted transition-colors duration-300">
              <Image
                src="/images/info.svg"
                alt="info"
                width={12}
                height={12}
                className="invert opacity-40"
              />
            </button>
          </Tooltip>
        )}
      </div>
      <div className="text-text-primary text-2xl sm:text-4xl font-medium leading-none tracking-tight text-glow">
        {value}
      </div>
    </div>
  );
};

export { MetricCard };
