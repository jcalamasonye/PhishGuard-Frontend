'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { isEmail } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import type { FormErrors, AdminSignupData } from '@/types/auth';
import { Building2, User, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AdminSignupForm() {
  const { signup, isSubmitting } = useAuth();
  const [values, setValues] = useState<AdminSignupData>({
    organizationName: '',
    name: '',
    email: '',
    password: '',
    acceptedTerms: false,
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
    if (!values.organizationName.trim()) next.organizationName = 'Enter organization name';
    if (!values.name.trim()) next.name = 'Enter your full name';
    if (!isEmail(values.email)) next.email = 'Enter a valid email';
    if (!values.password || values.password.length < 8)
      next.password = 'Password must be at least 8 characters';
    if (!values.acceptedTerms) next.acceptedTerms = 'You must accept the terms';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    const result = await signup(values);
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
        name="organizationName"
        placeholder="Organization name"
        value={values.organizationName}
        onChange={onChange}
        error={errors.organizationName}
        required
        rightIcon={<Building2 size={18} />}
      />

      <Input
        name="name"
        placeholder="Admin name"
        value={values.name}
        onChange={onChange}
        error={errors.name}
        required
        rightIcon={<User size={18} />}
      />

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

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="acceptedTerms"
          checked={values.acceptedTerms}
          onChange={onChange}
          className="h-4 w-4 rounded border-gray-300 accent-[#2563eb] focus:ring-[#2563eb]"
        />
        By checking the box you agree to our Terms and Conditions.
      </label>
      {errors.acceptedTerms && (
        <p className="text-sm text-red-600">{errors.acceptedTerms}</p>
      )}

      <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} className="w-full">
        Create Organization
      </Button>

      <p className="text-sm text-gray-600">
        Already have an admin account?{' '}
        <Link href="/admin-login" className="text-blue-600 hover:text-blue-700">
          Log in
        </Link>
      </p>
    </form>
  );
}