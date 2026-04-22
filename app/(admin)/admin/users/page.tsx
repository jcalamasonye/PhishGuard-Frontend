'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { UserFilters } from '@/components/admin/users/UserFilters';
import { UserTable } from '@/components/admin/users/UserTable';
import { UserStatsCards } from '@/components/admin/users/UserStatsCards';
import { BulkActions } from '@/components/admin/users/BulkActions';
import { AddUserModal } from '@/components/admin/users/AddUserModal';
import { SuccessModal } from '@/components/modals/SuccessModal';
import { Pagination } from '@/components/ui/Pagination';
import { UserFilters as UserFiltersType, AddUserFormData } from '@/types/user';
import { User } from '@/types/user';
import { userService } from '@/services/userService';
import { analyticsService, type RiskAssessment } from '@/services/analyticsService';
import { useAuth } from '@/context/AuthContext';

export default function UserManagementPage() {
  const { user: authUser } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [riskData, setRiskData] = useState<RiskAssessment | null>(null);

  const [filters, setFilters] = useState<UserFiltersType>({
    searchQuery: '',
    department: 'All Departments',
    performanceLevel: 'All Levels'
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const itemsPerPage = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await userService.getAll({
        search: filters.searchQuery || undefined,
        department: filters.department,
        page: currentPage,
        limit: itemsPerPage,
      });
      setUsers(result.users);
      setTotalPages(result.totalPages);
      setTotalUsers(result.total);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, [filters.searchQuery, filters.department, currentPage]);

  const fetchRiskData = useCallback(async () => {
    try {
      const data = await analyticsService.getRiskAssessment();
      setRiskData(data);
    } catch (err) {
      console.error('Failed to fetch risk data:', err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchRiskData();
  }, [fetchRiskData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchQuery, filters.department]);

  const averageClickRate = riskData
    ? Math.round(riskData.users.reduce((sum, u) => sum + u.clickRate, 0) / (riskData.users.length || 1))
    : 0;

  const averageQuizScore = riskData
    ? Math.round(riskData.users.reduce((sum, u) => sum + u.averageQuizScore, 0) / (riskData.users.length || 1))
    : 0;

  const handleAddUser = async (data: AddUserFormData) => {
    try {
      await userService.create(data);
      setShowAddUserModal(false);
      setSuccessMessage('User added successfully!');
      setShowSuccessModal(true);
      fetchUsers();
      fetchRiskData();
    } catch (err) {
      console.error('Failed to add user:', err);
    }
  };

  const handleImportCSV = async (file: File) => {
    try {
      const text = await file.text();
      const lines = text.split('\n').filter((line) => line.trim().length > 0);

      
      const startIndex = lines[0]?.toLowerCase().includes('name') ? 1 : 0;

      const users = lines.slice(startIndex).map((line) => {
        const parts = line.split(',').map((p) => p.trim().replace(/^"|"$/g, ''));
        return {
          name: parts[0] || '',
          email: parts[1] || '',
          department: parts[2] || undefined,
        };
      }).filter((u) => u.name && u.email);

      if (users.length === 0) {
        setSuccessMessage('No valid users found in CSV. Expected format: name,email,department');
        setShowSuccessModal(true);
        return;
      }

      const result = await userService.bulkCreate(users);
      setShowAddUserModal(false);
      setSuccessMessage(`${result.count} users imported successfully!`);
      setShowSuccessModal(true);
      fetchUsers();
      fetchRiskData();
    } catch (err) {
      console.error('Failed to import CSV:', err);
      setSuccessMessage('Failed to import CSV. Please check the file format.');
      setShowSuccessModal(true);
    }
  };

  const handleBulkSendData = () => {
    setSuccessMessage(`Training materials sent to ${selectedIds.length} users!`);
    setShowSuccessModal(true);
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedIds.map((id) => userService.delete(id)));
      setSelectedIds([]);
      setSuccessMessage(`${selectedIds.length} users deleted successfully!`);
      setShowSuccessModal(true);
      fetchUsers();
      fetchRiskData();
    } catch (err) {
      console.error('Failed to bulk delete:', err);
    }
  };

  const handleBulkExport = () => {
    setSuccessMessage('User data exported successfully!');
    setShowSuccessModal(true);
  };

  return (
    <>
      <Header
        userName={authUser?.name || ''}
        userRole="admin"
        notificationCount={0}
      />

      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-8 min-h-screen bg-gray-50">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Monitor and manage user security awareness</p>
        </div>

        <div className="mb-8">
          <UserStatsCards
            totalUsers={totalUsers}
            highRiskUsers={riskData?.summary.highRisk || 0}
            averageClickRate={averageClickRate}
            averageQuizScore={averageQuizScore}
          />
        </div>

        <div className="mb-8">
          <UserFilters
            filters={filters}
            onFiltersChange={setFilters}
            onAddUser={() => setShowAddUserModal(true)}
            onImportCSV={() => setShowAddUserModal(true)}
          />
        </div>

        {selectedIds.length > 0 && (
          <div className="mb-6">
            <BulkActions
              selectedCount={selectedIds.length}
              onSendData={handleBulkSendData}
              onDelete={handleBulkDelete}
              onExport={handleBulkExport}
            />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : (
          <UserTable
            users={users}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            showSelection={true}
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

      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onAddUser={handleAddUser}
        onImportCSV={handleImportCSV}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />
    </>
  );
}
