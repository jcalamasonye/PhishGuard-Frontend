import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import AdminSignupForm from '@/components/auth/AdminSignupForm';

export default function AdminSignupPage() {
  return (
    <AuthSplitLayout
      title="SIGN UP"
      subtitle="Phish Guard Admin Registration"
    >
      <AdminSignupForm />
    </AuthSplitLayout>
  );
}