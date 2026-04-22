'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/shared/Header';
import { UserSidebar } from '@/components/user/SideBar';
import { SearchBar } from '@/components/ui/SearchBar';
import { MetricCard } from '@/components/user/dashboard/MetricCard';
import { AchievementCard } from '@/components/user/dashboard/AchievementCard';
import { ProgressChart } from '@/components/user/dashboard/ProgressChart';
import { ActivityFeed } from '@/components/user/dashboard/ActivityFeed';
import { TrainingResources } from '@/components/user/dashboard/TrainingResources';
import { QuickTips } from '@/components/user/dashboard/QuickTips';
import { SupportCard } from '@/components/user/dashboard/SupportCard';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';
import { quizService } from '@/services/quizService';
import type { MetricCardData, Achievement, ChartDataPoint, ActivityItem, QuickTip } from '@/types/dashboard';

const STATIC_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Security Champion',
    description: '90% pass rate',
    icon: 'trophy',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    unlocked: false,
  },
  {
    id: '2',
    title: 'Quick Learner',
    description: 'Completed 5 quizzes',
    icon: 'star',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    unlocked: false,
  },
  {
    id: '3',
    title: 'Vigilant Eye',
    description: 'Zero clicks in 3 campaigns',
    icon: 'target',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    unlocked: false,
  },
];

const STATIC_QUICK_TIPS: QuickTip[] = [
  { id: '1', text: 'Always verify sender addresses', completed: false },
  { id: '2', text: 'Hover over links before clicking', completed: false },
  { id: '3', text: 'Be suspicious of urgent requests', completed: false },
  { id: '4', text: 'Report suspicious emails immediately', completed: false },
];

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [quickTips, setQuickTips] = useState<QuickTip[]>(STATIC_QUICK_TIPS);

  const [metrics, setMetrics] = useState<MetricCardData[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(STATIC_ACHIEVEMENTS);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [perfResult, attempts] = await Promise.all([
          userService.getPerformance(user.id),
          quizService.getMyAttempts(),
        ]);

        const { metrics: perf, campaigns } = perfResult;

        
        setMetrics([
          {
            id: '1',
            label: 'Campaigns Received',
            value: String(perf.campaignsReceived),
            icon: 'campaign',
            bgColor: 'bg-blue-300',
          },
          {
            id: '2',
            label: 'Your Click Rate',
            value: `${perf.clickRate.toFixed(1)}%`,
            icon: 'click',
            bgColor: 'bg-pink-300',
            trend: perf.clickRate > 0
              ? { value: perf.clickRate, isPositive: false, label: 'Lower is better' }
              : { value: 0, isPositive: true, label: 'No clicks yet' },
          },
          {
            id: '3',
            label: 'Average Quiz Score',
            value: perf.averageQuizScore.toFixed(1),
            icon: 'quiz',
            bgColor: 'bg-yellow-300',
            trend: perf.averageQuizScore >= 70
              ? { value: perf.averageQuizScore, isPositive: true, label: 'Keep it up' }
              : undefined,
          },
          {
            id: '4',
            label: 'Risk Level',
            value: perf.riskLevel.charAt(0).toUpperCase() + perf.riskLevel.slice(1),
            icon: 'improvement',
            bgColor: perf.riskLevel === 'low' ? 'bg-green-300' : perf.riskLevel === 'medium' ? 'bg-yellow-300' : 'bg-red-300',
          },
        ]);

        
        setChartData(
          campaigns.slice(0, 6).reverse().map((c, i) => ({
            name: `C${i + 1}`,
            quizScore: parseInt(c.quizScore) || 0,
            clickRate: c.linkClicked ? 100 : 0,
          }))
        );

        
        const activityItems: ActivityItem[] = [];

        attempts.slice(0, 3).forEach((attempt) => {
          activityItems.push({
            id: `quiz-${attempt.id}`,
            type: 'quiz',
            title: attempt.quiz?.title || 'Quiz',
            description: `Scored ${attempt.score}% - ${attempt.passed ? 'Passed' : 'Failed'}`,
            timestamp: attempt.completedAt || new Date().toISOString(),
            icon: 'quiz',
            iconBg: attempt.passed ? 'bg-green-300' : 'bg-red-300',
          });
        });

        campaigns.slice(0, 3).forEach((c) => {
          activityItems.push({
            id: `campaign-${c.id}`,
            type: 'email',
            title: c.campaignName,
            description: c.linkClicked ? 'Clicked phishing link' : 'Did not click',
            timestamp: c.dateSent || new Date().toISOString(),
            icon: 'email',
            iconBg: c.linkClicked ? 'bg-red-300' : 'bg-green-300',
          });
        });

        
        activityItems.sort((a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setActivities(activityItems.slice(0, 5));

        
        const updatedAchievements = [...STATIC_ACHIEVEMENTS];
        if (perf.averageQuizScore >= 90) updatedAchievements[0] = { ...updatedAchievements[0], unlocked: true };
        if (attempts.length >= 5) updatedAchievements[1] = { ...updatedAchievements[1], unlocked: true };

        const noClickCampaigns = campaigns.filter((c) => !c.linkClicked).length;
        if (noClickCampaigns >= 3) {
          updatedAchievements[2] = { ...updatedAchievements[2], unlocked: true };
        } else {
          updatedAchievements[2] = {
            ...updatedAchievements[2],
            unlocked: false,
            progress: noClickCampaigns,
            total: 3,
          };
        }
        setAchievements(updatedAchievements);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleTipToggle = (id: string) => {
    setQuickTips((tips) =>
      tips.map((tip) => (tip.id === id ? { ...tip, completed: !tip.completed } : tip))
    );
  };

  if (loading) {
    return (
      <>
        <Header userName={user?.name || ''} userRole="user" notificationCount={0} />
        <UserSidebar />
        <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
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
        userRole="user"
        notificationCount={0}
      />

      <UserSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hi, {user?.name?.split(' ')[0] || 'there'}</h1>
          <p className="text-gray-600">Here is your security awareness progress.</p>
        </div>

        <div className="mb-6">
          <SearchBar
            placeholder="Search"
            value={searchQuery}
            onChange={setSearchQuery}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} data={metric} />
          ))}
        </div>

        <div className="flex gap-6 mb-6">
          <div className="w-[30%]">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>

          <div className="flex-1">
            <ProgressChart data={chartData} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity Feed</h2>
            <ActivityFeed activities={activities} />
          </div>

          <div className="space-y-6">
            <TrainingResources />
            <QuickTips tips={quickTips} onToggle={handleTipToggle} />
            <SupportCard />
          </div>
        </div>
      </main>
    </>
  );
}
