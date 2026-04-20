'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import TemplateCard from '@/components/admin/templates/TemplateCard';
import { TemplatePreviewModal } from '@/components/admin/templates/TemplatePreviewModal';
import { LoadingModal } from '@/components/modals/LoadingModal';
import { EmailTemplate } from '@/types/template';
import { templateService } from '@/services/templateService';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/hooks/useModal';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

export default function TemplateLibraryPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  const previewModal = useModal();
  const loadingModal = useModal();

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const result = await templateService.getAll({
        category: categoryFilter,
        difficulty: difficultyFilter,
        limit: 50,
      });
      setTemplates(result.templates);
    } catch (err) {
      console.error('Failed to fetch templates:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, difficultyFilter]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  
  const filteredTemplates = searchQuery.trim()
    ? templates.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : templates;

  const handleUseTemplate = (template: EmailTemplate) => {
    setLoadingMessage('Preparing template for campaign...');
    loadingModal.open();
    previewModal.close();
    setTimeout(() => {
      loadingModal.close();
      router.push(`/admin/campaigns/create?templateId=${template.id}`);
    }, 1500);
  };

  const handleDuplicate = async (template: EmailTemplate) => {
    try {
      await templateService.duplicate(template.id);
      fetchTemplates();
    } catch (err) {
      console.error('Failed to duplicate template:', err);
    }
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
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

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  return (
    <>
      <Header
        userName={user?.name || 'Admin'}
        userRole="admin"
        notificationCount={0}
      />

      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <ErrorBoundary>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Template Library</h1>
                <p className="text-gray-600">Browse and manage phishing simulation templates</p>
              </div>
              <Button
                onClick={() => router.push('/admin/templates/create')}
                variant="primary"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Template
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search templates..."
                />
              </div>
              <div className="w-64">
                <Select
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  options={categoryOptions}
                />
              </div>
              <div className="w-48">
                <Select
                  value={difficultyFilter}
                  onChange={setDifficultyFilter}
                  options={difficultyOptions}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onPreview={() => {
                      setSelectedTemplate(template);
                      previewModal.open();
                    }}
                    onDuplicate={() => handleDuplicate(template)}
                    onEdit={() => router.push(`/admin/templates/${template.id}/edit`)}
                    onUse={() => handleUseTemplate(template)}
                  />
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No templates found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </ErrorBoundary>
      </main>

      {selectedTemplate && (
        <TemplatePreviewModal
          isOpen={previewModal.isOpen}
          onClose={previewModal.close}
          template={selectedTemplate}
          onDuplicate={() => handleDuplicate(selectedTemplate)}
          onEdit={() => {
            previewModal.close();
            router.push(`/admin/templates/${selectedTemplate.id}/edit`);
          }}
          onUseTemplate={() => handleUseTemplate(selectedTemplate)}
        />
      )}

      <LoadingModal
        isOpen={loadingModal.isOpen}
        onClose={loadingModal.close}
        message={loadingMessage}
      />
    </>
  );
}
