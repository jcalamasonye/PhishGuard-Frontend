'use client';

import React, { useState } from 'react';
import { ScanSearch, Shield, AlertTriangle, CheckCircle, Brain } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { UserSidebar } from '@/components/user/SideBar';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { aiService, type AIAnalysisResult } from '@/services/aiService';

export default function EmailAnalyzerPage() {
  const { user } = useAuth();
  const [emailText, setEmailText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!emailText.trim()) return;

    setAnalyzing(true);
    setResult(null);
    setError('');

    try {
      const analysis = await aiService.analyzeEmail(emailText.trim());
      setResult(analysis);
    } catch {
      setError('AI service is currently unavailable. Please ensure the AI model server is running.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleClear = () => {
    setEmailText('');
    setResult(null);
    setError('');
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'CRITICAL':
      case 'HIGH':
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
      case 'MEDIUM':
        return <Shield className="w-8 h-8 text-yellow-500" />;
      default:
        return <CheckCircle className="w-8 h-8 text-green-500" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'CRITICAL': return 'text-red-600';
      case 'HIGH': return 'text-orange-600';
      case 'MEDIUM': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getRiskBg = (riskLevel: string) => {
    switch (riskLevel) {
      case 'CRITICAL':
      case 'HIGH': return 'bg-red-50 border-red-200';
      case 'MEDIUM': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-green-50 border-green-200';
    }
  };

  return (
    <>
      <Header
        userName={user?.name || 'User'}
        userRole="user"
        notificationCount={0}
      />

      <UserSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ScanSearch className="w-7 h-7 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Email Analyzer</h1>
          </div>
          <p className="text-gray-600">
            Paste any email you have received to check if it is a phishing attempt or a legitimate email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Paste Email Content</h3>
              <textarea
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                placeholder={'Paste the full email here including:\n- Subject line\n- Sender information\n- Email body\n- Any links or URLs\n\nExample:\nFrom: support@micr0soft.com\nSubject: Your account has been compromised\n\nDear User,\nWe detected unusual activity on your account...'}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />

              <div className="flex items-center gap-3 mt-4">
                <Button
                  onClick={handleAnalyze}
                  variant="primary"
                  className="gap-2"
                  disabled={!emailText.trim() || analyzing}
                  isLoading={analyzing}
                >
                  <Brain className="w-4 h-4" />
                  {analyzing ? 'Analyzing...' : 'Analyze Email'}
                </Button>

                {emailText && (
                  <Button onClick={handleClear} variant="outline">
                    Clear
                  </Button>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Your email content is analyzed securely and is not stored or shared.
              </p>
            </Card>
          </div>

          <div>
            {error && (
              <Card className="border-red-200 bg-red-50 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800 mb-1">Analysis Unavailable</h4>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </Card>
            )}

            {result && (
              <div className="space-y-6">
                <Card className={`border ${getRiskBg(result.risk_level)}`}>
                  <div className="flex items-center gap-4 mb-4">
                    {getRiskIcon(result.risk_level)}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {result.is_phishing ? 'Phishing Detected' : 'Appears Legitimate'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {result.is_phishing
                          ? 'This email shows signs of a phishing attempt. Do not click any links or provide personal information.'
                          : 'This email appears to be legitimate. However, always exercise caution with unexpected emails.'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Phishing Probability</p>
                      <p className={`text-2xl font-bold ${getRiskColor(result.risk_level)}`}>
                        {result.phishing_probability}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Safe Probability</p>
                      <p className="text-2xl font-bold text-green-600">
                        {result.safe_probability}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                      <Badge
                        variant={
                          result.risk_level === 'LOW' ? 'success'
                          : result.risk_level === 'MEDIUM' ? 'warning'
                          : 'error'
                        }
                        size="lg"
                      >
                        {result.risk_level}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {result.is_phishing && (
                  <Card className="border-blue-200 bg-blue-50">
                    <h3 className="font-semibold text-gray-900 mb-3">Recommended Actions</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">1.</span>
                        Do not click any links in the email
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">2.</span>
                        Do not download any attachments
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">3.</span>
                        Report the email to your IT security team
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">4.</span>
                        Delete the email from your inbox
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">5.</span>
                        If you already clicked a link, change your passwords immediately
                      </li>
                    </ul>
                  </Card>
                )}
              </div>
            )}

            {!result && !error && (
              <Card>
                <div className="text-center py-12">
                  <ScanSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Paste an email to get started</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    Our AI will analyze the email content using two machine learning models to determine if it is a phishing attempt.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  );
}