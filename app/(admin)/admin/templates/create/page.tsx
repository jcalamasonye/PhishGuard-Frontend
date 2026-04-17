'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { templateService } from '@/services/templateService';

const CATEGORY_OPTIONS = [
  { value: 'password', label: 'Password Reset' },
  { value: 'package', label: 'Package Delivery' },
  { value: 'executive', label: 'Executive/CEO' },
  { value: 'hr', label: 'HR' },
  { value: 'bank', label: 'Banking' },
  { value: 'it', label: 'IT Support' },
  { value: 'security', label: 'Security' },
  { value: 'social', label: 'Social Media' },
  { value: 'payroll', label: 'Payroll' },
  { value: 'vendor', label: 'Vendor' },
];

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function CreateTemplatePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'password',
    difficulty: 'medium',
    subject: '',
    fromName: '',
    fromEmail: '',
    body: '',
    ctaText: '',
    redFlags: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.subject || !formData.fromName || !formData.fromEmail || !formData.body) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    if (!formData.description || formData.description.length < 10) {
      showToast('Description must be at least 10 characters', 'warning');
      return;
    }

    const redFlagsArray = formData.redFlags
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    if (redFlagsArray.length === 0) {
      showToast('Please add at least one red flag', 'warning');
      return;
    }

    setSaving(true);
    try {
      await templateService.create({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty,
        subject: formData.subject,
        fromName: formData.fromName,
        fromEmail: formData.fromEmail,
        body: formData.body,
        ctaText: formData.ctaText || undefined,
        redFlags: redFlagsArray,
      });
      showToast('Template created successfully', 'success');
      router.push('/admin/templates');
    } catch (err) {
      console.error('Failed to create template:', err);
      showToast('Failed to create template', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header userName={user?.name || 'Admin'} userRole="admin" notificationCount={0} />
      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <Link
          href="/admin/templates"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Template Library
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Template</h1>
          <p className="text-gray-600">Design a phishing simulation email template</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Details</h3>
              <div className="space-y-4">
                <Input
                  label="Template Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Fake Password Reset"
                  required
                />
                <Textarea
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe the phishing scenario and what makes it effective..."
                  rows={3}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Select options={CATEGORY_OPTIONS} value={formData.category} onChange={(v) => handleChange('category', v)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <Select options={DIFFICULTY_OPTIONS} value={formData.difficulty} onChange={(v) => handleChange('difficulty', v)} />
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Content</h3>
              <div className="space-y-4">
                <Input
                  label="Subject Line"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="e.g. Urgent: Your Password Will Expire in 24 Hours"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="From Name"
                    value={formData.fromName}
                    onChange={(e) => handleChange('fromName', e.target.value)}
                    placeholder="e.g. IT Help Desk"
                    required
                  />
                  <Input
                    label="From Email"
                    type="email"
                    value={formData.fromEmail}
                    onChange={(e) => handleChange('fromEmail', e.target.value)}
                    placeholder="e.g. helpdesk@dem0corp.com"
                    required
                  />
                </div>
                <Textarea
                  label="Email Body"
                  value={formData.body}
                  onChange={(e) => handleChange('body', e.target.value)}
                  placeholder="Write the email body. Use {{user_name}} for personalization..."
                  rows={10}
                  required
                />
                <Input
                  label="Call-to-Action Button Text (Optional)"
                  value={formData.ctaText}
                  onChange={(e) => handleChange('ctaText', e.target.value)}
                  placeholder="e.g. Reset Password Now"
                />
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Red Flags</h3>
              <p className="text-sm text-gray-600 mb-3">List the phishing indicators in this email, one per line</p>
              <Textarea
                value={formData.redFlags}
                onChange={(e) => handleChange('redFlags', e.target.value)}
                placeholder={'Misspelled sender domain\nUrgency tactics\nSuspicious external link\nGeneric greeting'}
                rows={6}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>

              {showPreview && formData.subject && (
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="mb-3 pb-3 border-b border-gray-200">
                    <p className="font-semibold text-sm text-gray-900">{formData.fromName || 'Sender'}</p>
                    <p className="text-xs text-gray-500">{formData.fromEmail || 'sender@example.com'}</p>
                    <p className="text-sm font-medium text-gray-900 mt-2">{formData.subject}</p>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{formData.body || 'Email body will appear here...'}</p>
                  {formData.ctaText && (
                    <div className="mt-4 text-center">
                      <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                        {formData.ctaText}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </Card>

            <div className="flex flex-col gap-3">
              <Button onClick={handleSave} variant="primary" className="w-full gap-2" isLoading={saving}>
                <Save className="w-4 h-4" />
                Save Template
              </Button>
              <Button onClick={() => router.push('/admin/templates')} variant="outline" className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}