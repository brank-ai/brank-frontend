'use client';

import { useState, useRef, useEffect, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'auto';
}

export function Tooltip({
  content,
  children,
  position = 'auto',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>(
    'bottom'
  );

  // Initialize with opacity 0 to prevent "jumping" or appearing in the wrong spot
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({
    opacity: 0,
    position: 'fixed',
    top: 0,
    left: 0,
  });

  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});
  const [showDelayTimeout, setShowDelayTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use useLayoutEffect for UI measurements (runs before paint)
  useLayoutEffect(() => {
    const updatePosition = () => {
      if (isVisible && triggerRef.current && tooltipRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportPadding = 16;

        // Determine vertical position
        let verticalPos: 'top' | 'bottom' = 'bottom';
        if (position === 'auto') {
          const spaceBelow = window.innerHeight - triggerRect.bottom;
          verticalPos = spaceBelow > 100 ? 'bottom' : 'top';
        } else {
          verticalPos = position;
        }
        setTooltipPosition(verticalPos);

        // Calculate max width for mobile
        const maxWidth = viewportWidth - viewportPadding * 2;
        const tooltipWidth = Math.min(tooltipRect.width, maxWidth);

        // Calculate left position - center on trigger but constrain to viewport
        let left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;

        // Constrain to viewport
        if (left < viewportPadding) {
          left = viewportPadding;
        }
        if (left + tooltipWidth > viewportWidth - viewportPadding) {
          left = viewportWidth - tooltipWidth - viewportPadding;
        }

        // Calculate top position
        let top: number;
        if (verticalPos === 'bottom') {
          top = triggerRect.bottom + 8;
        } else {
          top = triggerRect.top - tooltipRect.height - 8;
        }

        // Arrow position relative to tooltip
        const triggerCenterX = triggerRect.left + triggerRect.width / 2;
        const arrowLeft = Math.max(
          12,
          Math.min(triggerCenterX - left, tooltipWidth - 12)
        );

        // Max width: 150px on mobile, 200px on desktop
        const tooltipMaxWidth = viewportWidth < 640 ? 200 : 250;

        setTooltipStyle({
          position: 'fixed',
          top: `${top}px`,
          left: `${left}px`,
          maxWidth: `${tooltipMaxWidth}px`,
          width: 'auto',
          opacity: 1, // Make visible only AFTER position is set
          transition: 'opacity 0.2s ease-in-out', // Smooth entry
        });

        setArrowStyle({
          left: `${arrowLeft}px`,
        });
      }
    };

    if (isVisible) {
      updatePosition();
      // Add listeners to update position on scroll/resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      // Reset opacity when closed so it doesn't flash on next open
      setTooltipStyle(prev => ({ ...prev, opacity: 0 }));
      return undefined;
    }
  }, [isVisible, position, content]); // Added content dependency in case content changes size

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    setShowDelayTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (showDelayTimeout) {
      clearTimeout(showDelayTimeout);
      setShowDelayTimeout(null);
    }
    setIsVisible(false);
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }

    return undefined;
  }, [isVisible]);

  const tooltipContent =
    isVisible && mounted ? (
      <div
        ref={tooltipRef}
        className={cn(
          'z-[9999]',
          'px-3 py-2 rounded-lg',
          'bg-bg-elevated border border-subtle shadow-soft-tile',
          'text-text-primary text-xs leading-relaxed'
          // Removed 'animate-scaleIn' because we are handling opacity manually
          // to avoid animation conflicts with positioning
        )}
        style={tooltipStyle}
      >
        {content}
        {/* Arrow */}
        <div
          className={cn(
            'absolute w-2 h-2 rotate-45 -translate-x-1/2',
            'bg-bg-elevated border-subtle',
            tooltipPosition === 'top'
              ? 'bottom-[-5px] border-r border-b'
              : 'top-[-5px] border-l border-t'
          )}
          style={arrowStyle}
        />
      </div>
    ) : null;

  return (
    <div className="relative inline-flex items-center">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="cursor-pointer"
      >
        {children}
      </div>
      {mounted && tooltipContent && createPortal(tooltipContent, document.body)}
    </div>
  );
}
