# Brank Design System: "High-Fidelity Volumetric"

> **Version 2.0 (High Contrast Update)** - A comprehensive design system for the Brank frontend. This version increases visual definition using "Rim Lighting" and sharper shadow falls.

---

## Table of Contents

1. [High-Level Philosophy](#1-high-level-philosophy)
2. [Color Palette](#2-color-palette)
3. [Volumetric Shadow Tokens](#3-volumetric-shadow-tokens)
4. [Typography](#4-typography)
5. [Spacing & Layout](#5-spacing--layout)
6. [Component Patterns](#6-component-patterns)
7. [Animation & Transitions](#7-animation--transitions)
8. [Tailwind Configuration](#8-tailwind-configuration)
9. [CSS Utility Classes](#9-css-utility-classes)
10. [Usage Examples](#10-usage-examples)

---

## 1. High-Level Philosophy

This design system, codenamed **"High-Fidelity Volumetric,"** emphasizes tactile interactions. We have moved from "soft" shadows to "defined" physics.

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Rim Lighting** | Every raised element has a 1px sharp highlight on the top-left edge. This defines the shape. |
| **Deep Contrast** | Shadows are pitch black. Highlights are white (low opacity). This creates maximum depth. |
| **Tactility** | Buttons and cards should look like distinct physical keys on a control board. |

### Design Mantras

- "Define the edges" - Sharp rim lights over soft glows
- "Control board aesthetic" - Elements look like physical switches and keys
- "Maximum depth" - Pure black shadows, white alpha highlights

---

## 2. Color Palette

We have slightly lightened the surface color to create more separation from the background.

### Primary Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `bg-base` | `#050505` | `rgb(5, 5, 5)` | The desk surface / page background |
| `bg-surface` | `#141414` | `rgb(20, 20, 20)` | **(Updated)** Slightly lighter to pop against black |
| `bg-surface-light` | `#1A1A1A` | `rgb(26, 26, 26)` | Lighter surface variant |
| `bg-elevated` | `#1E1E1E` | `rgb(30, 30, 30)` | Hover states, elevated surfaces |
| `bg-depressed` | `#000000` | `rgb(0, 0, 0)` | **(Updated)** Pure black for deepest inputs |

### Text Colors

| Token | Hex | Opacity | Usage |
|-------|-----|---------|-------|
| `text-primary` | `#F0F0F0` | 100% | **(Updated)** Brighter white for contrast |
| `text-secondary` | `#A3A3A3` | 100% | Secondary text, descriptions |
| `text-muted` | `#666666` | 100% | Labels, captions, hints |
| `text-subtle` | `#4A4A4A` | 100% | Disabled states, very subtle text |

### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-success` | `#22C55E` | Small LED indicators only, success states |
| `accent-warning` | `#F59E0B` | Warning indicators |
| `accent-error` | `#EF4444` | Error states |
| `accent-info` | `#3B82F6` | Information indicators |

### Color Rules

```
✅ DO:
- Use bg-base (#050505) as the primary page background
- Use bg-surface (#141414) for raised elements - it's lighter now
- Use pure black (#000000) for depressed/input fields
- Use brighter text (#F0F0F0) for high contrast

❌ DON'T:
- Use flat colors without gradients on cards
- Skip the rim light (inset highlight)
- Use old grey highlights - use white alpha instead
```

---

## 3. Volumetric Shadow Tokens

**MAJOR UPDATE:** All shadows now include an inset value (Rim Light) to define the edges.

### Shadow Comparison

| Property | Old System | New System |
|----------|------------|------------|
| Highlights | Dark Grey (`#1f1f1f`) | White Alpha (`rgba(255,255,255,0.08)`) |
| Blur | Wide (60px) | Tight (30px) |
| Edges | None | 1px Inset Bevel (Rim Light) |
| Surface | Flat Color | Subtle Gradient |

### A. The "Tactile Tile" (Raised Card)

**Used for:** Feature cards, containers, large buttons.

**Change:** Added 1px inner light, tighter blur, brighter outer highlight.

```css
/* CSS */
.shadow-soft-tile {
  background: linear-gradient(145deg, #161616, #121212); /* Subtle surface curve */
  box-shadow:
    /* The Rim Light (Sharp Edge) */
    inset 1px 1px 0px rgba(255, 255, 255, 0.08),
    /* Top Left Highlight (Soft) */
    -12px -12px 30px rgba(255, 255, 255, 0.06),
    /* Bottom Right Shadow (Deep) */
    12px 12px 30px rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.02);
}

/* Tailwind Arbitrary Value */
bg-gradient-to-br from-[#161616] to-[#121212]
shadow-[inset_1px_1px_0px_rgba(255,255,255,0.08),-12px_-12px_30px_rgba(255,255,255,0.06),12px_12px_30px_rgba(0,0,0,0.9)]
```

### B. The "Control Button" (Small Raised)

**Used for:** Primary CTAs, toggles.

**Change:** Very sharp definition. Looks like a plastic key.

```css
/* CSS */
.shadow-soft-tile-sm {
  background: linear-gradient(145deg, #1A1A1A, #141414);
  box-shadow:
    inset 1px 1px 0px rgba(255, 255, 255, 0.1),
    -6px -6px 14px rgba(255, 255, 255, 0.06),
    6px 6px 14px rgba(0, 0, 0, 0.8);
}

/* Tailwind Arbitrary Value */
bg-gradient-to-br from-[#1A1A1A] to-[#141414]
shadow-[inset_1px_1px_0px_rgba(255,255,255,0.1),-6px_-6px_14px_rgba(255,255,255,0.06),6px_6px_14px_rgba(0,0,0,0.8)]
```

### C. The "Trench" (Depressed Field)

**Used for:** Search bars, inputs.

**Change:** Increased opacity of inner shadows for a "deeper" hole effect.

```css
/* CSS */
.shadow-deep-field {
  background: #050505;
  box-shadow:
    /* Deep Inner Shadow */
    inset 6px 6px 14px rgba(0, 0, 0, 0.9),
    /* Reflected Light on bottom lip */
    inset -6px -6px 14px rgba(255, 255, 255, 0.04),
    /* External "Lip" highlight */
    0px 1px 0px rgba(255,255,255,0.05);
}

/* Tailwind Arbitrary Value */
shadow-[inset_6px_6px_14px_rgba(0,0,0,0.9),inset_-6px_-6px_14px_rgba(255,255,255,0.04),0px_1px_0px_rgba(255,255,255,0.05)]
```

### D. The "Ridge" (Subtle Border)

**Used for:** Dividers, inactive states, subtle separations.

```css
/* CSS */
.shadow-ridge {
  box-shadow:
    inset 1px 1px 0px rgba(255, 255, 255, 0.05),
    4px 4px 10px rgba(0, 0, 0, 0.6),
    -4px -4px 10px rgba(255, 255, 255, 0.03);
}
```

### E. The "Glow" (LED Indicator)

**Used for:** Status indicators, active states, success markers.

```css
/* CSS */
.shadow-glow-green {
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.7);
}

/* Tailwind Arbitrary Value */
shadow-[0_0_15px_rgba(34,197,94,0.7)]
```

### Shadow Quick Reference

| Shadow Type | Key Feature | Feel |
|-------------|-------------|------|
| Tactile Tile | Rim light + gradient | Physical key |
| Control Button | Sharp edges | Clickable switch |
| Trench | Deep inset + lip | Carved hole |
| Ridge | Subtle bevel | Barely raised |
| Glow | Bright halo | Active LED |

---

## 4. Typography

(No major changes, just ensure high contrast with brighter text)

### Font Stack

```css
/* Primary Font */
font-family: 'Geist Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Monospace Font */
font-family: 'Geist Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale

| Level | Size | Weight | Tracking | Line Height | Usage |
|-------|------|--------|----------|-------------|-------|
| Display | 72px / 4.5rem | 500 (medium) | -0.03em | 1.1 | Hero headlines |
| H1 | 48px / 3rem | 500 (medium) | -0.02em | 1.2 | Page titles |
| H2 | 36px / 2.25rem | 500 (medium) | -0.02em | 1.25 | Section headers |
| H3 | 24px / 1.5rem | 500 (medium) | -0.01em | 1.3 | Subsection headers |
| H4 | 20px / 1.25rem | 500 (medium) | -0.01em | 1.4 | Card titles |
| Body Large | 18px / 1.125rem | 400 (normal) | 0 | 1.6 | Lead paragraphs |
| Body | 16px / 1rem | 400 (normal) | 0 | 1.6 | Default text |
| Body Small | 14px / 0.875rem | 400 (normal) | 0 | 1.5 | Secondary text |
| Caption | 12px / 0.75rem | 400 (normal) | 0.02em | 1.4 | Labels, hints |
| Overline | 11px / 0.6875rem | 500 (medium) | 0.1em | 1.4 | Category labels |

---

## 5. Spacing & Layout

### Spacing Scale

Based on a 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight internal spacing |
| `space-2` | 8px | Default internal spacing |
| `space-3` | 12px | Small gaps |
| `space-4` | 16px | Default gaps |
| `space-6` | 24px | Section internal padding |
| `space-8` | 32px | Card padding |
| `space-12` | 48px | Section gaps |
| `space-16` | 64px | Large section gaps |
| `space-24` | 96px | Page section spacing |
| `space-32` | 128px | Major section breaks |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Small elements, tags |
| `rounded` | 8px | Buttons, small cards |
| `rounded-md` | 12px | Default cards |
| `rounded-lg` | 16px | Large cards |
| `rounded-xl` | 24px | Feature cards, modals |
| `rounded-2xl` | 32px | Hero elements |
| `rounded-full` | 9999px | Pills, toggles, avatars |

---

## 6. Component Patterns

### A. Feature Card (With Gradient Surface)

**Note:** We now add `bg-gradient-surface` to give the card a curved feel.

```tsx
export function FeatureCard() {
  return (
    <div className="
      bg-gradient-surface        /* NEW: Adds subtle curve */
      rounded-2xl
      p-8
      shadow-soft-tile           /* NEW: Sharper shadow */
      border border-white/[0.02]
      hover:-translate-y-1
      transition-all duration-300
    ">
      <h3 className="text-text-primary text-xl font-medium mb-2">Analytics</h3>
      <p className="text-text-secondary">Real-time data processing.</p>
    </div>
  );
}
```

### B. The "Physical" Search Bar

```tsx
export function SearchInput() {
  return (
    <div className="
      bg-bg-depressed
      rounded-full               /* Pill shape works best for this */
      shadow-deep-field          /* Deep trench effect */
      px-6 py-4
      flex items-center gap-3
      border-b border-white/[0.05] /* Subtle lip at bottom */
    ">
      <SearchIcon className="w-5 h-5 text-text-muted" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent text-text-primary w-full outline-none placeholder:text-text-muted"
      />
    </div>
  );
}
```

### C. Control Button (CTA)

```tsx
export function ControlButton() {
  return (
    <button className="
      bg-gradient-button
      text-text-primary
      px-6 py-3
      rounded-lg
      font-medium
      shadow-soft-tile-sm
      border border-white/[0.02]
      transition-all duration-300
      hover:brightness-110
      active:shadow-deep-field
      active:scale-[0.98]
    ">
      Get Started
    </button>
  );
}
```

### D. Metric Card with LED

```tsx
export function MetricCard({ title, value, isActive }) {
  return (
    <div className="
      bg-gradient-surface
      rounded-xl
      p-6
      shadow-soft-tile
      border border-white/[0.02]
      relative
    ">
      {/* LED Indicator */}
      {isActive && (
        <div className="
          absolute top-4 right-4
          w-2 h-2
          rounded-full
          bg-green-500
          shadow-glow-green
        " />
      )}

      <span className="text-text-muted text-xs uppercase tracking-wider">
        {title}
      </span>
      <div className="text-text-primary text-3xl font-medium mt-2">
        {value}
      </div>
    </div>
  );
}
```

---

## 7. Animation & Transitions

### Default Transition

```css
.transition-base {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Tailwind */
transition-all duration-300
```

### Hover Lift Effect

```css
.hover-lift {
  transition: all 300ms ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}
```

### Press Effect (NEW - Deeper)

```css
.press-effect:active {
  transform: scale(0.98);
  box-shadow:
    inset 6px 6px 14px rgba(0, 0, 0, 0.9),
    inset -6px -6px 14px rgba(255, 255, 255, 0.04);
}
```

### Glow Pulse (for LED indicators)

```css
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.7);
  }
  50% {
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.9);
  }
}

.animate-glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}
```

---

## 8. Tailwind Configuration

Replace your existing `tailwind.config.ts` with these new values:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base colors (Updated for v2.0)
        'bg-base': '#050505',
        'bg-surface': '#141414',        // Lighter
        'bg-surface-light': '#1A1A1A',
        'bg-elevated': '#1E1E1E',
        'bg-depressed': '#000000',      // Pure black

        // Text colors (Updated for v2.0)
        'text-primary': '#F0F0F0',      // Brighter
        'text-secondary': '#A3A3A3',
        'text-muted': '#666666',
        'text-subtle': '#4A4A4A',
      },

      backgroundImage: {
        // Surface gradients for volumetric effect
        'gradient-surface': 'linear-gradient(145deg, #161616, #121212)',
        'gradient-button': 'linear-gradient(145deg, #1A1A1A, #141414)',
      },

      boxShadow: {
        // 1. The "Tactile Tile" (Cards) - High Vis
        'soft-tile':
          'inset 1px 1px 0px rgba(255, 255, 255, 0.08), -12px -12px 30px rgba(255, 255, 255, 0.06), 12px 12px 30px rgba(0, 0, 0, 0.9)',

        // 2. The "Control Button" (Clickable) - Sharp
        'soft-tile-sm':
          'inset 1px 1px 0px rgba(255, 255, 255, 0.1), -6px -6px 14px rgba(255, 255, 255, 0.06), 6px 6px 14px rgba(0, 0, 0, 0.8)',

        // 3. Extra small variant
        'soft-tile-xs':
          'inset 1px 1px 0px rgba(255, 255, 255, 0.08), -3px -3px 8px rgba(255, 255, 255, 0.04), 3px 3px 8px rgba(0, 0, 0, 0.7)',

        // 4. The "Trench" (Inputs) - Deep
        'deep-field':
          'inset 6px 6px 14px rgba(0, 0, 0, 0.9), inset -6px -6px 14px rgba(255, 255, 255, 0.04), 0px 1px 0px rgba(255,255,255,0.05)',

        'deep-field-sm':
          'inset 4px 4px 10px rgba(0, 0, 0, 0.9), inset -4px -4px 10px rgba(255, 255, 255, 0.03)',

        // 5. The "Ridge" (Subtle)
        'ridge':
          'inset 1px 1px 0px rgba(255, 255, 255, 0.05), 4px 4px 10px rgba(0, 0, 0, 0.6), -4px -4px 10px rgba(255, 255, 255, 0.03)',

        // 6. Glows (Updated - Brighter)
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.7)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.7)',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.25)',
      },

      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Geist Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Geist Mono', 'Fira Code', 'Consolas', 'monospace'],
      },

      letterSpacing: {
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'snug': '-0.01em',
      },

      animation: {
        'fade-in': 'fadeIn 500ms ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(34, 197, 94, 0.7)' },
          '50%': { boxShadow: '0 0 25px rgba(34, 197, 94, 0.9)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 9. CSS Utility Classes

Add these to your `globals.css`:

```css
/* ============================================
   BRANK DESIGN SYSTEM v2.0 - High-Fidelity Volumetric
   ============================================ */

/* Background Colors */
.bg-base { background-color: #050505; }
.bg-surface { background-color: #141414; }
.bg-surface-light { background-color: #1A1A1A; }
.bg-elevated { background-color: #1E1E1E; }
.bg-depressed { background-color: #000000; }

/* Gradient Surfaces */
.bg-gradient-surface {
  background: linear-gradient(145deg, #161616, #121212);
}

.bg-gradient-button {
  background: linear-gradient(145deg, #1A1A1A, #141414);
}

/* Text Colors */
.text-primary { color: #F0F0F0; }
.text-secondary { color: #A3A3A3; }
.text-muted { color: #666666; }
.text-subtle { color: #4A4A4A; }

/* Volumetric Shadows - v2.0 */
.shadow-soft-tile {
  box-shadow:
    inset 1px 1px 0px rgba(255, 255, 255, 0.08),
    -12px -12px 30px rgba(255, 255, 255, 0.06),
    12px 12px 30px rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.shadow-soft-tile-sm {
  box-shadow:
    inset 1px 1px 0px rgba(255, 255, 255, 0.1),
    -6px -6px 14px rgba(255, 255, 255, 0.06),
    6px 6px 14px rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.shadow-soft-tile-xs {
  box-shadow:
    inset 1px 1px 0px rgba(255, 255, 255, 0.08),
    -3px -3px 8px rgba(255, 255, 255, 0.04),
    3px 3px 8px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.shadow-deep-field {
  box-shadow:
    inset 6px 6px 14px rgba(0, 0, 0, 0.9),
    inset -6px -6px 14px rgba(255, 255, 255, 0.04),
    0px 1px 0px rgba(255, 255, 255, 0.05);
}

.shadow-deep-field-sm {
  box-shadow:
    inset 4px 4px 10px rgba(0, 0, 0, 0.9),
    inset -4px -4px 10px rgba(255, 255, 255, 0.03);
}

.shadow-ridge {
  box-shadow:
    inset 1px 1px 0px rgba(255, 255, 255, 0.05),
    4px 4px 10px rgba(0, 0, 0, 0.6),
    -4px -4px 10px rgba(255, 255, 255, 0.03);
}

/* Glow Effects - v2.0 (Brighter) */
.shadow-glow-green {
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.7);
}

.shadow-glow-blue {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.7);
}

.shadow-glow-white {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
}

.text-glow {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
}

.text-glow-strong {
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.35);
}

/* LED Indicator - v2.0 */
.led-indicator {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: #22C55E;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.7);
}

/* Subtle Borders */
.border-subtle {
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.border-subtle-visible {
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Hover & Interaction Effects */
.hover-lift {
  transition: all 300ms ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

.press-effect {
  transition: all 150ms ease;
}

.press-effect:active {
  transform: scale(0.98);
  box-shadow:
    inset 6px 6px 14px rgba(0, 0, 0, 0.9),
    inset -6px -6px 14px rgba(255, 255, 255, 0.04);
}

/* Glow Pulse Animation */
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.7);
  }
  50% {
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.9);
  }
}

.animate-glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}
```

---

## 10. Usage Examples

### Example: Hero Section with High-Fidelity Styling

```tsx
export function HeroSection() {
  return (
    <section className="bg-bg-base min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-text-primary text-glow mb-6">
          Track Your Brand
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
          Monitor mentions, analyze sentiment, and understand your brand's impact.
        </p>

        {/* Search Bar - Trench Style */}
        <div className="
          bg-bg-depressed
          rounded-full
          shadow-deep-field
          px-6 py-4
          max-w-xl mx-auto
          flex items-center gap-3
        ">
          <input
            type="text"
            placeholder="Enter your brand..."
            className="bg-transparent text-text-primary w-full outline-none placeholder:text-text-muted"
          />
        </div>
      </div>
    </section>
  );
}
```

### Example: Feature Card Grid

```tsx
export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="
        bg-gradient-surface
        rounded-xl
        p-8
        shadow-soft-tile
        border border-white/[0.02]
        hover-lift
      ">
        <h3 className="text-text-primary text-xl font-medium mb-2">Analytics</h3>
        <p className="text-text-secondary">Real-time data processing.</p>
      </div>
    </div>
  );
}
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  BRANK DESIGN SYSTEM v2.0 - HIGH-FIDELITY VOLUMETRIC        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BACKGROUNDS                    SHADOWS (NEW)               │
│  ───────────                    ───────────                 │
│  Base:    #050505               Soft Tile:  + Rim Light     │
│  Surface: #141414 (lighter)     Deep Field: + Lip Highlight │
│  Depressed:#000000 (pure)       Ridge:      + Bevel         │
│                                                             │
│  TEXT (BRIGHTER)                KEY CHANGES                 │
│  ───────────────                ───────────                 │
│  Primary:  #F0F0F0              • White alpha highlights    │
│  Secondary:#A3A3A3              • Tighter blur (30px)       │
│  Muted:    #666666              • Gradient surfaces         │
│                                 • 1px rim lights            │
│                                                             │
│  GRADIENTS                                                  │
│  ─────────                                                  │
│  Surface: 145deg #161616 → #121212                          │
│  Button:  145deg #1A1A1A → #141414                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01-XX | Initial design system documentation |
| 2.0.0 | 2024-01-XX | High-Fidelity Volumetric update: rim lights, tighter shadows, gradient surfaces, brighter text |

---

*This design system is maintained by the Brank design team. For questions or suggestions, please open an issue in the repository.*
