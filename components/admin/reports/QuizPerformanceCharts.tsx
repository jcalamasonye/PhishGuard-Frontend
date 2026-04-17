'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Target, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface QuizTrendData {
  month: string;
  avgScore: number;
  participants: number;
}

interface MissedQuestion {
  topic: string;
  missed: number;
  total: number;
  percentage: number;
}

interface QuizPerformanceChartsProps {
  trendData: QuizTrendData[];
  missedQuestions: MissedQuestion[];
  onCreateTraining: () => void;
}

export const QuizPerformanceCharts: React.FC<QuizPerformanceChartsProps> = ({
  trendData,
  missedQuestions,
  onCreateTraining
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Performance</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-1">Quiz Score Trends</h4>
            <p className="text-sm text-gray-600">Average quiz scores improving over time</p>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 200]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
              <Line 
                type="monotone" 
                dataKey="avgScore" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Avg Score"
              />
              <Line 
                type="monotone" 
                dataKey="participants" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Participants"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-800">
                14.3% improvement over 6 months
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-1">Most Missed Questions</h4>
            <p className="text-sm text-gray-600">Topics that need more focus in training</p>
          </div>

          <div className="space-y-3 mb-4">
            {missedQuestions.map((question, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {question.topic}
                  </span>
                  <span className="text-sm text-gray-600">
                    {question.missed}/{question.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: `${question.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {question.percentage.toFixed(1)}% missed
                </p>
              </div>
            ))}
          </div>

          <Button 
            onClick={onCreateTraining}
            variant="primary" 
            className="w-full"
            size="sm"
          >
            <Target className="w-4 h-4 mr-2" />
            Create Targeted Training
          </Button>
        </Card>
      </div>
    </div>
  );
};