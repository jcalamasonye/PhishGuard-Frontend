'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DepartmentData {
  department: string;
  clickRate: number;
}

interface DepartmentClickRateProps {
  data: DepartmentData[];
}

export const DepartmentClickRate: React.FC<DepartmentClickRateProps> = ({ data }) => {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Department Performance</h3>
        <p className="text-sm text-gray-600">Click rate by department</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={data} 
          layout="vertical"
          margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" domain={[0, 1]} tick={{ fontSize: 12 }} />
          <YAxis dataKey="department" type="category" tick={{ fontSize: 12 }} width={70} />
          <Tooltip formatter={(value?: number) => `${(((value ?? 0) * 100).toFixed(1))}%`} />
          <Bar dataKey="clickRate" fill="#3b82f6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};