'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SlowProgressBarProps {
  className?: string;
}

export function SlowProgressBar({ className }: SlowProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 100 * 1000; // 100 seconds
    const interval = 100; // Update every 100ms
    const steps = duration / interval;
    const increment = 95 / steps; // Target 95% completion

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(timer);
          return 95;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn('w-full h-1 bg-bg-surface rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-accent-success shadow-glow-cyan transition-all duration-100 ease-linear rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
