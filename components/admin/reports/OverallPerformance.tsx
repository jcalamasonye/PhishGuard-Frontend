import React from 'react';
import { Card } from '@/components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverallPerformanceProps {
  totalCampaigns: number;
  totalUsers: number;
  averageClickRate: number;
  clickRateTrend: number;
  averageQuizScore: number;
  quizScoreTrend: number;
  highRiskUsers: number;
  improvementRate: number;
}

export const OverallPerformance: React.FC<OverallPerformanceProps> = ({
  totalCampaigns,
  totalUsers,
  averageClickRate,
  clickRateTrend,
  averageQuizScore,
  quizScoreTrend
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalCampaigns}</h3>
          <p className="text-xs text-gray-500 mt-1">Sent this year</p>
        </div>
      </Card>

      <Card>
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Users Enrolled</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalUsers}</h3>
          <p className="text-xs text-gray-500 mt-1">Active participants</p>
        </div>
      </Card>

      <Card>
        <div>
          <p className="text-sm text-gray-600 mb-1">Average Click Rate</p>
          <h3 className="text-3xl font-bold text-gray-900">{averageClickRate}%</h3>
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium mt-1',
            clickRateTrend < 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {clickRateTrend < 0 ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <TrendingUp className="w-4 h-4" />
            )}
            <span>{Math.abs(clickRateTrend)}% vs last quarter</span>
          </div>
        </div>
      </Card>

      <Card>
        <div>
          <p className="text-sm text-gray-600 mb-1">Average Quiz Score</p>
          <h3 className="text-3xl font-bold text-gray-900">{averageQuizScore}%</h3>
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium mt-1',
            quizScoreTrend > 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {quizScoreTrend > 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(quizScoreTrend)}% vs last quarter</span>
          </div>
        </div>
      </Card>
    </div>
  );
};