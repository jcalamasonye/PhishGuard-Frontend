'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Edit, Play, ChevronLeft, Shield, Mail, Brain } from 'lucide-react';
import { EmailTemplate } from '@/types/template';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { TEMPLATE_ICONS } from '@/lib/constants/icons';
import { aiService, type AIAnalysisResult } from '@/services/aiService';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: EmailTemplate | null;
  onDuplicate: () => void;
  onEdit: () => void;
  onUseTemplate: () => void;
}

const difficultyConfig = {
  easy: { variant: 'success' as const, label: 'Easy' },
  medium: { variant: 'warning' as const, label: 'Medium' },
  hard: { variant: 'error' as const, label: 'Hard' }
};

const categoryLabels: Record<string, string> = {
  password: 'Password Reset',
  package: 'Delivery',
  executive: 'Finance',
  payroll: 'HR Alert',
  security: 'IT Support',
  vendor: 'Finance'
};

const riskLevelColors: Record<string, string> = {
  CRITICAL: 'text-red-600',
  HIGH: 'text-orange-600',
  MEDIUM: 'text-yellow-600',
  LOW: 'text-green-600',
};

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  isOpen,
  onClose,
  template,
  onDuplicate,
  onEdit,
  onUseTemplate
}) => {
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(false);

  useEffect(() => {
    if (!isOpen || !template) {
      setAiResult(null);
      setAiError(false);
      return;
    }

    const analyzeTemplate = async () => {
      setAiLoading(true);
      setAiError(false);
      try {
        const emailText = `From: ${template.fromName} <${template.fromEmail}>\nSubject: ${template.subject}\n\n${template.body}`;
        const result = await aiService.analyzeEmail(emailText);
        setAiResult(result);
      } catch {
        setAiError(true);
      } finally {
        setAiLoading(false);
      }
    };

    analyzeTemplate();
  }, [isOpen, template]);

  if (!isOpen || !template) return null;

  const difficultyInfo = difficultyConfig[template.difficulty];
  const CategoryIcon = TEMPLATE_ICONS[template.category] || Mail;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="relative min-h-screen flex items-start justify-center p-4">
        <div className="relative bg-white w-full max-w-5xl my-8 rounded-lg shadow-xl">
          <div className="p-6 pb-0">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Back To Template Library
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CategoryIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{template.name}</h2>
                <p className="text-gray-600">{categoryLabels[template.category]}</p>
              </div>
              <Badge variant={difficultyInfo.variant} size="lg">
                {difficultyInfo.label}
              </Badge>
            </div>
          </div>

          <div className="px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                          {template.fromName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{template.fromName}</p>
                          <p className="text-sm text-gray-600">{template.fromEmail}</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{template.subject}</h3>
                    </div>

                    <div className="prose prose-sm max-w-none mb-6">
                      <p className="whitespace-pre-wrap text-gray-700">{template.body}</p>
                    </div>

                    {template.ctaText && (
                      <div className="flex justify-center">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                          {template.ctaText}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    AI Detection Score
                  </h3>
                  {aiLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-200 border-t-purple-600" />
                      <span className="text-sm text-gray-600">Analyzing template...</span>
                    </div>
                  ) : aiError ? (
                    <p className="text-sm text-gray-500">AI service unavailable</p>
                  ) : aiResult ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phishing Probability</p>
                        <p className={`text-3xl font-bold ${riskLevelColors[aiResult.risk_level] || 'text-gray-900'}`}>
                          {aiResult.phishing_probability}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                        <Badge variant={aiResult.risk_level === 'LOW' ? 'success' : aiResult.risk_level === 'MEDIUM' ? 'warning' : 'error'}>
                          {aiResult.risk_level}
                        </Badge>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Red Flags to Spot
                  </h3>
                  <ul className="space-y-2">
                    {template.redFlags.map((flag, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">-</span>
                        <span className="text-sm text-gray-700">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">About This Template</h3>
                  <p className="text-sm text-gray-700 mb-3">{template.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Difficulty Level:</span>
                    <Badge variant={difficultyInfo.variant}>
                      {difficultyInfo.label}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-6 bg-gray-50 border-t border-gray-200 rounded-b-lg mt-6">
            <div className="flex gap-3">
              <Button onClick={onDuplicate} variant="outline" className="gap-2">
                <Copy className="w-4 h-4" />
                Duplicate
              </Button>
              <Button onClick={onEdit} variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Template
              </Button>
            </div>
            <Button onClick={onUseTemplate} variant="primary" className="gap-2">
              <Play className="w-4 h-4" />
              Use This Template
            </Button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};