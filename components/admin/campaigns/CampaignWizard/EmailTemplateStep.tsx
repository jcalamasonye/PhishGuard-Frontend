'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, Pencil } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { EmailTemplate } from '@/types/template';
import Button from '@/components/ui/Button';
import { templateService } from '@/services/templateService';

interface EmailTemplateStepProps {
  selectedTemplateId?: string;
  onSelectTemplate: (templateId: string) => void;
  /** Called when user clicks "Create Custom Template".
   *  The parent saves any in-progress form data before navigating away. */
  onCreateCustom?: () => void;
}

export const EmailTemplateStep: React.FC<EmailTemplateStepProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  onCreateCustom,
}) => {
  const router = useRouter();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [activeTemplate, setActiveTemplate] = useState<EmailTemplate | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const result = await templateService.getAll({ limit: 50 });
        setTemplates(result.templates);
      } catch (err) {
        console.error('Failed to fetch templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const openPreview = (template: EmailTemplate) => {
    setActiveTemplate(template);
    setActiveTab('preview');
  };

  const openEdit = (template: EmailTemplate) => {
    setActiveTemplate(template);
    setActiveTab('edit');
  };

  const closeModal = () => setActiveTemplate(null);

  const handleCreateCustom = () => {
    if (onCreateCustom) {
      onCreateCustom();
    } else {
      router.push('/admin/campaigns/create/custom-template');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Email Template</h2>
        <p className="text-gray-600">Choose a template from our library or create your own</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplateId === template.id}
            onSelect={() => onSelectTemplate(template.id)}
            onPreview={() => openPreview(template)}
            onEdit={() => openEdit(template)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleCreateCustom}
          variant="outline"
          className="gap-2"
        >
          <Plus className="w-5 h-5" />
          <div className="text-center">
            <p className="font-semibold">Create Custom Template</p>
            <p className="text-xs text-gray-500">Design your own phishing email from scratch</p>
          </div>
        </Button>
      </div>

      {/* ── Preview / Edit Modal ───────────────────────────────────── */}
      {activeTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{activeTemplate.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{activeTemplate.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors ml-4 mt-0.5"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Tab Bar */}
            <div className="flex border-b border-gray-200 px-6">
              <button
                onClick={() => setActiveTab('preview')}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  activeTab === 'preview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  activeTab === 'edit'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Edit
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'preview' ? (
                <div className="p-6">
                  {/* Email shell */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 space-y-1.5">
                      <div className="flex gap-2 text-sm">
                        <span className="text-gray-500 w-16 shrink-0">From:</span>
                        <span className="text-gray-900 font-medium">
                          {activeTemplate.fromName}{' '}
                          <span className="font-normal text-gray-500">
                            &lt;{activeTemplate.fromEmail}&gt;
                          </span>
                        </span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="text-gray-500 w-16 shrink-0">Subject:</span>
                        <span className="text-gray-900 font-semibold">{activeTemplate.subject}</span>
                      </div>
                    </div>

                    <div className="p-6 bg-white">
                      <div className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed mb-6">
                        {activeTemplate.body}
                      </div>
                      {activeTemplate.ctaText && (
                        <div className="flex justify-center">
                          <span className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-sm cursor-default">
                            {activeTemplate.ctaText}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Red flags panel */}
                  {activeTemplate.redFlags && activeTemplate.redFlags.length > 0 && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-semibold text-yellow-900 mb-2">
                        Red Flags ({activeTemplate.redFlags.length})
                      </p>
                      <ul className="space-y-1">
                        {activeTemplate.redFlags.map((flag, i) => (
                          <li key={i} className="text-sm text-yellow-800 flex items-start gap-2">
                            <span className="text-yellow-500 mt-0.5 shrink-0">•</span>
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                /* Edit tab — routes to full template editor */
                <div className="p-10 flex flex-col items-center justify-center text-center gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Pencil className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-base mb-1">Edit this template</p>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Opens the full template editor where you can change the subject, body,
                      sender details, and red flags.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      closeModal();
                      router.push(`/admin/templates/${activeTemplate.id}/edit`);
                    }}
                    variant="primary"
                    className="gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Open in Editor
                  </Button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                Close
              </button>
              <Button
                onClick={() => {
                  onSelectTemplate(activeTemplate.id);
                  closeModal();
                }}
                variant="primary"
              >
                {selectedTemplateId === activeTemplate.id
                  ? '✓ Selected'
                  : 'Use This Template'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
