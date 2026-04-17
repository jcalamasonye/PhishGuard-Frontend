import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface DownloadableResourceCardProps {
  title: string;
  description: string;
  fileSize: string;
  format: string;
}

export const DownloadableResourceCard: React.FC<DownloadableResourceCardProps> = ({
  title,
  description,
  fileSize,
  format
}) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
        <FileText className="w-6 h-6 text-cyan-600" />
      </div>

      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium text-gray-700">{format}</span>
        <span className="text-xs text-gray-500">•</span>
        <span className="text-xs text-gray-500">{fileSize}</span>
      </div>

      <Button variant="outline" size="sm" className="gap-2 w-full">
        <Download className="w-4 h-4" />
        Download
      </Button>
    </Card>
  );
};