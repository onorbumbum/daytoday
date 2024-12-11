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
      reorderTasks(sourceQuadrant, source.index, destination.index);
    }
    // Moving between quadrants
    else {
      moveTask(draggableId, sourceQuadrant, destinationQuadrant, destination.index);
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
      addTask({ ...taskData, quadrant: selectedQuadrant });
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Eisenhower Matrix</h1>
        <button
          onClick={() => {
            setSelectedQuadrant(1);
            setSelectedTask(undefined);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
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

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(undefined);
        }}
        onSave={handleSaveTask}
        onDelete={deleteTask}
        initialTask={selectedTask}
      />
    </div>
  );
};
