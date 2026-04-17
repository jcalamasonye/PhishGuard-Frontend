import { useState, useCallback } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizState {
  currentQuestion: number;
  answers: Record<string, number>;
  score: number;
  isComplete: boolean;
}

interface UseQuizReturn {
  state: QuizState;
  answerQuestion: (questionId: string, answer: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => number;
  resetQuiz: () => void;
}

export function useQuiz(questions: QuizQuestion[]): UseQuizReturn {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    score: 0,
    isComplete: false
  });

  const answerQuestion = useCallback((questionId: string, answer: number) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.min(prev.currentQuestion + 1, questions.length - 1)
    }));
  }, [questions.length]);

  const previousQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.max(prev.currentQuestion - 1, 0)
    }));
  }, []);

  const submitQuiz = useCallback(() => {
    let correctCount = 0;
    
    questions.forEach(question => {
      const userAnswer = state.answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);

    setState(prev => ({
      ...prev,
      score,
      isComplete: true
    }));

    return score;
  }, [questions, state.answers]);

  const resetQuiz = useCallback(() => {
    setState({
      currentQuestion: 0,
      answers: {},
      score: 0,
      isComplete: false
    });
  }, []);

  return {
    state,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz
  };
}