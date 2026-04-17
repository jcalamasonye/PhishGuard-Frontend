import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import Button from '@/components/ui/Button';

export const UserHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">PhishGuard</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/training" className="text-gray-700 hover:text-gray-900 font-medium">
              Training Resources
            </Link>
            <Link href="/quiz" className="text-gray-700 hover:text-gray-900 font-medium">
              Quiz
            </Link>
            <Link href="/templates" className="text-gray-700 hover:text-gray-900 font-medium">
              Templates
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};