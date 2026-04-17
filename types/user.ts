export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  lastTest: string;
  avatar?: string;
  role: 'user' | 'admin';
  totalCampaigns: number;
  clickRate: number;
  averageQuizScore: number;
  joinedDate: string;
  lastActive: string;
}

export interface UserPerformanceMetrics {
  campaignsReceived: number;
  clickRate: number;
  clickRateTrend: number;
  averageQuizScore: number;
  quizScoreTrend: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface UserCampaignHistory {
  id: string;
  campaignName: string;
  dateSent: string;
  emailOpened: boolean;
  linkClicked: boolean;
  quizScore: string;
  timeToClick?: string;
}

export interface AddUserFormData {
  fullName: string;
  email: string;
  department: string;
  sendWelcomeEmail: boolean;
}

export interface UserFilters {
  searchQuery: string;
  department: string;
  performanceLevel: string;
}