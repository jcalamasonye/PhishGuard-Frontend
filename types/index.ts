
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ApiError[];
}


export interface ApiError {
  field?: string;
  message: string;
  code?: string;
}


export type LoadingState = 'idle' | 'loading' | 'success' | 'error';


export interface PaginationParams {
  page: number;
  limit: number;
}


export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}


export * from './auth';