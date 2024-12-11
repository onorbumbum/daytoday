import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task as TaskComponent } from './Task';
import { Task as TaskType } from '../types';

interface QuadrantProps {
  id: 1 | 2 | 3 | 4;
  title: string;
  tasks: TaskType[];
  onTaskClick: (task: TaskType) => void;
  onTaskComplete: (taskId: string, isCompleted: boolean) => void;
  onQuadrantDoubleClick: (quadrantId: 1 | 2 | 3 | 4) => void;
}

const getQuadrantColor = (id: 1 | 2 | 3 | 4) => {
  switch (id) {
    case 1: // Urgent & Important
      return 'bg-gradient-to-tr from-red-300 to-red-600';
    case 2: // Important & Not Urgent
      return 'bg-gradient-to-tr from-yellow-300 to-yellow-600';
    case 3: // Urgent & Not Important
      return 'bg-gradient-to-tr from-orange-300 to-orange-600';
    case 4: // Not Urgent & Not Important
      return 'bg-gradient-to-tr from-slate-300 to-slate-600';
    default:
      return '';
  }
};

export const Quadrant: React.FC<QuadrantProps> = ({
  id,
  title,
  tasks,
  onTaskClick,
  onTaskComplete,
  onQuadrantDoubleClick,
}) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Move completed tasks to the bottom
    if (a.isCompleted && !b.isCompleted) return 1;
    if (!a.isCompleted && b.isCompleted) return -1;
    // Otherwise, sort by position
    return a.position - b.position;
  });

  return (
    <div className={`quadrant p-4 rounded-lg shadow ${getQuadrantColor(id)}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-center w-full font-semibold text-white">{title}</h2>
        <button
          onClick={() => onQuadrantDoubleClick(id)}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600 text-white pb-1 text-lg transition-colors"
          title={`Add task to ${title}`}
        >
          +
        </button>
      </div>
      <Droppable droppableId={String(id)}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="quadrant-container min-h-[200px]"
          >
            {sortedTasks.map((task, index) => (
              <TaskComponent
                key={task.id}
                task={task}
                index={index}
                onTaskClick={onTaskClick}
                onTaskComplete={onTaskComplete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
