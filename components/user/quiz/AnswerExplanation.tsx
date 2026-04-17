import React from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface AnswerExplanationProps {
  questionNumber: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
}

export const AnswerExplanation: React.FC<AnswerExplanationProps> = ({
  questionNumber,
  question,
  userAnswer,
  correctAnswer,
  isCorrect,
  explanation
}) => {
  return (
    <Card 
      className={`${
        isCorrect 
          ? 'bg-green-50 border-green-200' 
          : 'bg-red-50 border-red-200'
      }`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isCorrect ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {isCorrect ? (
            <CheckCircle className="w-5 h-5 text-white" />
          ) : (
            <XCircle className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-900">Question {questionNumber}</span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              isCorrect 
                ? 'bg-green-200 text-green-800' 
                : 'bg-red-200 text-red-800'
            }`}>
              {isCorrect ? 'Correct' : 'Incorrect'}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-3">{question}</p>

          <div className="space-y-2">
            <div className="bg-cyan-100 border border-cyan-300 rounded-lg p-3">
              <p className="text-xs font-semibold text-cyan-900 mb-1">Your answer:</p>
              <p className="text-sm text-cyan-900">{userAnswer}</p>
            </div>

            {!isCorrect && (
              <>
                <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-900 mb-1">Correct answer:</p>
                  <p className="text-sm text-green-900">{correctAnswer}</p>
                </div>

                {explanation && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-blue-900 mb-1">Why this matters:</p>
                      <p className="text-sm text-blue-900">{explanation}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};