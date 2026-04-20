

import { Campaign, CampaignStatus } from '@/types/campaign';


export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Q4 Security Awareness',
    description: 'Quarterly phishing awareness campaign for all departments',
    dateSent: '2024-12-01',
    recipients: 250,
    openRate: 87,
    clickRate: 18,
    status: 'completed',
    templateId: 'password-reset-1',
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-12-01T15:30:00Z'
  },
  {
    id: '2',
    name: 'Executive Phishing Test',
    description: 'Targeted test for C-level executives',
    dateSent: '2024-12-10',
    recipients: 15,
    openRate: 93,
    clickRate: 12,
    status: 'completed',
    templateId: 'executive-email-1',
    createdAt: '2024-12-05T09:00:00Z',
    updatedAt: '2024-12-10T14:20:00Z'
  },
  {
    id: '3',
    name: 'IT Department Simulation',
    description: 'Technical phishing simulation for IT staff',
    dateSent: '2024-12-15',
    recipients: 45,
    openRate: 78,
    clickRate: 8,
    status: 'active',
    templateId: 'it-support-1',
    createdAt: '2024-12-10T11:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z'
  },
  {
    id: '4',
    name: 'Holiday Shopping Scam',
    description: 'Seasonal campaign targeting shopping scams',
    dateSent: '2024-12-18',
    recipients: 180,
    openRate: 82,
    clickRate: 22,
    status: 'active',
    templateId: 'package-delivery-1',
    createdAt: '2024-12-12T14:00:00Z',
    updatedAt: '2024-12-18T09:00:00Z'
  },
  {
    id: '5',
    name: 'Tax Season Awareness',
    description: 'Pre-emptive tax scam awareness campaign',
    dateSent: null,
    recipients: 250,
    openRate: null,
    clickRate: null,
    status: 'scheduled',
    templateId: 'vendor-invoice-1',
    createdAt: '2024-12-15T16:00:00Z',
    updatedAt: '2024-12-15T16:00:00Z'
  },
  {
    id: '6',
    name: 'New Hire Security Training',
    description: 'Onboarding phishing test for recent hires',
    dateSent: null,
    recipients: 25,
    openRate: null,
    clickRate: null,
    status: 'draft',
    templateId: 'payroll-update-1',
    createdAt: '2024-12-18T10:00:00Z',
    updatedAt: '2024-12-18T10:00:00Z'
  }
];


export const MOCK_CAMPAIGN_STATS = {
  totalCampaigns: 24,
  activeCampaigns: 3,
  completedCampaigns: 18,
  scheduledCampaigns: 2,
  draftCampaigns: 1,
  totalRecipients: 1250,
  averageClickRate: 16,
  averageOpenRate: 85
};


export const MOCK_CAMPAIGN_DETAILS: Record<string, {
  id: string;
  name: string;
  sentAt: string;
  status: string;
  totalSent: number;
  emailsOpened: number;
  openRate: number;
  averageQuizScore: number;
  quizCompletionRate: number;
  clicksVsPrevious: number;
}> = {
  '1': {
    id: '1',
    name: 'Q4 Credential Phishing',
    sentAt: 'November 18, 2025 at 9:00 AM',
    status: 'completed',
    totalSent: 10,
    emailsOpened: 9,
    openRate: 90.0,
    averageQuizScore: 84.5,
    quizCompletionRate: 80.0,
    clicksVsPrevious: -8.2
  },
  '2': {
    id: '2',
    name: 'Executive Phishing Test',
    sentAt: 'December 10, 2024 at 10:00 AM',
    status: 'completed',
    totalSent: 15,
    emailsOpened: 14,
    openRate: 93.3,
    averageQuizScore: 88.2,
    quizCompletionRate: 93.3,
    clicksVsPrevious: 5.1
  }
};


export const MOCK_CAMPAIGN_USER_PERFORMANCE: Record<string, Array<{
  id: string;
  name: string;
  email: string;
  emailOpened: boolean;
  linkClicked: boolean;
  clickedAt?: string;
  quizScore?: string;
  timeToClick?: string;
}>> = {
  '1': [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      emailOpened: true,
      linkClicked: true,
      clickedAt: 'Nov 18, 2025 10:23 AM',
      quizScore: '4/10',
      timeToClick: '30 seconds\nAfter opening'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      emailOpened: false,
      linkClicked: false
    },
    {
      id: '3',
      name: 'Emily Kate',
      email: 'emily.kate@company.com',
      emailOpened: false,
      linkClicked: false
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@company.com',
      emailOpened: true,
      linkClicked: true,
      clickedAt: 'Nov 18, 2025 10:23 AM',
      quizScore: '2/10',
      timeToClick: '45 seconds\nAfter opening'
    },
    {
      id: '5',
      name: 'Jessica Peter',
      email: 'jessica.peter@company.com',
      emailOpened: true,
      linkClicked: false,
      quizScore: '10/10'
    },
    {
      id: '6',
      name: 'Robert Parker',
      email: 'robert.parker@company.com',
      emailOpened: true,
      linkClicked: true,
      clickedAt: 'Nov 18, 2025 10:23 AM',
      timeToClick: '1 minute 30 seconds\nAfter opening'
    },
    {
      id: '7',
      name: 'Paul Fred',
      email: 'paul.fred@company.com',
      emailOpened: true,
      linkClicked: false,
      quizScore: '8/10'
    },
    {
      id: '8',
      name: 'Linda Martinez',
      email: 'linda.martinez@company.com',
      emailOpened: true,
      linkClicked: true,
      clickedAt: 'Nov 18, 2025 11:15 AM',
      quizScore: '6/10',
      timeToClick: '2 minutes\nAfter opening'
    },
    {
      id: '9',
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      emailOpened: true,
      linkClicked: false,
      quizScore: '9/10'
    },
    {
      id: '10',
      name: 'Amanda Brown',
      email: 'amanda.brown@company.com',
      emailOpened: true,
      linkClicked: true,
      clickedAt: 'Nov 18, 2025 9:45 AM',
      quizScore: '7/10',
      timeToClick: '15 seconds\nAfter opening'
    }
  ]
};


export const getCampaignsByStatus = (status: CampaignStatus | 'all') => {
  if (status === 'all') return MOCK_CAMPAIGNS;
  return MOCK_CAMPAIGNS.filter(c => c.status === status);
};


export const getCampaignById = (id: string) => {
  return MOCK_CAMPAIGNS.find(c => c.id === id) || null;
};


export const getRecentCampaigns = (limit: number = 5) => {
  return MOCK_CAMPAIGNS
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};


export const getCampaignDetail = (campaignId: string) => {
  return MOCK_CAMPAIGN_DETAILS[campaignId] || MOCK_CAMPAIGN_DETAILS['1'];
};


export const getCampaignUserPerformance = (campaignId: string) => {
  return MOCK_CAMPAIGN_USER_PERFORMANCE[campaignId] || MOCK_CAMPAIGN_USER_PERFORMANCE['1'];
};