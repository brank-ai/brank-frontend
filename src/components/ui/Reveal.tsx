'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

export type RevealVariant = 'fadeUp' | 'fadeIn' | 'scaleIn';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Animation style preset.
   */
  variant?: RevealVariant;
  /**
   * Delay in seconds.
   */
  delay?: number;
  /**
   * Duration in seconds.
   */
  duration?: number;
  /**
   * Vertical offset (px) for fadeUp.
   */
  y?: number;
  /**
   * Viewport threshold (0..1) before triggering.
   */
  amount?: number;
  /**
   * Whether to animate only the first time it enters the viewport.
   */
  once?: boolean;
  /**
   * Use for above-the-fold content to avoid initial hidden state before hydration.
   * When true, the content will render visible immediately (no reveal animation).
   */
  initiallyVisible?: boolean;
}

function getPreset({
  variant,
  y,
  reduceMotion,
}: {
  variant: RevealVariant;
  y: number;
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return {
      initial: { opacity: 1, y: 0, scale: 1 },
      animate: { opacity: 1, y: 0, scale: 1 },
    };
  }

  switch (variant) {
    case 'fadeIn':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };
    case 'scaleIn':
      return {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
      };
    case 'fadeUp':
    default:
      return {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
      };
  }
}

export function Reveal({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.9,
  y = 24,
  amount = 0.15,
  once = true,
  initiallyVisible = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const preset = getPreset({ variant, y, reduceMotion });

  return (
    <motion.div
      className={cn(className)}
      initial={initiallyVisible ? preset.animate : preset.initial}
      whileInView={preset.animate}
      viewport={{ once, amount }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}


