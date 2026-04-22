'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
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

export default function EditTemplatePage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const templateId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    const fetchTemplate = async () => {
      setLoading(true);
      try {
        const template = await templateService.getById(templateId);
        setFormData({
          name: template.name,
          description: template.description,
          category: template.category,
          difficulty: template.difficulty,
          subject: template.subject,
          fromName: template.fromName,
          fromEmail: template.fromEmail,
          body: template.body,
          ctaText: template.ctaText || '',
          redFlags: (template.redFlags || []).join('\n'),
        });
      } catch (err) {
        console.error('Failed to fetch template:', err);
        showToast('Failed to load template', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId, showToast]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.subject || !formData.fromName || !formData.fromEmail || !formData.body) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    const redFlagsArray = formData.redFlags
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    setSaving(true);
    try {
      await templateService.update(templateId, {
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
      showToast('Template updated successfully', 'success');
      router.push('/admin/templates');
    } catch (err: unknown) {
      console.error('Failed to update template:', err);
      const error = err as { response?: { data?: { error?: { message?: string } } } };
      const msg = error?.response?.data?.error?.message || 'Failed to update template. Please try again.';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header userName={user?.name || ''} userRole="admin" notificationCount={0} />
        <AdminSidebar />
        <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header userName={user?.name || ''} userRole="admin" notificationCount={0} />
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Template</h1>
          <p className="text-gray-600">Modify the phishing simulation email template</p>
        </div>

        <div className="max-w-3xl space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Details</h3>
            <div className="space-y-4">
              <Input label="Template Name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required />
              <Textarea label="Description" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows={3} required />
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
              <Input label="Subject Line" value={formData.subject} onChange={(e) => handleChange('subject', e.target.value)} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="From Name" value={formData.fromName} onChange={(e) => handleChange('fromName', e.target.value)} required />
                <Input label="From Email" type="email" value={formData.fromEmail} onChange={(e) => handleChange('fromEmail', e.target.value)} required />
              </div>
              <Textarea label="Email Body" value={formData.body} onChange={(e) => handleChange('body', e.target.value)} rows={10} required />
              <Input label="CTA Button Text (Optional)" value={formData.ctaText} onChange={(e) => handleChange('ctaText', e.target.value)} />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Red Flags</h3>
            <p className="text-sm text-gray-600 mb-3">One per line</p>
            <Textarea value={formData.redFlags} onChange={(e) => handleChange('redFlags', e.target.value)} rows={6} />
          </Card>

          <div className="flex items-center justify-between">
            <Button onClick={() => router.push('/admin/templates')} variant="outline">Cancel</Button>
            <Button onClick={handleSave} variant="primary" className="gap-2" isLoading={saving}>
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}