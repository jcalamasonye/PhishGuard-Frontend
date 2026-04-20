import apiClient from '@/lib/api-client';
import type { BackendResponse } from '@/lib/api-client';
import type { User, AddUserFormData, UserPerformanceMetrics, UserCampaignHistory } from '@/types/user';



function normalizeUser(raw: Record<string, unknown>): User {
  return {
    id: raw.id as string,
    name: raw.name as string,
    email: raw.email as string,
    department: (raw.department as string) || 'Unassigned',
    role: ((raw.role as string) || 'USER').toLowerCase() as 'user' | 'admin',
    avatar: raw.avatar as string | undefined,
    totalCampaigns: (raw.totalCampaigns as number) || 0,
    clickRate: (raw.clickRate as number) || 0,
    averageQuizScore: (raw.averageQuizScore as number) || 0,
    joinedDate: raw.createdAt as string || new Date().toISOString(),
    lastActive: raw.lastActiveAt as string || raw.createdAt as string || new Date().toISOString(),
    lastTest: formatRelativeDate(raw.lastActiveAt as string),
  };
}

function formatRelativeDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'Never';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UserListResult {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export const userService = {
  async getAll(params?: {
    search?: string;
    department?: string;
    page?: number;
    limit?: number;
  }): Promise<UserListResult> {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.department && params.department !== 'All Departments' && params.department !== 'all') {
      query.set('department', params.department);
    }
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));

    
    query.set('role', 'USER');

    const response = await apiClient.get<{
      success: boolean;
      data: Record<string, unknown>[];
      metadata: PaginatedMeta;
    }>(`/users?${query.toString()}`);

    return {
      users: (response.data.data || []).map(normalizeUser),
      total: response.data.metadata?.total || 0,
      page: response.data.metadata?.page || 1,
      totalPages: response.data.metadata?.totalPages || 1,
    };
  },

  async getById(id: string): Promise<User> {
    const response = await apiClient.get<BackendResponse<Record<string, unknown>>>(
      `/users/${id}`
    );
    return normalizeUser(response.data.data!);
  },

  async create(data: AddUserFormData): Promise<User> {
    const response = await apiClient.post<BackendResponse<Record<string, unknown>>>(
      '/users',
      {
        name: data.fullName,
        email: data.email,
        department: data.department || undefined,
      }
    );
    return normalizeUser(response.data.data!);
  },

  async update(id: string, data: Partial<{ name: string; department: string; avatar: string }>): Promise<User> {
    const response = await apiClient.patch<BackendResponse<Record<string, unknown>>>(
      `/users/${id}`,
      data
    );
    return normalizeUser(response.data.data!);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },

  async bulkCreate(users: Array<{ name: string; email: string; department?: string }>): Promise<{ count: number }> {
    const response = await apiClient.post<BackendResponse<{ count: number }>>(
      '/users/bulk-upload',
      { users, sendWelcomeEmail: true }
    );
    return response.data.data!;
  },

  async getPerformance(id: string): Promise<{
    metrics: UserPerformanceMetrics;
    campaigns: UserCampaignHistory[];
  }> {
    const response = await apiClient.get<BackendResponse<Record<string, unknown>>>(
      `/users/${id}/performance`
    );

    const data = response.data.data!;
    const totalCampaigns = (data.totalCampaigns as number) || 0;
    const clickRate = (data.clickRate as number) || 0;
    const averageQuizScore = (data.averageQuizScore as number) || 0;

    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (clickRate > 50 || averageQuizScore < 50) riskLevel = 'high';
    else if (clickRate > 25 || averageQuizScore < 70) riskLevel = 'medium';

    const rawCampaigns = (data.campaigns as Record<string, unknown>[]) || [];

    return {
      metrics: {
        campaignsReceived: totalCampaigns,
        clickRate,
        clickRateTrend: 0,
        averageQuizScore,
        quizScoreTrend: 0,
        riskLevel,
      },
      campaigns: rawCampaigns.map((c) => ({
        id: c.id as string,
        campaignName: c.campaignName as string,
        dateSent: c.dateSent as string || '',
        emailOpened: (c.emailOpened as boolean) || false,
        linkClicked: (c.linkClicked as boolean) || false,
        quizScore: c.quizScore != null ? `${c.quizScore}%` : 'N/A',
        timeToClick: c.timeToClick as string | undefined,
      })),
    };
  },
};