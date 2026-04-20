

import {
  
  Mail,
  MousePointerClick,
  Trophy,
  Target,
  Users,
  TrendingUp,
  TrendingDown,
  
  
  Star,
  Flame,
  Shield,
  Award,
  
  
  BookOpen,
  
  
  FileText,
  Video,
  Image,
  Download,
  Eye,
  Play,
  
  
  Lock,
  User,
  Package,
  CreditCard,
  Wrench,
  Share2,
  
  
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
  
  
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Filter,
  Calendar,
  Clock,
  
  
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  
  type LucideIcon,
} from 'lucide-react';


export const METRIC_ICONS = {
  campaign: Mail,
  click: MousePointerClick,
  quiz: Trophy,
  improvement: Target,
  users: Users,
} as const;


export const ACHIEVEMENT_ICONS = {
  trophy: Trophy,
  star: Star,
  fire: Flame,
  target: Target,
  shield: Shield,
  award: Award,
} as const;


export const ACTIVITY_ICONS = {
  quiz: Trophy,
  email: Mail,
  badge: Award,
  training: BookOpen,
} as const;


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


export const RESOURCE_ICONS = {
  article: FileText,
  video: Video,
  gallery: Image,
  pdf: FileText,
  guide: BookOpen,
} as const;


export const STATUS_ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
} as const;


export const NAV_ICONS = {
  dashboard: LayoutDashboard,
  training: BookOpen,
  quiz: ClipboardList,
  templates: FileText,
  settings: Settings,
  logout: LogOut,
} as const;


export const CATEGORY_ICONS = {
  book: BookOpen,
  wrench: Wrench,
  alert: AlertTriangle,
} as const;


export const ICON_MAP = {
  
  ...METRIC_ICONS,
  
  
  ...ACHIEVEMENT_ICONS,
  
  
  ...ACTIVITY_ICONS,
  
  
  ...TEMPLATE_ICONS,
  
  
  ...RESOURCE_ICONS,
  
  
  ...STATUS_ICONS,
  
  
  ...NAV_ICONS,
  
  
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


export type IconName = keyof typeof ICON_MAP;

export const getIcon = (name: IconName): LucideIcon => {
  return ICON_MAP[name];
};


export const getMetricIcon = (type: keyof typeof METRIC_ICONS): LucideIcon => {
  return METRIC_ICONS[type];
};


export const getAchievementIcon = (type: keyof typeof ACHIEVEMENT_ICONS): LucideIcon => {
  return ACHIEVEMENT_ICONS[type];
};


export const getTemplateIcon = (category: keyof typeof TEMPLATE_ICONS): LucideIcon => {
  return TEMPLATE_ICONS[category];
};