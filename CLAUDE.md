# Claude Rules for Brank Frontend Project

## Primary Reference
**IMPORTANT**: Always refer to `SKILL.md` for comprehensive frontend development best practices, patterns, and guidelines. This file contains the complete knowledge base for building this project.

## Git Workflow
**IMPORTANT**: DO NOT automatically add, commit, or push files to git. The user will handle all git operations manually. Only make code changes and let the user manage version control.

## Project Overview
This is a Next.js 14+ frontend application for Brank - a brand tracking and analytics platform. The project uses:
- **Framework**: Next.js with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library in `src/components/`

## Technology Stack
- React 18+ (with Server Components)
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Modern ESNext features

## Project Structure (Reference SKILL.md lines 5-18)
```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (Button, IntegrationCard, etc.)
│   ├── forms/         # Form-specific components
│   ├── layout/        # Layout components (Header, Footer)
│   └── sections/      # Page sections (Hero, Features, Metrics, etc.)
├── app/               # Next.js App Router pages and layouts
├── lib/               # Utility functions and configurations
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── constants/         # Application constants
└── styles/            # Global styles and Tailwind config
```

## Coding Standards

### TypeScript (Reference SKILL.md lines 80-114)
- **ALWAYS** use strict TypeScript types - NO `any` types
- Define proper interfaces for all component props
- Use union types for variants (e.g., `'primary' | 'secondary'`)
- Leverage utility types: `Pick`, `Omit`, `Partial`, `Required`
- Use generics for reusable components
- Use `as const` for immutable arrays and objects

### Component Design (Reference SKILL.md lines 29-54)
- Use TypeScript interfaces for all props
- Provide default values for optional props
- Use React.FC or explicit function declarations with typed props
- Keep components focused and single-responsibility
- Use compound components for complex UI patterns

### Component Organization
- Place related components in their respective directories
- Export from `index.ts` barrel files when appropriate
- Keep component files focused (one component per file)
- Co-locate tests and stories with components when applicable

### Import Order (Reference SKILL.md lines 248-261)
1. React imports
2. Next.js imports
3. Third-party library imports
4. Internal component imports (use `@/` alias)
5. Hook imports
6. Type imports
7. Style imports

### Performance (Reference SKILL.md lines 62-78, 164-190)
- Use `React.memo` for expensive components
- Use `useMemo` for expensive calculations
- Use `useCallback` for stable function references
- Implement code splitting with `lazy()` and `Suspense`
- Optimize images with Next.js Image component
- Consider Server Components for data fetching

### State Management (Reference SKILL.md lines 56-162)
- **Local State**: `useState` for component-specific state
- **Server State**: React Query/TanStack Query for API data (if implemented)
- **Global State**: Zustand or React Context for app-wide state
- **Form State**: React Hook Form for complex forms
- Use `useReducer` for complex local state logic

### Styling with Tailwind
- Use Tailwind utility classes directly in JSX
- Follow mobile-first responsive design principles
- Create reusable component classes when patterns emerge
- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Maintain consistent spacing scale (using Tailwind's scale)

### Responsive Design Requirements
**CRITICAL**: When making ANY UI changes, ensure proper responsive behavior across all target devices:

**Mobile (iPhone) Viewports:**
- **iPhone SE**: 375px width (smallest viewport - primary mobile baseline)
- **iPhone 12**: 390px width
- **iPhone 14 Pro**: 393px width
- **iPhone 14 Pro Max**: 430px width (largest iPhone viewport)

**Desktop Viewports:**
- **Small Laptop**: 1280px width
- **Standard Desktop**: 1440px width
- **Full HD**: 1920px width
- **2K/QHD**: 2560px width

**Requirements:**
- Test and verify all layouts work properly on these screen sizes
- Use appropriate Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px)
- Start with the smallest screen (iPhone SE 375px) and scale up
- Ensure text sizes are readable without horizontal scrolling
- Check button sizes and touch targets are appropriate on mobile (minimum 44x44px)
- Verify images and content don't overflow at any viewport size
- Test spacing and padding on both mobile and desktop viewports
- Ensure desktop layouts utilize screen real estate effectively without excessive whitespace

