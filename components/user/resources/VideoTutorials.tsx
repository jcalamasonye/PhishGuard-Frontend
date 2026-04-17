import React from 'react';
import { Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface VideoCardProps {
  title: string;
  duration: string;
  thumbnail?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, duration }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative h-40 bg-gradient-to-br from-gray-700 to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
      </div>
    </Card>
  );
};