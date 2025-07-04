
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <label className="inline-flex items-center cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          {...props}
        />
        <div className={cn(
          'w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center',
          'group-hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1',
          props.checked 
            ? 'bg-blue-600 border-blue-600' 
            : 'bg-white border-gray-300',
          className
        )}>
          {props.checked && (
            <Check 
              size={12} 
              className="text-white transition-all duration-150 ease-in-out transform scale-100" 
            />
          )}
        </div>
      </div>
      {label && (
        <span className={cn(
          'ml-2 text-sm transition-colors duration-200',
          props.checked ? 'text-gray-500 line-through' : 'text-gray-700'
        )}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
