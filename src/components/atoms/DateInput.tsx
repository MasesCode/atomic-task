import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ error, className, ...props }, ref) => {
    const baseClasses = 'w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
    const errorClasses = error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.setAttribute('lang', 'en-US');
      }
    }, [ref]);

    return (
      <input
        ref={ref}
        type="date"
        lang="en-US"
        className={cn(baseClasses, errorClasses, 'hover:border-gray-400', className)}
        {...props}
      />
    );
  }
);

DateInput.displayName = 'DateInput';

export default DateInput;
