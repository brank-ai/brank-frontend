'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
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

const SCROLL_DURATION = 400; // ms to scroll between items
const PAUSE_DURATION = 1000; // ms to pause on each item

export default function RotatingText({
  items,
  className = '',
}: RotatingTextProps) {
  const trackRef = useRef<HTMLSpanElement>(null);
  const [itemHeight, setItemHeight] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const currentIndex = useRef(0);

  // Duplicate for seamless loop
  const loopItems = [...items, ...items];

  // Measure actual rendered height of one item
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const firstItem = trackRef.current.children[0] as HTMLElement | undefined;
      if (firstItem) {
        setItemHeight(firstItem.offsetHeight);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Step animation: pause -> scroll -> pause -> scroll -> ...
  const step = useCallback(() => {
    if (itemHeight === 0) return;

    // Start scrolling to next item
    setIsScrolling(true);
    currentIndex.current += 1;
    setOffset(currentIndex.current * itemHeight);

    // After scroll completes, check if we need to reset
    setTimeout(() => {
      setIsScrolling(false);

      // When we've scrolled past all originals, snap back to start
      if (currentIndex.current >= items.length) {
        // Disable transition momentarily for invisible reset
        currentIndex.current = 0;
        // Use rAF to ensure the transition:none takes effect before resetting
        requestAnimationFrame(() => {
          setOffset(0);
        });
      }
    }, SCROLL_DURATION);
  }, [itemHeight, items.length]);

  useEffect(() => {
    if (itemHeight === 0) return;

    const interval = setInterval(step, SCROLL_DURATION + PAUSE_DURATION);
    return () => clearInterval(interval);
  }, [step, itemHeight]);

  return (
    <span
      className={`relative inline-flex overflow-hidden align-middle ${className}`}
      style={{
        height: itemHeight || undefined,
        minHeight: '1.3em',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
      }}
    >
      <span
        ref={trackRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          willChange: 'transform',
          transform: `translateY(-${offset}px)`,
          transition: isScrolling
            ? `transform ${SCROLL_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
        }}
      >
        {loopItems.map((item, index) => (
          <span
            key={`${item.name}-${index}`}
            className="inline-flex items-center gap-1.5 sm:gap-2 justify-center md:justify-start"
            style={{
              height: '1.3em',
              lineHeight: '1.3em',
              flexShrink: 0,
            }}
          >
            <Image
              src={item.logo}
              alt={`${item.name} logo`}
              width={24}
              height={24}
              className="w-4 h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 shrink-0 object-contain"
            />
            <span className="text-text-primary font-medium whitespace-nowrap tracking-tight">
              {item.name}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
