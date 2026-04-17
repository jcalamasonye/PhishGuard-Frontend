import React from 'react';
import { Eye, Copy, Edit } from 'lucide-react';
import { EmailTemplate } from '@/types/template';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { TEMPLATE_ICONS } from '@/lib/constants/icons';

interface TemplateCardProps {
  template: EmailTemplate;
  onPreview: () => void;
  onDuplicate: () => void;
  onEdit: () => void;
  onUse: () => void;
}

const difficultyConfig = {
  easy: { variant: 'success' as const, label: 'Easy', color: 'bg-green-100' },
  medium: { variant: 'warning' as const, label: 'Medium', color: 'bg-yellow-100' },
  hard: { variant: 'error' as const, label: 'Hard', color: 'bg-red-100' }
};

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onPreview,
  onDuplicate,
  onEdit,
  onUse
}) => {
  const difficultyInfo = difficultyConfig[template.difficulty];
  const CategoryIcon = TEMPLATE_ICONS[template.category];

  return (
    <Card className="hover:shadow-lg transition-all cursor-pointer group" onClick={onPreview}>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <CategoryIcon className="w-12 h-12 text-blue-600" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {template.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
          {template.description}
        </p>

        <div className="mb-4">
          <Badge variant={difficultyInfo.variant} size="sm">
            {difficultyInfo.label}
          </Badge>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUse();
            }}
            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Use
          </button>
        </div>

        <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TemplateCard;