/**
 * Admin Users Mock Data
 * All mock data for user management
 */

import { User } from '@/types/user';

/**
 * Mock Users List
 */
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Marketing',
    role: 'user',
    totalCampaigns: 12,
    clickRate: 8,
    averageQuizScore: 92,
    joinedDate: '2024-01-15',
    lastActive: '2024-12-18',
    lastTest: '2 days ago'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'IT',
    role: 'user',
    totalCampaigns: 15,
    clickRate: 3,
    averageQuizScore: 95,
    joinedDate: '2023-11-20',
    lastActive: '2024-12-19',
    lastTest: '1 day ago'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    department: 'Sales',
    role: 'user',
    totalCampaigns: 10,
    clickRate: 25,
    averageQuizScore: 68,
    joinedDate: '2024-03-10',
    lastActive: '2024-12-17',
    lastTest: '3 days ago'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    department: 'Finance',
    role: 'user',
    totalCampaigns: 14,
    clickRate: 12,
    averageQuizScore: 85,
    joinedDate: '2023-09-05',
    lastActive: '2024-12-19',
    lastTest: '1 day ago'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    department: 'HR',
    role: 'user',
    totalCampaigns: 11,
    clickRate: 5,
    averageQuizScore: 90,
    joinedDate: '2024-02-28',
    lastActive: '2024-12-18',
    lastTest: '2 days ago'
  },
  {
    id: '6',
    name: 'David Kim',
    email: 'david.kim@company.com',
    department: 'Operations',
    role: 'user',
    totalCampaigns: 13,
    clickRate: 18,
    averageQuizScore: 75,
    joinedDate: '2023-12-10',
    lastActive: '2024-12-16',
    lastTest: '4 days ago'
  },
  {
    id: '7',
    name: 'Jennifer Martinez',
    email: 'jennifer.martinez@company.com',
    department: 'Marketing',
    role: 'user',
    totalCampaigns: 9,
    clickRate: 22,
    averageQuizScore: 70,
    joinedDate: '2024-04-15',
    lastActive: '2024-12-15',
    lastTest: '5 days ago'
  },
  {
    id: '8',
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    department: 'IT',
    role: 'user',
    totalCampaigns: 16,
    clickRate: 2,
    averageQuizScore: 98,
    joinedDate: '2023-08-22',
    lastActive: '2024-12-19',
    lastTest: '1 day ago'
  },
  {
    id: '9',
    name: 'Amanda White',
    email: 'amanda.white@company.com',
    department: 'Sales',
    role: 'user',
    totalCampaigns: 8,
    clickRate: 30,
    averageQuizScore: 65,
    joinedDate: '2024-05-20',
    lastActive: '2024-12-14',
    lastTest: '6 days ago'
  },
  {
    id: '10',
    name: 'Christopher Brown',
    email: 'christopher.brown@company.com',
    department: 'Finance',
    role: 'user',
    totalCampaigns: 12,
    clickRate: 10,
    averageQuizScore: 88,
    joinedDate: '2024-01-30',
    lastActive: '2024-12-19',
    lastTest: '1 day ago'
  }
];

/**
 * User Stats Summary
 */
export const MOCK_USER_STATS = {
  total: MOCK_USERS.length,
  active: MOCK_USERS.filter(u => {
    const lastActive = new Date(u.lastActive);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return lastActive > weekAgo;
  }).length,
  highRisk: MOCK_USERS.filter(u => u.clickRate > 20).length,
  averageClickRate: Math.round(MOCK_USERS.reduce((sum, u) => sum + u.clickRate, 0) / MOCK_USERS.length),
  averageQuizScore: Math.round(MOCK_USERS.reduce((sum, u) => sum + u.averageQuizScore, 0) / MOCK_USERS.length)
};

/**
 * Department List
 */
export const MOCK_DEPARTMENTS = [
  'All Departments',
  'Marketing',
  'IT',
  'Sales',
  'Finance',
  'HR',
  'Operations'
];

/**
 * User Performance Levels
 */
export const MOCK_PERFORMANCE_LEVELS = [
  'All Levels',
  'High Risk (>20% click rate)',
  'Medium Risk (10-20% click rate)',
  'Low Risk (<10% click rate)'
];

