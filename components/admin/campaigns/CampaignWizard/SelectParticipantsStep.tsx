'use client';

import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { cn } from '@/lib/utils';
import { userService } from '@/services/userService';
import type { User } from '@/types/user';

interface SelectParticipantsStepProps {
  selectedUserIds: string[];
  onSelectionChange: (userIds: string[]) => void;
}

const DEPARTMENT_OPTIONS = [
  { value: 'all', label: 'All Departments' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance' },
  { value: 'IT Security', label: 'IT Security' },
];

export const SelectParticipantsStep: React.FC<SelectParticipantsStepProps> = ({
  selectedUserIds,
  onSelectionChange
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const result = await userService.getAll({
          search: searchQuery || undefined,
          department: departmentFilter,
          page: currentPage,
          limit: itemsPerPage,
        });
        setUsers(result.users);
        setTotalPages(result.totalPages);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery, departmentFilter, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, departmentFilter]);

  const handleSelectAll = () => {
    if (selectedUserIds.length === users.length && users.length > 0) {
      onSelectionChange([]);
    } else {
      
      const currentPageIds = users.map(u => u.id);
      const existingOtherPageIds = selectedUserIds.filter(id => !currentPageIds.includes(id));
      onSelectionChange([...existingOtherPageIds, ...currentPageIds]);
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUserIds.includes(userId)) {
      onSelectionChange(selectedUserIds.filter(id => id !== userId));
    } else {
      onSelectionChange([...selectedUserIds, userId]);
    }
  };

  const handleImportCSV = () => {
    console.log('Import CSV');
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Participants</h2>
        <p className="text-gray-600">Choose which users will receive this campaign</p>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or email..."
          />
        </div>
        <div className="w-64">
          <Select
            value={departmentFilter}
            onChange={setDepartmentFilter}
            options={DEPARTMENT_OPTIONS}
          />
        </div>
        <Button onClick={handleImportCSV} variant="outline" className="gap-2">
          <Upload className="w-4 h-4" />
          Import CSV
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={users.length > 0 && users.every(u => selectedUserIds.includes(u.id))}
              onChange={handleSelectAll}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {selectedUserIds.length} selected
            </span>
          </div>
          {selectedUserIds.length > 0 && (
            <Button
              onClick={() => onSelectionChange([])}
              variant="ghost"
              size="sm"
            >
              Clear Selection
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div
                key={user.id}
                className={cn(
                  'p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer',
                  selectedUserIds.includes(user.id) && 'bg-blue-50'
                )}
                onClick={() => handleSelectUser(user.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="text-sm text-gray-600">{user.department}</div>
                <div className="text-sm text-gray-500">Last active: {user.lastTest}</div>
              </div>
            ))}

            {users.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No users found matching your filters.
              </div>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
