'use client';

import React, { useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { UserSidebar } from '@/components/user/SideBar';
import Button from '@/components/ui/Button';
import { EmailPreview } from '@/components/user/templates/EmailPreview';
import { TemplateSidebarItem } from '@/components/user/templates/TemplateSidebarItem';
import { useAuth } from '@/context/AuthContext';
import { MOCK_ALL_USER_TEMPLATES, getUserTemplatesByCategory } from '@/lib/mock-data';

const TemplatesPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'phishing' | 'system'>('phishing');
  const [selectedTemplateId, setSelectedTemplateId] = useState('password-reset-phishing');
  const [isMobileView, setIsMobileView] = useState(false);

  const phishingTemplates = getUserTemplatesByCategory('phishing');
  const systemTemplates = getUserTemplatesByCategory('system');
  const currentTemplates = activeTab === 'phishing' ? phishingTemplates : systemTemplates;
  const selectedTemplate = MOCK_ALL_USER_TEMPLATES.find(t => t.id === selectedTemplateId) || MOCK_ALL_USER_TEMPLATES[0];

  return (
    <>
      <Header
        userName={user?.name || ''}
        userRole="user"
        notificationCount={0}
      />

      <UserSidebar />

      <main className="ml-64 mt-[73px] p-6 min-h-screen bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Templates</h1>
          <p className="text-gray-600">Phishing simulation and system email templates</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('phishing')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'phishing'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Phishing Emails <span className="ml-2 text-gray-500">{phishingTemplates.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'system'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              System Emails <span className="ml-2 text-gray-500">{systemTemplates.length}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsMobileView(true)}
              variant={isMobileView ? 'primary' : 'outline'}
              size="sm"
              className="gap-2"
            >
              <Smartphone className="w-4 h-4" />
              Mobile View
            </Button>
            <Button
              onClick={() => setIsMobileView(false)}
              variant={!isMobileView ? 'primary' : 'outline'}
              size="sm"
              className="gap-2"
            >
              <Monitor className="w-4 h-4" />
              Desktop View
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <div className="space-y-3">
              {currentTemplates.map(template => (
                <TemplateSidebarItem
                  key={template.id}
                  name={template.name}
                  icon={template.icon}
                  isActive={selectedTemplateId === template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                />
              ))}
            </div>
          </div>

          <div className="col-span-9">
            <EmailPreview template={selectedTemplate} isMobileView={isMobileView} />
          </div>
        </div>
      </main>
    </>
  );
};

export default TemplatesPage;
