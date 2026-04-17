'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { LineChartComponent } from '@/components/charts/LineChartComponent';
import { ChartDataPoint } from '@/types/dashboard';

interface ClickRatesChartProps {
  data: ChartDataPoint[];
}

export const ClickRatesChart: React.FC<ClickRatesChartProps> = ({ data }) => {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Click Rates Over Time</h3>
        <p className="text-sm text-gray-600 mt-1">Tracking improvement in user awareness</p>
      </div>

      <LineChartComponent
        data={data}
        lines={[
          { dataKey: 'clickRate', stroke: '#3b82f6', name: 'Click Rate' }
        ]}
        xAxisKey="name"
        height={300}
      />
    </Card>
  );
};