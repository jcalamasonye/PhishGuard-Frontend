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

    
    if (redirectIfAuthenticated && isAuthenticated) {
      router.replace(isAdmin ? '/admin/dashboard' : '/dashboard');
      return;
    }

    
    if (requireAuth && !isAuthenticated) {
      router.replace('/login');
      return;
    }

    
    if (requireAdmin && isAuthenticated && !isAdmin) {
      router.replace('/dashboard');
      return;
    }
  }, [isLoading, isAuthenticated, isAdmin, requireAuth, requireAdmin, redirectIfAuthenticated, router]);

  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  
  if (redirectIfAuthenticated && isAuthenticated) return null;
  if (requireAuth && !isAuthenticated) return null;
  if (requireAdmin && !isAdmin) return null;

  return <>{children}</>;
}