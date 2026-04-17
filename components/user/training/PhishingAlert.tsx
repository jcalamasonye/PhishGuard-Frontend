import React from 'react';
import { AlertCircle } from 'lucide-react';

export const PhishingAlert: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              You just clicked a<br />Phishing link!
            </h1>
            <p className="text-xl text-blue-100">
              Don&apos;t worry, this is a safe training simulation. Continue reading to learn what went wrong.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/20">
              <AlertCircle className="w-48 h-48 text-white/90" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};