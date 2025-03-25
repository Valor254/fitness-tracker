import MultiStepWorkoutForm from "../components/MultiStepWorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";

const WorkoutLogger = () => {
  return (
    <div className="max-w-lg mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center">Log Your Workout</h1>

      {/* Workout Form */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">New Workout</h2>
        <MultiStepWorkoutForm />
      </div>

      {/* Workout History */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Workout History</h2>
        <WorkoutHistory />
      </div>
    </div>
  );
};

export default WorkoutLogger;
