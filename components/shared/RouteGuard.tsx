'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // Already logged in and trying to access login page — redirect to dashboard
    if (redirectIfAuthenticated && isAuthenticated) {
      router.replace(isAdmin ? '/admin/dashboard' : '/dashboard');
      return;
    }

    // Not logged in and trying to access protected page — redirect to correct login
    // Skip redirect for public routes like /training/*
    const isPublicRoute = pathname?.startsWith('/training');
    if (requireAuth && !isAuthenticated && !isPublicRoute) {
      if (pathname?.startsWith('/admin')) {
        router.replace('/admin-login');
      } else {
        router.replace('/login');
      }
      return;
    }

    // Logged in as user but trying to access admin page — redirect to user dashboard
    if (requireAdmin && isAuthenticated && !isAdmin) {
      router.replace('/dashboard');
      return;
    }
  }, [isLoading, isAuthenticated, isAdmin, requireAuth, requireAdmin, redirectIfAuthenticated, router, pathname]);

  // Show spinner while checking auth — never flash protected content
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Block render until redirects are applied
  if (redirectIfAuthenticated && isAuthenticated) return null;
  if (requireAuth && !isAuthenticated) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}
