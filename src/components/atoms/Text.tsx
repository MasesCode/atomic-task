
import React from 'react';
import { cn } from '@/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  children: React.ReactNode;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ 
    as: Component = 'p', 
    variant = 'body', 
    className, 
    children,
    ...props
  }, ref) => {
    const variants = {
      title: 'text-2xl font-bold text-gray-900',
      subtitle: 'text-lg font-semibold text-gray-800',
      body: 'text-sm text-gray-700',
      caption: 'text-xs text-gray-500'
    };

    const ElementComponent = Component as React.ElementType;

    return (
      <ElementComponent 
        ref={ref} 
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </ElementComponent>
    );
  }
);

Text.displayName = 'Text';

export default Text;
