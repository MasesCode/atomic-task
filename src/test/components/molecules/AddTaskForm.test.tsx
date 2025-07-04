
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import AddTaskForm from '@/components/molecules/AddTaskForm';

describe('AddTaskForm', () => {
  it('renders form elements', () => {
    const onAddTask = vi.fn();
    render(<AddTaskForm onAddTask={onAddTask} />);
    
    expect(screen.getAllByPlaceholderText('Add a new task...').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Add Task').length).toBeGreaterThan(0);
  });

  it('calls onAddTask when form is submitted with valid data', () => {
    const onAddTask = vi.fn();
    render(<AddTaskForm onAddTask={onAddTask} />);
    
    // Pegar o primeiro input (versão desktop)
    const input = screen.getAllByPlaceholderText('Add a new task...')[0];
    const submitButton = screen.getAllByText('Add Task')[0];
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(submitButton);
    
    expect(onAddTask).toHaveBeenCalledWith('New Task', undefined, undefined);
  });

  it('does not submit empty task', () => {
    const onAddTask = vi.fn();
    render(<AddTaskForm onAddTask={onAddTask} />);
    
    const submitButton = screen.getAllByText('Add Task')[0];
    fireEvent.click(submitButton);
    
    expect(onAddTask).not.toHaveBeenCalled();
  });

  it('clears form after successful submission', () => {
    const onAddTask = vi.fn();
    render(<AddTaskForm onAddTask={onAddTask} />);
    
    const input = screen.getAllByPlaceholderText('Add a new task...')[0] as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getAllByText('Add Task')[0]);
    
    expect(input.value).toBe('');
  });
});
