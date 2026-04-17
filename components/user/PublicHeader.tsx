'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';
import Button from '@/components/ui/Button';

export const PublicHeader: React.FC = () => {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
              PhishGuard
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/training/resources" 
              className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Training Resources
            </Link>
            <Link 
              href="/quiz/sample-quiz-1" 
              className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Quiz
            </Link>
            <Link 
              href="/templates" 
              className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Templates
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              onClick={() => router.push('/login')}
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Login
            </Button>
            <Button 
              onClick={() => router.push('/signup')}
              variant="primary" 
              size="sm"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};