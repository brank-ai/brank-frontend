export const blogTheme = {
  colors: {
    bgBase: '#050505',
    bgSurface: '#111111',
    bgSurfaceLight: '#161616',
    bgElevated: '#1a1a1a',
    bgDepressed: '#000000',
    accent: '#00A8FF',
    accentHover: '#33AAFF',
    textPrimary: '#F0F0F0',
    textSecondary: '#D0D0D0',
    textMuted: '#888888',
    textSubtle: '#666666',
    borderSubtle: 'rgba(255, 255, 255, 0.02)',
    borderVisible: 'rgba(255, 255, 255, 0.05)',
    borderHover: 'rgba(255, 255, 255, 0.08)',
  },
  shadows: {
    softTile:
      'inset 1px 1px 0px rgba(255, 255, 255, 0.08), -12px -12px 30px rgba(255, 255, 255, 0.06), 12px 12px 30px rgba(0, 0, 0, 0.9)',
    softTileSm:
      'inset 1px 1px 0px rgba(255, 255, 255, 0.08), -6px -6px 16px rgba(255, 255, 255, 0.05), 6px 6px 16px rgba(0, 0, 0, 0.85)',
    softTileXs:
      'inset 1px 1px 0px rgba(255, 255, 255, 0.06), -3px -3px 8px rgba(255, 255, 255, 0.04), 3px 3px 8px rgba(0, 0, 0, 0.8)',
    deepField:
      'inset 0 1px 0px rgba(0, 0, 0, 0.5), inset 4px 4px 12px rgba(0, 0, 0, 0.95), inset -2px -2px 8px rgba(255, 255, 255, 0.02)',
  },
  gradients: {
    surface: 'linear-gradient(145deg, #161616, #121212)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  fonts: {
    sans: 'var(--font-geist-sans), Geist Sans, Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    mono: 'var(--font-geist-mono), Geist Mono, Fira Code, Consolas, monospace',
    serif: 'Georgia, Times New Roman, serif',
  },
} as const;
