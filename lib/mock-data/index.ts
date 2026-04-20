


export * from './user/dashboard';
export * from './user/quiz';
export * from './user/training';


export {
  MOCK_SYSTEM_TEMPLATES,
  MOCK_PHISHING_TEMPLATES,
  MOCK_ALL_USER_TEMPLATES,
  getUserTemplatesByCategory,
  getUserTemplateById
} from './user/templates';


export * from './admin/campaigns';
export * from './admin/users';
export * from './admin/reports';


export {
  MOCK_EMAIL_TEMPLATES,
  MOCK_TEMPLATE_STATS,
  MOCK_TEMPLATE_PERFORMANCE,
  getTemplatesByDifficulty,
  getAdminTemplatesByCategory,
  getAdminTemplateById,
  getTemplateStats
} from './admin/templates';