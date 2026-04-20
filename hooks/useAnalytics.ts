import { useState, useCallback, useEffect } from 'react';

interface AnalyticsData {
  totalUsers: number;
  activeCampaigns: number;
  avgClickRate: number;
  avgQuizScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface UseAnalyticsReturn {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useAnalytics(): UseAnalyticsReturn {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(() => {
    setLoading(true);
    setError(null);

    
    setTimeout(() => {
      setData({
        totalUsers: 150,
        activeCampaigns: 8,
        avgClickRate: 23.5,
        avgQuizScore: 78.2,
        riskLevel: 'medium'
      });
      setLoading(false);
    }, 800);
  }, []);

  const refresh = useCallback(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    data,
    loading,
    error,
    refresh
  };
}