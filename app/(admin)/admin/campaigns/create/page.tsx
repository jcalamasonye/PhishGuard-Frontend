'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { StepIndicator } from '@/components/admin/campaigns/CampaignWizard/StepIndicator';
import { EmailTemplateStep } from '@/components/admin/campaigns/CampaignWizard/EmailTemplateStep';
import { SelectParticipantsStep } from '@/components/admin/campaigns/CampaignWizard/SelectParticipantsStep';
import { ScheduleLaunchStep } from '@/components/admin/campaigns/CampaignWizard/ScheduleLaunchStep';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { CampaignWizardStep, CreateCampaignData } from '@/types/campaign';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { campaignService } from '@/services/campaignService';
import { templateService } from '@/services/templateService';

export default function CreateCampaignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const [formData, setFormData] = useState<Partial<CreateCampaignData>>({
    name: '',
    description: '',
    templateId: '',
    recipientIds: []
  });

  
  useEffect(() => {
    const templateId = searchParams.get('templateId');
    if (templateId) {
      
      const savedDraft = sessionStorage.getItem('campaignDraft');
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          setFormData({ ...parsed, templateId });
        } catch {
          setFormData((prev) => ({ ...prev, templateId }));
        }
        sessionStorage.removeItem('campaignDraft');
      } else {
        setFormData((prev) => ({ ...prev, templateId }));
      }
      
      setCurrentStep(3);
    }
  }, [searchParams]);

  
  useEffect(() => {
    const fetchTemplateName = async () => {
      if (!formData.templateId) {
        setTemplateName('');
        return;
      }
      try {
        const template = await templateService.getById(formData.templateId);
        setTemplateName(template.name);
      } catch {
        setTemplateName('Selected Template');
      }
    };

    fetchTemplateName();
  }, [formData.templateId]);

  const steps: CampaignWizardStep[] = [
    {
      number: 1,
      title: 'Campaign Details',
      subtitle: 'Basic information',
      isComplete: currentStep > 1,
      isActive: currentStep === 1
    },
    {
      number: 2,
      title: 'Email Template',
      subtitle: 'Choose or create',
      isComplete: currentStep > 2,
      isActive: currentStep === 2
    },
    {
      number: 3,
      title: 'Select Participants',
      subtitle: 'Who to send to',
      isComplete: currentStep > 3,
      isActive: currentStep === 3
    },
    {
      number: 4,
      title: 'Schedule & Launch',
      subtitle: 'Review & send',
      isComplete: false,
      isActive: currentStep === 4
    }
  ];

  const handleNext = () => {
    if (currentStep === 1 && !formData.name) {
      showToast('Please enter a campaign name', 'warning');
      return;
    }
    if (currentStep === 2 && !formData.templateId) {
      showToast('Please select an email template', 'warning');
      return;
    }
    if (currentStep === 3 && (!formData.recipientIds || formData.recipientIds.length === 0)) {
      showToast('Please select at least one recipient', 'warning');
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/admin/campaigns');
    }
  };

  
  
  const handleCreateCustom = () => {
    sessionStorage.setItem('campaignDraft', JSON.stringify(formData));
    router.push('/admin/campaigns/create/custom-template');
  };

  const handleLaunch = async (schedule: { type: 'immediate' | 'scheduled' | 'randomized'; date?: string; time?: string; spreadHours?: number }) => {
    setSubmitting(true);
    try {
      const campaignData: CreateCampaignData = {
        name: formData.name || '',
        description: formData.description,
        templateId: formData.templateId || '',
        recipientIds: formData.recipientIds || [],
      };

      if (schedule.type === 'scheduled' && schedule.date) {
        campaignData.scheduledDate = schedule.date;
        campaignData.scheduledTime = schedule.time;
      }

      const campaign = await campaignService.create(campaignData);

      
      if (schedule.type === 'immediate') {
        await campaignService.launch(campaign.id);
      }

      showToast('Campaign created successfully', 'success');
      router.push('/admin/campaigns');
    } catch (err) {
      console.error('Failed to create campaign:', err);
      showToast('Failed to create campaign. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header
        userName={user?.name || 'Admin'}
        userRole="admin"
        notificationCount={0}
      />

      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen">
        <Link
          href="/admin/campaigns"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back To Campaigns
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Campaign</h1>
          <p className="text-gray-600">Set up your phishing awareness training campaign</p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="mb-12">
          {currentStep === 1 && (
            <div className="max-w-3xl">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Campaign Details</h2>
                <p className="text-gray-600">Provide basic information about your campaign</p>
              </div>

              <div className="space-y-6">
                <Input
                  label="Campaign Name"
                  placeholder="e.g. Q2 2026 Phishing Test"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  helperText="Choose a descriptive name that helps you identify this campaign"
                />

                <Textarea
                  label="Description (Optional)"
                  placeholder="Internal notes about this campaign, goals, or special considerations..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  helperText="These notes are for internal use only and won't be visible to recipients"
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Next Steps</h3>
                  <p className="text-sm text-blue-800">
                    After providing campaign details, you&apos;ll choose an email template from our library or
                    create a custom one to send to your users.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <EmailTemplateStep
              selectedTemplateId={formData.templateId}
              onSelectTemplate={(templateId) => setFormData({ ...formData, templateId })}
              onCreateCustom={handleCreateCustom}
            />
          )}

          {currentStep === 3 && (
            <SelectParticipantsStep
              selectedUserIds={formData.recipientIds || []}
              onSelectionChange={(recipientIds) => setFormData({ ...formData, recipientIds })}
            />
          )}

          {currentStep === 4 && (
            <ScheduleLaunchStep
              campaignName={formData.name || ''}
              description={formData.description}
              templateName={templateName}
              recipientCount={formData.recipientIds?.length || 0}
              onLaunch={handleLaunch}
            />
          )}
        </div>

        {currentStep < 4 && (
          <div className="max-w-3xl flex items-center justify-between">
            <Button
              onClick={handleBack}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              variant="primary"
              className="gap-2"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="max-w-6xl flex items-center justify-between mt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              className="gap-2"
              disabled={submitting}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        )}
      </main>
    </>
  );
}