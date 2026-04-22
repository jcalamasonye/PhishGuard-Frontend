'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Mail, MousePointerClick, BarChart3, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { UserProfileHeader } from '@/components/admin/users/UserProfileHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { UserPerformanceCharts } from '@/components/admin/users/UserPerformanceChart';
import { CampaignHistoryTable } from '@/components/admin/users/CampaignHistoryTable';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';
import type { User, UserPerformanceMetrics, UserCampaignHistory } from '@/types/user';

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: authUser } = useAuth();
  const userId = params.id as string;

  const [userData, setUserData] = useState<User | null>(null);
  const [metrics, setMetrics] = useState<UserPerformanceMetrics | null>(null);
  const [campaigns, setCampaigns] = useState<UserCampaignHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const [userRes, perfRes] = await Promise.all([
          userService.getById(userId),
          userService.getPerformance(userId),
        ]);

        setUserData(userRes);
        setMetrics(perfRes.metrics);
        setCampaigns(perfRes.campaigns);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading || !userData || !metrics) {
    return (
      <>
        <Header userName={authUser?.name || ''} userRole="admin" notificationCount={0} />
        <AdminSidebar />
        <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        </main>
      </>
    );
  }

  const riskBadge = {
    low: { variant: 'success' as const, label: 'Low Risk' },
    medium: { variant: 'warning' as const, label: 'Medium Risk' },
    high: { variant: 'error' as const, label: 'High Risk' },
  }[metrics.riskLevel];

  
  const clickRateData = campaigns.map((c, i) => ({
    name: `C${i + 1}`,
    clickRate: c.linkClicked ? 100 : 0,
  }));

  const quizScoreData = campaigns.map((c, i) => ({
    name: `C${i + 1}`,
    quizScore: parseInt(c.quizScore) || 0,
  }));

  const handleSendTest = () => {
    console.log('Send test campaign to', userId);
  };

  const handleEdit = () => {
    console.log('Edit user', userId);
  };

  const handleDelete = async () => {
    try {
      await userService.delete(userId);
      router.push('/admin/users');
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <>
      <Header
        userName={authUser?.name || ''}
        userRole="admin"
        notificationCount={0}
      />

      <AdminSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <div className="mb-6">
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to User Management
          </Link>

          <UserProfileHeader
            name={userData.name}
            email={userData.email}
            department={userData.department}
            joinedDate={new Date(userData.joinedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
            lastActive={userData.lastActive}
            onSendTest={handleSendTest}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Campaigns Received</p>
                <h3 className="text-3xl font-bold text-gray-900">{metrics.campaignsReceived}</h3>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Click Rate</p>
                <h3 className="text-3xl font-bold text-gray-900">{metrics.clickRate.toFixed(1)}%</h3>
              </div>
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
                <MousePointerClick className="w-7 h-7 text-pink-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Quiz Score</p>
                <h3 className="text-3xl font-bold text-gray-900">{metrics.averageQuizScore.toFixed(1)}</h3>
              </div>
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                <div className="mt-2">
                  <Badge variant={riskBadge.variant} size="lg">
                    {riskBadge.label}
                  </Badge>
                </div>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-6">
          <UserPerformanceCharts
            clickRateData={clickRateData}
            quizScoreData={quizScoreData}
          />
        </div>

        <div>
          <CampaignHistoryTable campaigns={campaigns} />
        </div>
      </main>
    </>
  );
}
