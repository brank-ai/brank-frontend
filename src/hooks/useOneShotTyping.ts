import { useState, useEffect, useRef } from 'react';

const DEFAULT_SPEED = 40; // ms per character
const DEFAULT_START_DELAY = 200; // ms before typing starts

interface UseOneShotTypingOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
}

interface UseOneShotTypingReturn {
  displayText: string;
  isTyping: boolean;
  isComplete: boolean;
}

/**
 * Hook that types out a string once, character by character.
 * Resets and re-types when `text` changes or `enabled` toggles.
 * Respects prefers-reduced-motion by showing full text immediately.
 */
export function useOneShotTyping({
  text,
  speed = DEFAULT_SPEED,
  startDelay = DEFAULT_START_DELAY,
  enabled = true,
}: UseOneShotTypingOptions): UseOneShotTypingReturn {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const charIndex = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const prefersReducedMotion = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
    }
  }, []);

  useEffect(() => {
    // Clean up any running animation
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Reset state
    charIndex.current = 0;
    setDisplayText('');
    setIsComplete(false);

    if (!enabled || !text) {
      setIsTyping(false);
      return;
    }

    // If reduced motion, show full text immediately
    if (prefersReducedMotion.current) {
      setDisplayText(text);
      setIsTyping(false);
      setIsComplete(true);
      return;
    }

    setIsTyping(true);

    const type = () => {
      charIndex.current += 1;
      setDisplayText(text.slice(0, charIndex.current));

      if (charIndex.current >= text.length) {
        setIsTyping(false);
        setIsComplete(true);
        return;
      }

      timeoutRef.current = setTimeout(type, speed);
    };

    // Start after a delay
    timeoutRef.current = setTimeout(type, startDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, startDelay, enabled]);

  return { displayText, isTyping, isComplete };
}
