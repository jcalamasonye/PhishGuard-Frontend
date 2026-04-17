'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectIfAuthenticated?: boolean;
}

export default function RouteGuard({
  children,
  requireAuth = false,
  requireAdmin = false,
  redirectIfAuthenticated = false,
}: RouteGuardProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Auth pages: redirect away if already logged in
    if (redirectIfAuthenticated && isAuthenticated) {
      router.replace(isAdmin ? '/admin/dashboard' : '/dashboard');
      return;
    }

    // Protected pages: redirect to login if not authenticated
    if (requireAuth && !isAuthenticated) {
      router.replace('/login');
      return;
    }

    // Admin pages: redirect non-admins to user dashboard
    if (requireAdmin && isAuthenticated && !isAdmin) {
      router.replace('/dashboard');
      return;
    }
  }, [isLoading, isAuthenticated, isAdmin, requireAuth, requireAdmin, redirectIfAuthenticated, router]);

  // Show nothing while checking auth state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  // Don't render children if redirecting
  if (redirectIfAuthenticated && isAuthenticated) return null;
  if (requireAuth && !isAuthenticated) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}