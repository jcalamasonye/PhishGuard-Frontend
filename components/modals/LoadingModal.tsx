'use client';

import React from 'react';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface LoadingModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative bg-white rounded-lg shadow-xl p-8 text-center max-w-sm mx-4">
        <p className="text-gray-600 mb-6 whitespace-pre-line">{message}</p>
        
        <Button onClick={onClose} variant="primary" className="gap-2">
          <X className="w-4 h-4" />
          Close
        </Button>
      </div>
    </div>
  );
};