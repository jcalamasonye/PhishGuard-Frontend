

import { DepartmentPerformance, RiskAssessment, TopPerformer, OverallMetrics, QuizPerformanceData } from '@/types/reports';


export const MOCK_OVERALL_METRICS: OverallMetrics = {
  totalCampaigns: 24,
  totalUsers: 250,
  averageClickRate: 16,
  averageQuizScore: 82,
  highRiskUsers: 35,
  improvementRate: 12
};


export const MOCK_DEPARTMENT_PERFORMANCE: DepartmentPerformance[] = [
  {
    department: 'IT',
    totalUsers: 30,
    averageClickRate: 5,
    averageQuizScore: 94,
    highRiskUsers: 2,
    campaignsCompleted: 15
  },
  {
    department: 'Marketing',
    totalUsers: 50,
    averageClickRate: 22,
    averageQuizScore: 76,
    highRiskUsers: 12,
    campaignsCompleted: 12
  },
  {
    department: 'Sales',
    totalUsers: 80,
    averageClickRate: 25,
    averageQuizScore: 72,
    highRiskUsers: 18,
    campaignsCompleted: 10
  },
  {
    department: 'Finance',
    totalUsers: 40,
    averageClickRate: 10,
    averageQuizScore: 88,
    highRiskUsers: 3,
    campaignsCompleted: 14
  },
  {
    department: 'HR',
    totalUsers: 25,
    averageClickRate: 8,
    averageQuizScore: 90,
    highRiskUsers: 1,
    campaignsCompleted: 11
  },
  {
    department: 'Operations',
    totalUsers: 25,
    averageClickRate: 18,
    averageQuizScore: 78,
    highRiskUsers: 4,
    campaignsCompleted: 13
  }
];


export const MOCK_RISK_ASSESSMENT: RiskAssessment[] = [
  {
    level: 'critical',
    count: 12,
    percentage: 5,
    description: 'Clicked multiple phishing links, low quiz scores'
  },
  {
    level: 'high',
    count: 23,
    percentage: 9,
    description: 'Frequent phishing susceptibility'
  },
  {
    level: 'medium',
    count: 85,
    percentage: 34,
    description: 'Occasional phishing clicks'
  },
  {
    level: 'low',
    count: 130,
    percentage: 52,
    description: 'Good security awareness'
  }
];


export const MOCK_TOP_PERFORMERS: TopPerformer[] = [
  {
    id: '8',
    name: 'Robert Taylor',
    department: 'IT',
    clickRate: 2,
    quizScore: 98,
    campaignsCompleted: 16
  },
  {
    id: '2',
    name: 'Michael Chen',
    department: 'IT',
    clickRate: 3,
    quizScore: 95,
    campaignsCompleted: 15
  },
  {
    id: '1',
    name: 'Sarah Johnson',
    department: 'Marketing',
    clickRate: 8,
    quizScore: 92,
    campaignsCompleted: 12
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    department: 'HR',
    clickRate: 5,
    quizScore: 90,
    campaignsCompleted: 11
  },
  {
    id: '10',
    name: 'Christopher Brown',
    department: 'Finance',
    clickRate: 10,
    quizScore: 88,
    campaignsCompleted: 12
  }
];


export const MOCK_QUIZ_PERFORMANCE: QuizPerformanceData[] = [
  {
    campaignName: 'Q4 Security Awareness',
    averageScore: 78,
    completionRate: 92,
    totalParticipants: 230
  },
  {
    campaignName: 'Holiday Season Awareness',
    averageScore: 72,
    completionRate: 88,
    totalParticipants: 264
  },
  {
    campaignName: 'Bank Alert Simulation',
    averageScore: 82,
    completionRate: 95,
    totalParticipants: 171
  },
  {
    campaignName: 'IT Department Simulation',
    averageScore: 88,
    completionRate: 97,
    totalParticipants: 44
  }
];


export const MOCK_CLICK_RATE_TREND = [
  { month: 'Jul', clickRate: 24, reportRate: 8 },
  { month: 'Aug', clickRate: 22, reportRate: 10 },
  { month: 'Sep', clickRate: 20, reportRate: 12 },
  { month: 'Oct', clickRate: 18, reportRate: 14 },
  { month: 'Nov', clickRate: 17, reportRate: 15 },
  { month: 'Dec', clickRate: 16, reportRate: 16 }
];


export const MOCK_QUIZ_SCORE_TREND = [
  { month: 'Jul', averageScore: 72 },
  { month: 'Aug', averageScore: 75 },
  { month: 'Sep', averageScore: 78 },
  { month: 'Oct', averageScore: 80 },
  { month: 'Nov', averageScore: 81 },
  { month: 'Dec', averageScore: 82 }
];


