import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-linear-to-br from-[#2773F8] to-[#60A5FA] text-white overflow-hidden">
      
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 lg:translate-x-[10%] hidden lg:block">
        <div className="relative h-[640px] w-[640px] rounded-full overflow-hidden">
          <Image
            src="/Images/onboardingImage.png"
            alt="PhishGuard Onboarding"
            width={640}
            height={640}
            priority
            className="h-full w-full object-cover lg:scale-x-[-1] opacity-80 mix-blend-soft-light"
          />
          <div className="absolute inset-0 bg-linear-to-l from-[#2773F8]/40 to-transparent" />
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 min-h-screen">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          
          <div className="flex flex-col justify-center min-h-[70vh] lg:min-h-screen">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span>Welcome to</span>
              <br />
              <span>PhishGuard</span>
            </h1>
            <p className="mt-3 text-white/90">
              Your shield against phishing and spam messages.
            </p>

            <div className="mt-6 flex gap-3">
              <Link href="/welcome">
                <Button variant="ghost" size="md" className="text-white hover:bg-white/10 focus:ring-white">
                  Learn More
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="md">
                  Get Started
                </Button>
              </Link>
              <Link href="/admin-login">
                <Button variant="ghost" size="md" className="text-white hover:bg-white/10 focus:ring-white">
                  Admin Panel
                </Button>
              </Link>
            </div>

            <div className="mt-6">
              <Checkbox label={"I understand I'll receive simulated phishing emails for training purposes"} />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}