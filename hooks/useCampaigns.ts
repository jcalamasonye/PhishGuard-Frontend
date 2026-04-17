import { useState, useCallback } from 'react';
import { Campaign } from '@/types/campaign';
import { MOCK_CAMPAIGNS } from '@/lib/mock-data';

interface UseCampaignsReturn {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  getCampaignById: (id: string) => Campaign | undefined;
  refreshCampaigns: () => void;
}

export function useCampaigns(): UseCampaignsReturn {
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCampaign = useCallback((newCampaign: Omit<Campaign, 'id'>) => {
    const campaign: Campaign = {
      ...newCampaign,
      id: `campaign-${Date.now()}`
    };
    setCampaigns(prev => [...prev, campaign]);
  }, []);

  const updateCampaign = useCallback((id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev =>
      prev.map(campaign =>
        campaign.id === id ? { ...campaign, ...updates } : campaign
      )
    );
  }, []);

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  }, []);

  const getCampaignById = useCallback((id: string) => {
    return campaigns.find(campaign => campaign.id === id);
  }, [campaigns]);

  const refreshCampaigns = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setCampaigns(MOCK_CAMPAIGNS);
      setLoading(false);
    }, 500);
  }, []);

  return {
    campaigns,
    loading,
    error,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaignById,
    refreshCampaigns
  };
}