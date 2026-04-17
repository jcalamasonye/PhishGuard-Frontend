'use client';

import React, { useState, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ClickRateTrend } from '@/components/admin/reports/ClickRateTrend';
import { MostClickedTemplates } from '@/components/admin/reports/MostClickedTemplates';
import { DepartmentClickRate } from '@/components/admin/reports/DepartmentClickRate';
import { TopBottomPerformersCards } from '@/components/admin/reports/TopBottomPerformersCards';
import { RiskAssessmentCards } from '@/components/admin/reports/RiskAssessmentCards';
import { QuizPerformanceCharts } from '@/components/admin/reports/QuizPerformanceCharts';
import { useAuth } from '@/context/AuthContext';
import { analyticsService } from '@/services/analyticsService';
import type { OverviewData, RiskAssessment } from '@/services/analyticsService';

export default function ReportsAnalyticsPage() {
  const { user } = useAuth();
  const [dateRange] = useState('Last 6 months');
  const [loading, setLoading] = useState(true);

  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [clickRateTrend, setClickRateTrend] = useState<{ month: string; clickRate: number; campaigns: number }[]>([]);
  const [departmentData, setDepartmentData] = useState<{ department: string; clickRate: number }[]>([]);
  const [riskData, setRiskData] = useState<RiskAssessment | null>(null);
  const [mostClickedTemplates, setMostClickedTemplates] = useState<{ name: string; clicks: number; sent: number }[]>([]);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const [overviewRes, trendRes, deptRes, riskRes, templatePerfRes] = await Promise.all([
          analyticsService.getOverview(),
          analyticsService.getClickRateTrend(180),
          analyticsService.getDepartmentStats(),
          analyticsService.getRiskAssessment(),
          analyticsService.getTemplatePerformance(),
        ]);

        setOverview(overviewRes);

        setClickRateTrend(
          trendRes.map((point) => ({
            month: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            clickRate: Math.round(point.clickRate * 10) / 10,
            campaigns: 1,
          }))
        );

        setDepartmentData(
          deptRes.map((d) => ({
            department: d.name,
            clickRate: Math.round(d.clickRate * 10) / 10,
          }))
        );

        setRiskData(riskRes);

        setMostClickedTemplates(
          templatePerfRes.map((t) => ({
            name: t.name,
            clicks: Math.round((t.clickRate / 100) * t.totalSent),
            sent: t.totalSent,
          }))
        );
      } catch (err) {
        console.error('Failed to fetch report data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const topPerformers = riskData
    ? riskData.users
        .filter((u) => u.riskLevel === 'LOW')
        .sort((a, b) => a.clickRate - b.clickRate)
        .slice(0, 3)
        .map((u) => ({
          name: u.name,
          department: u.department || 'Unassigned',
          clickRate: Math.round(u.clickRate * 10) / 10,
        }))
    : [];

  const bottomPerformers = riskData
    ? riskData.users
        .sort((a, b) => b.clickRate - a.clickRate)
        .slice(0, 3)
        .map((u) => ({
          name: u.name,
          department: u.department || 'Unassigned',
          clickRate: Math.round(u.clickRate * 10) / 10,
        }))
    : [];

  const mapRiskUsers = (level: 'HIGH' | 'MEDIUM' | 'LOW') =>
    riskData
      ? riskData.users
          .filter((u) => u.riskLevel === level)
          .map((u) => ({
            name: u.name,
            department: u.department || 'Unassigned',
            clickRate: Math.round(u.clickRate * 10) / 10,
            campaigns: 0,
          }))
      : [];

  const handleExport = () => {
    console.log('Export report');
  };

  const handleScheduleTraining = (level: string) => {
    console.log('Schedule training for', level, 'risk users');
  };

  const handleSendResources = (level: string) => {
    console.log('Send resources to', level, 'risk users');
  };

  const handleViewAll = (level: string) => {
    console.log('View all', level, 'risk users');
  };

  const handleCreateTraining = () => {
    console.log('Create targeted training');
  };

  if (loading) {
    return (
      <>
        <Header userName={user?.name || 'Admin'} userRole="admin" notificationCount={0} />
        <AdminSidebar />
        <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        </main>
      </>
    );
  }

  // Quiz performance data - needs a dedicated quiz analytics endpoint
  const quizTrendData: { month: string; avgScore: number; participants: number }[] = [];
  const missedQuestions: { topic: string; missed: number; total: number; percentage: number }[] = [];

  return (
    <>
      <Header
        userName={user?.name || 'Admin'}
        userRole="admin"
        notificationCount={0}
      />

      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600">Comprehensive security awareness insights</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <ChevronDown className="w-4 h-4" />
                {dateRange}
              </Button>
              <Button variant="primary" onClick={handleExport} className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
              <h3 className="text-3xl font-bold text-gray-900">{overview?.totalCampaigns || 0}</h3>
            </Card>
            <Card>
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-900">{overview?.totalUsers || 0}</h3>
            </Card>
            <Card>
              <p className="text-sm text-gray-600 mb-1">Avg Click Rate</p>
              <h3 className="text-3xl font-bold text-gray-900">{overview ? `${overview.overallClickRate.toFixed(1)}%` : '0%'}</h3>
            </Card>
            <Card>
              <p className="text-sm text-gray-600 mb-1">Avg Quiz Score</p>
              <h3 className="text-3xl font-bold text-gray-900">{overview ? `${overview.averageQuizScore.toFixed(1)}%` : '0%'}</h3>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ClickRateTrend data={clickRateTrend} />
          <MostClickedTemplates data={mostClickedTemplates} />
        </div>

        <div className="mb-6">
          <DepartmentClickRate data={departmentData} />
        </div>

        <div className="mb-6">
          <TopBottomPerformersCards
            topPerformers={topPerformers}
            bottomPerformers={bottomPerformers}
          />
        </div>

        <div className="mb-6">
          <RiskAssessmentCards
            highRiskUsers={mapRiskUsers('HIGH')}
            mediumRiskUsers={mapRiskUsers('MEDIUM')}
            lowRiskUsers={mapRiskUsers('LOW')}
            onScheduleTraining={handleScheduleTraining}
            onSendResources={handleSendResources}
            onViewAll={handleViewAll}
          />
        </div>

        <div>
          <QuizPerformanceCharts
            trendData={quizTrendData}
            missedQuestions={missedQuestions}
            onCreateTraining={handleCreateTraining}
          />
        </div>
      </main>
    </>
  );
}