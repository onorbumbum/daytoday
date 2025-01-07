import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, TaskContextType } from '../types';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'position'>) => {
    const quadrantTasks = tasks.filter(t => t.quadrant === task.quadrant);
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      position: quadrantTasks.length,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const reorderTasks = (quadrant: 1 | 2 | 3 | 4, startIndex: number, endIndex: number) => {
    setTasks(prev => {
      const newTasks = [...prev];
      const quadrantTasks = newTasks.filter(t => t.quadrant === quadrant);
      const [removed] = quadrantTasks.splice(startIndex, 1);
      quadrantTasks.splice(endIndex, 0, removed);

      // Update positions for all tasks in the quadrant
      quadrantTasks.forEach((task, index) => {
        task.position = index;
      });

      // Replace old tasks with reordered ones
      return [
        ...newTasks.filter(t => t.quadrant !== quadrant),
        ...quadrantTasks
      ];
    });
  };

  const moveTask = (
    taskId: string,
    destinationQuadrant: 1 | 2 | 3 | 4,
    destinationIndex: number
  ) => {
    setTasks(prev => {
      const newTasks = [...prev];
      const taskToMove = newTasks.find(t => t.id === taskId);
      if (!taskToMove) return prev;

      // Remove task from its current position
      const remainingTasks = newTasks.filter(t => t.id !== taskId);
      
      // Update task's quadrant and position
      taskToMove.quadrant = destinationQuadrant;
      taskToMove.position = destinationIndex;

      // Get tasks in destination quadrant (excluding the moved task)
      const destinationTasks = remainingTasks.filter(t => t.quadrant === destinationQuadrant);

      // Insert task at new position
      destinationTasks.splice(destinationIndex, 0, taskToMove);

      // Update positions for all tasks in destination quadrant
      destinationTasks.forEach((task, index) => {
        task.position = index;
      });

      // Combine all tasks
      return [
        ...remainingTasks.filter(t => t.quadrant !== destinationQuadrant),
        ...destinationTasks
      ];
    });
  };

  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
    moveTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
