import React from 'react';
import { Card } from '@/components/ui/Card';

interface UserStatsCardsProps {
  totalUsers: number;
  highRiskUsers: number;
  averageClickRate: number;
  averageQuizScore: number;
}

export const UserStatsCards: React.FC<UserStatsCardsProps> = ({
  totalUsers,
  highRiskUsers,
  averageClickRate,
  averageQuizScore
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <p className="text-sm text-gray-600 mb-1">Total Users</p>
        <h3 className="text-3xl font-bold text-gray-900">{totalUsers}</h3>
      </Card>

      <Card>
        <p className="text-sm text-gray-600 mb-1">High Risk Users</p>
        <h3 className="text-3xl font-bold text-red-600">{highRiskUsers}</h3>
      </Card>

      <Card>
        <p className="text-sm text-gray-600 mb-1">Average Click Rate</p>
        <h3 className="text-3xl font-bold text-gray-900">{averageClickRate}%</h3>
      </Card>

      <Card>
        <p className="text-sm text-gray-600 mb-1">Average Quiz Score</p>
        <h3 className="text-3xl font-bold text-gray-900">{averageQuizScore}%</h3>
      </Card>
    </div>
  );
};