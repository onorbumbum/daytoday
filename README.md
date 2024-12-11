# Day Today

A simple Eisenhower Matrix task manager that helps you prioritize tasks based on their urgency and importance.

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
  - Add new tasks with the centered add button
  - Double-click any quadrant to add a task directly to it
  - Edit existing tasks
  - Mark tasks as complete
  - Delete tasks
- **Persistent Storage**: Tasks are automatically saved to local storage
- **Responsive Design**: Works on both desktop and mobile devices
- **Fixed-Height Quadrants**: Scrollable quadrants with custom scrollbars for better organization

## How to Use

1. **Adding Tasks**:

   - Click the large + button in the center of the matrix
   - Select the appropriate quadrant in the task modal
   - Enter the task title and description
   - Click Save to create the task
   - Alternatively, double-click any quadrant to add a task directly to it

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
   - Quadrants scroll independently when tasks overflow

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

## Attribution

Courtesy of [uzunu](https://www.uzunu.com)
