/**
 * Admin Templates Mock Data
 * All mock data for template management
 */

import { EmailTemplate, TemplateDifficulty, TemplateCategory } from '@/types/template';

/**
 * Mock Email Templates
 */
export const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'password-reset-1',
    name: 'Password Reset Urgent',
    description: 'Urgent password expiration notification',
    difficulty: 'easy',
    icon: 'lock',
    subject: 'Your password will expire in 1 hour',
    fromName: 'IT Security',
    fromEmail: 'security@company-it.com',
    body: 'Dear User,\n\nYour password will expire in 1 hour. Click here to reset it immediately to avoid account lockout.',
    ctaText: 'Reset Password Now',
    redFlags: [
      'Urgent time pressure (1 hour)',
      'Suspicious sender email domain',
      'Threatening account lockout',
      'Generic greeting'
    ],
    category: 'password'
  },
  {
    id: 'package-delivery-1',
    name: 'Failed Package Delivery',
    description: 'Fake package delivery notification',
    difficulty: 'medium',
    icon: 'package',
    subject: 'Package Delivery Failed - Action Required',
    fromName: 'Shipping Services',
    fromEmail: 'delivery@ship-express.net',
    body: 'Hello,\n\nWe attempted to deliver your package but no one was available. Please confirm your delivery address within 24 hours.',
    ctaText: 'Confirm Delivery',
    redFlags: [
      'Unexpected package notification',
      'Suspicious domain (.net instead of .com)',
      '24-hour deadline',
      'Requests personal information'
    ],
    category: 'package'
  },
  {
    id: 'executive-email-1',
    name: 'CEO Urgent Request',
    description: 'Executive impersonation for wire transfer',
    difficulty: 'hard',
    icon: 'user',
    subject: 'Urgent: Confidential Wire Transfer Needed',
    fromName: 'John Smith (CEO)',
    fromEmail: 'j.smith@company-ceo.com',
    body: 'I need you to process an urgent wire transfer for a confidential acquisition. Please handle this discreetly and respond ASAP.',
    ctaText: 'View Details',
    redFlags: [
      'Urgency and pressure tactics',
      'Request for wire transfer',
      'Secrecy and confidentiality demands',
      'CEO impersonation'
    ],
    category: 'executive'
  },
  {
    id: 'payroll-update-1',
    name: 'Payroll Information Update',
    description: 'HR requesting banking details update',
    difficulty: 'medium',
    icon: 'credit-card',
    subject: 'Action Required: Update Your Payroll Information',
    fromName: 'HR Department',
    fromEmail: 'hr@company-payroll.com',
    body: 'Dear Employee,\n\nWe are updating our payroll system. Please verify your banking information by end of day to ensure uninterrupted payment.',
    ctaText: 'Update Information',
    redFlags: [
      'Requests sensitive financial info',
      'Suspicious domain',
      'Time pressure (end of day)',
      'Generic greeting'
    ],
    category: 'payroll'
  },
  {
    id: 'it-support-1',
    name: 'IT Security Alert',
    description: 'Fake security breach notification',
    difficulty: 'medium',
    icon: 'shield',
    subject: 'Security Alert: Suspicious Activity Detected',
    fromName: 'IT Security Team',
    fromEmail: 'security-alert@company.com',
    body: 'We detected suspicious activity on your account. Verify your identity immediately to prevent account suspension.',
    ctaText: 'Verify Account',
    redFlags: [
      'Creates panic and urgency',
      'Threatens account suspension',
      'Requests verification',
      'Suspicious sender domain'
    ],
    category: 'security'
  },
  {
    id: 'vendor-invoice-1',
    name: 'Vendor Invoice Update',
    description: 'Compromised vendor account requesting payment',
    difficulty: 'hard',
    icon: 'file-text',
    subject: 'Updated Payment Details for Invoice #INV-2024-001',
    fromName: 'Accounts Payable',
    fromEmail: 'ap@vendor-services.com',
    body: 'Our banking details have changed. Please update your records and redirect payment for the outstanding invoice.',
    ctaText: 'View Updated Details',
    redFlags: [
      'Payment redirect request',
      'Unusual request from vendor',
      'Spoofed sender address',
      'Urgency implied'
    ],
    category: 'vendor'
  }
];

/**
 * Template Stats
 */
export const MOCK_TEMPLATE_STATS = {
  total: MOCK_EMAIL_TEMPLATES.length,
  byDifficulty: {
    easy: MOCK_EMAIL_TEMPLATES.filter(t => t.difficulty === 'easy').length,
    medium: MOCK_EMAIL_TEMPLATES.filter(t => t.difficulty === 'medium').length,
    hard: MOCK_EMAIL_TEMPLATES.filter(t => t.difficulty === 'hard').length
  },
  byCategory: {
    password: MOCK_EMAIL_TEMPLATES.filter(t => t.category === 'password').length,
    package: MOCK_EMAIL_TEMPLATES.filter(t => t.category === 'package').length,
    executive: MOCK_EMAIL_TEMPLATES.filter(t => t.category === 'executive').length,
    payroll: MOCK_EMAIL_TEMPLATES.filter(t => t.category === 'payroll').length,
    security: MOCK_EMAIL_TEMPLATES.filter(t => t.category === 'security').length,
    vendor: MOCK_EMAIL_TEMPLATES.filter(t => t.category === 'vendor').length
  },
  mostUsed: 'password-reset-1',
  averageClickRate: 18
};

/**
 * Individual Template Performance Statistics
 */
export const MOCK_TEMPLATE_PERFORMANCE: Record<string, {
  timesUsed: number;
  avgClickRate: number;
}> = {
  'password-reset-1': { timesUsed: 45, avgClickRate: 32.4 },
  'package-delivery-1': { timesUsed: 38, avgClickRate: 28.6 },
  'executive-email-1': { timesUsed: 23, avgClickRate: 18.9 },
  'payroll-update-1': { timesUsed: 31, avgClickRate: 24.7 },
  'it-support-1': { timesUsed: 52, avgClickRate: 35.8 },
  'vendor-invoice-1': { timesUsed: 19, avgClickRate: 15.3 }
};

/**
 * Helper: Get templates by difficulty
 */
export const getTemplatesByDifficulty = (difficulty: TemplateDifficulty) => {
  return MOCK_EMAIL_TEMPLATES.filter(t => t.difficulty === difficulty);
};

/**
 * Helper: Get templates by category
 */
export const getTemplatesByCategory = (category: TemplateCategory) => {
  return MOCK_EMAIL_TEMPLATES.filter(t => t.category === category);
};

/**
 * Helper: Get template by ID
 */
export const getAdminTemplatesByCategory = (category: TemplateCategory) => {
  return MOCK_EMAIL_TEMPLATES.filter(t => t.category === category);
};

export const getAdminTemplateById = (id: string) => {
  return MOCK_EMAIL_TEMPLATES.find(t => t.id === id) || null;
};

/**
 * Helper: Get template performance stats by ID
 */
export const getTemplateStats = (templateId: string) => {
  return MOCK_TEMPLATE_PERFORMANCE[templateId] || { timesUsed: 0, avgClickRate: 0 };
};