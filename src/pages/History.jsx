import { useState } from "react";
import useWorkoutStore from "../store/workoutStore";
import { Calendar, Clock, Dumbbell, Filter, Trash2 } from "lucide-react";

const History = () => {
  const { workouts, deleteWorkout } = useWorkoutStore();
  const [filter, setFilter] = useState("all");

  // Filter workouts based on selected time period
  const getFilteredWorkouts = () => {
    const now = new Date();
    const workoutsList = [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    switch (filter) {
      case "week":
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return workoutsList.filter(w => new Date(w.date) >= weekAgo);
      case "month":
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return workoutsList.filter(w => new Date(w.date) >= monthAgo);
      default:
        return workoutsList;
    }
  };

  const filteredWorkouts = getFilteredWorkouts();

  // Group workouts by date
  const groupedWorkouts = filteredWorkouts.reduce((groups, workout) => {
    const date = new Date(workout.date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(workout);
    return groups;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass-effect rounded-2xl p-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Workout History</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {filteredWorkouts.length} workouts recorded
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/50 dark:bg-gray-800/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-gray-700"
            >
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {Object.entries(groupedWorkouts).map(([date, dayWorkouts]) => (
          <div key={date} className="mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">{date}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dayWorkouts.map((workout) => (
                <div 
                  key={workout.id} 
                  className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 hover-card relative group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <Dumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{workout.exercise}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {workout.sets} sets × {workout.reps} reps
                          {workout.weight && ` @ ${workout.weight}kg`}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteWorkout(workout.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg text-red-500"
                      title="Delete workout"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(workout.date).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No workouts found for the selected time period.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;