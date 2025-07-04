
import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import DateInput from '@/components/atoms/DateInput';
import Button from '@/components/atoms/Button';
import { Plus, Calendar, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AddTaskFormProps {
  onAddTask: (name: string, dueDate?: Date, dueTime?: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      setError(true);
      return;
    }
    
    const parsedDate = dueDate ? new Date(dueDate) : undefined;
    const timeValue = dueTime || undefined;
    
    onAddTask(taskName.trim(), parsedDate, timeValue);
    setTaskName('');
    setDueDate('');
    setDueTime('');
    setError(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
    if (error) setError(false);
  };

  return (
    <TooltipProvider>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  type="text"
                  placeholder="Add a new task..."
                  value={taskName}
                  onChange={handleInputChange}
                  error={error}
                  className="flex-1 h-12 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter your task description</p>
              </TooltipContent>
            </Tooltip>
            
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <DateInput
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-40 h-12 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set due date (optional)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="w-32 h-12 px-4 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set due time (optional)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 h-12"
                >
                  <Plus size={20} />
                  Add Task
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new task to your list</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </form>
      </div>
    </TooltipProvider>
  );
};

export default AddTaskForm;
