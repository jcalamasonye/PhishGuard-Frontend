/**
 * Theme Configuration
 * Centralized theme settings and design tokens
 * Usage: import { theme } from '@/lib/config/theme.config';
 */

/**
 * Color palette - semantic color names
 */
export const colorPalette = {
  primary: {
    main: '#2563eb', // blue-600
    light: '#3b82f6', // blue-500
    dark: '#1d4ed8', // blue-700
    contrast: '#ffffff',
  },
  success: {
    main: '#16a34a', // green-600
    light: '#22c55e', // green-500
    dark: '#15803d', // green-700
    contrast: '#ffffff',
  },
  warning: {
    main: '#ca8a04', // yellow-600
    light: '#eab308', // yellow-500
    dark: '#a16207', // yellow-700
    contrast: '#ffffff',
  },
  danger: {
    main: '#dc2626', // red-600
    light: '#ef4444', // red-500
    dark: '#b91c1c', // red-700
    contrast: '#ffffff',
  },
  info: {
    main: '#0891b2', // cyan-600
    light: '#06b6d4', // cyan-500
    dark: '#0e7490', // cyan-700
    contrast: '#ffffff',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

/**
 * Typography configuration
 */
export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

/**
 * Spacing scale (in rem)
 */
export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
} as const;

/**
 * Border radius scale
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

/**
 * Shadow scale
 */
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  none: 'none',
} as const;

/**
 * Breakpoint configuration (matches Tailwind)
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Z-index scale
 */
export const zIndex = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

/**
 * Animation durations (in ms)
 */
export const duration = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Component-specific configurations
 */
export const components = {
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: {
      sm: '0.375rem 0.75rem',
      md: '0.5rem 1rem',
      lg: '0.75rem 1.5rem',
    },
  },
  input: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
  },
  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
    },
  },
  header: {
    height: '73px',
  },
  sidebar: {
    width: '256px', // 64 * 4 = 256px (w-64)
  },
} as const;

/**
 * Complete theme object
 */
export const theme = {
  colors: colorPalette,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
  duration,
  components,
} as const;

/**
 * Export type for theme
 */
export type Theme = typeof theme;