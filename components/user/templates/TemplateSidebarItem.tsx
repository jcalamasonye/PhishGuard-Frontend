import React from 'react';
import { Lock, User, Package, CreditCard, Wrench, Share2, Shield, Key, Clipboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateSidebarItemProps {
  name: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  lock: Lock,
  user: User,
  package: Package,
  credit: CreditCard,
  wrench: Wrench,
  share: Share2,
  shield: Shield,
  key: Key,
  clipboard: Clipboard
};

export const TemplateSidebarItem: React.FC<TemplateSidebarItemProps> = ({
  name,
  icon,
  isActive,
  onClick
}) => {
  const Icon = iconMap[icon] || Shield;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium truncate">{name}</span>
    </button>
  );
};