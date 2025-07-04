
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import AddTaskForm from '@/components/molecules/AddTaskForm';

describe('AddTaskForm', () => {
  it('renders form elements', () => {
    const onAddTask = vi.fn();
    render(<AddTaskForm onAddTask={onAddTask} />);
    
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  it('calls onAddTask when form is submitted with valid data', () => {
    const onAddTask = vi.fn();
    render(<AddTaskForm onAddTask={onAddTask} />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const submitButton = screen.getByText('Add Task');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(submitButton);
    
    expect(onAddTask).toHaveBeenCalledWith('New Task', undefined, undefined);
  });

  it('does not submit empty task', () => {
    const onAddTask = vi.fn();
    render(<AddTaskForm onAddTask={onAddTask} />);
    
    const submitButton = screen.getByText('Add Task');
    fireEvent.click(submitButton);
    
    expect(onAddTask).not.toHaveBeenCalled();
  });

  it('clears form after successful submission', () => {
    const onAddTask = vi.fn();
    render(<AddTaskForm onAddTask={onAddTask} />);
    
    const input = screen.getByPlaceholderText('Add a new task...') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add Task'));
    
    expect(input.value).toBe('');
  });
});
