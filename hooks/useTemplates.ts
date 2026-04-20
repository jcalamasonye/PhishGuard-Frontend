import { useState, useCallback } from 'react';
import { EmailTemplate } from '@/types/template';
import { MOCK_EMAIL_TEMPLATES } from '@/lib/mock-data';

interface UseTemplatesReturn {
  templates: EmailTemplate[];
  loading: boolean;
  error: string | null;
  addTemplate: (template: Omit<EmailTemplate, 'id'>) => void;
  updateTemplate: (id: string, updates: Partial<EmailTemplate>) => void;
  deleteTemplate: (id: string) => void;
  getTemplateById: (id: string) => EmailTemplate | undefined;
  refreshTemplates: () => void;
}

export function useTemplates(): UseTemplatesReturn {
  const [templates, setTemplates] = useState<EmailTemplate[]>(MOCK_EMAIL_TEMPLATES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTemplate = useCallback((newTemplate: Omit<EmailTemplate, 'id'>) => {
    const template: EmailTemplate = {
      ...newTemplate,
      id: `template-${Date.now()}`
    };
    setTemplates(prev => [...prev, template]);
  }, []);

  const updateTemplate = useCallback((id: string, updates: Partial<EmailTemplate>) => {
    setTemplates(prev =>
      prev.map(template =>
        template.id === id ? { ...template, ...updates } : template
      )
    );
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  }, []);

  const getTemplateById = useCallback((id: string) => {
    return templates.find(template => template.id === id);
  }, [templates]);

  const refreshTemplates = useCallback(() => {
    setLoading(true);
    setError(null);
    
    
    setTimeout(() => {
      setTemplates(MOCK_EMAIL_TEMPLATES);
      setLoading(false);
    }, 500);
  }, []);

  return {
    templates,
    loading,
    error,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateById,
    refreshTemplates
  };
}