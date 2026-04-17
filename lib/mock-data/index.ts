/**
 * Mock Data Master Barrel Export
 * Central export point for all mock data
 * Usage: import { MOCK_USER_METRICS, MOCK_CAMPAIGNS } from '@/lib/mock-data';
 */

// User Mock Data
export * from './user/dashboard';
export * from './user/quiz';
export * from './user/training';

// User Templates (with renamed exports to avoid conflicts)
export {
  MOCK_SYSTEM_TEMPLATES,
  MOCK_PHISHING_TEMPLATES,
  MOCK_ALL_USER_TEMPLATES,
  getUserTemplatesByCategory,
  getUserTemplateById
} from './user/templates';

// Admin Mock Data
export * from './admin/campaigns';
export * from './admin/users';
export * from './admin/reports';

// Admin Templates (with renamed exports to avoid conflicts)
export {
  MOCK_EMAIL_TEMPLATES,
  MOCK_TEMPLATE_STATS,
  MOCK_TEMPLATE_PERFORMANCE,
  getTemplatesByDifficulty,
  getAdminTemplatesByCategory,
  getAdminTemplateById,
  getTemplateStats
} from './admin/templates';