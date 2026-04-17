/**
 * Admin Dashboard Mock Data
 */

import { MetricCardData, ChartDataPoint, CampaignTableRow } from '@/types/dashboard';
import { COLORS } from '@/lib/constants/colors';

export const MOCK_ADMIN_METRICS: MetricCardData[] = [
  {
    id: '1',
    label: 'Total Campaigns Sent',
    value: '127',
    icon: 'campaign',
    bgColor: COLORS.metrics.campaign,
    trend: { value: 12, isPositive: true }
  },
  {
    id: '2',
    label: 'Total Users Enrolled',
    value: '1,847',
    icon: 'users',
    bgColor: COLORS.metrics.users,
    trend: { value: 23, isPositive: true }
  },
  {
    id: '3',
    label: 'Click Through Rate',
    value: '18.4%',
    icon: 'click',
    bgColor: COLORS.metrics.click,
    trend: { value: 8.2, isPositive: false }
  },
  {
    id: '4',
    label: 'Average Quiz Score',
    value: '84.5',
    icon: 'quiz',
    bgColor: COLORS.metrics.quiz,
    trend: { value: 6.3, isPositive: true }
  }
];

export const MOCK_ADMIN_CLICK_RATE_DATA: ChartDataPoint[] = [
  { name: 'Jun', clickRate: 24 },
  { name: 'Jul', clickRate: 22 },
  { name: 'Aug', clickRate: 20 },
  { name: 'Sep', clickRate: 18 },
  { name: 'Oct', clickRate: 17 },
  { name: 'Nov', clickRate: 16 }
];

export const MOCK_ADMIN_TEMPLATE_PERFORMANCE: ChartDataPoint[] = [
  { name: 'Password Reset', clickRate: 32, quizScore: 65 },
  { name: 'Package Delivery', clickRate: 28, quizScore: 70 },
  { name: 'IT Alert', clickRate: 18, quizScore: 82 },
  { name: 'HR Notice', clickRate: 15, quizScore: 85 }
];

export const MOCK_ADMIN_RECENT_CAMPAIGNS: CampaignTableRow[] = [
  {
    id: '1',
    name: 'Q4 Security Awareness',
    dateSent: '2024-12-01',
    recipients: 250,
    openRate: 87,
    clickRate: 18,
    status: 'completed'
  },
  {
    id: '2',
    name: 'Holiday Phishing Test',
    dateSent: '2024-11-25',
    recipients: 300,
    openRate: 92,
    clickRate: 22,
    status: 'completed'
  },
  {
    id: '3',
    name: 'IT Department Test',
    dateSent: '2024-12-15',
    recipients: 45,
    openRate: 78,
    clickRate: 8,
    status: 'active'
  }
];