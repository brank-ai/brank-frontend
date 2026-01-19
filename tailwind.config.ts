import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy support
        background: "var(--background)",
        foreground: "var(--foreground)",
        'accent-teal': "var(--accent-teal)",
        'card-bg': "var(--card-bg)",
        'header-bg': "var(--header-bg)",

        // Design System v2.0: Base Colors
        'bg-base': '#050505',
        'bg-surface': '#111111',
        'bg-surface-light': '#161616',
        'bg-elevated': '#1a1a1a',
        'bg-depressed': '#000000', // Pure black for v2.0
        
        // Design System v2.0: Accent Colors
        'accent-success': 'var(--accent-success)',
        'accent-warning': 'var(--accent-warning)',
        'accent-error': 'var(--accent-error)',
        'accent-info': 'var(--accent-info)',

        // Design System v2.0: Text Colors (Brighter)
        'text-primary': '#F0F0F0',
        'text-secondary': '#D0D0D0',
        'text-muted': '#888888',
        'text-subtle': '#666666',

        // Design System: Shadow Colors (for reference)
        'shadow-light': '#1f1f1f',
        'shadow-dark': '#050505',
      },
      backgroundImage: {
        // Design System v2.0: Gradient Surfaces
        'gradient-surface': 'linear-gradient(145deg, #161616, #121212)',
        'gradient-surface-light': 'linear-gradient(145deg, #1a1a1a, #151515)',
        'gradient-button': 'linear-gradient(145deg, #181818, #0f0f0f)',
        'gradient-button-hover': 'linear-gradient(145deg, #1c1c1c, #141414)',
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'sans': ['var(--font-geist-sans)', 'Geist Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'Geist Mono', 'Fira Code', 'Consolas', 'monospace'],
        'mackinac': ['P22 Mackinac Pro', 'serif'],
        'roboto': ['Roboto Flex', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'snug': '-0.01em',
      },
      boxShadow: {
        // Design System v2.0: Volumetric Shadows - Soft Tile (Raised) with Rim Lighting
        'soft-tile': 'inset 1px 1px 0px rgba(255, 255, 255, 0.08), -12px -12px 30px rgba(255, 255, 255, 0.06), 12px 12px 30px rgba(0, 0, 0, 0.9)',
        'soft-tile-sm': 'inset 1px 1px 0px rgba(255, 255, 255, 0.08), -6px -6px 16px rgba(255, 255, 255, 0.05), 6px 6px 16px rgba(0, 0, 0, 0.85)',
        'soft-tile-xs': 'inset 1px 1px 0px rgba(255, 255, 255, 0.06), -3px -3px 8px rgba(255, 255, 255, 0.04), 3px 3px 8px rgba(0, 0, 0, 0.8)',

        // Design System v2.0: Deep Field (Depressed) with Edge Lighting
        'deep-field': 'inset 0 1px 0px rgba(0, 0, 0, 0.5), inset 4px 4px 12px rgba(0, 0, 0, 0.95), inset -2px -2px 8px rgba(255, 255, 255, 0.02)',
        'deep-field-lg': 'inset 0 1px 0px rgba(0, 0, 0, 0.5), inset 6px 6px 18px rgba(0, 0, 0, 0.95), inset -3px -3px 12px rgba(255, 255, 255, 0.02)',
        'deep-field-sm': 'inset 0 1px 0px rgba(0, 0, 0, 0.4), inset 2px 2px 6px rgba(0, 0, 0, 0.9), inset -1px -1px 4px rgba(255, 255, 255, 0.02)',

        // Design System v2.0: Ridge (Subtle)
        'ridge': 'inset 1px 1px 0px rgba(255, 255, 255, 0.05), 4px 4px 8px rgba(0, 0, 0, 0.6), -4px -4px 8px rgba(255, 255, 255, 0.03)',

        // Glow Effects
        'glow-green': '0 0 10px rgba(34, 197, 94, 0.6)',
        'glow-blue': '0 0 10px rgba(59, 130, 246, 0.6)',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.2)',
        'glow-white-lg': '0 0 40px rgba(255, 255, 255, 0.3)',
      },
      keyframes: {
        'shine-wave': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'shine-wave-slow': {
          '0%': { backgroundPosition: '-400% center' },
          '100%': { backgroundPosition: '400% center' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(34, 197, 94, 0.6)' },
          '50%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'shine-wave': 'shine-wave 3s linear infinite',
        'shine-wave-slow': 'shine-wave-slow 8s linear infinite',
        'fade-in': 'fadeIn 500ms ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'hover-lift': 'hoverLift 300ms ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
