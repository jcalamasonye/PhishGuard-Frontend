'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, Info, Brain } from 'lucide-react';
import { PublicHeader } from '@/components/user/PublicHeader';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PhishingAlert } from '@/components/user/training/PhishingAlert';
import { RedFlagBreakdown } from '@/components/user/training/RedFlagBreakdown';
import { BestPractices } from '@/components/user/training/BestPractices';
import { ResourcesList } from '@/components/user/training/ResourcesList';
import { campaignService } from '@/services/campaignService';
import { templateService } from '@/services/templateService';
import { quizService, type Quiz } from '@/services/quizService';
import { aiService, type AIAnalysisResult } from '@/services/aiService';

interface RedFlag {
  id: string;
  title: string;
  examples: Array<{
    label: string;
    value: string;
    isBad: boolean;
  }>;
}

export default function TrainingPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [loading, setLoading] = useState(true);
  const [redFlags, setRedFlags] = useState<RedFlag[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const sampleQuestion = {
    question: 'What is the first thing you should do when you receive a suspicious email?',
    options: [
      'Click the link to check if it is real',
      'Verify the sender address and hover over links',
      'Reply asking if the email is legitimate',
      'Forward it to your colleagues for their opinion',
    ],
    correctAnswer: 1,
  };

  useEffect(() => {
    const fetchTrainingData = async () => {
      setLoading(true);
      try {
        const campaignData = await campaignService.getById(campaignId) as unknown as Record<string, unknown>;
        const templateId = campaignData.templateId as string;

        if (templateId) {
          const template = await templateService.getById(templateId);
          const templateRedFlags: RedFlag[] = (template.redFlags || []).map((flag, index) => ({
            id: String(index + 1),
            title: flag,
            examples: [],
          }));
          setRedFlags(templateRedFlags);

          // Analyze with AI
          setAiLoading(true);
          try {
            const emailText = `From: ${template.fromName} <${template.fromEmail}>\nSubject: ${template.subject}\n\n${template.body}`;
            const analysis = await aiService.analyzeEmail(emailText);
            setAiResult(analysis);
          } catch {
            // AI service might not be available
          } finally {
            setAiLoading(false);
          }
        }

        const quizResult = await quizService.getAll({ limit: 5 });
        setQuizzes(quizResult.quizzes);
      } catch (err) {
        console.error('Failed to fetch training data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingData();
  }, [campaignId]);

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      if (quizzes.length > 0) {
        router.push(`/quiz/${quizzes[0].id}`);
      } else {
        router.push('/quiz');
      }
    }
  };

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

      <main className="min-h-screen pt-[73px]">
        <PhishingAlert />

        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-6 py-12">

            {/* AI Analysis Result */}
            {(aiResult || aiLoading) && (
              <Card className="bg-purple-50 border-purple-200 mb-12">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI Detection Analysis
                </h3>
                {aiLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-200 border-t-purple-600" />
                    <span className="text-sm text-gray-600">AI is analyzing this email...</span>
                  </div>
                ) : aiResult ? (
                  <div>
                    <p className="text-sm text-gray-700 mb-4">
                      Our AI detected this email as phishing with <span className="font-bold text-purple-700">{aiResult.phishing_probability}%</span> confidence.
                      {aiResult.phishing_probability >= 80
                        ? ' The AI flagged this as a clear phishing attempt.'
                        : aiResult.phishing_probability >= 50
                        ? ' The AI found suspicious patterns in this email.'
                        : ' Even the AI found this one tricky to detect.'}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Risk Level:</span>
                        <Badge
                          variant={
                            aiResult.risk_level === 'LOW' ? 'success'
                            : aiResult.risk_level === 'MEDIUM' ? 'warning'
                            : 'error'
                          }
                        >
                          {aiResult.risk_level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : null}
              </Card>
            )}

            <RedFlagBreakdown redFlags={redFlags} />
            <BestPractices />

            <Card className="bg-blue-50 border-blue-200 mb-12">
              <div className="flex items-start gap-3 mb-6">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Test your Knowledge</h3>
                  <p className="text-sm text-gray-600">Quick question before you go</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-4">{sampleQuestion.question}</h4>

              <div className="space-y-3 mb-6">
                {sampleQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-blue-600 bg-white'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedAnswer === index ? 'border-blue-600' : 'border-gray-300'
                      }`}>
                        {selectedAnswer === index && <div className="w-3 h-3 rounded-full bg-blue-600" />}
                      </div>
                      <span className="text-sm text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <div className={`p-4 rounded-lg mb-4 ${
                  selectedAnswer === sampleQuestion.correctAnswer
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    selectedAnswer === sampleQuestion.correctAnswer ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedAnswer === sampleQuestion.correctAnswer
                      ? 'Correct! Always verify the sender and hover over links before interacting.'
                      : 'Not quite. The safest approach is to verify the sender address and hover over links to check their real destination.'}
                  </p>
                </div>
              )}

              <Button
                variant="primary"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="gap-2"
              >
                Take Full Quiz
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Card>

            <ResourcesList />
          </div>
        </div>
      </main>
    </>
  );
}