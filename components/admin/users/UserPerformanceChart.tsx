'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { LineChartComponent } from '@/components/charts/LineChartComponent';
import { ChartDataPoint } from '@/types/dashboard';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface UserPerformanceChartsProps {
  clickRateData: ChartDataPoint[];
  quizScoreData: ChartDataPoint[];
}

export const UserPerformanceCharts: React.FC<UserPerformanceChartsProps> = ({
  clickRateData,
  quizScoreData
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Click Rate Trend</h3>
          <p className="text-sm text-gray-600">Percentage of campaigns where phishing link was clicked</p>
        </div>

        <LineChartComponent
          data={clickRateData}
          lines={[
            { dataKey: 'clickRate', stroke: '#ef4444', name: 'Click Rate' }
          ]}
          xAxisKey="name"
          height={250}
        />

        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <p className="text-sm text-green-800">
              Click rate decreased by 56.8% over the last 6 months
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Quiz Scores Over Time</h3>
          <p className="text-sm text-gray-600">Performance on post-campaign awareness quizzes</p>
        </div>

        <LineChartComponent
          data={quizScoreData}
          lines={[
            { dataKey: 'quizScore', stroke: '#10b981', name: 'Quiz Score' }
          ]}
          xAxisKey="name"
          height={250}
        />

        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <p className="text-sm text-green-800">
              Quiz scores improved by 23% over the last 6 months
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};