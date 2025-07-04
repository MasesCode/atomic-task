
import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    const baseClasses = 'w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
    const errorClasses = error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    return (
      <input
        ref={ref}
        className={cn(baseClasses, errorClasses, 'hover:border-gray-400', className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
