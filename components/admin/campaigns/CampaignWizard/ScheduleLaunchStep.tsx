'use client';

import React, { useState } from 'react';
import { AlertTriangle, Info, CheckCircle2, Rocket } from 'lucide-react';
import { RadioGroup } from '@/components/ui/Radio';
import { Slider } from '@/components/ui/Slider';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ScheduleLaunchStepProps {
  campaignName: string;
  description?: string;
  templateName: string;
  recipientCount: number;
  onLaunch: (schedule: ScheduleData) => void;
}

interface ScheduleData {
  type: 'immediate' | 'scheduled' | 'randomized';
  date?: string;
  time?: string;
  spreadHours?: number;
}

export const ScheduleLaunchStep: React.FC<ScheduleLaunchStepProps> = ({
  campaignName,
  description,
  templateName,
  recipientCount,
  onLaunch
}) => {
  const [scheduleType, setScheduleType] = useState<'immediate' | 'scheduled' | 'randomized'>('immediate');
  const [scheduleDate, setScheduleDate] = useState('2025-06-22');
  const [scheduleTime, setScheduleTime] = useState('12:30');
  const [spreadHours, setSpreadHours] = useState(1);

  const scheduleOptions = [
    {
      value: 'immediate',
      label: 'Send Immediately',
      description: 'Campaign will be sent to all recipients right away'
    },
    {
      value: 'scheduled',
      label: 'Schedule for Later',
      description: 'Choose a specific date and time to send'
    },
    {
      value: 'randomized',
      label: 'Randomize Send Times',
      description: 'Spread emails over a time period for more realistic delivery'
    }
  ];

  const handleLaunch = () => {
    const scheduleData: ScheduleData = {
      type: scheduleType,
      ...(scheduleType === 'scheduled' && { date: scheduleDate, time: scheduleTime }),
      ...(scheduleType === 'randomized' && { spreadHours })
    };
    onLaunch(scheduleData);
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Schedule & Launch</h2>
        <p className="text-gray-600">Review your campaign and choose when to send</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div className="lg:col-span-2 space-y-6">
          {}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Campaign Name</p>
                <p className="font-medium text-gray-900">{campaignName}</p>
              </div>

              {description && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="text-gray-900">{description}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600 mb-1">Email Template</p>
                <p className="font-medium text-gray-900">{templateName}</p>
                <p className="text-sm text-gray-500">Library Template</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Recipients</p>
                <p className="font-medium text-gray-900">{recipientCount} User{recipientCount !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </Card>

          {}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sending Schedule</h3>
            
            <RadioGroup
              name="schedule"
              options={scheduleOptions}
              value={scheduleType}
              onChange={(value) => setScheduleType(value as 'immediate' | 'scheduled' | 'randomized')}
            />

            {}
            {scheduleType === 'scheduled' && (
              <div className="mt-6 grid grid-cols-2 gap-4 pl-7">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Time
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {}
            {scheduleType === 'randomized' && (
              <div className="mt-6 pl-7">
                <Slider
                  min={1}
                  max={24}
                  value={spreadHours}
                  onChange={setSpreadHours}
                  label="Spread Over (hours)"
                  valueSuffix="Flags"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Spread emails over a time period for more realistic delivery
                </p>
              </div>
            )}
          </Card>
        </div>

        {}
        <div className="space-y-6">
          {}
          <Card className="bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Before You Launch</h3>
              </div>
            </div>
            
            <ul className="space-y-2">
              {[
                'Review all campaign details',
                'Verify recipient list is correct',
                'Test email template preview',
                'Confirm schedule timing'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-yellow-800">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {}
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">What Happens Next?</h3>
              </div>
            </div>
            
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Emails will be sent to recipients</li>
              <li>• Click tracking will be active</li>
              <li>• Users who click will see training</li>
              <li>• Results will be tracked in real-time</li>
            </ul>
          </Card>

          {}
          <Card className="bg-green-50 border-green-200">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Ready To Launch</h3>
              </div>
            </div>
            
            <p className="text-sm text-green-800 mb-4">
              All required fields are complete. Click{' '}
              <span className="font-semibold">&quot;Launch Campaign&quot;</span> below when ready.
            </p>

            <Button
              onClick={handleLaunch}
              variant="primary"
              className="w-full gap-2 bg-green-600 hover:bg-green-700"
            >
              <Rocket className="w-4 h-4" />
              Launch Campaign
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};