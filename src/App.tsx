import { QuadrantGrid } from './components/QuadrantGrid';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-tr from-slate-700 to-fuchsia-700 text-white">
        <QuadrantGrid />
      </div>
    </TaskProvider>
  );
}

export default App;
