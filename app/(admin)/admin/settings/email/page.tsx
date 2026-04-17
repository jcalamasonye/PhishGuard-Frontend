'use client';

import React, { useState } from 'react';
import { Send, Save, X, Eye, EyeOff, Info } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Checkbox from '@/components/ui/Checkbox';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function EmailConfigurationPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);

  const [includeLegalDisclaimer, setIncludeLegalDisclaimer] = useState(false);
  const [includeCompanyInfo, setIncludeCompanyInfo] = useState(false);
  const [includeUnsubscribe, setIncludeUnsubscribe] = useState(false);

  const [legalDisclaimer, setLegalDisclaimer] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [unsubscribeInfo, setUnsubscribeInfo] = useState('');

  const handleSendTest = async () => {
    if (!testEmail) {
      showToast('Please enter a test email address', 'warning');
      return;
    }
    setSendingTest(true);
    try {
      // Email sending endpoint would go here
      console.log('Send test email to:', testEmail);
      showToast('Test email sent successfully', 'success');
    } catch (err) {
      console.error('Failed to send test email:', err);
      showToast('Failed to send test email', 'error');
    } finally {
      setSendingTest(false);
    }
  };

  const handleSaveConfiguration = async () => {
    setSaving(true);
    try {
      // Email config save endpoint would go here
      console.log('Save email configuration');
      showToast('Email configuration saved', 'success');
    } catch (err) {
      console.error('Failed to save configuration:', err);
      showToast('Failed to save configuration', 'error');
    } finally {
      setSaving(false);
    }
  };

  const footerPreview = `This is a simulated training email sent as part of our security awareness training program. No actual threat exists. This email is meant to educate you and help you identify phishing attempts by practicing with realistic examples.

${includeLegalDisclaimer ? legalDisclaimer + '\n\n' : ''}${includeCompanyInfo ? `${companyName}
${companyAddress}
Tel: ${phoneNumber}
${website}\n\n` : ''}${includeUnsubscribe ? unsubscribeInfo + '\n\n' : ''}Provide contact information for questions about the training

This is how your footer will appear in all training emails
  `.trim();

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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Configuration</h1>
          <p className="text-gray-600">Configure email delivery settings and customize email footers</p>
        </div>

        <div className="max-w-3xl">
          <Card className="mb-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">SendGrid API Configuration</h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect your SendGrid account to send training emails
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SendGrid API Key
                </label>
                <div className="relative">
                  <Input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Get your API key from SendGrid dashboard. Never share this key publicly.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">How to get a SendGrid API Key:</p>
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>Go to SendGrid Dashboard</li>
                      <li>Navigate to Settings &gt; API Keys</li>
                      <li>Click &quot;Create API Key&quot;</li>
                      <li>Select &quot;Full Access&quot; or &quot;Restricted Access&quot; with Mail Send permissions</li>
                      <li>Copy and paste the key above</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Test Email</h3>
              <p className="text-sm text-gray-600 mb-4">
                Send a test email to verify your configuration
              </p>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <Button onClick={handleSendTest} variant="primary" className="gap-2" isLoading={sendingTest}>
                  <Send className="w-4 h-4" />
                  Send Test
                </Button>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Footer Customization</h3>
              <p className="text-sm text-gray-600 mb-4">
                Customize the footer that appears in all training emails
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    label="Include Legal Disclaimer"
                    checked={includeLegalDisclaimer}
                    onChange={() => setIncludeLegalDisclaimer(!includeLegalDisclaimer)}
                  />
                </div>

                {includeLegalDisclaimer && (
                  <Textarea
                    value={legalDisclaimer}
                    onChange={(e) => setLegalDisclaimer(e.target.value)}
                    placeholder="Enter your legal disclaimer text..."
                    rows={3}
                  />
                )}

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    label="Include Company Information"
                    checked={includeCompanyInfo}
                    onChange={() => setIncludeCompanyInfo(!includeCompanyInfo)}
                  />
                </div>

                {includeCompanyInfo && (
                  <div className="space-y-3 pl-4">
                    <Input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Company Name"
                    />
                    <Input
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="Company Address"
                    />
                    <Input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone Number"
                    />
                    <Input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Website URL"
                    />
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    label="Include Unsubscribe Option"
                    checked={includeUnsubscribe}
                    onChange={() => setIncludeUnsubscribe(!includeUnsubscribe)}
                  />
                </div>

                {includeUnsubscribe && (
                  <Textarea
                    value={unsubscribeInfo}
                    onChange={(e) => setUnsubscribeInfo(e.target.value)}
                    placeholder="Enter unsubscribe text..."
                    rows={2}
                  />
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Footer Preview</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">
                    {footerPreview}
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="outline" className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>

            <Button onClick={handleSaveConfiguration} variant="primary" className="gap-2" isLoading={saving}>
              <Save className="w-4 h-4" />
              Save Configuration
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
