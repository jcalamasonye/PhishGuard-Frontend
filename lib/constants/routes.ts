


export const AUTH_ROUTES = {
  login: '/login',
  signup: '/signup',
  adminLogin: '/admin-login',
  adminSignup: '/admin-signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  passwordChanged: '/password-changed',
} as const;


export const USER_ROUTES = {
  dashboard: '/dashboard',
  welcome: '/welcome',
  
  
  training: '/training',
  trainingResources: '/training/resources',
  trainingCampaign: (id: string) => `/training/${id}`,
  
  
  quiz: '/quiz',
  quizStart: (id: string) => `/quiz/${id}`,
  quizResults: (id: string) => `/quiz/results/${id}`,
  
  
  templates: '/templates',
  
  
  settings: '/user-settings',
} as const;


export const ADMIN_ROUTES = {
  dashboard: '/admin',
  
  
  campaigns: '/admin/campaigns',
  campaignDetails: (id: string) => `/admin/campaigns/${id}`,
  createCampaign: '/admin/campaigns/create',
  
  
  users: '/admin/users',
  userDetails: (id: string) => `/admin/users/${id}`,
  addUser: '/admin/users/add',
  
  
  templates: '/admin/templates',
  templateDetails: (id: string) => `/admin/templates/${id}`,
  createTemplate: '/admin/templates/create',
  
  
  reports: '/admin/reports',
  
  
  settings: '/admin/settings',
} as const;


export const API_ROUTES = {
  
  login: '/api/auth/login',
  signup: '/api/auth/signup',
  logout: '/api/auth/logout',
  resetPassword: '/api/auth/reset-password',
  
  
  users: '/api/users',
  userById: (id: string) => `/api/users/${id}`,
  
  
  campaigns: '/api/campaigns',
  campaignById: (id: string) => `/api/campaigns/${id}`,
  
  
  templates: '/api/templates',
  templateById: (id: string) => `/api/templates/${id}`,
  
  
  quiz: '/api/quiz',
  quizById: (id: string) => `/api/quiz/${id}`,
  submitQuiz: '/api/quiz/submit',
  
  
  analytics: '/api/analytics',
  userAnalytics: (id: string) => `/api/analytics/users/${id}`,
  campaignAnalytics: (id: string) => `/api/analytics/campaigns/${id}`,
  
  
  sendEmail: '/api/email/send',
  
  
  settings: '/api/settings',
} as const;


export const ROUTES = {
  auth: AUTH_ROUTES,
  user: USER_ROUTES,
  admin: ADMIN_ROUTES,
  api: API_ROUTES,
} as const;


export const PUBLIC_ROUTES = [
  AUTH_ROUTES.login,
  AUTH_ROUTES.signup,
  AUTH_ROUTES.adminLogin,
  AUTH_ROUTES.adminSignup,
  AUTH_ROUTES.forgotPassword,
  AUTH_ROUTES.resetPassword,
  AUTH_ROUTES.passwordChanged,
] as const;


export const PROTECTED_ROUTES = {
  user: Object.values(USER_ROUTES).filter(route => typeof route === 'string'),
  admin: Object.values(ADMIN_ROUTES).filter(route => typeof route === 'string'),
} as const;


export const isPublicRoute = (path: string): boolean => {
  return (PUBLIC_ROUTES as readonly string[]).includes(path);
};


export const isAdminRoute = (path: string): boolean => {
  return path.startsWith('/admin');
};


export const isUserRoute = (path: string): boolean => {
  return !path.startsWith('/admin') && !isPublicRoute(path);
};