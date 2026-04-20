'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PublicHeader } from '@/components/user/PublicHeader';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { QuizIntroModal } from '@/components/user/quiz/QuizIntroModal';
import { QuizCompletionModal } from '@/components/user/quiz/QuizCompletionModal';
import { QuizProgressBar } from '@/components/user/quiz/QuizProgressBar';
import { QuizQuestion } from '@/components/user/quiz/QuizQuestion';
import { quizService, type Quiz } from '@/services/quizService';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;
  const startTimeRef = useRef<number>(Date.now());

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [attemptId, setAttemptId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const data = await quizService.getById(quizId);
        setQuiz(data);
        setAnswers(new Array(data.questions?.length || 0).fill(null));
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading || !quiz || !quiz.questions) {
    return (
      <>
        <PublicHeader />
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        </main>
      </>
    );
  }

  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleStartQuiz = () => {
    startTimeRef.current = Date.now();
    setShowStartModal(false);
  };

  const handleCloseStartModal = () => {
    router.push('/dashboard');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      
      setSubmitting(true);
      try {
        const answersMap: Record<string, number> = {};
        questions.forEach((q, i) => {
          if (answers[i] !== null) {
            answersMap[q.id] = answers[i] as number;
          }
        });

        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        const result = await quizService.submit(quizId, {
          answers: answersMap,
          timeSpent,
        });

        setAttemptId(result.attempt.id);
        setShowCompletionModal(true);
      } catch (err) {
        console.error('Failed to submit quiz:', err);
        alert('Failed to submit quiz. Please try again.');
      } finally {
        setSubmitting(false);
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };

  const handleViewResults = () => {
    if (attemptId) {
      router.push(`/quiz/results/${attemptId}`);
    }
  };

  const handleReturnToDashboard = () => {
    router.push('/dashboard');
  };

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false);
  };

  return (
    <>
      <PublicHeader />

      {showStartModal ? (
        <QuizIntroModal
          isOpen={showStartModal}
          onClose={handleCloseStartModal}
          onStart={handleStartQuiz}
          questionCount={questions.length}
          estimatedMinutes={quiz.timeLimit || 5}
        />
      ) : (
        <main className="min-h-screen bg-gray-50 pt-20 pb-12">
          <div className="max-w-3xl mx-auto px-4">
            <QuizProgressBar
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              progress={progress}
            />

            <Card className="p-8 mt-6">
              <QuizQuestion
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleAnswerSelect}
              />

              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={selectedAnswer === null || submitting}
                  isLoading={submitting}
                  className="gap-2"
                >
                  {isLastQuestion ? 'Finish' : 'Next'}
                  {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </Card>
          </div>
        </main>
      )}

      <QuizCompletionModal
        isOpen={showCompletionModal}
        onClose={handleCloseCompletionModal}
        onViewResults={handleViewResults}
        onReturnToDashboard={handleReturnToDashboard}
        quizName={quiz.title}
      />
    </>
  );
}
