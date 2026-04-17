import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const BEST_PRACTICES = [
  {
    id: '1',
    title: 'Hover over links before clicking',
    description: 'Hold your mouse over any link to see the real URL. The preview URL should match what\'s shown.',
  },
  {
    id: '2',
    title: 'Look for urgent threatening language',
    description: 'Be cautious of emails that create urgency or threaten negative consequences. Take time to verify.',
  },
  {
    id: '3',
    title: 'Double-check sender domain',
    description: 'Look carefully at the email address, examining any slight misspellings like "amazen" instead of "amazon".',
  },
  {
    id: '4',
    title: 'Contact IT if something seems suspicious',
    description: 'When in doubt, report it out. It is better to ask than to risk a security breach.',
  },
];

export const BestPractices: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">What you should have done instead</h2>
      <p className="text-gray-600 mb-6">Follow these steps whenever you get a suspicious email:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BEST_PRACTICES.map((practice) => (
          <Card key={practice.id} className="bg-green-50 border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{practice.title}</h3>
                <p className="text-sm text-gray-700">{practice.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
