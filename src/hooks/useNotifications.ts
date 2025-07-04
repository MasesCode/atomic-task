
import { useEffect } from 'react';
import { Task } from '@/types/Task';
import { useToast } from '@/hooks/use-toast';

export const useNotifications = (tasks: Task[]) => {
  const { toast } = useToast();

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const upcomingTasks = tasks.filter(task => {
        if (task.completed || !task.dueDate) return false;
        
        const taskDueDate = new Date(task.dueDate);
        if (task.dueTime) {
          const [hours, minutes] = task.dueTime.split(':');
          taskDueDate.setHours(parseInt(hours), parseInt(minutes));
        }
        
        // Check if task is due within next 30 minutes
        const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);
        return taskDueDate <= thirtyMinutesFromNow && taskDueDate > now;
      });

      if (upcomingTasks.length > 0) {
        toast({
          title: "⏰ Task Reminder",
          description: `You have ${upcomingTasks.length} task(s) due soon. Stay focused on your commitments!`,
        });
      } else if (tasks.filter(t => !t.completed).length > 0) {
        toast({
          title: "📝 Stay Productive",
          description: "Don't forget about your pending tasks. Keep up the great work!",
        });
      }
    };

    // Check immediately
    checkReminders();

    // Set up interval to check every minute
    const interval = setInterval(checkReminders, 60000);

    return () => clearInterval(interval);
  }, [tasks, toast]);
};