/**
 * User Detail (for individual user page)
 */
export const MOCK_USER_DETAIL = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  department: 'Marketing',
  role: 'user' as const,
  joinedDate: '2024-01-15',
  lastActive: '2024-12-18',
  
  metrics: {
    totalCampaigns: 12,
    clickRate: 8,
    averageQuizScore: 92,
    reportRate: 25,
    trainingCompleted: 10
  },
  
  campaignHistory: [
    {
      id: '1',
      campaignName: 'Q4 Security Awareness',
      dateSent: '2024-12-01',
      emailOpened: true,
      linkClicked: false,
      quizScore: '95%',
      timeToClick: '-'
    },
    {
      id: '2',
      campaignName: 'Holiday Season Awareness',
      dateSent: '2024-11-25',
      emailOpened: true,
      linkClicked: true,
      quizScore: '88%',
      timeToClick: '2h 15m'
    },
    {
      id: '3',
      campaignName: 'Bank Alert Simulation',
      dateSent: '2024-12-05',
      emailOpened: true,
      linkClicked: false,
      quizScore: '92%',
      timeToClick: '-'
    }
  ],
  
  performanceTrend: [
    { month: 'Jul', clickRate: 15, quizScore: 85 },
    { month: 'Aug', clickRate: 12, quizScore: 88 },
    { month: 'Sep', clickRate: 10, quizScore: 90 },
    { month: 'Oct', clickRate: 8, quizScore: 91 },
    { month: 'Nov', clickRate: 7, quizScore: 92 },
    { month: 'Dec', clickRate: 8, quizScore: 92 }
  ]
};

/**
 * Helper: Get users by department
 */
export const getUsersByDepartment = (department: string) => {
  if (department === 'All Departments') return MOCK_USERS;
  return MOCK_USERS.filter(u => u.department === department);
};

/**
 * Helper: Get users by performance level
 */
export const getUsersByPerformance = (level: string) => {
  if (level === 'All Levels') return MOCK_USERS;
  
  if (level.includes('High Risk')) {
    return MOCK_USERS.filter(u => u.clickRate > 20);
  }
  if (level.includes('Medium Risk')) {
    return MOCK_USERS.filter(u => u.clickRate >= 10 && u.clickRate <= 20);
  }
  if (level.includes('Low Risk')) {
    return MOCK_USERS.filter(u => u.clickRate < 10);
  }
  
  return MOCK_USERS;
};

/**
 * Helper: Get user by ID
 */
export const getUserById = (id: string) => {
  return MOCK_USERS.find(u => u.id === id) || null;
};

/**
 * Helper: Get top performers
 */
export const getTopPerformers = (limit: number = 5) => {
  return MOCK_USERS
    .sort((a, b) => b.averageQuizScore - a.averageQuizScore)
    .slice(0, limit);
};

/**
 * Helper: Get high risk users
 */
export const getHighRiskUsers = (limit: number = 10) => {
  return MOCK_USERS
    .filter(u => u.clickRate > 20)
    .sort((a, b) => b.clickRate - a.clickRate)
    .slice(0, limit);
};

/**
 * User Detail Profile Data (for individual user pages)
 */
export const MOCK_USER_DETAILS: Record<string, {
  id: string;
  name: string;
  email: string;
  department: string;
  joinedDate: string;
  lastActive: string;
  campaignsReceived: number;
  clickRate: number;
  clickRateTrend: number;
  averageQuizScore: number;
  quizScoreTrend: number;
  riskLevel: 'low' | 'medium' | 'high';
}> = {
  '1': {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Marketing',
    joinedDate: 'Jan 15, 2024',
    lastActive: 'Dec 18, 2024',
    campaignsReceived: 12,
    clickRate: 8,
    clickRateTrend: -15.3,
    averageQuizScore: 92,
    quizScoreTrend: 8.5,
    riskLevel: 'low'
  },
  '2': {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Engineering',
    joinedDate: 'Jan 15, 2025',
    lastActive: 'Nov 18, 2025',
    campaignsReceived: 7,
    clickRate: 71.4,
    clickRateTrend: -8.2,
    averageQuizScore: 84.5,
    quizScoreTrend: 6.3,
    riskLevel: 'medium'
  }
};

