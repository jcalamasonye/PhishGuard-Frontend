import apiClient from '@/lib/api-client';
import type { BackendResponse } from '@/lib/api-client';
import type { QuizQuestion } from '@/types/quiz';

export interface Quiz {
  id: string;
  title: string;
  description: string | null;
  difficulty: string;
  category: string;
  timeLimit: number | null;
  passingScore: number;
  questions?: QuizQuestion[];
  _count?: { questions: number };
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  timeSpent: number;
  passed: boolean;
  completedAt: string | null;
  quiz?: {
    title: string;
    difficulty: string;
    category: string;
  };
}

export interface QuizSubmitResult {
  attempt: QuizAttempt;
  score: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
}

export const quizService = {
  async getAll(params?: {
    category?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
  }): Promise<{ quizzes: Quiz[]; total: number }> {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category.toUpperCase());
    if (params?.difficulty) query.set('difficulty', params.difficulty.toUpperCase());
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));

    const response = await apiClient.get<{
      success: boolean;
      data: Quiz[];
      metadata: { total: number };
    }>(`/quizzes?${query.toString()}`);

    return {
      quizzes: response.data.data || [],
      total: response.data.metadata?.total || 0,
    };
  },

  async getById(id: string): Promise<Quiz> {
    const response = await apiClient.get<BackendResponse<Quiz>>(
      `/quizzes/${id}`
    );
    return response.data.data!;
  },

  async submit(quizId: string, data: {
    answers: Record<string, number>;
    timeSpent: number;
  }): Promise<QuizSubmitResult> {
    const response = await apiClient.post<BackendResponse<QuizSubmitResult>>(
      `/quizzes/${quizId}/submit`,
      data
    );
    return response.data.data!;
  },

  async getMyAttempts(): Promise<QuizAttempt[]> {
    const response = await apiClient.get<BackendResponse<QuizAttempt[]>>(
      '/quizzes/attempts'
    );
    return response.data.data || [];
  },

  async getAttemptById(id: string): Promise<QuizAttempt & { quiz: Quiz }> {
    const response = await apiClient.get<BackendResponse<QuizAttempt & { quiz: Quiz }>>(
      `/quizzes/attempts/${id}`
    );
    return response.data.data!;
  },
};