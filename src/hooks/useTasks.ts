
import { useState, useCallback, useMemo } from 'react';
import { Task, TaskStats } from '@/types/Task';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from '@/hooks/use-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  const { toast } = useToast();

  const stats: TaskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const now = new Date();
    
    const overdue = tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const taskDueDate = new Date(task.dueDate);
      if (task.dueTime) {
        const [hours, minutes] = task.dueTime.split(':');
        taskDueDate.setHours(parseInt(hours), parseInt(minutes));
      }
      return taskDueDate < now;
    }).length;
    
    return { total, completed, pending, overdue };
  }, [tasks]);

  const addTask = useCallback((name: string, dueDate?: Date, dueTime?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      completed: false,
      createdAt: new Date(),
      dueDate,
      dueTime
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    
    toast({
      title: "Task added!",
      description: `"${name}" was added to your list.`,
    });
  }, [setTasks, toast]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    
    if (taskToDelete) {
      toast({
        title: "Task removed!",
        description: `"${taskToDelete.name}" was removed from your list.`,
      });
    }
  }, [setTasks, tasks, toast]);

  const editTask = useCallback((id: string, newName: string, dueDate?: Date, dueTime?: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, name: newName, dueDate, dueTime }
          : task
      )
    );

    toast({
      title: "Task updated!",
      description: `Task updated to "${newName}".`,
    });
  }, [setTasks, toast]);

  const clearCompleted = useCallback(() => {
    const completedCount = tasks.filter(task => task.completed).length;
    
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    
    toast({
      title: "Completed tasks cleared!",
      description: `${completedCount} completed task(s) removed.`,
    });
  }, [setTasks, tasks, toast]);

  return {
    tasks,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted
  };
};
