import apiClient, { tokenStorage } from '@/lib/api-client';
import type { BackendResponse } from '@/lib/api-client';
import type {
  LoginCredentials,
  UserSignupData,
  AdminSignupData,
  PasswordResetRequest,
  PasswordResetData,
  User,
} from '@/types/auth';

// The backend returns role as uppercase ('ADMIN', 'USER')
// but our frontend types use lowercase ('admin', 'user').
// This normalizes the backend user object to match frontend types.
function normalizeUser(backendUser: Record<string, unknown>): User {
  return {
    id: backendUser.id as string,
    name: backendUser.name as string,
    email: backendUser.email as string,
    role: (backendUser.role as string).toLowerCase() as User['role'],
    organizationId: backendUser.organizationId as string | undefined,
    organizationName: backendUser.organizationName as string | undefined,
    createdAt: backendUser.createdAt as string || new Date().toISOString(),
    updatedAt: backendUser.updatedAt as string || new Date().toISOString(),
  };
}

interface LoginResponseData {
  user: Record<string, unknown>;
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponseData {
  user: Record<string, unknown>;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; message: string }> {
    const response = await apiClient.post<BackendResponse<LoginResponseData>>(
      '/auth/login',
      {
        email: credentials.email,
        password: credentials.password,
      }
    );

    const { user, accessToken, refreshToken } = response.data.data!;
    tokenStorage.setTokens(accessToken, refreshToken);

    return {
      user: normalizeUser(user),
      message: response.data.message || 'Login successful',
    };
  },

  async register(data: UserSignupData | AdminSignupData): Promise<{ user: User; message: string }> {
    const payload: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    // If registering as admin, include the organization name
    if ('organizationName' in data) {
      payload.organizationName = data.organizationName;
    }

    const response = await apiClient.post<BackendResponse<RegisterResponseData>>(
      '/auth/register',
      payload
    );

    const { user, accessToken, refreshToken } = response.data.data!;
    tokenStorage.setTokens(accessToken, refreshToken);

    return {
      user: normalizeUser(user),
      message: response.data.message || 'Registration successful',
    };
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Even if the server call fails, clear local tokens
    } finally {
      tokenStorage.clearTokens();
    }
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<BackendResponse<Record<string, unknown>>>('/auth/me');
    return normalizeUser(response.data.data!);
  },

  async forgotPassword(data: PasswordResetRequest): Promise<{ message: string }> {
    const response = await apiClient.post<BackendResponse<null>>(
      '/auth/forgot-password',
      { email: data.email }
    );

    return {
      message: response.data.message || 'If that email exists, a reset link has been sent.',
    };
  },

  async resetPassword(data: PasswordResetData): Promise<{ message: string }> {
    const response = await apiClient.post<BackendResponse<null>>(
      '/auth/reset-password',
      {
        token: data.token,
        newPassword: data.password,
      }
    );

    return {
      message: response.data.message || 'Password updated successfully.',
    };
  },
};