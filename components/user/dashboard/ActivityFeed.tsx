'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ActivityItem } from '@/types/dashboard';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { ACTIVITY_ICONS } from '@/lib/constants/icons';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const router = useRouter();

  const handleActivityClick = (activity: ActivityItem) => {
    if (activity.type === 'quiz') {
      router.push(`/quiz/results/${activity.id}`);
    } else if (activity.type === 'email') {
      router.push(`/training/campaign-${activity.id}`);
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = ACTIVITY_ICONS[activity.type];
        const isClickable = activity.type === 'quiz' || activity.type === 'email';
        
        return (
          <div 
            key={activity.id} 
            className={cn(
              'flex gap-3',
              isClickable && 'cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors'
            )}
            onClick={() => isClickable && handleActivityClick(activity)}
          >
            <div 
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                activity.iconBg
              )}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900">{activity.title}</h4>
              <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};