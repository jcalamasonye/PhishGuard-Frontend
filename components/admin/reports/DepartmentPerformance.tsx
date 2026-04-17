'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { DepartmentPerformance as DepartmentPerformanceType } from '@/types/analytics';

interface DepartmentPerformanceProps {
  departments: DepartmentPerformanceType[];
}

export const DepartmentPerformance: React.FC<DepartmentPerformanceProps> = ({ departments }) => {
  const chartData = departments.map(dept => ({
    name: dept.department,
    clickRate: dept.averageClickRate,
    quizScore: dept.averageQuizScore
  }));

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Department Performance</h3>
        <p className="text-sm text-gray-600">Comparing awareness metrics across departments</p>
      </div>

      <BarChartComponent
        data={chartData}
        bars={[
          { dataKey: 'clickRate', fill: '#ef4444', name: 'Click Rate' },
          { dataKey: 'quizScore', fill: '#10b981', name: 'Quiz Score' }
        ]}
        xAxisKey="name"
        height={300}
      />

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Department
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Users
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Click Rate
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Quiz Score
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                High Risk
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {departments.map((dept) => (
              <tr key={dept.department} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{dept.department}</td>
                <td className="px-4 py-3 text-center text-gray-900">{dept.totalUsers}</td>
                <td className="px-4 py-3 text-center">
                  <span className="text-red-600 font-medium">{dept.averageClickRate}%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-green-600 font-medium">{dept.averageQuizScore}%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-orange-600 font-medium">{dept.highRiskUsers}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};