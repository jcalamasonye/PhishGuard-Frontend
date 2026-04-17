'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { LineChartComponent } from '@/components/charts/LineChartComponent';
import { ChartDataPoint } from '@/types/dashboard';

interface ProgressChartProps {
  data: ChartDataPoint[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Progress Over Time</h3>
      </div>

      <LineChartComponent
        data={data}
        lines={[
          { dataKey: 'quizScore', stroke: '#10b981', name: 'Quiz Score' },
          { dataKey: 'clickRate', stroke: '#ef4444', name: 'Click Rate' }
        ]}
        xAxisKey="name"
        height={300}
      />

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-red-600 font-medium mb-1">Click Rate Trend</p>
          <p className="text-2xl font-bold text-red-700">Down 19%</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-600 font-medium mb-1">Quiz Score Trend</p>
          <p className="text-2xl font-bold text-green-700">Up 25%</p>
        </div>
      </div>
    </Card>
  );
};