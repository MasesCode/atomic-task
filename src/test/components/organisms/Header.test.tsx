
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Header from '@/components/organisms/Header';
import { TaskStats } from '@/types/Task';

describe('Header', () => {
  const mockStats: TaskStats = {
    total: 5,
    completed: 2,
    pending: 3,
    overdue: 0,
  };

  const mockProps = {
    stats: mockStats,
    onClearCompleted: vi.fn(),
  };

  it('renders header title', () => {
    render(<Header {...mockProps} />);
    
    expect(screen.getByText('Atomic Todo Manager')).toBeInTheDocument();
    expect(screen.getByText('Advanced task management with smart notifications')).toBeInTheDocument();
  });

  it('shows clear completed button when there are completed tasks', () => {
    render(<Header {...mockProps} />);
    
    expect(screen.getByText('Clear Completed (2)')).toBeInTheDocument();
  });

  it('does not show clear completed button when no completed tasks', () => {
    const statsWithoutCompleted = { ...mockStats, completed: 0 };
    render(<Header {...mockProps} stats={statsWithoutCompleted} />);
    
    expect(screen.queryByText(/Clear Completed/)).not.toBeInTheDocument();
  });

  it('calls onClearCompleted when button is clicked', () => {
    render(<Header {...mockProps} />);
    
    const clearButton = screen.getByText('Clear Completed (2)');
    fireEvent.click(clearButton);
    
    expect(mockProps.onClearCompleted).toHaveBeenCalled();
  });
});
