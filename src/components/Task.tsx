import React from 'react';
import { Task as TaskType } from '../types';
import { Draggable } from '@hello-pangea/dnd';

interface TaskProps {
  task: TaskType;
  index: number;
  onTaskClick: (task: TaskType) => void;
  onTaskComplete: (taskId: string, isCompleted: boolean) => void;
}

export const Task: React.FC<TaskProps> = ({
  task,
  index,
  onTaskClick,
  onTaskComplete,
}) => {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTaskComplete(task.id, !task.isCompleted);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-item ${task.isCompleted ? 'completed' : ''}`}
          onClick={() => onTaskClick(task)}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => {}}
              onClick={handleCheckboxClick}
              className="w-4 h-4 rounded border-gray-300"
            />
            <h3 className="font-medium">{task.title}</h3>
          </div>
        </div>
      )}
    </Draggable>
  );
};
