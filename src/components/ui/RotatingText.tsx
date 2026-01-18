'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LLMItem {
  name: string;
  logo: string;
}

interface RotatingTextProps {
  items: LLMItem[];
  rotationInterval?: number;
  className?: string;
}

export default function RotatingText({
  items,
  rotationInterval = 2500,
  className = ''
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setIsAnimating(false);
      }, 300);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [items.length, rotationInterval]);

  const currentItem = items[currentIndex];

  if (!currentItem) {
    return null;
  }

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Render all items, only current one visible - v2.0 gradient surface */}
      {items.map((item, index) => (
        <span
          key={item.name}
          className={`
            inline-flex items-center gap-1.5 sm:gap-2
            rounded-lg
            px-2 sm:px-3 md:px-4
            py-1.5 sm:py-2 md:py-2.5
            shadow-soft-tile-xs
            transition-opacity duration-300
            ${index === currentIndex
              ? (isAnimating ? 'opacity-0' : 'opacity-100')
              : 'absolute left-0 top-0 opacity-0 pointer-events-none'
            }
          `}
          style={{
            visibility: index === currentIndex ? 'visible' : 'hidden'
          }}
        >
          <span className="text-text-primary font-medium whitespace-nowrap tracking-tight">
            {item.name}
          </span>
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 object-contain"
          />
        </span>
      ))}
    </span>
  );
}
