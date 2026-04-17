'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, BarChart3, ChevronRight } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { UserSidebar } from '@/components/user/SideBar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { quizService, type Quiz } from '@/services/quizService';

const difficultyConfig = {
  EASY: { variant: 'success' as const, label: 'Easy' },
  MEDIUM: { variant: 'warning' as const, label: 'Medium' },
  HARD: { variant: 'error' as const, label: 'Hard' },
};

export default function QuizListPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const result = await quizService.getAll({ limit: 20 });
        setQuizzes(result.quizzes);
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <>
      <Header
        userName={user?.name || 'User'}
        userRole="user"
        notificationCount={0}
      />

      <UserSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Security Quizzes</h1>
          <p className="text-gray-600">Test your knowledge and improve your phishing detection skills</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : quizzes.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500">No quizzes available at the moment.</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => {
              const difficulty = difficultyConfig[quiz.difficulty as keyof typeof difficultyConfig]
                || difficultyConfig.MEDIUM;
              const questionCount = quiz._count?.questions || 0;

              return (
                <Card
                  key={quiz.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => router.push(`/quiz/${quiz.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{quiz.title}</h3>
                      <p className="text-sm text-gray-600">{quiz.description || 'Test your security awareness knowledge.'}</p>
                    </div>
                    <Badge variant={difficulty.variant}>{difficulty.label}</Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4" />
                      <span>{questionCount} questions</span>
                    </div>
                    {quiz.timeLimit && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{quiz.timeLimit} min</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <span>Pass: {quiz.passingScore}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end text-blue-600 text-sm font-medium">
                    Start Quiz
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
