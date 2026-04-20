

import { type LucideIcon } from 'lucide-react';
import {
  METRIC_ICONS,
  ACHIEVEMENT_ICONS,
  ACTIVITY_ICONS,
  TEMPLATE_ICONS,
  RESOURCE_ICONS,
  STATUS_ICONS,
  NAV_ICONS,
  CATEGORY_ICONS,
} from '@/lib/constants/icons';


export const IconRegistry = {
  metrics: METRIC_ICONS,
  achievements: ACHIEVEMENT_ICONS,
  activities: ACTIVITY_ICONS,
  templates: TEMPLATE_ICONS,
  resources: RESOURCE_ICONS,
  status: STATUS_ICONS,
  navigation: NAV_ICONS,
  categories: CATEGORY_ICONS,
} as const;


export function getIconComponent<T extends keyof typeof IconRegistry>(
  category: T,
  name: string,
  fallback?: LucideIcon
): LucideIcon | undefined {
  const iconMap = IconRegistry[category];
  return (iconMap as Record<string, LucideIcon>)[name] || fallback;
}


export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
} as const;


export const DEFAULT_ICON_PROPS = {
  strokeWidth: 2,
  size: ICON_SIZES.md,
  className: '',
} as const;


export const ICON_VARIANTS = {
  default: {
    strokeWidth: 2,
    className: '',
  },
  bold: {
    strokeWidth: 2.5,
    className: '',
  },
  light: {
    strokeWidth: 1.5,
    className: '',
  },
} as const;


export const getIconProps = (size: keyof typeof ICON_SIZES = 'md') => ({
  size: ICON_SIZES[size],
  strokeWidth: DEFAULT_ICON_PROPS.strokeWidth,
});