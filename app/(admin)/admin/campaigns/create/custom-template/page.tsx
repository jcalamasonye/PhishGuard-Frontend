'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { StepIndicator } from '@/components/admin/campaigns/CampaignWizard/StepIndicator';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Card } from '@/components/ui/Card';
import { CampaignWizardStep } from '@/types/campaign';
import { templateService } from '@/services/templateService';
import { useAuth } from '@/context/AuthContext';

export default function CreateCustomTemplatePage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    subject: '',
    fromName: '',
    fromEmail: '',
    body: '',
    ctaText: '',
    redFlagCount: 5
  });

  const steps: CampaignWizardStep[] = [
    {
      number: 1,
      title: 'Campaign Details',
      subtitle: 'Basic information',
      isComplete: true,
      isActive: false
    },
    {
      number: 2,
      title: 'Email Template',
      subtitle: 'Choose or create',
      isComplete: false,
      isActive: true
    },
    {
      number: 3,
      title: 'Select Participants',
      subtitle: 'Who to send to',
      isComplete: false,
      isActive: false
    },
    {
      number: 4,
      title: 'Schedule & Launch',
      subtitle: 'Review & send',
      isComplete: false,
      isActive: false
    }
  ];

  const redFlags = [
    'Generic greeting instead of name',
    'Urgent language creating pressure',
    'Suspicious sender email domain',
    'Grammatical errors or typos',
    'Request for sensitive information'
  ];

  const handleSaveTemplate = async () => {
    if (!formData.subject || !formData.fromName || !formData.fromEmail || !formData.body) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const template = await templateService.create({
        name: formData.subject,
        description: `Custom template: ${formData.subject}`,
        category: 'it',
        difficulty: 'medium',
        subject: formData.subject,
        fromName: formData.fromName,
        fromEmail: formData.fromEmail,
        body: formData.body,
        ctaText: formData.ctaText || undefined,
        redFlags: ['Custom template - review red flags'],
      });
      router.push(`/admin/campaigns/create?templateId=${template.id}`);
    } catch (err) {
      console.error('Failed to save template:', err);
      alert('Failed to save template');
    }
  };

  return (
    <>
      <Header 
        userName={user?.name || ''} 
        userRole="admin"
        notificationCount={0}
      />

      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen">
        
        <Link
          href="/admin/campaigns/create"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back To Template Library
        </Link>

        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Campaign</h1>
          <p className="text-gray-600">Set up your phishing awareness training campaign</p>
        </div>

       
        <StepIndicator steps={steps} currentStep={2} />

        
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Create Custom Template</h2>
            <p className="text-gray-600">Design your own phishing email from scratch</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           
            <div className="space-y-6">
              <Input
                label="Subject Line"
                placeholder="e.g. Action Required: Your Password Will Expire Today"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="From Name"
                  placeholder="e.g. IT Security Team"
                  value={formData.fromName}
                  onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                  required
                />

                <Input
                  label="From Email"
                  placeholder="e.g. security@company-it.com"
                  value={formData.fromEmail}
                  onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                  required
                />
              </div>

              <Textarea
                label="Email Body"
                placeholder="Dear Tony,

Your password will expire in 24 hours. Please click the button below to reset your password and maintain access to your account.

If you do not take action, your account will be locked.

Thank you,
IT Security Team"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={10}
                required
              />

              <p className="text-sm text-gray-600">
                Use Variables: User name, Email, Department
              </p>

              <Input
                label="Call-To-Action Button Text"
                placeholder="e.g. Reset Password Now"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                required
              />

              <div>
                <Slider
                  min={0}
                  max={10}
                  value={formData.redFlagCount}
                  onChange={(value) => setFormData({ ...formData, redFlagCount: value })}
                  label="Red Flags Counter"
                  valueSuffix="Flags"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Number of phishing indicators to include in the email
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                
                <div className="border border-gray-300 rounded-lg p-6 bg-white">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">From:</p>
                    <p className="font-medium text-gray-900">
                      {formData.fromName || 'Sender Name'} ({formData.fromEmail || 'sender@example.com'})
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Subject:</p>
                    <p className="font-medium text-gray-900">
                      {formData.subject || 'Email subject line'}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="whitespace-pre-wrap text-gray-900 mb-6">
                      {formData.body || 'Email body will appear here...'}
                    </div>

                    {formData.ctaText && (
                      <div className="flex justify-center">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold">
                          {formData.ctaText}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-yellow-900">Suggested Red Flags</h3>
                </div>

                <ul className="space-y-2">
                  {redFlags.slice(0, formData.redFlagCount).map((flag, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-yellow-800">
                      <span className="text-yellow-600">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>

        
        <div className="flex items-center justify-between max-w-6xl">
          <Button
            onClick={() => router.push('/admin/campaigns/create')}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={handleSaveTemplate}
            variant="primary"
            className="gap-2"
          >
            Next Step
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </>
  );
}