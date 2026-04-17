'use client';

import React, { useState } from 'react';
import { UserPlus, Upload, Download } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import { AddUserFormData } from '@/types/user';
import { useFormState } from '@/hooks/useFormState';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (data: AddUserFormData) => void;
  onImportCSV: (file: File) => void;
}

const DEPARTMENT_OPTIONS = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'HR' },
  { value: 'finance', label: 'Finance' }
];

type FormDataWithIndex = AddUserFormData & Record<string, unknown>;

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
  onImportCSV
}) => {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { formData, handleChange, handleFieldChange, resetForm, errors, setErrors } = useFormState<FormDataWithIndex>({
    fullName: '',
    email: '',
    department: '',
    sendWelcomeEmail: true
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AddUserFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (activeTab === 'single') {
      if (validateForm()) {
        onAddUser(formData as AddUserFormData);
        resetForm();
      }
    } else {
      if (!uploadedFile) {
        alert('Please select a CSV file to upload');
        return;
      }
      onImportCSV(uploadedFile);
      setUploadedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDownloadTemplate = () => {
    console.log('Download CSV template');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New User"
      icon={<UserPlus className="w-5 h-5 text-blue-600" />}
      size="md"
    >
      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'single'
                ? 'bg-white border-2 border-gray-300 text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Single User
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'bulk'
                ? 'bg-white border-2 border-gray-300 text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Bulk Upload
          </button>
        </div>

        {activeTab === 'single' ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName as string}
                onChange={handleChange}
                placeholder="Enter full name"
                error={errors.fullName}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email as string}
                onChange={handleChange}
                placeholder="user@company.com"
                error={errors.email}
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.department as string}
                onChange={(value) => handleFieldChange('department', value)}
                options={DEPARTMENT_OPTIONS}
                placeholder="Select department"
              />
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
              )}
            </div>

            <div>
              <Checkbox
                id="sendWelcomeEmail"
                checked={formData.sendWelcomeEmail as boolean}
                onChange={(e) => handleFieldChange('sendWelcomeEmail', e.target.checked)}
                label="Send welcome email with login credentials"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">CSV Format Requirements</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Columns: Full Name, Email, Department</li>
                <li>• One user per row</li>
                <li>• UTF-8 encoding</li>
              </ul>
              <Button
                onClick={handleDownloadTemplate}
                variant="ghost"
                size="sm"
                className="mt-3 gap-2"
              >
                <Download className="w-4 h-4" />
                Download Template
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Choose File
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          {activeTab === 'single' ? 'Add User' : 'Import Users'}
        </Button>
      </div>
    </Modal>
  );
};