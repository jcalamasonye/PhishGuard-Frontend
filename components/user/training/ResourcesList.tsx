import React from 'react';
import { FileText, Video, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const resources = [
  { id: '1', icon: FileText, title: 'PDF Guide', description: 'Download full guide', color: 'blue' as const },
  { id: '2', icon: Video, title: 'Video Tutorial', description: 'Watch 5 min video', color: 'red' as const },
  { id: '3', icon: BookOpen, title: 'More Courses', description: 'Explore training', color: 'purple' as const }
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  red: 'bg-red-100 text-red-600',
  purple: 'bg-purple-100 text-purple-600'
};

export const ResourcesList: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Resources</h2>
      <p className="text-gray-600 mb-6">Get more resources to guide you against phishing</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          
          return (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center p-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${colorClasses[resource.color]}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};