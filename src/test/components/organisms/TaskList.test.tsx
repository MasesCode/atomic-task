
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import TaskList from '@/components/organisms/TaskList';
import { Task } from '@/types/Task';

describe('TaskList', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      name: 'Task 1',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Task 2',
      completed: true,
      createdAt: new Date(),
    },
  ];

  const mockProps = {
    tasks: mockTasks,
    onToggleTask: vi.fn(),
    onDeleteTask: vi.fn(),
    onEditTask: vi.fn(),
  };

  it('renders all tasks', () => {
    render(<TaskList {...mockProps} />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('shows empty state when no tasks', () => {
    render(<TaskList {...mockProps} tasks={[]} />);
    
    expect(screen.getByText('No tasks found')).toBeInTheDocument();
    expect(screen.getByText('Add a new task to get started!')).toBeInTheDocument();
  });

  it('renders correct number of task items', () => {
    render(<TaskList {...mockProps} />);
    
    const taskItems = screen.getAllByRole('checkbox');
    expect(taskItems).toHaveLength(2);
  });
});
