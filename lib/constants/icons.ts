/**
 * Icon Mapping Constants
 * Maps string identifiers to Lucide icon components
 * Usage: import { ICON_MAP } from '@/lib/constants';
 */

import {
  // Metric & Dashboard Icons
  Mail,
  MousePointerClick,
  Trophy,
  Target,
  Users,
  TrendingUp,
  TrendingDown,
  
  // Achievement Icons
  Star,
  Flame,
  Shield,
  Award,
  
  // Activity Icons
  BookOpen,
  
  // Resource Icons
  FileText,
  Video,
  Image,
  Download,
  Eye,
  Play,
  
  // Template Icons
  Lock,
  User,
  Package,
  CreditCard,
  Wrench,
  Share2,
  
  // Navigation Icons
  LayoutDashboard,
  ClipboardList,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Search,
  Bell,
  X,
  Menu,
  
  // Action Icons
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Filter,
  Calendar,
  Clock,
  
  // Status Icons
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  
  type LucideIcon,
} from 'lucide-react';

/**
 * Metric card icon mapping
 */
export const METRIC_ICONS = {
  campaign: Mail,
  click: MousePointerClick,
  quiz: Trophy,
  improvement: Target,
  users: Users,
} as const;

/**
 * Achievement icon mapping
 */
export const ACHIEVEMENT_ICONS = {
  trophy: Trophy,
  star: Star,
  fire: Flame,
  target: Target,
  shield: Shield,
  award: Award,
} as const;

/**
 * Activity feed icon mapping
 */
export const ACTIVITY_ICONS = {
  quiz: Trophy,
  email: Mail,
  badge: Award,
  training: BookOpen,
} as const;

/**
 * Template category icon mapping
 */
export const TEMPLATE_ICONS = {
  password: Lock,
  package: Package,
  executive: User,
  payroll: CreditCard,
  security: Shield,
  vendor: Wrench,
  hr: User,
  social: Share2,
  bank: CreditCard,
  it: Wrench,
} as const;

/**
 * Resource type icon mapping
 */
export const RESOURCE_ICONS = {
  article: FileText,
  video: Video,
  gallery: Image,
  pdf: FileText,
  guide: BookOpen,
} as const;

/**
 * Status icon mapping
 */
export const STATUS_ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

/**
 * Navigation icon mapping
 */
export const NAV_ICONS = {
  dashboard: LayoutDashboard,
  training: BookOpen,
  quiz: ClipboardList,
  templates: FileText,
  settings: Settings,
  logout: LogOut,
} as const;

/**
 * Category section icon mapping (for training resources)
 */
export const CATEGORY_ICONS = {
  book: BookOpen,
  wrench: Wrench,
  alert: AlertTriangle,
} as const;

/**
 * Complete icon map - all icons in one place
 */
export const ICON_MAP = {
  // Metrics
  ...METRIC_ICONS,
  
  // Achievements
  ...ACHIEVEMENT_ICONS,
  
  // Activities
  ...ACTIVITY_ICONS,
  
  // Templates
  ...TEMPLATE_ICONS,
  
  // Resources
  ...RESOURCE_ICONS,
  
  // Status
  ...STATUS_ICONS,
  
  // Navigation
  ...NAV_ICONS,
  
  // Additional common icons
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  eye: Eye,
  play: Play,
  download: Download,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  search: Search,
  bell: Bell,
  x: X,
  menu: Menu,
  plus: Plus,
  edit: Edit,
  trash: Trash2,
  save: Save,
  upload: Upload,
  filter: Filter,
  calendar: Calendar,
  clock: Clock,
} as const;

/**
 * Type-safe icon getter
 */
export type IconName = keyof typeof ICON_MAP;

export const getIcon = (name: IconName): LucideIcon => {
  return ICON_MAP[name];
};

/**
 * Get metric icon by type
 */
export const getMetricIcon = (type: keyof typeof METRIC_ICONS): LucideIcon => {
  return METRIC_ICONS[type];
};

/**
 * Get achievement icon by type
 */
export const getAchievementIcon = (type: keyof typeof ACHIEVEMENT_ICONS): LucideIcon => {
  return ACHIEVEMENT_ICONS[type];
};

/**
 * Get template icon by category
 */
export const getTemplateIcon = (category: keyof typeof TEMPLATE_ICONS): LucideIcon => {
  return TEMPLATE_ICONS[category];
};