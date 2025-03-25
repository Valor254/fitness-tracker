import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useWorkoutStore } from "../store/workoutStore";

const ProgressChart = () => {
  const workouts = useWorkoutStore((state) => state.workouts); // Zustand state

  // Format data for the chart
  const chartData =
    workouts.length > 0
      ? workouts.map((workout, index) => ({
          date: `Day ${index + 1}`,
          progress: workout.reps * workout.sets, // Total reps per session
        }))
      : [{ date: "No Data", progress: 0 }];

  return (
    <div className="w-full max-w-lg p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Progress Chart</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="date" tick={{ fill: "gray" }} />
          <YAxis tick={{ fill: "gray" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "8px",
            }}
            wrapperStyle={{
              color: "black",
            }}
          />
          <Bar dataKey="progress" fill="#4F46E5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
