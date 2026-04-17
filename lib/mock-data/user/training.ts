/**
 * User Training Mock Data
 * All mock data for training resources and pages
 */

/**
 * Featured Training Resources
 */
export const MOCK_FEATURED_RESOURCES = [
  {
    id: '1',
    title: 'How to spot a Phishing Email',
    description: 'A comprehensive guide to identify suspicious emails before they cause harm.',
    type: 'article' as const
  },
  {
    id: '2',
    title: 'Check Before You Click',
    description: 'Learn the essential steps to verify links and attachments under 5 mins',
    type: 'video' as const
  },
  {
    id: '3',
    title: 'Phishing Examples Collection',
    description: 'Real world examples of phishing emails with detailed breakdowns.',
    type: 'gallery' as const
  }
];

/**
 * Training Categories
 */
export const MOCK_TRAINING_CATEGORIES = [
  {
    title: 'Beginner Guides',
    icon: 'book' as const,
    items: [
      { title: 'What is Phishing?', readTime: '5min read' },
      { title: 'How does Phishing work?', readTime: '2min read' },
      { title: 'Why attackers target employees', readTime: '1min read' }
    ]
  },
  {
    title: 'Practical Skills',
    icon: 'wrench' as const,
    items: [
      { title: 'How to Inspect a URL', readTime: '5min read' },
      { title: 'Checking Sender Domains', readTime: '2min read' },
      { title: 'Spotting Fake Login Pages', readTime: '1min read' }
    ]
  },
  {
    title: 'Real-world Phishing Examples',
    icon: 'alert' as const,
    items: [
      { title: 'Fake HR Email', readTime: '3min read' },
      { title: 'Fake IT Update', readTime: '2min read' },
      { title: 'Fake Bank Alert', readTime: '1min read' },
      { title: 'Fake Delivery Notification', readTime: '2 min read' }
    ]
  }
];

/**
 * Downloadable Resources
 */
export const MOCK_DOWNLOADABLE_RESOURCES = [
  {
    title: 'Email Safety Check list',
    description: 'A hand-free reference for safe email practices',
    format: 'PDF',
    fileSize: '1MB'
  },
  {
    title: 'Phishing Awareness Handbook',
    description: 'Complete guide to understanding and preventing Phishing',
    format: 'PDF',
    fileSize: '1MB'
  },
  {
    title: 'Red Flags Quick Guide',
    description: 'One page visual summary of warnings',
    format: 'PDF',
    fileSize: '500KB'
  },
  {
    title: 'Understanding Domains',
    description: 'One page visual summary to understand domains',
    format: 'PDF',
    fileSize: '800KB'
  }
];

/**
 * Video Tutorials
 */
export const MOCK_VIDEO_TUTORIALS = [
  { title: 'Understanding Phishing in 3 minutes', duration: '3:26' },
  { title: 'How Hackers Trick You With Fake Pages', duration: '3:26' },
  { title: 'How To Report Suspicious Emails', duration: '3:26' },
  { title: 'Understanding Phishing in 3 minutes', duration: '3:26' }
];

/**
 * Red Flags (for training page)
 */
export const MOCK_RED_FLAGS = [
  {
    id: '1',
    title: 'Suspicious sender address',
    examples: [
      { label: 'Bad', value: 'support@amazen.com', isBad: true },
      { label: 'Good', value: 'support@amazon.com', isBad: false }
    ]
  },
  {
    id: '2',
    title: 'Urgent threatening language',
    examples: [
      { label: 'Example', value: '"Act now or your account will be locked!"', isBad: true }
    ]
  },
  {
    id: '3',
    title: 'Fake link preview',
    examples: [
      { label: 'Shows', value: 'https://amazon.com/verify', isBad: true },
      { label: 'Actually goes to', value: 'https://phishing-site.net', isBad: true }
    ]
  },
  {
    id: '4',
    title: 'Grammar & spelling errors',
    examples: [
      { label: 'Example', value: '"We has detected unusual activity..."', isBad: true }
    ]
  },
  {
    id: '5',
    title: 'Generic greeting',
    examples: [
      { label: 'Bad', value: '"Dear User" or "Dear Customer"', isBad: true },
      { label: 'Good', value: '"Dear John Smith"', isBad: false }
    ]
  }
];

/**
 * Best Practices (for training page)
 */
export const MOCK_BEST_PRACTICES = [
  {
    id: '1',
    title: 'Hover over links before clicking',
    description: 'Hold your mouse over any link to see the real URL. The preview URL should match what\'s shown.'
  },
  {
    id: '2',
    title: 'Look for urgent threatening language',
    description: 'Be cautious of emails that create urgency or threaten negative consequences. Take time to verify.'
  },
  {
    id: '3',
    title: 'Double-check sender domain',
    description: 'Look carefully at the email address, examining any slight misspellings like "amazen" instead of "amazon".'
  },
  {
    id: '4',
    title: 'Contact IT if something seems suspicious',
    description: 'When in doubt, report it out! It\'s better to ask than to risk a security breach.'
  }
];

/**
 * Training Resources Widget Items
 */
export const MOCK_TRAINING_RESOURCES_WIDGET = [
  {
    id: '1',
    title: 'Introduction to Phishing',
    type: 'video' as const,
    duration: '5 min'
  },
  {
    id: '2',
    title: 'Spot Red Flags',
    type: 'article' as const,
    duration: '3 min read'
  },
  {
    id: '3',
    title: 'Real Examples',
    type: 'interactive' as const,
    duration: '10 min'
  }
];

/**
 * Helper: Get all training resources
 */
export const getTrainingResources = () => ({
  featured: MOCK_FEATURED_RESOURCES,
  categories: MOCK_TRAINING_CATEGORIES,
  downloadable: MOCK_DOWNLOADABLE_RESOURCES,
  videos: MOCK_VIDEO_TUTORIALS,
  redFlags: MOCK_RED_FLAGS,
  bestPractices: MOCK_BEST_PRACTICES,
  widgetItems: MOCK_TRAINING_RESOURCES_WIDGET,
});