
import { useState } from 'react';
import { Task } from '@/types/Task';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (key === 'todo-tasks' && Array.isArray(parsed)) {
          return parsed.map((task: Omit<Task, 'createdAt' | 'dueDate'> & { createdAt: string; dueDate?: string }) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined
          })) as T;
        }
        return parsed;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