export const MOCK_CAMPAIGN_COMPARISON = [
  { name: 'Q4 Awareness', clickRate: 18, quizScore: 78, reportRate: 12 },
  { name: 'Executive Test', clickRate: 12, quizScore: 85, reportRate: 18 },
  { name: 'Holiday Season', clickRate: 22, quizScore: 72, reportRate: 10 },
  { name: 'Bank Alert', clickRate: 15, quizScore: 82, reportRate: 15 }
];


export const MOCK_CLICK_RATE_TREND_WITH_CAMPAIGNS = [
  { month: 'Jun', clickRate: 24, campaigns: 8 },
  { month: 'Jul', clickRate: 22, campaigns: 9 },
  { month: 'Aug', clickRate: 20, campaigns: 10 },
  { month: 'Sep', clickRate: 18, campaigns: 9 },
  { month: 'Oct', clickRate: 17, campaigns: 11 },
  { month: 'Nov', clickRate: 16, campaigns: 10 }
];


export const MOCK_MOST_CLICKED_TEMPLATES = [
  { name: 'Password Reset', clicks: 145, sent: 450 },
  { name: 'Package Delivery', clicks: 132, sent: 480 },
  { name: 'CEO Request', clicks: 98, sent: 520 },
  { name: 'Payroll Update', clicks: 87, sent: 420 },
  { name: 'IT Security', clicks: 76, sent: 380 }
];


export const MOCK_DEPARTMENT_CLICK_RATES = MOCK_DEPARTMENT_PERFORMANCE.map(dept => ({
  department: dept.department,
  clickRate: dept.averageClickRate
}));


export const MOCK_HIGH_RISK_USERS = [
  { name: 'Michael Brown', department: 'Sales', clickRate: 83.3, campaigns: 6 },
  { name: 'Lisa Anderson', department: 'Marketing', clickRate: 75, campaigns: 8 },
  { name: 'David Miller', department: 'Sales', clickRate: 71.4, campaigns: 7 }
];


export const MOCK_MEDIUM_RISK_USERS = [
  { name: 'Jennifer Wilson', department: 'Sales', clickRate: 60, campaigns: 6 },
  { name: 'Robert Taylor', department: 'Marketing', clickRate: 55.3, campaigns: 7 },
  { name: 'Sarah Davis', department: 'Sales', clickRate: 47.5, campaigns: 8 }
];


export const MOCK_LOW_RISK_USERS = [
  { name: 'Emily Johnson', department: 'Engineering', clickRate: 13.3, campaigns: 15 },
  { name: 'James Smith', department: 'Finance', clickRate: 10, campaigns: 10 },
  { name: 'Amanda Lee', department: 'Engineering', clickRate: 8.3, campaigns: 12 }
];


export const MOCK_QUIZ_PERFORMANCE_TREND = [
  { month: 'Jun', avgScore: 72, participants: 95 },
  { month: 'Jul', avgScore: 75, participants: 98 },
  { month: 'Aug', avgScore: 78, participants: 102 },
  { month: 'Sep', avgScore: 80, participants: 105 },
  { month: 'Oct', avgScore: 81, participants: 108 },
  { month: 'Nov', avgScore: 82, participants: 112 }
];


export const MOCK_MISSED_QUESTIONS = [
  { topic: 'Identifying phishing URLs', missed: 88, total: 189, percentage: 46.6 },
  { topic: 'Sender verification', missed: 76, total: 189, percentage: 40.2 },
  { topic: 'Recognizing spoofed sender addresses', missed: 76, total: 189, percentage: 40.2 },
  { topic: 'Understanding urgency tactics', missed: 68, total: 189, percentage: 36 },
  { topic: 'Spotting generic greetings', missed: 65, total: 189, percentage: 34.4 }
];


export const getAllAnalyticsData = () => ({
  overallMetrics: MOCK_OVERALL_METRICS,
  departmentPerformance: MOCK_DEPARTMENT_PERFORMANCE,
  riskAssessment: MOCK_RISK_ASSESSMENT,
  topPerformers: MOCK_TOP_PERFORMERS,
  quizPerformance: MOCK_QUIZ_PERFORMANCE,
  clickRateTrend: MOCK_CLICK_RATE_TREND,
  quizScoreTrend: MOCK_QUIZ_SCORE_TREND,
  campaignComparison: MOCK_CAMPAIGN_COMPARISON
});