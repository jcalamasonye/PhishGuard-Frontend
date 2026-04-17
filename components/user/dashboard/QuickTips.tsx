'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { QuickTip } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface QuickTipsProps {
  tips: QuickTip[];
  onToggle: (id: string) => void;
}

export const QuickTips: React.FC<QuickTipsProps> = ({ tips, onToggle }) => {
  const router = useRouter();

  const completedCount = tips.filter(tip => tip.completed).length;
  const allCompleted = completedCount === tips.length;

  const handleTakeQuiz = () => {
    router.push('/quiz/quick-tips-quiz');
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
      
      <div className="space-y-3">
        {tips.map((tip) => (
          <label
            key={tip.id}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={tip.completed}
              onChange={() => onToggle(tip.id)}
              className="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span 
              className={cn(
                'text-sm flex-1 transition-colors',
                tip.completed 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-700 group-hover:text-gray-900'
              )}
            >
              {tip.text}
            </span>
          </label>
        ))}
      </div>

      {allCompleted && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 mb-3">
            🎉 Great! You&apos;ve learned all the tips. Ready to test your knowledge?
          </p>
          <Button onClick={handleTakeQuiz} variant="primary" size="sm" className="w-full">
            Take Quick Quiz
          </Button>
        </div>
      )}
    </Card>
  );
};