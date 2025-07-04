
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import TaskItem from '@/components/molecules/TaskItem';
import { Task } from '@/types/Task';

describe('TaskItem', () => {
  const mockTask: Task = {
    id: '1',
    name: 'Test Task',
    completed: false,
    createdAt: new Date('2024-01-01'),
    dueDate: new Date('2024-12-31'),
    dueTime: '14:30',
  };

  const mockProps = {
    task: mockTask,
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task information', () => {
    render(<TaskItem {...mockProps} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText(/Created on/)).toBeInTheDocument();
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem {...mockProps} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockProps.onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TaskItem {...mockProps} />);
    
    // O botão de delete tem um ícone X mas não tem texto "delete", então vamos buscar pelo tooltip ou posição
    const deleteButton = screen.getByRole('button', { name: '' });
    fireEvent.click(deleteButton);
    
    expect(mockProps.onDelete).toHaveBeenCalledWith('1');
  });

  it('enters edit mode when edit button is clicked', () => {
    render(<TaskItem {...mockProps} />);
    
    // Buscar especificamente pelo botão "Edit" (não pelo texto dentro do aria-label)
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  it('shows overdue indicator for overdue tasks', () => {
    const overdueTask = {
      ...mockTask,
      dueDate: new Date('2020-01-01'),
    };
    
    render(<TaskItem {...mockProps} task={overdueTask} />);
    
    // Buscar pelo ícone de AlertTriangle através da classe CSS
    const container = document.querySelector('.lucide-triangle-alert');
    expect(container).toBeInTheDocument();
  });
});
