import React from 'react';
import { Card } from '@/components/ui/Card';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { RiskAssessment as RiskAssessmentType } from '@/types/analytics';

interface RiskAssessmentProps {
  risks: RiskAssessmentType[];
}

const riskConfig = {
  critical: {
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200'
  },
  high: {
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-200'
  },
  medium: {
    icon: Info,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-200'
  },
  low: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200'
  }
};

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({ risks }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
      <p className="text-sm text-gray-600 mb-6">Current security awareness risk levels</p>

      <div className="space-y-4">
        {risks.map((risk) => {
          const config = riskConfig[risk.level];
          const Icon = config.icon;

          return (
            <div
              key={risk.level}
              className={`border rounded-lg p-4 ${config.borderColor} ${config.bgColor}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <span className={`font-semibold capitalize ${config.color}`}>
                    {risk.level} Risk
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${config.color}`}>
                    {risk.count}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">
                    ({risk.percentage}%)
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{risk.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};