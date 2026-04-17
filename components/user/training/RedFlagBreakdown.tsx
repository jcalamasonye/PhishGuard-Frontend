import React from 'react';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface RedFlag {
  id: string;
  title: string;
  examples: Array<{
    label: string;
    value: string;
    isBad: boolean;
  }>;
}

interface RedFlagBreakdownProps {
  redFlags?: RedFlag[];
}

export const RedFlagBreakdown: React.FC<RedFlagBreakdownProps> = ({ redFlags }) => {
  // If no structured red flags passed, use a simple string list format
  const flags: RedFlag[] = redFlags || [];

  if (flags.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">What made the email suspicious?</h2>
      <p className="text-gray-600 mb-6">Here are the red flags you should have spotted:</p>

      <div className="space-y-4">
        {flags.map((flag, index) => (
          <Card key={flag.id || index} className="bg-red-50 border-red-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{flag.title}</h3>
                <div className="text-sm text-gray-700">
                  {flag.examples.map((example, idx) => (
                    <div key={idx} className="mb-1">
                      <span className={example.isBad ? 'text-red-600 font-mono' : 'text-green-600 font-mono'}>
                        {example.label}: {example.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
