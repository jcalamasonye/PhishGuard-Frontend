'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TemplateClickData {
  name: string;
  clicks: number;
  sent: number;
}

interface MostClickedTemplatesProps {
  data: TemplateClickData[];
}

export const MostClickedTemplates: React.FC<MostClickedTemplatesProps> = ({ data }) => {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Most Clicked Templates</h3>
        <p className="text-sm text-gray-600">Templates with highest click rates</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend 
            verticalAlign="bottom"
            height={36}
            iconType="circle"
          />
          <Bar dataKey="clicks" fill="#ef4444" name="Clicks" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sent" fill="#3b82f6" name="Sent" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};