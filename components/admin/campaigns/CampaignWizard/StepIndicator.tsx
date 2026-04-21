import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CampaignWizardStep } from '@/types/campaign';

interface StepIndicatorProps {
  steps: CampaignWizardStep[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-12">
      {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.isComplete;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              {/* */}
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors mb-2',
                  isCompleted
                    ? 'bg-blue-600 text-white'
                    : isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                )}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              {/* */}
              <div className="text-center">
                <p
                  className={cn(
                    'text-sm font-medium',
                    isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{step.subtitle}</p>
              </div>
            </div>

            {/* */}
            {!isLast && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-4 mt-[-40px]',
                  isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};