import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import Image from 'next/image';

interface HeaderProps {
  userName: string;
  userRole: string;
  userAvatar?: string;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  userRole,
  userAvatar,
  notificationCount = 0
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Image
              src="/Images/PhishGuardLogo.png"
              alt="PhishGuard"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-600">Phish Guard</h1>
            {userRole === 'admin' && (
              <p className="text-xs text-gray-500">Admin Portal</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {notificationCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <Avatar src={userAvatar} alt={userName} size="md" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};