
import React from 'react';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import { TaskStats as TaskStatsType } from '@/types/Task';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HeaderProps {
  stats: TaskStatsType;
  onClearCompleted: () => void;
}

const Header: React.FC<HeaderProps> = ({ stats, onClearCompleted }) => {
  const hasCompletedTasks = stats.completed > 0;

  return (
    <TooltipProvider>
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-lg">✓</span>
          </div>
          <Text as="h1" variant="title" className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Atomic Todo Manager
          </Text>
        </div>
        <Text variant="body" className="text-gray-500 text-base sm:text-lg mb-4 sm:mb-6 px-4">
          Advanced task management with smart notifications
        </Text>
        
        {hasCompletedTasks && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="danger"
                onClick={onClearCompleted}
                className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base"
              >
                Clear Completed ({stats.completed})
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove all completed tasks from your list</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Header;
