import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import LoginForm from '@/components/auth/LoginForm';

export default function AdminLoginPage() {
  return (
    <AuthSplitLayout
      title="LOGIN"
      subtitle="Phish Guard Admin Log in"
    >
      <LoginForm />
    </AuthSplitLayout>
  );
}