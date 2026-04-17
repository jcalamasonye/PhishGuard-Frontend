export interface MetricCardData {
  id: string;
  label: string;
  value: string | number;
  icon: 'campaign' | 'click' | 'quiz' | 'improvement' | 'users';
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  bgColor: string;
}

export interface ChartDataPoint {
  name: string;
  clickRate?: number;
  quizScore?: number;
  value?: number;
  [key: string]: string | number | undefined;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'fire' | 'target';
  color: string;
  bgColor: string;
  progress?: number;
  total?: number;
  unlocked: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'quiz' | 'email' | 'badge' | 'training';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  iconBg: string;
}

export interface CampaignTableRow {
  id: string;
  name: string;
  dateSent: string;
  recipients: number;
  openRate: number | null;
  clickRate: number | null;
  status: 'completed' | 'active' | 'scheduled' | 'draft';
}

export interface QuickTip {
  id: string;
  text: string;
  completed: boolean;
}