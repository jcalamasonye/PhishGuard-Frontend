'use client';

import React from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Filter, Upload, UserPlus } from 'lucide-react';
import { UserFilters as UserFiltersType } from '@/types/user';

interface UserFiltersProps {
  filters: UserFiltersType;
  onFiltersChange: (filters: UserFiltersType) => void;
  onAddUser: () => void;
  onImportCSV: () => void;
}

const departmentOptions = [
  { value: 'all', label: 'All Departments' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'HR' },
  { value: 'finance', label: 'Finance' }
];

const performanceOptions = [
  { value: 'all', label: 'All Performance Levels' },
  { value: 'high', label: 'High Performers' },
  { value: 'medium', label: 'Medium Performers' },
  { value: 'low', label: 'Low Performers' }
];

export const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onFiltersChange,
  onAddUser,
  onImportCSV
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <SearchBar
          placeholder="Search by name or email"
          value={filters.searchQuery}
          onChange={(value) => onFiltersChange({ ...filters, searchQuery: value })}
          className="flex-1 max-w-md"
        />
        
        <Button variant="outline" size="sm" className="gap-2 px-4">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-56">
          <Select
            options={departmentOptions}
            value={filters.department}
            onChange={(value) => onFiltersChange({ ...filters, department: value })}
            placeholder="Department"
          />
        </div>

        <div className="w-56">
          <Select
            options={performanceOptions}
            value={filters.performanceLevel}
            onChange={(value) => onFiltersChange({ ...filters, performanceLevel: value })}
            placeholder="Performance level"
          />
        </div>

        <div className="ml-auto flex gap-3">
          <Button onClick={onImportCSV} variant="primary" className="gap-2">
            <Upload className="w-4 h-4" />
            Import CSV
          </Button>

          <Button onClick={onAddUser} variant="primary" className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Users
          </Button>
        </div>
      </div>
    </div>
  );
};