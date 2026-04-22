'use client';

import React from 'react';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { UserSidebar } from '@/components/user/SideBar';
import Button from '@/components/ui/Button';
import { FeaturedResourceCard } from '@/components/user/resources/FeaturedResources';
import { CategoryCard } from '@/components/user/resources/CategorySection';
import { DownloadableResourceCard } from '@/components/user/resources/DownloadableGuides';
import { VideoCard } from '@/components/user/resources/VideoTutorials';
import { useAuth } from '@/context/AuthContext';
import {
  MOCK_FEATURED_RESOURCES,
  MOCK_TRAINING_CATEGORIES,
  MOCK_DOWNLOADABLE_RESOURCES,
  MOCK_VIDEO_TUTORIALS
} from '@/lib/mock-data';

const TrainingResourcesPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Header
        userName={user?.name || ''}
        userRole="user"
        notificationCount={0}
      />

      <UserSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Training Resources</h1>
          <p className="text-gray-600">Access a rich library of resources</p>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Featured Resources</h2>
            <p className="text-sm text-gray-600">A list of resources to help you understand phishing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {MOCK_FEATURED_RESOURCES.map(resource => (
              <FeaturedResourceCard
                key={resource.id}
                {...resource}
                onClick={() => console.log('View resource:', resource.id)}
              />
            ))}
          </div>

          <Button variant="primary" className="gap-2">
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Categories</h2>
            <p className="text-sm text-gray-600">Browse resources by category</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {MOCK_TRAINING_CATEGORIES.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>

          <Button variant="primary" className="gap-2">
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Downloadable Guides</h2>
            <p className="text-sm text-gray-600">A list of resources to help you understand phishing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {MOCK_DOWNLOADABLE_RESOURCES.map((resource, index) => (
              <DownloadableResourceCard key={index} {...resource} />
            ))}
          </div>

          <Button variant="primary" className="gap-2">
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Video Tutorials</h2>
            <p className="text-sm text-gray-600">A curated list of videos to enhance your learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {MOCK_VIDEO_TUTORIALS.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>

          <Button variant="primary" className="gap-2">
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Suspect a Real Phishing Email?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Do not wait, report suspicious emails immediately to help protect yourself and your team.
              </p>
              <Button variant="primary" className="gap-2">
                <AlertCircle className="w-4 h-4" />
                Report to IT
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TrainingResourcesPage;
