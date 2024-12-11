# Eisenhower Matrix Task Manager

A modern, interactive task management application based on the Eisenhower Matrix principle, helping you prioritize tasks based on their urgency and importance.

## What is the Eisenhower Matrix?

The Eisenhower Matrix, also known as the Urgent-Important Matrix, is a decision-making tool that helps you organize tasks based on their urgency and importance. The matrix divides tasks into four quadrants:

1. **Urgent & Important** (Do First) - Tasks that need immediate attention
2. **Important & Not Urgent** (Schedule) - Tasks that are important but can be scheduled
3. **Urgent & Not Important** (Delegate) - Tasks that are urgent but less important
4. **Not Urgent & Not Important** (Don't Do/Eliminate) - Tasks that are neither urgent nor important

## Features

- **Visual Task Organization**: Color-coded quadrants for easy task categorization
- **Drag & Drop**: Easily move tasks between quadrants
- **Rich Text Editing**: Format task descriptions with bold, italic, underline, and lists
- **Task Management**:
  - Add new tasks with the + button in each quadrant
  - Edit existing tasks
  - Mark tasks as complete
  - Delete tasks
- **Persistent Storage**: Tasks are automatically saved to local storage
- **Responsive Design**: Works on both desktop and mobile devices

## How to Use

1. **Adding Tasks**:

   - Click the + button in the top-right corner of any quadrant
   - Enter the task title and description
   - The quadrant is pre-selected based on where you clicked
   - Click Save to create the task

2. **Managing Tasks**:

   - Click on any task to edit its details
   - Use the checkbox to mark tasks as complete
   - Drag and drop tasks between quadrants to reprioritize
   - Click the Delete button in the edit modal to remove a task

3. **Task Organization**:
   - Each quadrant is color-coded for easy identification:
     - Red: Urgent & Important
     - Yellow: Important & Not Urgent
     - Orange: Urgent & Not Important
     - Gray: Not Urgent & Not Important
   - Completed tasks automatically move to the bottom of their quadrant

## Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:

   ```bash
   cd eisenhower-matrix
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server
- **@hello-pangea/dnd**: Drag and drop functionality
- **TipTap**: Rich text editor
- **LocalStorage**: Persistent data storage

## Development

This project uses:

- Modern React with TypeScript
- Functional components and hooks
- Context API for state management
- Tailwind CSS for styling
- Vite for fast development and building

## License

MIT License - feel free to use this project for personal or commercial purposes.
