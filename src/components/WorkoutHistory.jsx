import useWorkoutStore from "../store/workoutStore";

const WorkoutHistory = () => {
  const { workouts } = useWorkoutStore();

  return (
    <div className="w-full max-w-lg p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Workout Summary</h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 mt-2">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <li
              key={index}
              className="p-2 flex justify-between items-center text-sm md:text-base"
            >
              <span className="font-medium">{workout.exercise}</span>
              <span className="text-gray-500">
                {workout.sets} x {workout.reps} ({workout.weight} kg)
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 italic text-center">No workouts logged yet.</p>
        )}
      </ul>
    </div>
  );
};

export default WorkoutHistory;
