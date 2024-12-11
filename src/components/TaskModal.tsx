import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Task } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'position'>) => void;
  onDelete?: (taskId: string) => void;
  initialTask?: Task;
  initialQuadrant?: 1 | 2 | 3 | 4;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialTask,
  initialQuadrant,
}) => {
  const [title, setTitle] = useState('');
  const [quadrant, setQuadrant] = useState<1 | 2 | 3 | 4>(1);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
  });

  useEffect(() => {
    if (isOpen && initialTask) {
      setTitle(initialTask.title);
      setQuadrant(initialTask.quadrant);
      editor?.commands.setContent(initialTask.description);
    } else if (isOpen) {
      setTitle('');
      setQuadrant(initialQuadrant || 1);
      editor?.commands.setContent('');
    }
  }, [isOpen, initialTask, initialQuadrant, editor]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: editor?.getHTML() || '',
      quadrant,
      isCompleted: initialTask?.isCompleted || false,
    });

    onClose();
  };

  const handleDelete = () => {
    if (initialTask && onDelete) {
      onDelete(initialTask.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center text-gray-700 justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {initialTask ? 'Edit Task' : 'New Task'}
          </h2>
          {initialTask && onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
            >
              Delete
            </button>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Task title"
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Quadrant</label>
          <select
            value={quadrant}
            onChange={(e) => setQuadrant(Number(e.target.value) as 1 | 2 | 3 | 4)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value={1}>Urgent & Important</option>
            <option value={2}>Important & Not Urgent</option>
            <option value={3}>Urgent & Not Important</option>
            <option value={4}>Not Urgent & Not Important</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <div className="border rounded-md p-2">
            <div className="border-b pb-2 mb-2">
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`px-2 py-1 rounded ${
                  editor?.isActive('bold') ? 'bg-gray-200' : ''
                }`}
              >
                B
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`px-2 py-1 rounded mx-1 ${
                  editor?.isActive('italic') ? 'bg-gray-200' : ''
                }`}
              >
                I
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                className={`px-2 py-1 rounded ${
                  editor?.isActive('underline') ? 'bg-gray-200' : ''
                }`}
              >
                U
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded mx-1 ${
                  editor?.isActive('bulletList') ? 'bg-gray-200' : ''
                }`}
              >
                •
              </button>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded ${
                  editor?.isActive('orderedList') ? 'bg-gray-200' : ''
                }`}
              >
                1.
              </button>
            </div>
            <EditorContent editor={editor} className="min-h-[150px]" />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!title.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
