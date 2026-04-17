/**
 * User Quiz Mock Data
 * All mock data for quiz pages
 */

import { QuizQuestion } from '@/types/quiz';

/**
 * Sample Quiz Questions
 */
export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: "What's the first thing you should do when you receive an email asking you to verify your account?",
    options: [
      "Click the link immediately to avoid account suspension",
      "Hover over the link to check the actual URL destination",
      "Reply to the email asking if it's legitimate",
      "Forward it to all your colleagues"
    ],
    correctAnswer: 1,
    explanation: "Always hover over links to verify the actual URL before clicking. Legitimate companies never ask you to verify accounts through unsolicited emails."
  },
  {
    id: '2',
    question: "Which of these email addresses is most likely legitimate for HR communications?",
    options: [
      "hr@company-portal.com",
      "hr.department@company.co",
      "hr@company.com",
      "humanresources@company-secure.net"
    ],
    correctAnswer: 2,
    explanation: "The legitimate email would use your company's actual domain. Be wary of similar-looking domains with extra words or different extensions."
  },
  {
    id: '3',
    question: "An email claims your password will expire in 1 hour. What should you do?",
    options: [
      "Click the link and change your password immediately",
      "Reply with your information",
      "Call IT or check the official portal directly without clicking links",
      "Forward it to colleagues"
    ],
    correctAnswer: 2,
    explanation: "Never act on urgent requests without verification. Go directly to the official portal or contact IT through known channels. Phishing emails often create false urgency."
  },
  {
    id: '4',
    question: "What should you do if an email creates a sense of urgency?",
    options: [
      "Click the link immediately",
      "Reply with your information",
      "Take a moment to verify before acting",
      "Forward it to colleagues"
    ],
    correctAnswer: 2,
    explanation: "Urgency is a common phishing tactic. Always pause, verify the sender, and use official channels to confirm requests before taking action."
  }
];

/**
 * Mock Quiz Results
 */
export const MOCK_QUIZ_RESULTS = {
  totalQuestions: 4,
  correctAnswers: 3,
  incorrectAnswers: 1,
  score: 75,
  questions: [
    {
      id: '1',
      question: "What's the first thing you should do when you receive an email asking you to verify your account?",
      userAnswer: "Hover over the link to check the actual URL destination",
      correctAnswer: "Hover over the link to check the actual URL destination",
      isCorrect: true
    },
    {
      id: '2',
      question: "Which of these email addresses is most likely legitimate for HR communications?",
      userAnswer: "hr@company.com",
      correctAnswer: "hr@company.com",
      isCorrect: true
    },
    {
      id: '3',
      question: "An email claims your password will expire in 1 hour. What should you do?",
      userAnswer: "Click the link and change your password immediately",
      correctAnswer: "Call IT or check the official portal directly without clicking links",
      isCorrect: false,
      explanation: "Never act on urgent requests without verification. Go directly to the official portal or contact IT through known channels."
    },
    {
      id: '4',
      question: "What should you do if an email creates a sense of urgency?",
      userAnswer: "Take a moment to verify before acting",
      correctAnswer: "Take a moment to verify before acting",
      isCorrect: true
    }
  ]
};

/**
 * Helper: Get quiz by ID
 */
export const getQuizById = (id: string) => {
  // In real app, this would fetch from API
  return {
    id,
    name: 'Password Reset Security Quiz',
    questions: MOCK_QUIZ_QUESTIONS,
    estimatedMinutes: 2,
  };
};

/**
 * Helper: Get quiz results by ID
 */
export const getQuizResultsById = (id: string) => {
  // In real app, this would fetch from API
  return {
    id,
    ...MOCK_QUIZ_RESULTS,
  };
};