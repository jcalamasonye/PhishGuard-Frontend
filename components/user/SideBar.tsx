'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, ClipboardList, FileText, Settings, LogOut, ScanSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const userNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ScanSearch, label: 'Email Analyzer', href: '/analyzer' },
  { icon: BookOpen, label: 'Training Resources', href: '/training/resources' },
  { icon: ClipboardList, label: 'Quizzes', href: '/quiz' },
  { icon: FileText, label: 'Template Library', href: '/templates' },
  { icon: Settings, label: 'Settings', href: '/settings' }
];

export const UserSidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-[73px] bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {userNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};