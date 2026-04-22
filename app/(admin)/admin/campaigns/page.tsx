'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { CampaignFilters } from '@/components/admin/campaigns/CampaignFilters';
import { CampaignTable } from '@/components/admin/campaigns/CampaignTable';
import { BulkActions } from '@/components/admin/campaigns/BulkActions';
import { Pagination } from '@/components/ui/Pagination';
import { CampaignFilters as CampaignFiltersType } from '@/types/campaign';
import { Campaign } from '@/types/campaign';
import { campaignService } from '@/services/campaignService';
import { useAuth } from '@/context/AuthContext';

export default function CampaignsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<CampaignFiltersType>({
    status: 'all',
    dateFrom: '',
    dateTo: '',
    searchQuery: ''
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const result = await campaignService.getAll({
        status: filters.status,
        search: filters.searchQuery || undefined,
        page: currentPage,
        limit: itemsPerPage,
      });
      setCampaigns(result.campaigns);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.searchQuery, currentPage]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.status, filters.searchQuery]);

  const handleView = (id: string) => {
    router.push(`/admin/campaigns/${id}`);
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate campaign:', id);
  };

  const handleDelete = async (id: string) => {
    try {
      await campaignService.delete(id);
      fetchCampaigns();
    } catch (err) {
      console.error('Failed to delete campaign:', err);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedIds.map((id) => campaignService.delete(id)));
      setSelectedIds([]);
      fetchCampaigns();
    } catch (err) {
      console.error('Failed to bulk delete:', err);
    }
  };

  const handleBulkExport = () => {
    console.log('Bulk export:', selectedIds);
  };

  return (
    <>
      <Header
        userName={user?.name || ''}
        userRole="admin"
        notificationCount={0}
      />

      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <div className="mb-6">
          <CampaignFilters
            filters={filters}
            onFiltersChange={setFilters}
            onCreateCampaign={() => router.push('/admin/campaigns/create')}
          />
        </div>

        {selectedIds.length > 0 && (
          <BulkActions
            selectedCount={selectedIds.length}
            onDelete={handleBulkDelete}
            onExport={handleBulkExport}
          />
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : (
          <CampaignTable
            campaigns={campaigns}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onView={handleView}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>
    </>
  );
}
