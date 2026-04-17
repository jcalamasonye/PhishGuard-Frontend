import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout
      title="FORGOT PASSWORD?"
      subtitle="Don’t worry, it happens. Reset via email."
    >
      <ForgotPasswordForm />
    </AuthSplitLayout>
  );
}