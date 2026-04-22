'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { SearchBar } from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CampaignStats, UserPerformanceTable, CampaignStatusBanner } from '@/components/admin/campaigns/details';
import { useSearch } from '@/hooks/useSearch';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useAuth } from '@/context/AuthContext';
import { campaignService } from '@/services/campaignService';

interface CampaignDetail {
  id: string;
  name: string;
  sentAt: string;
  status: string;
  totalSent: number;
  emailsOpened: number;
  openRate: number;
  averageQuizScore: number;
  quizCompletionRate: number;
  clicksVsPrevious: number;
}

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

export default function CampaignDetailsPage() {
  const params = useParams();
  const { user: authUser } = useAuth();
  const campaignId = params.id as string;

  const [campaign, setCampaign] = useState<CampaignDetail | null>(null);
  const [users, setUsers] = useState<UserPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      setLoading(true);
      try {
        const data = await campaignService.getResults(campaignId);
        const participants = (data.participants as Array<Record<string, unknown>>) || [];
        const totalSent = participants.length;
        const emailsOpened = participants.filter((p) => p.isEmailOpened).length;
        const quizCompleted = participants.filter((p) => p.isQuizCompleted).length;
        const openRate = totalSent > 0 ? (emailsOpened / totalSent) * 100 : 0;
        const quizCompletionRate = totalSent > 0 ? (quizCompleted / totalSent) * 100 : 0;

        const quizScores = participants
          .filter((p) => p.quizScore != null)
          .map((p) => p.quizScore as number);
        const averageQuizScore = quizScores.length > 0
          ? quizScores.reduce((sum, s) => sum + s, 0) / quizScores.length
          : 0;

        const launchedAt = data.launchedAt as string;
        const sentAt = launchedAt
          ? new Date(launchedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })
          : 'Not sent yet';

        setCampaign({
          id: data.id as string,
          name: data.name as string,
          sentAt,
          status: ((data.status as string) || 'draft').toLowerCase(),
          totalSent,
          emailsOpened,
          openRate: Math.round(openRate * 10) / 10,
          averageQuizScore: Math.round(averageQuizScore * 10) / 10,
          quizCompletionRate: Math.round(quizCompletionRate * 10) / 10,
          clicksVsPrevious: 0,
        });

        setUsers(
          participants.map((p) => {
            const userData = p.user as Record<string, unknown>;
            const clickedAt = p.linkClickedAt as string | null;

            let timeToClick: string | undefined;
            if (p.timeToClick) {
              const seconds = p.timeToClick as number;
              const minutes = Math.floor(seconds / 60);
              const secs = seconds % 60;
              timeToClick = minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
            }

            return {
              id: p.id as string,
              name: userData?.name as string || 'Unknown',
              email: userData?.email as string || '',
              emailOpened: (p.isEmailOpened as boolean) || false,
              linkClicked: (p.isLinkClicked as boolean) || false,
              clickedAt: clickedAt
                ? new Date(clickedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })
                : undefined,
              quizScore: p.quizScore != null ? `${p.quizScore}%` : undefined,
              timeToClick,
            };
          })
        );
      } catch (err) {
        console.error('Failed to fetch campaign details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetail();
  }, [campaignId]);

  const { searchQuery, setSearchQuery, filteredItems } = useSearch({
    items: users,
    searchFields: ['name', 'email'],
  });

  if (loading || !campaign) {
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

  const handleExportResults = () => {
    console.log('Export results for campaign:', campaign.id);
  };

  const handleViewDetails = (userId: string) => {
    
    
    const participant = users.find((u) => u.id === userId);
    if (participant) {
      console.log('View details for user:', participant.name);
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

      <main className="ml-64 mt-[73px] p-6 min-h-screen">
        <ErrorBoundary>
          <Link href="/admin/campaigns" className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Link>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{campaign.name}</h1>
              <p className="text-gray-600">Sent on {campaign.sentAt}</p>
            </div>

            <Button onClick={handleExportResults} variant="primary" className="gap-2">
              <Download className="w-4 h-4" />
              Export Results
            </Button>
          </div>

          <CampaignStatusBanner
            status={campaign.status}
            clicksVsPrevious={campaign.clicksVsPrevious}
          />

          <CampaignStats
            totalSent={campaign.totalSent}
            emailsOpened={campaign.emailsOpened}
            openRate={campaign.openRate}
            averageQuizScore={campaign.averageQuizScore}
            quizCompletionRate={campaign.quizCompletionRate}
          />

          <Card>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Individual Results</h2>
                <div className="w-80">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search users..."
                  />
                </div>
              </div>

              <UserPerformanceTable
                users={filteredItems}
                onViewDetails={handleViewDetails}
              />
            </div>
          </Card>
        </ErrorBoundary>
      </main>
    </>
  );
}
