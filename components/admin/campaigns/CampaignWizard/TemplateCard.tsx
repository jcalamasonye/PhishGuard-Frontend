import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle2, Brain, Pencil } from 'lucide-react';
import { EmailTemplate } from '@/types/template';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { TEMPLATE_ICONS } from '@/lib/constants/icons';
import { aiService } from '@/services/aiService';

interface TemplateCardProps {
  template: EmailTemplate;
  isSelected?: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onEdit?: () => void;
}

const difficultyConfig = {
  easy: { variant: 'success' as const, label: 'Easy' },
  medium: { variant: 'warning' as const, label: 'Medium' },
  hard: { variant: 'error' as const, label: 'Hard' }
};

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected = false,
  onSelect,
  onPreview,
  onEdit
}) => {
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchAiScore = async () => {
      setAiLoading(true);
      try {
        const emailText = `From: ${template.fromName} <${template.fromEmail}>\nSubject: ${template.subject}\n\n${template.body}`;
        const result = await aiService.analyzeEmail(emailText);
        setAiScore(result.phishing_probability);
      } catch {
        setAiScore(null);
      } finally {
        setAiLoading(false);
      }
    };

    fetchAiScore();
  }, [template]);

  const difficultyInfo = difficultyConfig[template.difficulty];
  const TemplateIcon = TEMPLATE_ICONS[template.category];

  return (
    <div
      className={cn(
        'relative border-2 rounded-lg p-6 transition-all cursor-pointer hover:shadow-md',
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      )}
      onClick={onSelect}
    >
      <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
        <TemplateIcon className="w-6 h-6 text-blue-600" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{template.description}</p>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant={difficultyInfo.variant} size="sm">
          {difficultyInfo.label}
        </Badge>

        {aiLoading ? (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-200 border-t-purple-500" />
          </div>
        ) : aiScore !== null ? (
          <div className="flex items-center gap-1">
            <Brain className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-xs font-medium text-purple-600">{aiScore}% detected</span>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>

        {onEdit && (
          <>
            <span className="text-gray-300">|</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          </>
        )}
      </div>

      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};