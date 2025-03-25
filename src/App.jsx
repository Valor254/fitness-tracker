import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import MultiStepWorkoutForm from "./components/MultiStepWorkoutForm";
import Dashboard from "./pages/Dashboard"; // Import Dashboard

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
          <h1 className="text-xl font-bold">Fitness Tracker</h1>
          <ThemeToggle />
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<MultiStepWorkoutForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
