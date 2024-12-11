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
    const quadrantTasks = tasks.filter(t => t.quadrant === quadrant);
    const [removed] = quadrantTasks.splice(startIndex, 1);
    quadrantTasks.splice(endIndex, 0, removed);

    const updatedTasks = tasks.filter(t => t.quadrant !== quadrant);
    quadrantTasks.forEach((task, index) => {
      task.position = index;
    });

    setTasks([...updatedTasks, ...quadrantTasks]);
  };

  const moveTask = (
    taskId: string,
    sourceQuadrant: 1 | 2 | 3 | 4,
    destinationQuadrant: 1 | 2 | 3 | 4,
    destinationIndex: number
  ) => {
    const taskToMove = tasks.find(t => t.id === taskId);
    if (!taskToMove) return;

    const updatedTasks = tasks.filter(t => t.id !== taskId);
    const destinationTasks = tasks.filter(t => t.quadrant === destinationQuadrant);
    
    taskToMove.quadrant = destinationQuadrant;
    taskToMove.position = destinationIndex;

    // Update positions for tasks after the insertion point
    destinationTasks.forEach(task => {
      if (task.position >= destinationIndex) {
        task.position += 1;
      }
    });

    setTasks([...updatedTasks, taskToMove]);
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
