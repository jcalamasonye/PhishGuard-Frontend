'use client';

import RouteGuard from '@/components/shared/RouteGuard';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard requireAuth>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </RouteGuard>
  );
}