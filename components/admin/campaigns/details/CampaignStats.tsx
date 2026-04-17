import React from 'react';
import { Card } from '@/components/ui/Card';
import { Mail, Eye, CheckCircle2 } from 'lucide-react';

interface CampaignStatsProps {
  totalSent: number;
  emailsOpened: number;
  openRate: number;
  averageQuizScore: number;
  quizCompletionRate: number;
}

export const CampaignStats: React.FC<CampaignStatsProps> = ({
  totalSent,
  emailsOpened,
  openRate,
  averageQuizScore,
  quizCompletionRate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Recipients</p>
            <h3 className="text-3xl font-bold text-gray-900">{totalSent}</h3>
          </div>
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
            <Mail className="w-7 h-7 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Emails Opened</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {emailsOpened} of {totalSent}
            </h3>
            <p className="text-sm text-blue-600">{openRate}% open rate</p>
          </div>
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
            <Eye className="w-7 h-7 text-blue-600" />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Average Quiz Score</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{averageQuizScore}</h3>
            <p className="text-sm text-green-600">{quizCompletionRate}% completion</p>
          </div>
          <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-yellow-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};