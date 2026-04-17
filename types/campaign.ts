export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'completed';

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  dateSent: string | null;
  recipients: number;
  openRate: number | null;
  clickRate: number | null;
  status: CampaignStatus;
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignFilters {
  status: CampaignStatus | 'all';
  dateFrom: string;
  dateTo: string;
  searchQuery: string;
}

export interface CreateCampaignData {
  name: string;
  description?: string;
  templateId: string;
  recipientIds: string[];
  scheduledDate?: string;
  scheduledTime?: string;
}

export interface CampaignWizardStep {
  number: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  isComplete: boolean;
  isActive: boolean;
}