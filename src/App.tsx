import { QuadrantGrid } from './components/QuadrantGrid';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <QuadrantGrid />
      </div>
    </TaskProvider>
  );
}

export default App;
