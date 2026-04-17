import React from 'react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  selectedAnswer,
  onSelectAnswer
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">{question}</h2>

      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full p-5 text-left rounded-lg border-2 transition-all ${
              selectedAnswer === index
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedAnswer === index
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === index && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span className="text-base text-gray-900">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};