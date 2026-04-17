import React from 'react';
import { Eye, FileText, Video, Image } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface FeaturedResourceCardProps {
  title: string;
  description: string;
  type: 'article' | 'video' | 'gallery';
  onClick: () => void;
}

const typeConfig = {
  article: {
    MainIcon: FileText,
    BadgeIcon: FileText,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    label: 'Article'
  },
  video: {
    MainIcon: Video,
    BadgeIcon: Video,
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    label: 'Video'
  },
  gallery: {
    MainIcon: Image,
    BadgeIcon: Image,
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-700',
    label: 'Gallery'
  }
};

export const FeaturedResourceCard: React.FC<FeaturedResourceCardProps> = ({
  title,
  description,
  type,
  onClick
}) => {
  const config = typeConfig[type];
  const { MainIcon, BadgeIcon } = config;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow" onClick={onClick}>
      <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <MainIcon className="w-24 h-24 text-white opacity-90" />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <BadgeIcon className="w-5 h-5 text-gray-600" />
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            {config.label}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 text-base">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 w-full justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <Eye className="w-4 h-4" />
          View
        </Button>
      </div>
    </Card>
  );
};