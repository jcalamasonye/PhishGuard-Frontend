import apiClient from '@/lib/api-client';
import type { BackendResponse } from '@/lib/api-client';
import type { EmailTemplate, TemplateDifficulty, TemplateCategory } from '@/types/template';

// Map category to a default icon since the backend doesn't store icons
const CATEGORY_ICONS: Record<string, string> = {
  PASSWORD: 'lock',
  PACKAGE: 'package',
  EXECUTIVE: 'briefcase',
  PAYROLL: 'dollar-sign',
  SECURITY: 'shield',
  VENDOR: 'truck',
  HR: 'users',
  SOCIAL: 'share-2',
  BANK: 'credit-card',
  IT: 'monitor',
};

function normalizeTemplate(raw: Record<string, unknown>): EmailTemplate {
  const category = ((raw.category as string) || 'IT').toUpperCase();

  return {
    id: raw.id as string,
    name: raw.name as string,
    description: raw.description as string || '',
    difficulty: ((raw.difficulty as string) || 'MEDIUM').toLowerCase() as TemplateDifficulty,
    category: ((raw.category as string) || 'IT').toLowerCase() as TemplateCategory,
    icon: CATEGORY_ICONS[category] || 'mail',
    subject: raw.subject as string || '',
    fromName: raw.fromName as string || '',
    fromEmail: raw.fromEmail as string || '',
    body: raw.body as string || '',
    ctaText: raw.ctaText as string || '',
    redFlags: (raw.redFlags as string[]) || [],
  };
}

interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TemplateListResult {
  templates: EmailTemplate[];
  total: number;
  page: number;
  totalPages: number;
}

export const templateService = {
  async getAll(params?: {
    category?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
  }): Promise<TemplateListResult> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'all') {
      query.set('category', params.category.toUpperCase());
    }
    if (params?.difficulty && params.difficulty !== 'all') {
      query.set('difficulty', params.difficulty.toUpperCase());
    }
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));

    const response = await apiClient.get<{
      success: boolean;
      data: Record<string, unknown>[];
      metadata: PaginatedMeta;
    }>(`/templates?${query.toString()}`);

    return {
      templates: (response.data.data || []).map(normalizeTemplate),
      total: response.data.metadata?.total || 0,
      page: response.data.metadata?.page || 1,
      totalPages: response.data.metadata?.totalPages || 1,
    };
  },

  async getById(id: string): Promise<EmailTemplate> {
    const response = await apiClient.get<BackendResponse<Record<string, unknown>>>(
      `/templates/${id}`
    );
    return normalizeTemplate(response.data.data!);
  },

  async create(data: {
    name: string;
    description: string;
    difficulty: string;
    category: string;
    subject: string;
    fromName: string;
    fromEmail: string;
    body: string;
    ctaText?: string;
    ctaUrl?: string;
    redFlags: string[];
  }): Promise<EmailTemplate> {
    const payload = {
      ...data,
      difficulty: data.difficulty.toUpperCase(),
      category: data.category.toUpperCase(),
    };

    const response = await apiClient.post<BackendResponse<Record<string, unknown>>>(
      '/templates',
      payload
    );
    return normalizeTemplate(response.data.data!);
  },

  async update(id: string, data: Partial<{
    name: string;
    description: string;
    difficulty: string;
    category: string;
    subject: string;
    fromName: string;
    fromEmail: string;
    body: string;
    ctaText: string;
    ctaUrl: string;
    redFlags: string[];
  }>): Promise<EmailTemplate> {
    const payload: Record<string, unknown> = { ...data };
    if (data.difficulty) payload.difficulty = data.difficulty.toUpperCase();
    if (data.category) payload.category = data.category.toUpperCase();

    const response = await apiClient.patch<BackendResponse<Record<string, unknown>>>(
      `/templates/${id}`,
      payload
    );
    return normalizeTemplate(response.data.data!);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/templates/${id}`);
  },

  async duplicate(id: string): Promise<EmailTemplate> {
    const response = await apiClient.post<BackendResponse<Record<string, unknown>>>(
      `/templates/${id}/duplicate`
    );
    return normalizeTemplate(response.data.data!);
  },
};