/**
 * User Click Rate Trend Data
 */
export const MOCK_USER_CLICK_RATE_TREND: Record<string, Array<{ name: string; clickRate: number }>> = {
  '2': [
    { name: 'Jun', clickRate: 100 },
    { name: 'Jul', clickRate: 90 },
    { name: 'Aug', clickRate: 75 },
    { name: 'Sep', clickRate: 60 },
    { name: 'Oct', clickRate: 50 },
    { name: 'Nov', clickRate: 30 }
  ]
};

/**
 * User Quiz Score Trend Data
 */
export const MOCK_USER_QUIZ_SCORE_TREND: Record<string, Array<{ name: string; quizScore: number }>> = {
  '2': [
    { name: 'Jun', quizScore: 55 },
    { name: 'Jul', quizScore: 60 },
    { name: 'Aug', quizScore: 65 },
    { name: 'Sep', quizScore: 72 },
    { name: 'Oct', quizScore: 78 },
    { name: 'Nov', quizScore: 85 }
  ]
};

/**
 * User Campaign History
 */
export const MOCK_USER_CAMPAIGN_HISTORY: Record<string, Array<{
  id: string;
  campaignName: string;
  dateSent: string;
  emailOpened: boolean;
  linkClicked: boolean;
  quizScore: string;
  timeToClick?: string;
}>> = {
  '2': [
    {
      id: '1',
      campaignName: 'Q4 Credential Phishing',
      dateSent: 'Nov 18, 2025',
      emailOpened: true,
      linkClicked: true,
      quizScore: '7/10',
      timeToClick: '2 minutes'
    },
    {
      id: '2',
      campaignName: 'CEO Fraud Awareness',
      dateSent: 'Nov 15, 2025',
      emailOpened: true,
      linkClicked: false,
      quizScore: '9/10'
    },
    {
      id: '3',
      campaignName: 'Payroll Redirect Attack',
      dateSent: 'Nov 10, 2025',
      emailOpened: true,
      linkClicked: true,
      quizScore: '6/10',
      timeToClick: '1 minute'
    },
    {
      id: '4',
      campaignName: 'IT Security Alert Test',
      dateSent: 'Nov 8, 2025',
      emailOpened: true,
      linkClicked: true,
      quizScore: '7/10',
      timeToClick: '3 minutes'
    },
    {
      id: '5',
      campaignName: 'Tax Season Scam Awareness',
      dateSent: 'Nov 5, 2025',
      emailOpened: true,
      linkClicked: false,
      quizScore: '6/10'
    },
    {
      id: '6',
      campaignName: 'Vendor Invoice Scam',
      dateSent: 'Nov 2, 2025',
      emailOpened: false,
      linkClicked: false,
      quizScore: 'N/A'
    },
    {
      id: '7',
      campaignName: 'Holiday Shopping Scam',
      dateSent: 'Oct 28, 2025',
      emailOpened: true,
      linkClicked: true,
      quizScore: '5/10',
      timeToClick: '30 seconds'
    }
  ]
};

/**
 * Helper: Get user detail by ID
 */
export const getUserDetail = (userId: string) => {
  return MOCK_USER_DETAILS[userId] || MOCK_USER_DETAILS['2'];
};

/**
 * Helper: Get user click rate trend by ID
 */
export const getUserClickRateTrend = (userId: string) => {
  return MOCK_USER_CLICK_RATE_TREND[userId] || MOCK_USER_CLICK_RATE_TREND['2'];
};

/**
 * Helper: Get user quiz score trend by ID
 */
export const getUserQuizScoreTrend = (userId: string) => {
  return MOCK_USER_QUIZ_SCORE_TREND[userId] || MOCK_USER_QUIZ_SCORE_TREND['2'];
};

/**
 * Helper: Get user campaign history by ID
 */
export const getUserCampaignHistory = (userId: string) => {
  return MOCK_USER_CAMPAIGN_HISTORY[userId] || MOCK_USER_CAMPAIGN_HISTORY['2'];
};