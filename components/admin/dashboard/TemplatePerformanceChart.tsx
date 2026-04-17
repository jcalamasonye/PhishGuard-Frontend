'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { ChartDataPoint } from '@/types/dashboard';

interface TemplatePerformanceChartProps {
  data: ChartDataPoint[];
}

export const TemplatePerformanceChart: React.FC<TemplatePerformanceChartProps> = ({ data }) => {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Template Performance</h3>
        <p className="text-sm text-gray-600 mt-1">Comparing click rates by campaign type</p>
      </div>

      <BarChartComponent
        data={data}
        bars={[
          { dataKey: 'clickRate', fill: '#6366f1', name: 'Click Rate' }
        ]}
        xAxisKey="name"
        height={300}
        yAxisLabel="Click Rate (%)"
      />
    </Card>
  );
};