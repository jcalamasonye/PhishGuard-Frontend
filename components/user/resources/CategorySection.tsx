import React from 'react';
import { CATEGORY_ICONS } from '@/lib/constants/icons';

interface CategoryItem {
  title: string;
  readTime: string;
}

interface CategoryCardProps {
  title: string;
  icon: 'book' | 'wrench' | 'alert';
  items: CategoryItem[];
}

const iconColors = {
  book: 'bg-blue-100 text-blue-600',
  wrench: 'bg-purple-100 text-purple-600',
  alert: 'bg-cyan-100 text-cyan-600'
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, items }) => {
  const Icon = CATEGORY_ICONS[icon];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColors[icon]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <span className="text-sm text-gray-700">{item.title}</span>
            <span className="text-xs text-gray-500">{item.readTime}</span>
          </div>
        ))}
      </div>
    </div>
  );
};