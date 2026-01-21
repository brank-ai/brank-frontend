'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'auto';
}

export function Tooltip({ content, children, position = 'auto' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>('top');
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});
  const [showDelayTimeout, setShowDelayTimeout] = useState<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate position based on available space and prevent overflow
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportPadding = 16; // 16px padding from edges
      
      // Determine vertical position
      let verticalPos: 'top' | 'bottom' = 'top';
      if (position === 'auto') {
        const spaceAbove = triggerRect.top;
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        verticalPos = spaceAbove > spaceBelow ? 'top' : 'bottom';
      } else {
        verticalPos = position;
      }
      setTooltipPosition(verticalPos);
      
      // Calculate horizontal positioning to prevent overflow
      const tooltipWidth = tooltipRect.width;
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      
      // Calculate ideal left position (centered)
      let leftOffset = triggerCenter - tooltipWidth / 2;
      
      // Check if tooltip would overflow on the left
      if (leftOffset < viewportPadding) {
        leftOffset = viewportPadding;
      }
      
      // Check if tooltip would overflow on the right
      if (leftOffset + tooltipWidth > viewportWidth - viewportPadding) {
        leftOffset = viewportWidth - tooltipWidth - viewportPadding;
      }
      
      // Calculate transform to position relative to trigger
      const translateX = leftOffset - triggerRect.left;
      
      // Calculate arrow position (should point to center of trigger)
      const arrowLeft = triggerRect.width / 2 - translateX;
      
      setTooltipStyle({
        transform: `translateX(${translateX}px)`,
        maxWidth: `${Math.min(320, viewportWidth - viewportPadding * 2)}px`,
      });
      
      setArrowStyle({
        left: `${arrowLeft}px`,
        transform: 'translateX(-50%)',
      });
    }
  }, [isVisible, position]);

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
    // Toggle on mobile
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
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return undefined;
  }, [isVisible]);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="cursor-pointer"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute left-0 z-50',
            'px-3 py-2 rounded-lg',
            'bg-bg-elevated border border-subtle shadow-soft-tile-xs',
            'text-text-primary text-xs leading-relaxed',
            'w-max',
            'animate-scaleIn',
            'pointer-events-none',
            tooltipPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
          style={tooltipStyle}
        >
          {content}
          
          {/* Arrow/pointer - centered relative to trigger */}
          <div
            className={cn(
              'absolute w-2 h-2 rotate-45',
              'bg-bg-elevated border-subtle',
              tooltipPosition === 'top'
                ? 'bottom-[-4px] border-r border-b'
                : 'top-[-4px] border-l border-t'
            )}
            style={arrowStyle}
          />
        </div>
      )}
    </div>
  );
}

