import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import History from "./pages/History";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import WorkoutLogger from "./pages/WorkoutLogger";
import { Dumbbell } from "lucide-react";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Array of background images for different pages
  const backgroundImages = {
    dashboard: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format')",
    exercises: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920&auto=format')",
    history: "url('https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1920&auto=format')",
    progress: "url('https://images.unsplash.com/photo-1535743686920-55e4145369b9?q=80&w=1920&auto=format')",
    settings: "url('https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1920&auto=format')",
    logger: "url('https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1920&auto=format')"
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}>
        {/* Logo Section */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">FitTrack Pro</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Your Fitness Journey</p>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900 dark:text-white">FitTrack Pro</span>
            </div>
          </div>
        </header>

        {/* Main Content Area with Dynamic Background */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="relative min-h-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-fitness-pattern opacity-50"></div>
            
            {/* Dynamic Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 transition-opacity duration-500"
              style={{
                backgroundImage: backgroundImages[window.location.pathname.split('/')[1] || 'dashboard']
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/history" element={<History />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/logger" element={<WorkoutLogger />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
