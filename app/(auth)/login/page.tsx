import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthSplitLayout
      title="LOGIN"
      subtitle="Phish Guard Log in"
    >
      <LoginForm />
    </AuthSplitLayout>
  );
}