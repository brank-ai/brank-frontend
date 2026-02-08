import React from 'react';
import { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-lg font-medium
    transition-all duration-300
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
    disabled:pointer-events-none disabled:opacity-50
  `;

  const variants = {
    // Primary - Volumetric Soft Tile v2.0 (Raised with gradient)
    primary: `
      bg-bg-surface
      text-text-primary
      border border-subtle
      shadow-soft-tile-sm
      hover:brightness-110
      active:shadow-deep-field-sm
      active:scale-[0.98]
    `,
    // Secondary - Subtle Ridge Style v2.0
    secondary: `
      text-text-secondary
      shadow-ridge
      hover:brightness-110
      hover:text-text-primary
      active:shadow-deep-field-sm
      active:scale-[0.98]
    `,
    // Outline - Minimal with subtle border
    outline: `
      bg-transparent
      text-text-muted
      border border-subtle
      hover:shadow-soft-tile-xs
      hover:text-text-primary
      hover:border-white/[0.08]
      active:shadow-deep-field-sm
      active:scale-[0.98]
    `,
    // Ghost - No background, text only
    ghost: `
      bg-transparent
      text-text-muted
      hover:shadow-soft-tile-xs
      hover:text-text-primary
      active:bg-bg-depressed
      active:scale-[0.98]
    `,
    // White - High contrast (for dark backgrounds)
    white: `
      bg-text-primary
      text-bg-base
      shadow-soft-tile-xs
      hover:bg-text-secondary
      active:shadow-deep-field-sm
      active:scale-[0.98]
    `,
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
  };

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export { Button };
