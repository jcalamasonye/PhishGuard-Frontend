'use client';

import React from 'react';
import { Select } from '@/components/ui/Select';
import { SearchBar } from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import { Calendar, Filter } from 'lucide-react';
import { CampaignFilters as CampaignFiltersType } from '@/types/campaign';

interface CampaignFiltersProps {
  filters: CampaignFiltersType;
  onFiltersChange: (filters: CampaignFiltersType) => void;
  onCreateCampaign: () => void;
}

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' }
];

export const CampaignFilters: React.FC<CampaignFiltersProps> = ({
  filters,
  onFiltersChange,
  onCreateCampaign
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <SearchBar
          placeholder="Search campaigns"
          value={filters.searchQuery}
          onChange={(value) => onFiltersChange({ ...filters, searchQuery: value })}
          className="flex-1 max-w-md"
        />
        
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-48">
          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(value) => onFiltersChange({ ...filters, status: value as CampaignFiltersType['status'] })}
            placeholder="Status"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Date From</span>
          <div className="relative">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
              className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Date To</span>
          <div className="relative">
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
              className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <Button onClick={onCreateCampaign} variant="primary" className="ml-auto gap-2">
          <span className="text-lg">+</span>
          Create New Campaign
        </Button>
      </div>
    </div>
  );
};