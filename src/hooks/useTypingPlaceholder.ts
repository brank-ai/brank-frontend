import { useState, useEffect, useRef } from 'react';

const TYPING_SPEED = 40;
const DELETING_SPEED = 20;
const PAUSE_AFTER_TYPING = 1000;
const PAUSE_AFTER_DELETING = 100;

/**
 * Hook that produces a typewriter effect cycling through an array of strings.
 * Returns the current text to use as a placeholder.
 *
 * Cycle: type phrase -> pause -> delete -> pause -> next phrase -> repeat
 */
export function useTypingPlaceholder(phrases: string[]): string {
  const [displayText, setDisplayText] = useState('');
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const step = () => {
      const current = phrases[phraseIndex.current] || '';

      if (!isDeleting.current) {
        // Typing forward
        charIndex.current += 1;
        setDisplayText(current.slice(0, charIndex.current));

        if (charIndex.current >= current.length) {
          // Finished typing — pause then start deleting
          isDeleting.current = true;
          timeoutRef.current = setTimeout(step, PAUSE_AFTER_TYPING);
          return;
        }

        timeoutRef.current = setTimeout(step, TYPING_SPEED);
      } else {
        // Deleting
        charIndex.current -= 1;
        setDisplayText(current.slice(0, charIndex.current));

        if (charIndex.current <= 0) {
          // Finished deleting — move to next phrase
          isDeleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
          timeoutRef.current = setTimeout(step, PAUSE_AFTER_DELETING);
          return;
        }

        timeoutRef.current = setTimeout(step, DELETING_SPEED);
      }
    };

    // Start with a small initial delay
    timeoutRef.current = setTimeout(step, PAUSE_AFTER_DELETING);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phrases]);

  return displayText;
}
