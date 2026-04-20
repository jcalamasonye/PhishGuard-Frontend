'use client';

import { useState, useCallback } from 'react';
import { useAuth as useAuthContext } from '@/context/AuthContext';
import type {
  LoginCredentials,
  UserSignupData,
  AdminSignupData,
  PasswordResetRequest,
  PasswordResetData,
  AuthResponse,
} from '@/types/auth';






export function useAuth() {
  const auth = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsSubmitting(true);
    try {
      await auth.login(credentials);
      return { success: true, message: 'Login successful' };
    } catch (error: unknown) {
      const message = extractErrorMessage(error, 'Login failed');
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [auth]);

  const signup = useCallback(async (
    data: UserSignupData | AdminSignupData
  ): Promise<AuthResponse> => {
    setIsSubmitting(true);
    try {
      await auth.signup(data);
      return { success: true, message: 'Account created' };
    } catch (error: unknown) {
      const message = extractErrorMessage(error, 'Signup failed');
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [auth]);

  const resetPassword = useCallback(async (
    data: PasswordResetRequest
  ): Promise<AuthResponse> => {
    setIsSubmitting(true);
    try {
      const message = await auth.forgotPassword(data);
      return { success: true, message };
    } catch (error: unknown) {
      const message = extractErrorMessage(error, 'Failed to send reset email');
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [auth]);

  const updatePassword = useCallback(async (
    data: PasswordResetData
  ): Promise<AuthResponse> => {
    setIsSubmitting(true);
    try {
      const message = await auth.resetPassword(data);
      return { success: true, message };
    } catch (error: unknown) {
      const message = extractErrorMessage(error, 'Failed to update password');
      return { success: false, message };
    } finally {
      setIsSubmitting(false);
    }
  }, [auth]);

  const logout = useCallback(async (): Promise<void> => {
    await auth.logout();
  }, [auth]);

  return {
    isSubmitting,
    login,
    signup,
    resetPassword,
    updatePassword,
    logout,
  };
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { error?: { message?: string } } } };
    return axiosError.response?.data?.error?.message || fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}