'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { cn } from '@/lib/utils';

interface UserTableProps {
  users: User[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  showSelection?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  selectedIds,
  onSelectionChange,
  showSelection = false
}) => {
  const router = useRouter();

  const isAllSelected = users.length > 0 && selectedIds.length === users.length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(users.map(u => u.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedIds.includes(userId)) {
      onSelectionChange(selectedIds.filter(id => id !== userId));
    } else {
      onSelectionChange([...selectedIds, userId]);
    }
  };

  const handleUserClick = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  const getClickRateColor = (clickRate: number) => {
    if (clickRate >= 20) return 'text-red-600';
    if (clickRate >= 15) return 'text-orange-600';
    if (clickRate >= 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getQuizScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {showSelection && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isSomeSelected;
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Campaigns
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Click Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Average Quiz Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => {
              const isSelected = selectedIds.includes(user.id);

              return (
                <tr
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className={cn(
                    'transition-colors cursor-pointer hover:bg-gray-50',
                    isSelected && 'bg-blue-50'
                  )}
                >
                  {showSelection && (
                    <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.totalCampaigns}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={cn('text-sm font-medium', getClickRateColor(user.clickRate))}>
                      {user.clickRate}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={cn('text-sm font-medium', getQuizScoreColor(user.averageQuizScore))}>
                      {user.averageQuizScore}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};