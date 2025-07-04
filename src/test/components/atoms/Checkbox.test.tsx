
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Checkbox from '@/components/atoms/Checkbox';

describe('Checkbox', () => {
  it('renders checkbox with label', () => {
    render(<Checkbox label="Check me" />);
    
    expect(screen.getByLabelText('Check me')).toBeInTheDocument();
  });

  it('handles check/uncheck events', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} label="Check me" />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows checked state correctly', () => {
    render(<Checkbox checked label="Checked" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders without label', () => {
    render(<Checkbox />);
    
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
