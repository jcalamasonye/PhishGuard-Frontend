import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <AuthSplitLayout
      title="RESET PASSWORD"
      subtitle="Enter a new password for your account."
    >
      <ResetPasswordForm />
    </AuthSplitLayout>
  );
}