
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TaskStats from '@/components/molecules/TaskStats';
import { TaskStats as TaskStatsType } from '@/types/Task';

describe('TaskStats', () => {
  const mockStats: TaskStatsType = {
    total: 5,
    completed: 2,
    pending: 3,
    overdue: 1,
  };

  it('renders all stats correctly', () => {
    render(<TaskStats stats={mockStats} />);
    
    expect(screen.getByText('Total: 5')).toBeInTheDocument();
    expect(screen.getByText('Active: 3')).toBeInTheDocument();
    expect(screen.getByText('Completed: 2')).toBeInTheDocument();
    expect(screen.getByText('Overdue: 1')).toBeInTheDocument();
  });

  it('does not show overdue when count is 0', () => {
    const statsWithoutOverdue = { ...mockStats, overdue: 0 };
    render(<TaskStats stats={statsWithoutOverdue} />);
    
    expect(screen.queryByText('Overdue: 0')).not.toBeInTheDocument();
  });

  it('applies correct styling for overdue tasks', () => {
    render(<TaskStats stats={mockStats} />);
    
    const overdueText = screen.getByText('Overdue: 1');
    expect(overdueText).toHaveClass('text-red-600');
  });
});
