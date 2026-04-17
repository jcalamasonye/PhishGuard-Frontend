import React from 'react';
import { Send, Edit, Trash2 } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';

interface UserProfileHeaderProps {
  name: string;
  email: string;
  department: string;
  avatar?: string;
  joinedDate: string;
  lastActive: string;
  onSendTest: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  name,
  email,
  department,
  avatar,
  joinedDate,
  lastActive,
  onSendTest,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar src={avatar} alt={name} size="xl" fallback={name} />
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
            <p className="text-gray-600 mb-1">{email}</p>
            <p className="text-sm text-gray-500">{department}</p>
            
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span>Joined: {joinedDate}</span>
              <span>•</span>
              <span>Last active: {lastActive}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={onSendTest} variant="primary" size="sm" className="gap-2">
            <Send className="w-4 h-4" />
            Send Test
          </Button>
          <Button onClick={onEdit} variant="outline" size="sm" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button onClick={onDelete} variant="outline" size="sm" className="gap-2 text-red-600 hover:bg-red-50 border-red-300">
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};