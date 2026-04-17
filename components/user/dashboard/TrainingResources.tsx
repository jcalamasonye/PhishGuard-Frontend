'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BookOpen } from 'lucide-react';

export const TrainingResources: React.FC = () => {
  const router = useRouter();

  const handleViewTraining = () => {
    router.push('/training/sample-campaign-1');
  };

  return (
    <Card className="bg-linear-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Learning Center</h3>
          <p className="text-sm text-gray-600 mt-1">
            Access training modules, videos, and guides to improve your security awareness.
          </p>
        </div>
      </div>
      
      <Button onClick={handleViewTraining} className="w-full" variant="primary">
        View Training Resources
      </Button>
    </Card>
  );
};