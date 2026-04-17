'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'User avatar',
  size = 'md',
  fallback,
  className
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  const [imageError, setImageError] = React.useState(false);
  
  const showFallback = !src || imageError;

  return (
    <div 
      className={cn(
        'relative rounded-full overflow-hidden bg-blue-100 flex items-center justify-center font-semibold text-blue-600',
        sizeClasses[size],
        className
      )}
    >
      {!showFallback ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{fallback || alt.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};