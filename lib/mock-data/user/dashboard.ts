/**
 * User Dashboard Mock Data
 * All mock data for the user dashboard page
 */

import { MetricCardData, Achievement, ChartDataPoint, ActivityItem, QuickTip } from '@/types/dashboard';

/**
 * Dashboard Metrics
 */
export const MOCK_USER_METRICS: MetricCardData[] = [
  {
    id: '1',
    label: 'Campaigns Received',
    value: '127',
    icon: 'campaign',
    bgColor: 'bg-blue-300',
    trend: undefined
  },
  {
    id: '2',
    label: 'Your Click Rate',
    value: '18.4%',
    icon: 'click',
    bgColor: 'bg-pink-300',
    trend: { value: 8.2, isPositive: false, label: 'You can do better!' }
  },
  {
    id: '3',
    label: 'Average Quiz Score',
    value: '84.5',
    icon: 'quiz',
    bgColor: 'bg-yellow-300',
    trend: { value: 6.3, isPositive: true, label: 'Great job!' }
  },
  {
    id: '4',
    label: 'Improvement Rate',
    value: '42%',
    icon: 'improvement',
    bgColor: 'bg-green-300',
    trend: { value: 3.2, isPositive: true }
  }
];

/**
 * User Achievements
 */
export const MOCK_USER_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Security Champion',
    description: '90% pass rate',
    icon: 'trophy',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    unlocked: true
  },
  {
    id: '2',
    title: 'Quick Learner',
    description: 'Completed 5 modules',
    icon: 'star',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    unlocked: true
  },
  {
    id: '3',
    title: 'On Fire!',
    description: '12 day streak',
    icon: 'fire',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    unlocked: true
  },
  {
    id: '4',
    title: 'Eagle Eye',
    description: 'Report 10 phishing emails',
    icon: 'target',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    unlocked: false,
    progress: 7,
    total: 10
  }
];

/**
 * Progress Chart Data
 */
export const MOCK_USER_CHART_DATA: ChartDataPoint[] = [
  { name: 'Jun', quizScore: 65, clickRate: 32 },
  { name: 'Jul', quizScore: 70, clickRate: 28 },
  { name: 'Aug', quizScore: 75, clickRate: 25 },
  { name: 'Sep', quizScore: 80, clickRate: 22 },
  { name: 'Oct', quizScore: 82, clickRate: 20 },
  { name: 'Nov', quizScore: 85, clickRate: 18 }
];

/**
 * Activity Feed Items
 */
export const MOCK_USER_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: 'quiz',
    title: 'Phishing Awareness Quiz',
    description: 'Scored 95% on Advanced phishing detection',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    icon: 'quiz',
    iconBg: 'bg-green-300'
  },
  {
    id: '2',
    type: 'email',
    title: 'Stimulated Phishing Email',
    description: 'Successfully reported suspicious email',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    icon: 'email',
    iconBg: 'bg-blue-300'
  },
  {
    id: '3',
    type: 'badge',
    title: 'New Badge Earned',
    description: 'Achieved 2-week training streak',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    icon: 'badge',
    iconBg: 'bg-yellow-300'
  },
  {
    id: '4',
    type: 'quiz',
    title: 'Password Security Quiz',
    description: 'Scored 88% on password best practices',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    icon: 'quiz',
    iconBg: 'bg-purple-300'
  }
];

/**
 * Quick Tips
 */
export const MOCK_QUICK_TIPS: QuickTip[] = [
  { id: '1', text: 'Always verify sender addresses', completed: false },
  { id: '2', text: 'Hover over links before clicking', completed: false },
  { id: '3', text: 'Be suspicious of urgent requests', completed: false },
  { id: '4', text: 'Report suspicious emails immediately', completed: false }
];

/**
 * Helper: Get all dashboard data
 */
export const getUserDashboardData = () => ({
  metrics: MOCK_USER_METRICS,
  achievements: MOCK_USER_ACHIEVEMENTS,
  chartData: MOCK_USER_CHART_DATA,
  activities: MOCK_USER_ACTIVITIES,
  quickTips: MOCK_QUICK_TIPS,
});