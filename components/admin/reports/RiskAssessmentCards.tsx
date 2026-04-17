import React from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AlertTriangle, Lightbulb, Shield, Target, Send } from 'lucide-react';

interface RiskUser {
  name: string;
  department: string;
  clickRate: number;
  campaigns: number;
}

interface RiskAssessmentCardsProps {
  highRiskUsers: RiskUser[];
  mediumRiskUsers: RiskUser[];
  lowRiskUsers: RiskUser[];
  onScheduleTraining: (level: string) => void;
  onSendResources: (level: string) => void;
  onViewAll: (level: string) => void;
}

export const RiskAssessmentCards: React.FC<RiskAssessmentCardsProps> = ({
  highRiskUsers,
  mediumRiskUsers,
  lowRiskUsers,
  onScheduleTraining,
  onSendResources,
  onViewAll
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* High-Risk Users */}
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-red-900">High-Risk Users</h4>
          </div>
          <p className="text-xs text-red-700 mb-4">Click rate &gt; 70%</p>

          <div className="mb-4">
            <div className="text-4xl font-bold text-red-600 mb-1">
              {highRiskUsers.length}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {highRiskUsers.slice(0, 3).map((user, index) => (
              <div key={index} className="bg-white rounded p-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600">{user.department}</p>
                    <p className="text-xs text-gray-500">{user.campaigns} campaigns</p>
                  </div>
                  <span className="text-sm font-bold text-red-600 ml-2">
                    {user.clickRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => onScheduleTraining('high')}
            variant="outline" 
            className="w-full mb-2 bg-white text-red-600 border-red-300 hover:bg-red-50"
            size="sm"
          >
            <Target className="w-4 h-4 mr-2" />
            Schedule Training
          </Button>
        </Card>

        {/* Medium-Risk Users */}
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h4 className="font-semibold text-yellow-900">Medium-Risk Users</h4>
          </div>
          <p className="text-xs text-yellow-700 mb-4">Click rate 30-70%</p>

          <div className="mb-4">
            <div className="text-4xl font-bold text-yellow-600 mb-1">
              {mediumRiskUsers.length}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {mediumRiskUsers.slice(0, 3).map((user, index) => (
              <div key={index} className="bg-white rounded p-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600">{user.department}</p>
                    <p className="text-xs text-gray-500">{user.campaigns} campaigns</p>
                  </div>
                  <span className="text-sm font-bold text-yellow-600 ml-2">
                    {user.clickRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => onSendResources('medium')}
            variant="outline" 
            className="w-full mb-2 bg-white text-yellow-600 border-yellow-300 hover:bg-yellow-50"
            size="sm"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Resources
          </Button>
        </Card>

        {/* Low-Risk Users */}
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-900">Low-Risk Users</h4>
          </div>
          <p className="text-xs text-green-700 mb-4">Click rate &lt; 30%</p>

          <div className="mb-4">
            <div className="text-4xl font-bold text-green-600 mb-1">
              {lowRiskUsers.length}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {lowRiskUsers.slice(0, 3).map((user, index) => (
              <div key={index} className="bg-white rounded p-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600">{user.department}</p>
                    <p className="text-xs text-gray-500">{user.campaigns} campaigns</p>
                  </div>
                  <span className="text-sm font-bold text-green-600 ml-2">
                    {user.clickRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => onViewAll('low')}
            variant="outline" 
            className="w-full mb-2 bg-white text-green-600 border-green-300 hover:bg-green-50"
            size="sm"
          >
            View All
          </Button>
        </Card>
      </div>
    </div>
  );
};