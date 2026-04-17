'use client';

import React from 'react';
import { X, LayoutGrid, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface QuizCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewResults: () => void;
  onReturnToDashboard: () => void;
  quizName: string;
}

export const QuizCompletionModal: React.FC<QuizCompletionModalProps> = ({
  isOpen,
  onClose,
  onViewResults,
  onReturnToDashboard,
  quizName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Good job!
        </h2>
        <p className="text-gray-600 mb-8">
          You just completed the <span className="text-blue-600 font-medium">{quizName}</span> quiz
        </p>

        <div className="flex flex-col gap-3">
          <Button onClick={onReturnToDashboard} variant="outline" size="lg" className="gap-2 w-full">
            <LayoutGrid className="w-4 h-4" />
            Return to Dashboard
          </Button>

          <Button onClick={onViewResults} variant="primary" size="lg" className="gap-2 w-full">
            View quiz result
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};