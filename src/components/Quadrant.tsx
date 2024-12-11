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

  const handleDoubleClick = (e: React.MouseEvent) => {
    // Only trigger if clicking directly on the quadrant, not on tasks
    if ((e.target as HTMLElement).classList.contains('quadrant-container')) {
      onQuadrantDoubleClick(id);
    }
  };

  return (
    <div className="quadrant">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Droppable droppableId={String(id)}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="quadrant-container min-h-[200px]"
            onDoubleClick={handleDoubleClick}
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
