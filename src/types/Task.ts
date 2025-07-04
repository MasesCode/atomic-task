
export interface Task {
  id: string;
  name: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  dueTime?: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}
