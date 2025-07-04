import React, { useState } from 'react';
import { Task } from '@/types/Task';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import DateInput from '@/components/atoms/DateInput';
import Text from '@/components/atoms/Text';
import { X, Check, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string, dueDate?: Date, dueTime?: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.name);
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );
  const [editDueTime, setEditDueTime] = useState(task.dueTime || '');

  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false;
    const now = new Date();
    const taskDueDate = new Date(task.dueDate);
    if (task.dueTime) {
      const [hours, minutes] = task.dueTime.split(':');
      taskDueDate.setHours(parseInt(hours), parseInt(minutes));
    }
    return taskDueDate < now;
  };

  const handleEdit = () => {
    if (editValue.trim() && editValue !== task.name) {
      const parsedDate = editDueDate ? new Date(editDueDate) : undefined;
      onEdit(task.id, editValue.trim(), parsedDate, editDueTime || undefined);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditValue(task.name);
      setEditDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setEditDueTime(task.dueTime || '');
      setIsEditing(false);
    }
  };

  const formatDueDate = () => {
    if (!task.dueDate) return null;
    const date = new Date(task.dueDate);
    const dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const timeStr = task.dueTime || '';
    if (timeStr) {
      return `${dateStr} at ${timeStr}`;
    }
    return dateStr;
  };

  const formatCreatedDate = () => {
    try {
      const date = task.createdAt instanceof Date ? task.createdAt : new Date(task.createdAt);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting created date:', error);
      return 'Unknown date';
    }
  };

  return (
    <TooltipProvider>
      <div className={`group flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in ${
        isOverdue() ? 'border-red-300 bg-red-50' : 'border-gray-200'
      }`}>
        <div className="flex items-center flex-1 min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-shrink-0">
                <Checkbox
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{task.completed ? 'Mark as incomplete' : 'Mark as complete'}</p>
            </TooltipContent>
          </Tooltip>
          
          {isEditing ? (
            <div className="flex flex-col ml-3 flex-1 gap-2">
              <div className="flex items-center gap-2">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 text-sm sm:text-base"
                  autoFocus
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="primary" onClick={handleEdit}>
                      <Check size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save changes</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setEditValue(task.name);
                        setEditDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
                        setEditDueTime(task.dueTime || '');
                        setIsEditing(false);
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cancel editing</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-1 flex-1">
                  <Calendar size={14} className="text-gray-500 flex-shrink-0" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DateInput
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className="flex-1 text-sm"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Set due date</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1 flex-1">
                  <Clock size={14} className="text-gray-500 flex-shrink-0" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        type="time"
                        value={editDueTime}
                        onChange={(e) => setEditDueTime(e.target.value)}
                        className="flex-1 text-sm"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Set due time</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          ) : (
            <button 
              className="ml-3 flex-1 cursor-pointer text-left bg-transparent border-none p-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded min-w-0"
              onClick={() => setIsEditing(true)}
              aria-label="Click to edit task"
            >
              <div className="flex items-center gap-2 mb-1">
                {isOverdue() && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This task is overdue</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Text 
                      className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900'} truncate text-sm sm:text-base`}
                    >
                      {task.name}
                    </Text>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Double-click to edit</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <Text variant="caption" className="text-xs">
                  Created on {formatCreatedDate()}
                </Text>
                {formatDueDate() && (
                  <Text variant="caption" className={`flex items-center gap-1 text-xs ${isOverdue() ? 'text-red-600 font-medium' : 'text-blue-600'}`}>
                    <Calendar size={10} className="flex-shrink-0" />
                    Due: {formatDueDate()}
                  </Text>
                )}
              </div>
            </button>
          )}
        </div>
        
        {!isEditing && (
          <div className="flex items-center gap-2 mt-3 sm:mt-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="text-xs sm:text-sm"
                >
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit this task</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(task.id)}
                >
                  <X size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete this task</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default TaskItem;
