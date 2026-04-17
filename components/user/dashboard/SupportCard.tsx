import React from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { HelpCircle } from 'lucide-react';

export const SupportCard: React.FC = () => {
  return (
    <Card>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Need Help?</h3>
        </div>
        <p className="text-sm text-gray-600">
          Contact the IT Security team if you have questions or concerns.
        </p>
      </div>
      
      <Button variant="outline" className="w-full">
        Contact Support
      </Button>
    </Card>
  );
};