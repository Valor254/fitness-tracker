import { useEffect, useState } from "react";
import useWorkoutStore from "../store/workoutStore"; // Fixed import
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const workouts = useWorkoutStore((state) => state.workouts); // Zustand state
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (workouts.length > 0) {
      const labels = workouts.map((_, index) => `Workout ${index + 1}`);
      const data = workouts.map((workout) => workout.sets * workout.reps);

      setChartData({
        labels,
        datasets: [
          {
            label: "Workout Progress",
            data,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.3,
            pointRadius: 5, // Emphasized data points
            pointBackgroundColor: "rgb(75, 192, 192)",
          },
        ],
      });
    } else {
      setChartData(null);
    }
  }, [workouts]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>

      {workouts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No workouts logged yet.</p>
      ) : (
        <ul className="space-y-4">
          {workouts.map((workout, index) => (
            <li key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
              <p className="font-semibold">{workout.exercise}</p>
              <p className="text-gray-700 dark:text-gray-300">
                {workout.sets} sets × {workout.reps} reps
              </p>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-2xl font-bold mt-6 mb-4">Progress Chart</h2>
      {chartData ? (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
          <Line data={chartData} />
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No progress data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
