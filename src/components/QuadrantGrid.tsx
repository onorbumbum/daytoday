import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Quadrant } from './Quadrant';
import { TaskModal } from './TaskModal';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';

const QUADRANT_TITLES = {
  1: 'Urgent & Important',
  2: 'Important & Not Urgent',
  3: 'Urgent & Not Important',
  4: 'Not Urgent & Not Important',
} as const;

type QuadrantId = keyof typeof QUADRANT_TITLES;

export const QuadrantGrid: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, reorderTasks, moveTask } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantId>(1);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    const sourceQuadrant = Number(source.droppableId) as QuadrantId;
    const destinationQuadrant = Number(destination.droppableId) as QuadrantId;

    // Reordering within the same quadrant
    if (sourceQuadrant === destinationQuadrant) {
      reorderTasks(destinationQuadrant, source.index, destination.index);
    }
    // Moving between quadrants
    else {
      moveTask(draggableId, destinationQuadrant, destination.index);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskComplete = (taskId: string, isCompleted: boolean) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask({ ...task, isCompleted });
    }
  };

  const handleQuadrantDoubleClick = (quadrantId: QuadrantId) => {
    setSelectedQuadrant(quadrantId);
    setSelectedTask(undefined);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'position'>) => {
    if (selectedTask) {
      updateTask({ ...selectedTask, ...taskData });
    } else {
      addTask(taskData);
    }
    setIsModalOpen(false);
    setSelectedTask(undefined);
  };

  const quadrants: [QuadrantId, string][] = [
    [1, QUADRANT_TITLES[1]],
    [2, QUADRANT_TITLES[2]],
    [3, QUADRANT_TITLES[3]],
    [4, QUADRANT_TITLES[4]],
  ];

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-extralight text-center">Day Today</h1>
      </div>

      <div className="relative flex-1 min-h-[800px]">
        {/* Grid container with minimum height */}
        <div className="grid grid-cols-2 gap-6 h-full">
          <DragDropContext onDragEnd={handleDragEnd}>
            {quadrants.map(([id, title]) => (
              <Quadrant
                key={id}
                id={id}
                title={title}
                tasks={tasks.filter((task) => task.quadrant === id)}
                onTaskClick={handleTaskClick}
                onTaskComplete={handleTaskComplete}
                onQuadrantDoubleClick={handleQuadrantDoubleClick}
              />
            ))}
          </DragDropContext>
        </div>
        
        {/* Centered Add Task Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={() => {
              setSelectedQuadrant(1);
              setSelectedTask(undefined);
              setIsModalOpen(true);
            }}
            className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-400 to-teal-600 text-white shadow-2xl flex items-center justify-center transform transition-all duration-300 font-bold hover:scale-110 hover:shadow-3xl z-50"
          >
            <div className="text-center">
              <span className="text-5xl block mb-1">+</span>
            </div>
          </button>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(undefined);
        }}
        onSave={handleSaveTask}
        onDelete={deleteTask}
        initialTask={selectedTask}
        initialQuadrant={selectedQuadrant}
      />
    </div>
  );
};
