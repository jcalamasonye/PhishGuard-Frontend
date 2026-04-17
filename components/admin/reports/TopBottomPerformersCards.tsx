import React from 'react';
import { Card } from '@/components/ui/Card';
import { Trophy, AlertTriangle } from 'lucide-react';

interface Performer {
  name: string;
  department: string;
  clickRate: number;
}

interface TopBottomPerformersCardsProps {
  topPerformers: Performer[];
  bottomPerformers: Performer[];
}

export const TopBottomPerformersCards: React.FC<TopBottomPerformersCardsProps> = ({
  topPerformers,
  bottomPerformers
}) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top & Bottom Performers</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">Best Performers</h4>
          </div>
          <div className="space-y-2">
            {topPerformers.map((performer, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 bg-green-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                  <p className="text-xs text-gray-600">{performer.department}</p>
                </div>
                <span className="text-sm font-bold text-green-600">
                  {performer.clickRate}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h4 className="font-semibold text-gray-900">Needs Improvement</h4>
          </div>
          <div className="space-y-2">
            {bottomPerformers.map((performer, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 bg-red-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                  <p className="text-xs text-gray-600">{performer.department}</p>
                </div>
                <span className="text-sm font-bold text-red-600">
                  {performer.clickRate}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};