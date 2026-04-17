import React from 'react';
import { Achievement } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { ACHIEVEMENT_ICONS } from '@/lib/constants/icons';

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const Icon = ACHIEVEMENT_ICONS[achievement.icon];

  return (
    <div 
      className={cn(
        'border-2 rounded-lg p-4 transition-all',
        achievement.unlocked 
          ? `${achievement.bgColor} ${achievement.color} border-current` 
          : 'bg-gray-50 border-gray-200 text-gray-400'
      )}
    >
      <div className="flex items-center gap-3">
        <div 
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center',
            achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{achievement.title}</h4>
          <p className="text-xs opacity-80 truncate">{achievement.description}</p>
        </div>
      </div>

      {achievement.progress !== undefined && achievement.total !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium">
              {achievement.progress}/{achievement.total} emails reported
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={cn(
                'h-full transition-all duration-300',
                achievement.unlocked ? 'bg-blue-600' : 'bg-gray-400'
              )}
              style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};