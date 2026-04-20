
'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, checked, ...props }, ref) => {
    return (
      <div className={cn('w-full', className)}>
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative flex items-center">
            <input
              ref={ref}
              type="checkbox"
              checked={checked}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-300 bg-white transition-all checked:border-[#2773F8] checked:bg-[#2773F8] hover:border-[#2773F8] focus:outline-none focus:ring-2 focus:ring-[#2773F8] focus:ring-opacity-20 disabled:cursor-not-allowed disabled:bg-gray-100"
              {...props}
            />
            <Check 
              size={14} 
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" 
              strokeWidth={3}
            />
          </div>
          
          {label && (
            <span className="text-sm text-gray-700 select-none">
              {label}
            </span>
          )}
        </label>
        
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;