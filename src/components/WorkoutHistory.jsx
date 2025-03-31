import useWorkoutStore from "../store/workoutStore";
import { Trash2, Edit } from "lucide-react";

const WorkoutHistory = () => {
  const { workouts, deleteWorkout } = useWorkoutStore();

  // Sort workouts by date (most recent first)
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      deleteWorkout(workoutId);
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Workout History</h2>
      
      {sortedWorkouts.length > 0 ? (
        <div className="space-y-4">
          {sortedWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {workout.exercise}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {workout.sets} sets × {workout.reps} reps
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(workout.date)}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(workout.id)}
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    title="Delete workout"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No workouts logged yet. Start by adding your first workout!
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
