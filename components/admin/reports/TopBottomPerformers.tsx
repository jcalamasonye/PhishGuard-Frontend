import React from 'react';
import { Card } from '@/components/ui/Card';
import { Trophy, TrendingDown } from 'lucide-react';
import { TopPerformer } from '@/types/analytics';

interface TopBottomPerformersProps {
  topPerformers: TopPerformer[];
  bottomPerformers: TopPerformer[];
}

export const TopBottomPerformers: React.FC<TopBottomPerformersProps> = ({
  topPerformers,
  bottomPerformers
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">Users with lowest click rates</p>

        <div className="space-y-3">
          {topPerformers.map((user, index) => (
            <div key={user.id} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-600">{user.department}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">{user.clickRate}%</p>
                <p className="text-xs text-gray-500">{user.quizScore}% quiz</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">Need Attention</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">Users with highest click rates</p>

        <div className="space-y-3">
          {bottomPerformers.map((user, index) => (
            <div key={user.id} className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-600">{user.department}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-red-600">{user.clickRate}%</p>
                <p className="text-xs text-gray-500">{user.quizScore}% quiz</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};