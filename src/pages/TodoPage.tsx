
import React from 'react';
import TodoTemplate from '@/components/templates/TodoTemplate';
import Header from '@/components/organisms/Header';
import TaskList from '@/components/organisms/TaskList';
import AddTaskForm from '@/components/molecules/AddTaskForm';
import TaskStats from '@/components/molecules/TaskStats';
import { useTasks } from '@/hooks/useTasks';
import { useNotifications } from '@/hooks/useNotifications';

const TodoPage: React.FC = () => {
  const {
    tasks,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted
  } = useTasks();

  useNotifications(tasks);

  return (
    <TodoTemplate
      header={
        <Header 
          stats={stats} 
          onClearCompleted={clearCompleted} 
        />
      }
      stats={<TaskStats stats={stats} />}
      addTaskForm={<AddTaskForm onAddTask={addTask} />}
      taskList={
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
      }
    />
  );
};

export default TodoPage;
