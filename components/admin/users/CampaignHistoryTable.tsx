import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UserCampaignHistory } from '@/types/user';

interface CampaignHistoryTableProps {
  campaigns: UserCampaignHistory[];
}

export const CampaignHistoryTable: React.FC<CampaignHistoryTableProps> = ({ campaigns }) => {
  return (
    <Card padding="none">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Campaign History</h3>
        <p className="text-sm text-gray-600">
          Detailed results for all campaigns this user has received
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Sent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Opened
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link Clicked
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quiz Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time to Click
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{campaign.campaignName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{campaign.dateSent}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.emailOpened ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Opened</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm">Not opened</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.linkClicked ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Clicked</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Did not Click</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{campaign.quizScore}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{campaign.timeToClick || '—'}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};