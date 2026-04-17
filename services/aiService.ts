import apiClient from '@/lib/api-client';
import type { BackendResponse } from '@/lib/api-client';

export interface AIAnalysisResult {
  is_phishing: boolean;
  phishing_probability: number;
  safe_probability: number;
  risk_level: string;
  confidence: number;
  model_breakdown: {
    random_forest: number;
    distilbert: number;
    ensemble: number;
  };
}

export interface AIHealthStatus {
  status: string;
  models_loaded: boolean;
}

export const aiService = {
  async analyzeEmail(emailText: string): Promise<AIAnalysisResult> {
    const response = await apiClient.post<BackendResponse<AIAnalysisResult>>(
      '/ai/analyze',
      { emailText }
    );
    return response.data.data!;
  },

  async batchAnalyze(emails: string[]): Promise<AIAnalysisResult[]> {
    const response = await apiClient.post<BackendResponse<AIAnalysisResult[]>>(
      '/ai/batch-analyze',
      { emails }
    );
    return response.data.data!;
  },

  async checkHealth(): Promise<AIHealthStatus> {
    const response = await apiClient.get<BackendResponse<AIHealthStatus>>(
      '/ai/health'
    );
    return response.data.data!;
  },
};