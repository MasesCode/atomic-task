
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import TodoPage from '@/pages/TodoPage';

// Mock all the hooks and components
vi.mock('@/hooks/useTasks', () => ({
  useTasks: () => ({
    tasks: [],
    stats: { total: 0, completed: 0, pending: 0, overdue: 0 },
    addTask: vi.fn(),
    toggleTask: vi.fn(),
    deleteTask: vi.fn(),
    editTask: vi.fn(),
    clearCompleted: vi.fn(),
  }),
}));

vi.mock('@/hooks/useNotifications', () => ({
  useNotifications: vi.fn(),
}));

vi.mock('@/components/templates/TodoTemplate', () => ({
  default: ({ header, stats, addTaskForm, taskList }: any) => (
    <div>
      <div data-testid="header">{header}</div>
      <div data-testid="stats">{stats}</div>
      <div data-testid="add-task-form">{addTaskForm}</div>
      <div data-testid="task-list">{taskList}</div>
    </div>
  ),
}));

describe('TodoPage', () => {
  it('renders all components', () => {
    render(<TodoPage />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('stats')).toBeInTheDocument();
    expect(screen.getByTestId('add-task-form')).toBeInTheDocument();
    expect(screen.getByTestId('task-list')).toBeInTheDocument();
  });
});
