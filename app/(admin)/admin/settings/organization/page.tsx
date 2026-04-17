'use client';

import React, { useState } from 'react';
import { Upload, Save, X, Check } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function OrganizationSettingsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [organizationName, setOrganizationName] = useState(user?.organizationName || '');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [timezone, setTimezone] = useState('gmt+1');
  const [fromName, setFromName] = useState('Security Training Team');
  const [fromEmail, setFromEmail] = useState('security@company.com');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const colorOptions = [
    { value: 'blue', label: 'Blue', hex: '#3b82f6' },
    { value: 'indigo', label: 'Indigo', hex: '#6366f1' },
    { value: 'purple', label: 'Purple', hex: '#a855f7' },
    { value: 'pink', label: 'Pink', hex: '#ec4899' },
    { value: 'red', label: 'Red', hex: '#ef4444' },
    { value: 'orange', label: 'Orange', hex: '#f97316' },
    { value: 'green', label: 'Green', hex: '#10b981' },
    { value: 'teal', label: 'Teal', hex: '#14b8a6' },
    { value: 'cyan', label: 'Cyan', hex: '#06b6d4' },
    { value: 'slate', label: 'Slate', hex: '#64748b' }
  ];

  const timezoneOptions = [
    { value: 'gmt-8', label: 'Pacific Time (GMT -8)' },
    { value: 'gmt-5', label: 'Eastern Time (GMT -5)' },
    { value: 'gmt+0', label: 'GMT (GMT +0)' },
    { value: 'gmt+1', label: 'West Africa Time (GMT +1)' },
    { value: 'gmt+2', label: 'Central Africa Time (GMT +2)' },
    { value: 'gmt+5:30', label: 'India Standard Time (GMT +5:30)' },
    { value: 'gmt+8', label: 'China Standard Time (GMT +8)' }
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Organization update endpoint would go here
      console.log('Save organization settings:', {
        organizationName,
        selectedColor,
        timezone,
        fromName,
        fromEmail,
        logoFile
      });
      showToast('Organization settings saved', 'success');
    } catch (err) {
      console.error('Failed to save settings:', err);
      showToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const getColorByValue = (value: string) => {
    return colorOptions.find(c => c.value === value)?.hex || '#3b82f6';
  };

  return (
    <>
      <Header
        userName={user?.name || 'Admin'}
        userRole="admin"
        notificationCount={0}
      />

      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Organization Settings</h1>
          <p className="text-gray-600">Manage your organization&apos;s branding and preferences</p>
        </div>

        <div className="max-w-3xl">
          <Card className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Organization Name
              </label>
              <p className="text-sm text-gray-600 mb-4">
                This name appears on training pages and emails
              </p>
              <Input
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Enter organization name"
              />
            </div>
          </Card>

          <Card className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Organization Logo
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Upload your logo to display on training pages
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="text-blue-600 font-medium">Click to upload logo</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, or SVG (max. 2MB)
                  </p>
                  {logoFile && (
                    <p className="text-sm text-green-600 mt-3 font-medium">
                      Selected: {logoFile.name}
                    </p>
                  )}
                </label>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Recommended size: 200x200 pixels. Your logo will be displayed on phishing training pages and email headers.
              </p>
            </div>
          </Card>

          <Card className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Primary Color Theme
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Choose a color that matches your brand
              </p>

              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-full h-12 rounded-lg mb-2 relative"
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-900">{color.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Selected Theme:</span>{' '}
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded"
                      style={{ backgroundColor: getColorByValue(selectedColor) }}
                    />
                    {colorOptions.find(c => c.value === selectedColor)?.label} ({getColorByValue(selectedColor)})
                  </span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Timezone
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Set your organization&apos;s default timezone
              </p>

              <Select
                options={timezoneOptions}
                value={timezone}
                onChange={setTimezone}
                placeholder="Select timezone"
              />

              <p className="text-xs text-gray-500 mt-2">
                All campaign schedules and reports will use this timezone by default.
              </p>
            </div>
          </Card>

          <Card className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Email Sender Settings
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Configure the default sender for training emails
              </p>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Name
                  </label>
                  <Input
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="e.g. Security Training Team"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This name will appear as the sender in training emails
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Email Address
                  </label>
                  <Input
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="e.g. security@company.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ensure this email is verified and authorized to send emails
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  Preview: Training emails will appear as
                </p>
                <p className="text-sm text-blue-800">
                  From: {fromName} ({fromEmail})
                </p>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="outline" className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>

            <Button onClick={handleSaveSettings} variant="primary" className="gap-2" isLoading={saving}>
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
