'use client';

import React from 'react';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = 'Successful',
  message
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6 whitespace-pre-line">{message}</p>
        
        <Button onClick={onClose} variant="primary" className="gap-2">
          <X className="w-4 h-4" />
          Close
        </Button>
      </div>
    </div>
  );
};