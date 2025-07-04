
import React from 'react';
import { TaskStats as TaskStatsType } from '@/types/Task';
import Text from '@/components/atoms/Text';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TaskStatsProps {
  stats: TaskStatsType;
}

const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <TooltipProvider>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <Text variant="body" className="text-gray-600 font-medium text-sm sm:text-base">
                    Total: {stats.total}
                  </Text>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total number of tasks in your list</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <Text variant="body" className="text-gray-600 font-medium text-sm sm:text-base">
                    Active: {stats.pending}
                  </Text>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tasks that are still pending completion</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <Text variant="body" className="text-gray-600 font-medium text-sm sm:text-base">
                    Completed: {stats.completed}
                  </Text>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tasks that have been completed</p>
              </TooltipContent>
            </Tooltip>

            {stats.overdue > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <Text variant="body" className="text-red-600 font-medium text-sm sm:text-base">
                      Overdue: {stats.overdue}
                    </Text>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tasks that are past their due date</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TaskStats;
