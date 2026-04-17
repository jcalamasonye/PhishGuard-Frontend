'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import type { FormErrors, PasswordResetData } from '@/types/auth';

export default function ResetPasswordForm() {
  const { updatePassword, isSubmitting } = useAuth();
  const params = useSearchParams();
  const tokenParam = params.get('token') ?? '';
  const [values, setValues] = useState<PasswordResetData>({
    token: tokenParam,
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!values.password || values.password.length < 8)
      next.password = 'Password must be at least 8 characters';
    if (values.confirmPassword !== values.password)
      next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    const result = await updatePassword(values);
    if (!result.success) {
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

      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={onChange}
        error={errors.password}
        required
        rightIcon={<Lock size={20} />}
        showPasswordToggle={false}
      />

      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={values.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
        required
        rightIcon={<Lock size={20} />}
        showPasswordToggle={false}
      />

      <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} className="w-full">
        Save
      </Button>
    </form>
  );
}