### Accessibility (Reference SKILL.md lines 326-374)
- Use semantic HTML elements (`<article>`, `<nav>`, `<main>`, etc.)
- Include proper ARIA attributes where needed
- Ensure keyboard navigation works correctly
- Provide meaningful alt text for images
- Use proper heading hierarchy (h1, h2, h3)
- Include screen reader text with `sr-only` class when needed

### Error Handling (Reference SKILL.md lines 263-324)
- Implement Error Boundaries for component errors
- Handle API errors gracefully with try-catch
- Provide user-friendly error messages
- Log errors appropriately (console.error in development)
- Use TypeScript for compile-time error prevention

### Security (Reference SKILL.md lines 376-404)
- Sanitize user inputs
- Validate data on both client and server
- Use DOMPurify for rendering user-generated HTML
- Never expose sensitive data in client-side code
- Follow Next.js security best practices

## File Naming Conventions (Reference SKILL.md lines 227-245)
- Components: PascalCase (e.g., `Button.tsx`, `HeroSection.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
- Utilities: camelCase (e.g., `utils.ts`, `formatDate.ts`)
- Types: camelCase (e.g., `index.ts`, `api.ts`)
- Constants: UPPER_SNAKE_CASE or camelCase file names

## Next.js Specific Patterns (Reference SKILL.md lines 429-477)
- Use Server Components by default for better performance
- Add `'use client'` directive only when client-side features needed
- Leverage App Router features (layouts, loading, error pages)
- Use Next.js Image component for optimized images
- Implement proper metadata in layout files
- Use Suspense boundaries for loading states

## Testing (Reference SKILL.md lines 191-224)
- Write tests using React Testing Library
- Test user interactions, not implementation details
- Use meaningful test descriptions
- Test accessibility features
- Mock external dependencies appropriately

## Development Workflow (Reference SKILL.md lines 406-428)
- **Git Operations**: User handles all git commands (add, commit, push) manually
- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`
- Keep commits atomic and focused
- Write meaningful commit messages
- Follow the code review checklist in SKILL.md

## Code Review Checklist (Reference SKILL.md lines 414-420)
Before considering code complete, verify:
- [ ] TypeScript types are properly defined (no `any` types)
- [ ] Components follow established patterns
- [ ] Performance considerations addressed
- [ ] Accessibility guidelines followed
- [ ] Error handling implemented
- [ ] Code is readable and maintainable
- [ ] Responsive design works across all viewports (iPhone SE to 2K desktop)
- [ ] Images are optimized

## Key Principles
1. **Type Safety First**: TypeScript strict mode, no `any` types
2. **Component Composition**: Build reusable, composable components
3. **Performance Matters**: Optimize for Core Web Vitals
4. **Accessibility Always**: Build inclusive interfaces from the start
5. **Security Awareness**: Validate and sanitize all inputs
6. **Modern Patterns**: Use latest React and Next.js features
7. **Developer Experience**: Write clean, maintainable code

## When Making Changes
1. Always check existing components before creating new ones
2. Follow the established component patterns in `src/components/`
3. Maintain consistency with existing styling approaches
4. Reference SKILL.md for detailed implementation patterns
5. **CRITICAL**: Test responsiveness on all target devices - Mobile: iPhone SE (375px), iPhone 12 (390px), iPhone 14 Pro (393px), iPhone 14 Pro Max (430px); Desktop: 1280px, 1440px, 1920px, 2560px
6. Test changes across different viewport sizes and all breakpoints
7. Ensure TypeScript compilation succeeds with no errors

## Additional Notes
- The project uses Next.js Image component - leverage it for all images
- Tailwind config is customized - check `tailwind.config.ts` for theme values
- Global styles are in `src/app/globals.css`
- Use the `@/` path alias for imports from `src/` directory
- Font files are in `src/app/fonts/` (Geist and Geist Mono)

## Resources
- Main Guidelines: `SKILL.md` (comprehensive frontend best practices)
- Project README: `README.md` (project-specific documentation)
- TypeScript Config: `tsconfig.json`
- Tailwind Config: `tailwind.config.ts`
- Next.js Config: `next.config.mjs`
