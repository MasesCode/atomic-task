
import React from 'react';
import { Task } from '@/types/Task';
import TaskItem from '@/components/molecules/TaskItem';
import Text from '@/components/atoms/Text';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newName: string, dueDate?: Date, dueTime?: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  onEditTask 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <Text variant="subtitle" className="text-gray-500 mb-2">
          No tasks found
        </Text>
        <Text variant="body" className="text-gray-400">
          Add a new task to get started!
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
