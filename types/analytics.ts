export interface DepartmentPerformance {
  department: string;
  totalUsers: number;
  averageClickRate: number;
  averageQuizScore: number;
  highRiskUsers: number;
  campaignsCompleted: number;
}

export interface RiskAssessment {
  level: 'critical' | 'high' | 'medium' | 'low';
  count: number;
  percentage: number;
  description: string;
}

export interface TopPerformer {
  id: string;
  name: string;
  department: string;
  clickRate: number;
  quizScore: number;
  campaignsCompleted: number;
}

export interface OverallMetrics {
  totalCampaigns: number;
  totalUsers: number;
  averageClickRate: number;
  averageQuizScore: number;
  highRiskUsers: number;
  improvementRate: number;
}

export interface QuizPerformanceData {
  campaignName: string;
  averageScore: number;
  completionRate: number;
  totalParticipants: number;
}