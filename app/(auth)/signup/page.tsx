import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthSplitLayout
      title="SIGN UP"
      subtitle="Phish Guard Registration"
    >
      <SignupForm />
    </AuthSplitLayout>
  );
}