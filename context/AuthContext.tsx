'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { tokenStorage } from '@/lib/api-client';
import { AuthStatus } from '@/types/auth';
import type {
  User,
  LoginCredentials,
  UserSignupData,
  AdminSignupData,
  PasswordResetRequest,
  PasswordResetData,
} from '@/types/auth';

interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: UserSignupData | AdminSignupData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (data: PasswordResetRequest) => Promise<string>;
  resetPassword: (data: PasswordResetData) => Promise<string>;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.LOADING);

  
  useEffect(() => {
    const restoreSession = async () => {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        setStatus(AuthStatus.UNAUTHENTICATED);
        return;
      }

      try {
        const currentUser = await authService.getMe();
        setUser(currentUser);
        setStatus(AuthStatus.AUTHENTICATED);
      } catch {
        tokenStorage.clearTokens();
        setStatus(AuthStatus.UNAUTHENTICATED);
      }
    };

    restoreSession();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const result = await authService.login(credentials);
    setUser(result.user);
    setStatus(AuthStatus.AUTHENTICATED);

    if (result.user.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  const signup = useCallback(async (data: UserSignupData | AdminSignupData) => {
    const result = await authService.register(data);
    setUser(result.user);
    setStatus(AuthStatus.AUTHENTICATED);

    if (result.user.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setStatus(AuthStatus.UNAUTHENTICATED);
    router.push('/login');
  }, [router]);

  const forgotPassword = useCallback(async (data: PasswordResetRequest) => {
    const result = await authService.forgotPassword(data);
    return result.message;
  }, []);

  const resetPassword = useCallback(async (data: PasswordResetData) => {
    const result = await authService.resetPassword(data);
    return result.message;
  }, []);

  const value: AuthContextValue = {
    user,
    status,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    isAdmin: user?.role === 'admin',
    isAuthenticated: status === AuthStatus.AUTHENTICATED,
    isLoading: status === AuthStatus.LOADING,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}