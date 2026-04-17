import apiClient from '@/lib/api-client';
import type { BackendResponse } from '@/lib/api-client';
import type { Campaign, CampaignStatus, CreateCampaignData } from '@/types/campaign';

// The backend returns status as uppercase ('DRAFT', 'ACTIVE', etc.)
// but our frontend types use lowercase ('draft', 'active', etc.)
function normalizeCampaign(raw: Record<string, unknown>): Campaign {
  return {
    id: raw.id as string,
    name: raw.name as string,
    description: raw.description as string | undefined,
    dateSent: (raw.launchedAt as string) || null,
    recipients: (raw.recipients as number) || (raw._count as { participants: number })?.participants || 0,
    openRate: (raw.openRate as number) ?? null,
    clickRate: (raw.clickRate as number) ?? null,
    status: ((raw.status as string) || 'draft').toLowerCase() as CampaignStatus,
    templateId: raw.templateId as string | undefined,
    createdAt: raw.createdAt as string || new Date().toISOString(),
    updatedAt: raw.updatedAt as string || new Date().toISOString(),
  };
}

interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface CampaignListResult {
  campaigns: Campaign[];
  total: number;
  page: number;
  totalPages: number;
}

export const campaignService = {
  async getAll(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<CampaignListResult> {
    const query = new URLSearchParams();
    if (params?.status && params.status !== 'all') {
      query.set('status', params.status.toUpperCase());
    }
    if (params?.search) query.set('search', params.search);
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));

    const response = await apiClient.get<{
      success: boolean;
      data: Record<string, unknown>[];
      metadata: PaginatedMeta;
    }>(`/campaigns?${query.toString()}`);

    return {
      campaigns: (response.data.data || []).map(normalizeCampaign),
      total: response.data.metadata?.total || 0,
      page: response.data.metadata?.page || 1,
      totalPages: response.data.metadata?.totalPages || 1,
    };
  },

  async getById(id: string): Promise<Campaign> {
    const response = await apiClient.get<BackendResponse<Record<string, unknown>>>(
      `/campaigns/${id}`
    );
    return normalizeCampaign(response.data.data!);
  },

  async create(data: CreateCampaignData): Promise<Campaign> {
    const payload: Record<string, unknown> = {
      name: data.name,
      description: data.description,
      templateId: data.templateId,
      recipientIds: data.recipientIds,
    };

    if (data.scheduledDate) {
      const dateTime = data.scheduledTime
        ? `${data.scheduledDate}T${data.scheduledTime}:00.000Z`
        : `${data.scheduledDate}T09:00:00.000Z`;
      payload.scheduledAt = dateTime;
    }

    const response = await apiClient.post<BackendResponse<Record<string, unknown>>>(
      '/campaigns',
      payload
    );
    return normalizeCampaign(response.data.data!);
  },

  async update(id: string, data: Partial<{ name: string; description: string; status: string }>): Promise<Campaign> {
    const payload: Record<string, unknown> = { ...data };
    if (data.status) {
      payload.status = data.status.toUpperCase();
    }

    const response = await apiClient.patch<BackendResponse<Record<string, unknown>>>(
      `/campaigns/${id}`,
      payload
    );
    return normalizeCampaign(response.data.data!);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/campaigns/${id}`);
  },

  async launch(id: string): Promise<Campaign> {
    const response = await apiClient.post<BackendResponse<Record<string, unknown>>>(
      `/campaigns/${id}/launch`
    );
    return normalizeCampaign(response.data.data!);
  },

  async getResults(id: string): Promise<Record<string, unknown>> {
    const response = await apiClient.get<BackendResponse<Record<string, unknown>>>(
      `/campaigns/${id}/results`
    );
    return response.data.data!;
  },
};