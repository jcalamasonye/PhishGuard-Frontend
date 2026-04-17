import React from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  incorrectAnswers
}) => {
  const getFeedbackMessage = (score: number) => {
    if (score >= 80) {
      return "Excellent work! You've mastered the key concepts of phishing detection. Keep up this vigilant approach to protect yourself and the organization.";
    } else if (score >= 60) {
      return "Good effort! You have a solid understanding, but there's room for improvement. Review the areas where you struggled.";
    } else {
      return "You're learning! Take time to review the training materials and try again to strengthen your awareness.";
    }
  };

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>

      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-6xl font-bold text-gray-900">{correctAnswers}</span>
        <span className="text-4xl text-gray-400">/</span>
        <span className="text-4xl text-gray-600">{totalQuestions}</span>
      </div>

      <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
        <span className="text-sm font-medium">Your score:</span>
        <span className="text-lg font-bold">{score}%</span>
      </div>

      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 max-w-lg mx-auto mb-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
          <p className="text-sm text-cyan-900 text-left">
            {getFeedbackMessage(score)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
            <CheckCircle className="w-5 h-5" />
            <span className="text-2xl font-bold">{correctAnswers}</span>
          </div>
          <p className="text-sm text-gray-600">Correct</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-red-600 mb-1">
            <XCircle className="w-5 h-5" />
            <span className="text-2xl font-bold">{incorrectAnswers}</span>
          </div>
          <p className="text-sm text-gray-600">Incorrect</p>
        </div>
      </div>
    </div>
  );
};