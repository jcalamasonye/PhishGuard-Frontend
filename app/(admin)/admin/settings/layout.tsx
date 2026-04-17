'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Building2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const settingsTabs = [
  {
    name: 'Profile Settings',
    href: '/admin/settings/profile',
    icon: User
  },
  {
    name: 'Organization Settings',
    href: '/admin/settings/organization',
    icon: Building2
  },
  {
    name: 'Email Configuration',
    href: '/admin/settings/email',
    icon: Mail
  }
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="ml-64 px-6">
          <nav className="flex gap-8">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors',
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {children}
    </div>
  );
}