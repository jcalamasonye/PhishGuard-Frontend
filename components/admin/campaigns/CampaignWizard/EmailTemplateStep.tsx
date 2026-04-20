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

      {
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

            {}
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
