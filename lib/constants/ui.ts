


export const SPACING = {
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
  
  
  padding: {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  },
  
  
  margin: {
    xs: 'm-2',
    sm: 'm-4',
    md: 'm-6',
    lg: 'm-8',
    xl: 'm-12',
  },
  
  
  gap: {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  },
} as const;


export const RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
  
  
  top: {
    sm: 'rounded-t-sm',
    md: 'rounded-t-md',
    lg: 'rounded-t-lg',
    xl: 'rounded-t-xl',
  },
  bottom: {
    sm: 'rounded-b-sm',
    md: 'rounded-b-md',
    lg: 'rounded-b-lg',
    xl: 'rounded-b-xl',
  },
} as const;


export const SHADOW = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
} as const;


export const FONT_SIZE = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
} as const;


export const FONT_WEIGHT = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;


export const ICON_SIZE = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
  '3xl': 'w-12 h-12',
} as const;


export const CONTAINER = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
} as const;


export const Z_INDEX = {
  dropdown: 'z-10',
  sticky: 'z-20',
  fixed: 'z-30',
  modalBackdrop: 'z-40',
  modal: 'z-50',
  popover: 'z-60',
  tooltip: 'z-70',
} as const;


export const TRANSITION = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
} as const;


export const COMPONENT_SIZE = {
  button: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  input: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  },
  card: {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
} as const;


export const LAYOUT = {
  header: {
    height: 'h-[73px]',
    marginTop: 'mt-[73px]',
  },
  sidebar: {
    width: 'w-64',
    marginLeft: 'ml-64',
  },
  content: {
    padding: 'p-6',
    maxWidth: CONTAINER['7xl'],
  },
} as const;


export const UI = {
  spacing: SPACING,
  radius: RADIUS,
  shadow: SHADOW,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  iconSize: ICON_SIZE,
  container: CONTAINER,
  zIndex: Z_INDEX,
  transition: TRANSITION,
  componentSize: COMPONENT_SIZE,
  layout: LAYOUT,
} as const;