import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface CampaignStatusBannerProps {
  status: string;
  clicksVsPrevious: number;
}

export const CampaignStatusBanner: React.FC<CampaignStatusBannerProps> = ({
  status,
  clicksVsPrevious
}) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Campaign Completed</h3>
            <p className="text-sm text-green-800 mt-1">
              All emails delivered successfully • Results are final
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-green-700 mb-1">vs. Previous</p>
          <p className={`text-lg font-semibold ${clicksVsPrevious < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {clicksVsPrevious > 0 ? '+' : ''}{clicksVsPrevious}%
          </p>
        </div>
      </div>
    </div>
  );
};