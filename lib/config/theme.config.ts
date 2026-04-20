


export const colorPalette = {
  primary: {
    main: '#2563eb', 
    light: '#3b82f6', 
    dark: '#1d4ed8', 
    contrast: '#ffffff',
  },
  success: {
    main: '#16a34a', 
    light: '#22c55e', 
    dark: '#15803d', 
    contrast: '#ffffff',
  },
  warning: {
    main: '#ca8a04', 
    light: '#eab308', 
    dark: '#a16207', 
    contrast: '#ffffff',
  },
  danger: {
    main: '#dc2626', 
    light: '#ef4444', 
    dark: '#b91c1c', 
    contrast: '#ffffff',
  },
  info: {
    main: '#0891b2', 
    light: '#06b6d4', 
    dark: '#0e7490', 
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


export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  fontSize: {
    xs: '0.75rem',    
    sm: '0.875rem',   
    base: '1rem',     
    lg: '1.125rem',   
    xl: '1.25rem',    
    '2xl': '1.5rem',  
    '3xl': '1.875rem', 
    '4xl': '2.25rem', 
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


export const spacing = {
  0: '0',
  1: '0.25rem',  
  2: '0.5rem',   
  3: '0.75rem',  
  4: '1rem',     
  5: '1.25rem',  
  6: '1.5rem',   
  8: '2rem',     
  10: '2.5rem',  
  12: '3rem',    
  16: '4rem',    
  20: '5rem',    
  24: '6rem',    
} as const;


export const borderRadius = {
  none: '0',
  sm: '0.125rem',   
  default: '0.25rem', 
  md: '0.375rem',   
  lg: '0.5rem',     
  xl: '0.75rem',    
  '2xl': '1rem',    
  full: '9999px',
} as const;


export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  none: 'none',
} as const;


export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;


export const zIndex = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;


export const duration = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;


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
    width: '256px', 
  },
} as const;


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


export type Theme = typeof theme;