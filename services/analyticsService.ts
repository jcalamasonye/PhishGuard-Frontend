import apiClient from '@/lib/api-client';
import type { BackendResponse } from '@/lib/api-client';

export interface OverviewData {
  totalUsers: number;
  totalCampaigns: number;
  activeCampaigns: number;
  overallClickRate: number;
  averageQuizScore: number;
  totalEmailsSent: number;
}

export interface DepartmentStat {
  name: string;
  userCount: number;
  clickRate: number;
  averageQuizScore: number;
}

export interface RiskUser {
  userId: string;
  name: string;
  email: string;
  department: string | null;
  clickRate: number;
  averageQuizScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface RiskAssessment {
  summary: {
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
    total: number;
  };
  users: RiskUser[];
}

export interface ClickRateTrendPoint {
  date: string;
  clickRate: number;
}

export interface TemplatePerformance {
  name: string;
  clickRate: number;
  totalSent: number;
}

export const analyticsService = {
  async getOverview(): Promise<OverviewData> {
    const response = await apiClient.get<BackendResponse<OverviewData>>(
      '/analytics/overview'
    );
    return response.data.data!;
  },

  async getDepartmentStats(): Promise<DepartmentStat[]> {
    const response = await apiClient.get<BackendResponse<DepartmentStat[]>>(
      '/analytics/department'
    );
    return response.data.data!;
  },

  async getRiskAssessment(): Promise<RiskAssessment> {
    const response = await apiClient.get<BackendResponse<RiskAssessment>>(
      '/analytics/risk-assessment'
    );
    return response.data.data!;
  },

  async getClickRateTrend(days?: number): Promise<ClickRateTrendPoint[]> {
    const query = days ? `?days=${days}` : '';
    const response = await apiClient.get<BackendResponse<ClickRateTrendPoint[]>>(
      `/analytics/trend${query}`
    );
    return response.data.data!;
  },

  async getTemplatePerformance(): Promise<TemplatePerformance[]> {
    const response = await apiClient.get<BackendResponse<TemplatePerformance[]>>(
      '/analytics/template-performance'
    );
    return response.data.data || [];
  },
};