'use client';

import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface QuizIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  questionCount: number;
  estimatedMinutes: number;
}

export const QuizIntroModal: React.FC<QuizIntroModalProps> = ({
  isOpen,
  onClose,
  onStart,
  questionCount,
  estimatedMinutes
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
          Test your Awareness
        </h2>
        <p className="text-gray-600 mb-8">
          Answer a few questions to test your knowledge
        </p>

        <div className="inline-block bg-gray-100 rounded-lg px-6 py-3 mb-8">
          <p className="text-sm text-gray-700">
            {questionCount} Questions - {estimatedMinutes} minutes
          </p>
        </div>

        <Button onClick={onStart} variant="primary" size="lg" className="gap-2 w-full">
          Get Started
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};