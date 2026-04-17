import React from 'react';
import { Card } from '@/components/ui/Card';
import { QuizPerformanceData } from '@/types/analytics';

interface QuizPerformanceProps {
  quizData: QuizPerformanceData[];
}

export const QuizPerformance: React.FC<QuizPerformanceProps> = ({ quizData }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Performance by Campaign</h3>
      <p className="text-sm text-gray-600 mb-6">Post-campaign awareness quiz results</p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participants
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg Score
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completion Rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quizData.map((quiz, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {quiz.campaignName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {quiz.totalParticipants}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className={`font-semibold ${
                    quiz.averageScore >= 80 ? 'text-green-600' : 
                    quiz.averageScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {quiz.averageScore}%
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${quiz.completionRate}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-medium">{quiz.completionRate}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};