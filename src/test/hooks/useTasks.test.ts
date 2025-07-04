
import { renderHook, act } from '@testing-library/react';
import { useTasks } from '@/hooks/useTasks';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock localStorage hook
vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(() => [[], vi.fn()]),
}));

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty tasks and correct stats', () => {
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.tasks).toEqual([]);
    expect(result.current.stats).toEqual({
      total: 0,
      completed: 0,
      pending: 0,
      overdue: 0,
    });
  });

  it('should add a new task', () => {
    const mockSetTasks = vi.fn();
    const { useLocalStorage } = require('@/hooks/useLocalStorage');
    useLocalStorage.mockReturnValue([[], mockSetTasks]);

    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.addTask('Test Task');
    });

    expect(mockSetTasks).toHaveBeenCalled();
  });

  it('should toggle task completion', () => {
    const mockTasks = [
      {
        id: '1',
        name: 'Test Task',
        completed: false,
        createdAt: new Date(),
      },
    ];
    const mockSetTasks = vi.fn();
    const { useLocalStorage } = require('@/hooks/useLocalStorage');
    useLocalStorage.mockReturnValue([mockTasks, mockSetTasks]);

    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.toggleTask('1');
    });

    expect(mockSetTasks).toHaveBeenCalled();
  });

  it('should delete a task', () => {
    const mockTasks = [
      {
        id: '1',
        name: 'Test Task',
        completed: false,
        createdAt: new Date(),
      },
    ];
    const mockSetTasks = vi.fn();
    const { useLocalStorage } = require('@/hooks/useLocalStorage');
    useLocalStorage.mockReturnValue([mockTasks, mockSetTasks]);

    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.deleteTask('1');
    });

    expect(mockSetTasks).toHaveBeenCalled();
  });
});
