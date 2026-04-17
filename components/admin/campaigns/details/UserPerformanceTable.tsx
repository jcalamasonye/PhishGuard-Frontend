import React from 'react';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';

interface UserPerformance {
  id: string;
  name: string;
  email: string;
  emailOpened: boolean;
  linkClicked: boolean;
  clickedAt?: string;
  quizScore?: string;
  timeToClick?: string;
}

interface UserPerformanceTableProps {
  users: UserPerformance[];
  onViewDetails: (userId: string) => void;
}

export const UserPerformanceTable: React.FC<UserPerformanceTableProps> = ({
  users,
  onViewDetails
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">User</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email Opened</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Link Clicked</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Time to Click</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quiz Score</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                {user.emailOpened ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </td>
              <td className="py-4 px-4">
                {user.linkClicked ? (
                  <CheckCircle2 className="w-5 h-5 text-red-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </td>
              <td className="py-4 px-4">
                {user.timeToClick ? (
                  <div className="text-sm text-gray-900 whitespace-pre-line">
                    {user.timeToClick}
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="py-4 px-4">
                {user.quizScore ? (
                  <span className="text-sm font-medium text-gray-900">{user.quizScore}</span>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="py-4 px-4 text-right">
                <Button
                  onClick={() => onViewDetails(user.id)}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found matching your search.
        </div>
      )}
    </div>
  );
};