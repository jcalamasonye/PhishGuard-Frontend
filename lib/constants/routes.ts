/**
 * Route Path Constants
 * Centralized route definitions for type-safe navigation
 * Usage: import { ROUTES } from '@/lib/constants';
 */

/**
 * Authentication Routes
 */
export const AUTH_ROUTES = {
  login: '/login',
  signup: '/signup',
  adminLogin: '/admin-login',
  adminSignup: '/admin-signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  passwordChanged: '/password-changed',
} as const;

/**
 * User Routes
 */
export const USER_ROUTES = {
  dashboard: '/dashboard',
  welcome: '/welcome',
  
  // Training
  training: '/training',
  trainingResources: '/training/resources',
  trainingCampaign: (id: string) => `/training/${id}`,
  
  // Quiz
  quiz: '/quiz',
  quizStart: (id: string) => `/quiz/${id}`,
  quizResults: (id: string) => `/quiz/results/${id}`,
  
  // Templates
  templates: '/templates',
  
  // Settings
  settings: '/user-settings',
} as const;

/**
 * Admin Routes
 */
export const ADMIN_ROUTES = {
  dashboard: '/admin',
  
  // Campaigns
  campaigns: '/admin/campaigns',
  campaignDetails: (id: string) => `/admin/campaigns/${id}`,
  createCampaign: '/admin/campaigns/create',
  
  // Users
  users: '/admin/users',
  userDetails: (id: string) => `/admin/users/${id}`,
  addUser: '/admin/users/add',
  
  // Templates
  templates: '/admin/templates',
  templateDetails: (id: string) => `/admin/templates/${id}`,
  createTemplate: '/admin/templates/create',
  
  // Reports
  reports: '/admin/reports',
  
  // Settings
  settings: '/admin/settings',
} as const;

/**
 * API Routes
 */
export const API_ROUTES = {
  // Auth
  login: '/api/auth/login',
  signup: '/api/auth/signup',
  logout: '/api/auth/logout',
  resetPassword: '/api/auth/reset-password',
  
  // Users
  users: '/api/users',
  userById: (id: string) => `/api/users/${id}`,
  
  // Campaigns
  campaigns: '/api/campaigns',
  campaignById: (id: string) => `/api/campaigns/${id}`,
  
  // Templates
  templates: '/api/templates',
  templateById: (id: string) => `/api/templates/${id}`,
  
  // Quiz
  quiz: '/api/quiz',
  quizById: (id: string) => `/api/quiz/${id}`,
  submitQuiz: '/api/quiz/submit',
  
  // Analytics
  analytics: '/api/analytics',
  userAnalytics: (id: string) => `/api/analytics/users/${id}`,
  campaignAnalytics: (id: string) => `/api/analytics/campaigns/${id}`,
  
  // Email
  sendEmail: '/api/email/send',
  
  // Settings
  settings: '/api/settings',
} as const;

/**
 * All routes combined
 */
export const ROUTES = {
  auth: AUTH_ROUTES,
  user: USER_ROUTES,
  admin: ADMIN_ROUTES,
  api: API_ROUTES,
} as const;

/**
 * Public routes (no auth required)
 */
export const PUBLIC_ROUTES = [
  AUTH_ROUTES.login,
  AUTH_ROUTES.signup,
  AUTH_ROUTES.adminLogin,
  AUTH_ROUTES.adminSignup,
  AUTH_ROUTES.forgotPassword,
  AUTH_ROUTES.resetPassword,
  AUTH_ROUTES.passwordChanged,
] as const;

/**
 * Protected routes (auth required)
 */
export const PROTECTED_ROUTES = {
  user: Object.values(USER_ROUTES).filter(route => typeof route === 'string'),
  admin: Object.values(ADMIN_ROUTES).filter(route => typeof route === 'string'),
} as const;

/**
 * Helper function to check if route is public
 */
export const isPublicRoute = (path: string): boolean => {
  return (PUBLIC_ROUTES as readonly string[]).includes(path);
};

/**
 * Helper function to check if route is admin route
 */
export const isAdminRoute = (path: string): boolean => {
  return path.startsWith('/admin');
};

/**
 * Helper function to check if route is user route
 */
export const isUserRoute = (path: string): boolean => {
  return !path.startsWith('/admin') && !isPublicRoute(path);
};