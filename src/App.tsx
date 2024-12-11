import { QuadrantGrid } from './components/QuadrantGrid';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-tr from-slate-700 to-fuchsia-700 text-white">
        <QuadrantGrid />
        <div className="w-full flex items-center justify-center text-gray-300 text-sm pb-2">courtesy of <a href="https://www.uzunu.com" class="ml-1">uzunu</a></div>

      </div>
    </TaskProvider>
  );
}

export default App;
