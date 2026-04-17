import React from 'react';
import Button from '@/components/ui/Button';
import { Plus, UserPlus, FileText } from 'lucide-react';

interface QuickActionsProps {
  onCreateCampaign: () => void;
  onAddUsers: () => void;
  onViewReports: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateCampaign,
  onAddUsers,
  onViewReports
}) => {
  return (
    <div className="flex gap-3">
      <Button onClick={onCreateCampaign} variant="primary" className="gap-2">
        <Plus className="w-4 h-4" />
        Create New Campaign
      </Button>
      
      <Button onClick={onAddUsers} variant="outline" className="gap-2">
        <UserPlus className="w-4 h-4" />
        Add Users
      </Button>
      
      <Button onClick={onViewReports} variant="outline" className="gap-2">
        <FileText className="w-4 h-4" />
        View Reports
      </Button>
    </div>
  );
};