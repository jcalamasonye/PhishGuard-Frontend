'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function PasswordChangedSuccess() {
  return (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div className="mx-auto h-24 w-24 rounded-full border border-[#2773F8] flex items-center justify-center">
        <Check size={40} className="text-[#2773F8]" />
      </div>
      <h2 className="text-2xl font-semibold tracking-wide text-gray-900">PASSWORD CHANGED</h2>
      <p className="text-gray-600">You’ve successfully reset your password.</p>
      <Link href="/login" className="block">
        <Button variant="primary" className="w-full">Login to account</Button>
      </Link>
    </div>
  );
}