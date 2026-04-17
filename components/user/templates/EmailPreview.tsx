import React from 'react';
import { UserEmailTemplate } from '@/types/template';

interface EmailPreviewProps {
  template: UserEmailTemplate;
  isMobileView: boolean;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ template, isMobileView }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${
      isMobileView ? 'max-w-sm mx-auto' : 'w-full'
    }`}>
      <div className="border-b border-gray-200 p-6 bg-gray-50">
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-1">From:</p>
          <p className="text-sm text-gray-900">
            {template.from} <span className="text-gray-600">({template.fromEmail})</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Subject:</p>
          <p className="text-sm font-semibold text-gray-900">{template.subject}</p>
        </div>
      </div>

      {/* Email Body */}
      <div className="p-6">
        <div 
          className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-6"
          dangerouslySetInnerHTML={{ __html: template.body }}
        />

        {template.buttonText && (
          <div className="mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
              {template.buttonText}
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-800 text-white p-6 text-center">
        <p className="text-xs leading-relaxed mb-3 text-gray-300">
          {template.footerText}
        </p>

        {template.footerCompany && (
          <p className="text-xs text-gray-400 mb-3">
            {template.footerCompany}
          </p>
        )}

        {template.footerLinks && template.footerLinks.length > 0 && (
          <div className="flex items-center justify-center gap-4 mb-3">
            {template.footerLinks.map((link, index) => (
              
              <a
                key={index}
                href={link.url}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        )}

        {template.footerCopyright && (
          <p className="text-xs text-gray-500">
            {template.footerCopyright}
          </p>
        )}
      </div>
    </div>
  );
};