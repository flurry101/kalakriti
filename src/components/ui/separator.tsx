import { FC } from 'react';

interface SeparatorProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Separator: FC<SeparatorProps> = ({ 
  className = '', 
  orientation = 'horizontal' 
}) => {
  return (
    <div
      className={`${
        orientation === 'horizontal' 
          ? 'h-px w-full bg-gray-200' 
          : 'w-px h-full bg-gray-200'
      } ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
};