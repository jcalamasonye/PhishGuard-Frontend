'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface AuthSplitLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backHref?: string;
  className?: string;
}

export default function AuthSplitLayout({
  title,
  subtitle,
  children,
  backHref,
  className,
}: AuthSplitLayoutProps) {
  return (
    <div className={cn('min-h-screen grid lg:grid-cols-2 bg-white', className)}>
      <div className="relative hidden lg:block bg-[#2773F8]">
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-12 text-white text-center">
          <Image src="/Images/PhishGuardLogo.png" alt="PhishGuard Logo" width={120} height={120} priority className="h-24 w-24 object-contain" />
          <h1 className="mt-4 text-xl font-semibold">Welcome back to PhishGuard</h1>
          <p className="mt-2 max-w-sm text-white/90">
            Your shield against phishing and spam messages
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {backHref && (
            <Link href={backHref} className="text-sm text-gray-500 hover:text-gray-700">
              ← Back
            </Link>
          )}
          <div className="mt-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight uppercase text-gray-900">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>

          <div className="mt-6 space-y-4">
            {children}
          </div>

          <footer className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} PhishGuard. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}