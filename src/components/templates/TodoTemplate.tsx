
import React from 'react';

interface TodoTemplateProps {
  header: React.ReactNode;
  stats: React.ReactNode;
  addTaskForm: React.ReactNode;
  taskList: React.ReactNode;
}

const TodoTemplate: React.FC<TodoTemplateProps> = ({
  header,
  stats,
  addTaskForm,
  taskList
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 max-w-4xl">
        {header}
        {stats}
        {addTaskForm}
        {taskList}
      </div>
    </div>
  );
};

export default TodoTemplate;
