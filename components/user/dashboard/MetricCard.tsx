'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { MetricCardData } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { METRIC_ICONS } from '@/lib/constants/icons';

interface MetricCardProps {
  data: MetricCardData;
}

export const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const router = useRouter();
  const Icon = METRIC_ICONS[data.icon];

  const handleClick = () => {
    if (data.icon === 'quiz') {
      router.push('/quiz/sample-quiz-1');
    }
  };

  return (
    <Card 
      className={cn(
        'relative overflow-hidden',
        data.icon === 'quiz' && 'cursor-pointer hover:shadow-md transition-shadow'
      )}
      onClick={data.icon === 'quiz' ? handleClick : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{data.label}</p>
          <h3 className="text-3xl font-bold text-gray-900">{data.value}</h3>
          
          <div className="mt-2">
            {data.trend ? (
              <div className={cn(
                'flex items-center gap-1.5 text-sm font-medium',
                data.trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {data.trend.isPositive ? (
                  <TrendingUp className="w-4 h-4 shrink-0" />
                ) : (
                  <TrendingDown className="w-4 h-4 shrink-0" />
                )}
                <span className="whitespace-nowrap">{Math.abs(data.trend.value)}%</span>
                {data.trend.label && (
                  <span className="text-xs">{data.trend.label}</span>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-500">Last 6 months</p>
            )}
          </div>
        </div>

        <div 
          className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center shrink-0',
            data.bgColor
          )}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </Card>
  );
};