'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { isEmail } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import type { FormErrors, PasswordResetRequest } from '@/types/auth';

export default function ForgotPasswordForm() {
  const { resetPassword, isSubmitting } = useAuth();
  const [values, setValues] = useState<PasswordResetRequest>({ email: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');
    const next: FormErrors = {};
    if (!isEmail(values.email)) next.email = 'Enter a valid email';
    setErrors(next);
    if (Object.keys(next).length) return;
    const result = await resetPassword(values);
    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setServerError(result.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {serverError && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={(e) => setValues({ email: e.target.value })}
        error={errors.email}
        required
        rightIcon={<Mail size={20} />}
      />

      <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} className="w-full">
        Reset Password
      </Button>

      <div className="pt-1 text-sm">
        <Link href="/login" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Return back to login page
        </Link>
      </div>
    </form>
  );
}