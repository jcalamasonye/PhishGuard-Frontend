import React from 'react';
import { TrendingUp, TrendingDown, Users, Mail, MousePointerClick, Trophy, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { MetricCardData } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface AdminMetricCardProps {
  data: MetricCardData;
}

const iconMap = {
  campaign: Mail,
  click: MousePointerClick,
  quiz: Trophy,
  improvement: Target,
  users: Users
};

export const AdminMetricCard: React.FC<AdminMetricCardProps> = ({ data }) => {
  const Icon = iconMap[data.icon];

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{data.label}</p>
          <h3 className="text-3xl font-bold text-gray-900">{data.value}</h3>
          
          {data.trend && (
            <div className={cn(
              'flex items-center gap-1.5 text-sm font-medium mt-2',
              data.trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              {data.trend.isPositive ? (
                <TrendingUp className="w-4 h-4 shrink-0" />
              ) : (
                <TrendingDown className="w-4 h-4 shrink-0" />
              )}
              <span>{Math.abs(data.trend.value)}%</span>
            </div>
          )}
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