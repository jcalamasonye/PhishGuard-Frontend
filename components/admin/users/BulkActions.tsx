import React from 'react';
import Button from '@/components/ui/Button';
import { Send, Download, Trash2 } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onSendData: () => void;
  onExport: () => void;
  onDelete: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onSendData,
  onExport,
  onDelete
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
      <span className="text-sm font-medium text-gray-900">
        {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
      </span>
      
      <div className="flex gap-2">
        <Button onClick={onSendData} variant="outline" size="sm" className="gap-2 bg-white">
          <Send className="w-4 h-4" />
          Send Data
        </Button>
        <Button onClick={onExport} variant="outline" size="sm" className="gap-2 bg-white">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
        <Button 
          onClick={onDelete} 
          variant="outline" 
          size="sm" 
          className="gap-2 text-red-600 hover:bg-red-50 border-red-300 bg-white"
        >
          <Trash2 className="w-4 h-4" />
          Delete Selected
        </Button>
      </div>
    </div>
  );
};