import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import PasswordChangedSuccess from '@/components/auth/PasswordChangedSuccess';

export default function PasswordChangedPage() {
  return (
    <AuthSplitLayout
      title="PASSWORD CHANGED"
      subtitle="You’ve successfully reset your password."
    >
      <PasswordChangedSuccess />
    </AuthSplitLayout>
  );
}