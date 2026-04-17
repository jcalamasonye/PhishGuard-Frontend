/**
 * Color System Constants
 * Centralized Tailwind color classes for consistency
 * Usage: import { COLORS } from '@/lib/constants';
 */

export const COLORS = {
  // Primary Colors (Blue)
  primary: {
    50: 'bg-blue-50',
    100: 'bg-blue-100',
    200: 'bg-blue-200',
    300: 'bg-blue-300',
    400: 'bg-blue-400',
    500: 'bg-blue-500',
    600: 'bg-blue-600',
    700: 'bg-blue-700',
    800: 'bg-blue-800',
    900: 'bg-blue-900',
    text: 'text-blue-600',
    textHover: 'hover:text-blue-700',
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-700',
    border: 'border-blue-600',
    ring: 'ring-blue-500',
  },

  // Success Colors (Green)
  success: {
    50: 'bg-green-50',
    100: 'bg-green-100',
    200: 'bg-green-200',
    300: 'bg-green-300',
    400: 'bg-green-400',
    500: 'bg-green-500',
    600: 'bg-green-600',
    700: 'bg-green-700',
    text: 'text-green-600',
    textDark: 'text-green-700',
    bg: 'bg-green-600',
    bgLight: 'bg-green-50',
    border: 'border-green-200',
  },

  // Warning Colors (Yellow/Orange)
  warning: {
    50: 'bg-yellow-50',
    100: 'bg-yellow-100',
    200: 'bg-yellow-200',
    300: 'bg-yellow-300',
    400: 'bg-yellow-400',
    500: 'bg-yellow-500',
    600: 'bg-yellow-600',
    700: 'bg-yellow-700',
    text: 'text-yellow-600',
    textDark: 'text-yellow-700',
    bg: 'bg-yellow-600',
    bgLight: 'bg-yellow-50',
  },

  // Danger/Error Colors (Red)
  danger: {
    50: 'bg-red-50',
    100: 'bg-red-100',
    200: 'bg-red-200',
    300: 'bg-red-300',
    400: 'bg-red-400',
    500: 'bg-red-500',
    600: 'bg-red-600',
    700: 'bg-red-700',
    text: 'text-red-600',
    textDark: 'text-red-700',
    bg: 'bg-red-600',
    bgLight: 'bg-red-50',
    border: 'border-red-200',
  },

  // Info Colors (Cyan/Teal)
  info: {
    50: 'bg-cyan-50',
    100: 'bg-cyan-100',
    200: 'bg-cyan-200',
    300: 'bg-cyan-300',
    400: 'bg-cyan-400',
    500: 'bg-cyan-500',
    600: 'bg-cyan-600',
    700: 'bg-cyan-700',
    text: 'text-cyan-600',
    textDark: 'text-cyan-700',
    bg: 'bg-cyan-600',
    bgLight: 'bg-cyan-50',
  },

  // Pink Colors
  pink: {
    50: 'bg-pink-50',
    100: 'bg-pink-100',
    200: 'bg-pink-200',
    300: 'bg-pink-300',
    400: 'bg-pink-400',
    500: 'bg-pink-500',
    600: 'bg-pink-600',
    700: 'bg-pink-700',
    text: 'text-pink-600',
    textDark: 'text-pink-700',
    bg: 'bg-pink-600',
    bgLight: 'bg-pink-50',
  },

  // Purple Colors
  purple: {
    50: 'bg-purple-50',
    100: 'bg-purple-100',
    200: 'bg-purple-200',
    300: 'bg-purple-300',
    400: 'bg-purple-400',
    500: 'bg-purple-500',
    600: 'bg-purple-600',
    700: 'bg-purple-700',
    text: 'text-purple-600',
    textDark: 'text-purple-700',
    bg: 'bg-purple-600',
    bgLight: 'bg-purple-50',
  },

  // Gray/Neutral Colors
  gray: {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    200: 'bg-gray-200',
    300: 'bg-gray-300',
    400: 'bg-gray-400',
    500: 'bg-gray-500',
    600: 'bg-gray-600',
    700: 'bg-gray-700',
    800: 'bg-gray-800',
    900: 'bg-gray-900',
    text: {
      light: 'text-gray-500',
      normal: 'text-gray-600',
      dark: 'text-gray-700',
      darker: 'text-gray-900',
    },
  },

  // Metric Card Colors (Dashboard)
  metrics: {
    campaign: 'bg-blue-300',
    click: 'bg-pink-300',
    quiz: 'bg-yellow-300',
    improvement: 'bg-green-300',
    users: 'bg-purple-300',
  },

  // Status Colors
  status: {
    active: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      dot: 'bg-green-600',
    },
    completed: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      dot: 'bg-blue-600',
    },
    scheduled: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      dot: 'bg-yellow-600',
    },
    draft: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      dot: 'bg-gray-600',
    },
  },

  // Background Colors
  background: {
    white: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900',
  },

  // Border Colors
  border: {
    light: 'border-gray-200',
    normal: 'border-gray-300',
    dark: 'border-gray-400',
  },

  // Text Colors
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    tertiary: 'text-gray-500',
    white: 'text-white',
  },
} as const;

/**
 * Dynamic color getter for metric cards
 */
export const getMetricColor = (iconType: 'campaign' | 'click' | 'quiz' | 'improvement' | 'users'): string => {
  return COLORS.metrics[iconType];
};

/**
 * Dynamic status color getter
 */
export const getStatusColors = (status: 'active' | 'completed' | 'scheduled' | 'draft') => {
  return COLORS.status[status];
};