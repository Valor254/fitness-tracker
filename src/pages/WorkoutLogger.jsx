import MultiStepWorkoutForm from "../components/MultiStepWorkoutForm";
import WorkoutHistory from "../components/WorkoutHistory";

const WorkoutLogger = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column - New Workout Form */}
        <div className="glass-effect rounded-2xl p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Log New Workout</h2>
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 shadow-lg hover-card">
            <MultiStepWorkoutForm />
          </div>
        </div>

        {/* Right Column - Workout History */}
        <div className="glass-effect rounded-2xl p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Recent Workouts</h2>
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 shadow-lg hover-card">
            <WorkoutHistory limit={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLogger;
