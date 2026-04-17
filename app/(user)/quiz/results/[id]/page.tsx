'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { RotateCcw, BookOpen, LayoutGrid } from 'lucide-react';
import { PublicHeader } from '@/components/user/PublicHeader';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { QuizResults } from '@/components/user/quiz/QuizResults';
import { AnswerExplanation } from '@/components/user/quiz/AnswerExplanation';
import { quizService } from '@/services/quizService';

interface ReviewQuestion {
  id: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
}

export default function QuizResultsPage() {
  const router = useRouter();
  const params = useParams();
  const attemptId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [reviewQuestions, setReviewQuestions] = useState<ReviewQuestion[]>([]);
  const [quizId, setQuizId] = useState<string>('');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const attempt = await quizService.getAttemptById(attemptId);
        const questions = attempt.quiz?.questions || [];
        const userAnswers = (attempt as unknown as Record<string, unknown>).answers as Record<string, number> || {};

        setScore(attempt.score);
        setQuizId(attempt.quizId);
        setTotalQuestions(questions.length);

        let correct = 0;
        let incorrect = 0;

        const review: ReviewQuestion[] = questions.map((q) => {
          const userAnswerIndex = userAnswers[q.id];
          const isCorrect = userAnswerIndex === q.correctAnswer;
          if (isCorrect) correct++;
          else incorrect++;

          return {
            id: q.id,
            question: q.question,
            userAnswer: userAnswerIndex != null ? q.options[userAnswerIndex] || 'No answer' : 'No answer',
            correctAnswer: q.options[q.correctAnswer] || '',
            isCorrect,
            explanation: q.explanation,
          };
        });

        setCorrectCount(correct);
        setIncorrectCount(incorrect);
        setReviewQuestions(review);
      } catch (err) {
        console.error('Failed to fetch quiz results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [attemptId]);

  if (loading) {
    return (
      <>
        <PublicHeader />
        <main className="min-h-screen bg-gray-50 pt-[73px]">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-gray-50 pt-[73px] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">Quiz Results</h1>
                <p className="text-sm text-gray-600">Security awareness training</p>
              </div>
            </div>
          </Card>

          <Card className="mb-8">
            <QuizResults
              score={score}
              totalQuestions={totalQuestions}
              correctAnswers={correctCount}
              incorrectAnswers={incorrectCount}
            />
          </Card>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Answer Review</h2>
            <div className="space-y-4">
              {reviewQuestions.map((question, index) => (
                <AnswerExplanation
                  key={question.id}
                  questionNumber={index + 1}
                  question={question.question}
                  userAnswer={question.userAnswer}
                  correctAnswer={question.correctAnswer}
                  isCorrect={question.isCorrect}
                  explanation={question.explanation}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/quiz/${quizId}`)}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/training/resources')}
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              More Training
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push('/dashboard')}
              className="gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
