'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendData {
  month: string;
  clickRate: number;
  campaigns: number;
}

interface ClickRateTrendProps {
  data: TrendData[];
}

export const ClickRateTrend: React.FC<ClickRateTrendProps> = ({ data }) => {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Click Rate Trend</h3>
        <p className="text-sm text-gray-600">Average click rate across all campaigns over time</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            domain={[0, 32]}
          />
          <Tooltip />
          <Legend 
            verticalAlign="bottom"
            height={36}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="clickRate" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Click Rate"
          />
          <Line 
            type="monotone" 
            dataKey="campaigns" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Campaigns"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};