'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { isEmail } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import type { FormErrors, LoginCredentials } from '@/types/auth';
import { Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function LoginForm() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.includes('/admin-login');

  const { login, isSubmitting } = useAuth();
  const [values, setValues] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!isEmail(values.email)) next.email = 'Enter a valid email';
    if (!values.password || values.password.length < 8)
      next.password = 'Password must be at least 8 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    const result = await login(values);
    if (!result.success) {
      setServerError(result.message);
    }
  };

  const targetHref = isAdminRoute ? '/admin-signup' : '/signup';
  const targetText = isAdminRoute ? 'Create an admin account' : 'Create an account';

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {serverError && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
        required
        rightIcon={<Mail size={18} />}
      />

      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={onChange}
        error={errors.password}
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="rememberMe"
            checked={values.rememberMe}
            onChange={onChange}
            className="h-4 w-4 rounded border-gray-300 accent-[#2563eb] focus:ring-[#2563eb]"
          />
          Remember me
        </label>
        <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
          Forgot password ?
        </Link>
      </div>

      <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} className="w-full">
        Login
      </Button>

      <p className="text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href={targetHref} className="text-blue-600 hover:text-blue-700">
          {targetText}
        </Link>
      </p>
    </form>
  );
}