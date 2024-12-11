export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  quadrant: 1 | 2 | 3 | 4;
  position: number;
}

export interface Quadrant {
  id: 1 | 2 | 3 | 4;
  title: string;
  tasks: Task[];
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'position'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  reorderTasks: (quadrant: 1 | 2 | 3 | 4, startIndex: number, endIndex: number) => void;
  moveTask: (
    taskId: string,
    sourceQuadrant: 1 | 2 | 3 | 4,
    destinationQuadrant: 1 | 2 | 3 | 4,
    destinationIndex: number
  ) => void;
}
