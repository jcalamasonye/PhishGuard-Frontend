import React from 'react';

interface QuizProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
  progress
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">
          Question {currentQuestion} of {totalQuestions}
        </p>
        <span className="text-sm text-gray-600 font-medium">
          {Math.round(progress)}% Complete
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${
            progress === 100 
              ? 'bg-gradient-to-r from-green-500 to-green-600' 
              : 'bg-gradient-to-r from-blue-600 to-blue-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};