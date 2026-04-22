'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { SearchBar } from '@/components/ui/SearchBar';
import { AdminMetricCard } from '@/components/admin/dashboard/AdminMetricCard';
import { ClickRatesChart } from '@/components/admin/dashboard/ClickRateChart';
import { TemplatePerformanceChart } from '@/components/admin/dashboard/TemplatePerformanceChart';
import { RecentCampaignsTable } from '@/components/admin/dashboard/RecentCampaignsTable';
import { QuickActions } from '@/components/admin/dashboard/QuickActions';
import { COLORS } from '@/lib/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { analyticsService } from '@/services/analyticsService';
import { campaignService } from '@/services/campaignService';
import type { MetricCardData, ChartDataPoint, CampaignTableRow } from '@/types/dashboard';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const [metrics, setMetrics] = useState<MetricCardData[]>([]);
  const [clickRateData, setClickRateData] = useState<ChartDataPoint[]>([]);
  const [templatePerformance, setTemplatePerformance] = useState<ChartDataPoint[]>([]);
  const [recentCampaigns, setRecentCampaigns] = useState<CampaignTableRow[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [overview, trend, campaignsResult, templatePerfResult] = await Promise.all([
          analyticsService.getOverview(),
          analyticsService.getClickRateTrend(90),
          campaignService.getAll({ limit: 5 }),
          analyticsService.getTemplatePerformance(),
        ]);

        
        setMetrics([
          {
            id: '1',
            label: 'Total Campaigns Sent',
            value: String(overview.totalCampaigns),
            icon: 'campaign',
            bgColor: COLORS.metrics.campaign,
          },
          {
            id: '2',
            label: 'Total Users Enrolled',
            value: String(overview.totalUsers),
            icon: 'users',
            bgColor: COLORS.metrics.users,
          },
          {
            id: '3',
            label: 'Click Through Rate',
            value: `${overview.overallClickRate.toFixed(1)}%`,
            icon: 'click',
            bgColor: COLORS.metrics.click,
          },
          {
            id: '4',
            label: 'Average Quiz Score',
            value: overview.averageQuizScore.toFixed(1),
            icon: 'quiz',
            bgColor: COLORS.metrics.quiz,
          },
        ]);

        
        setClickRateData(
          trend.map((point) => ({
            name: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            clickRate: Math.round(point.clickRate * 10) / 10,
          }))
        );

        
        setTemplatePerformance(
          templatePerfResult.map((t) => ({
            name: t.name,
            clickRate: t.clickRate,
          }))
        );

        
        setRecentCampaigns(
          campaignsResult.campaigns.map((c) => ({
            id: c.id,
            name: c.name,
            dateSent: c.dateSent || c.createdAt,
            recipients: c.recipients,
            openRate: c.openRate,
            clickRate: c.clickRate,
            status: c.status,
          }))
        );
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewCampaign = (id: string) => {
    router.push(`/admin/campaigns/${id}`);
  };

  const handleDuplicateCampaign = (id: string) => {
    console.log('Duplicate campaign:', id);
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      await campaignService.delete(id);
      setRecentCampaigns((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Failed to delete campaign:', err);
    }
  };

  const handleCreateCampaign = () => {
    router.push('/admin/campaigns/create');
  };

  const handleAddUsers = () => {
    router.push('/admin/users');
  };

  const handleViewReports = () => {
    router.push('/admin/reports');
  };

  if (loading) {
    return (
      <>
        <Header userName={user?.name || ''} userRole="admin" notificationCount={0} />
        <AdminSidebar />
        <main className="ml-64 mt-[73px] p-8 min-h-screen bg-gray-50">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header
        userName={user?.name || ''}
        userRole="admin"
        notificationCount={0}
      />

      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-8 min-h-screen bg-gray-50">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-base">Monitor and manage your phishing awareness campaigns</p>
        </div>

        <div className="mb-8">
          <SearchBar
            placeholder="Search"
            value={searchQuery}
            onChange={setSearchQuery}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map(metric => (
            <AdminMetricCard key={metric.id} data={metric} />
          ))}
        </div>

        <div className="mb-8">
          <QuickActions
            onCreateCampaign={handleCreateCampaign}
            onAddUsers={handleAddUsers}
            onViewReports={handleViewReports}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ClickRatesChart data={clickRateData} />
          <TemplatePerformanceChart data={templatePerformance} />
        </div>

        <div>
          <RecentCampaignsTable
            campaigns={recentCampaigns}
            onView={handleViewCampaign}
            onDuplicate={handleDuplicateCampaign}
            onDelete={handleDeleteCampaign}
          />
        </div>
      </main>
    </>
  );
}