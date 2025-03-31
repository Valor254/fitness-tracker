import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useWorkoutStore from "../store/workoutStore";
import { ArrowUp, ArrowDown, Minus, Activity, Weight, Timer } from 'lucide-react';

const Progress = () => {
  const { workouts } = useWorkoutStore();
  const [selectedMetric, setSelectedMetric] = useState('volume');

  // Group workouts by exercise
  const exerciseData = workouts.reduce((acc, workout) => {
    if (!acc[workout.exercise]) {
      acc[workout.exercise] = [];
    }
    acc[workout.exercise].push({
      date: new Date(workout.date).toLocaleDateString(),
      volume: workout.sets * workout.reps * (workout.weight || 1),
      weight: workout.weight || 0,
      reps: workout.sets * workout.reps,
    });
    return acc;
  }, {});

  // Calculate progress indicators
  const getProgress = (data) => {
    if (data.length < 2) return { trend: 'neutral', percentage: 0 };
    const latest = data[data.length - 1][selectedMetric];
    const previous = data[data.length - 2][selectedMetric];
    const diff = latest - previous;
    const percentage = previous ? (diff / previous) * 100 : 0;

    return {
      trend: diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral',
      percentage: Math.abs(percentage),
    };
  };

  const metrics = [
    { id: 'volume', name: 'Volume', icon: <Activity className="w-5 h-5" /> },
    { id: 'weight', name: 'Weight', icon: <Weight className="w-5 h-5" /> },
    { id: 'reps', name: 'Reps', icon: <Timer className="w-5 h-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass-effect rounded-2xl p-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Progress Tracking</h1>

        {/* Metric Selection */}
        <div className="flex flex-wrap gap-4 mb-8">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedMetric === metric.id
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-200'
                  : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {metric.icon}
              <span>{metric.name}</span>
            </button>
          ))}
        </div>

        {/* Progress Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(exerciseData).map(([exercise, data]) => {
            const { trend, percentage } = getProgress(data);
            return (
              <div key={exercise} className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 hover-card">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{exercise}</h3>
                  <div className={`flex items-center gap-1 ${
                    trend === 'up' ? 'text-green-500' :
                    trend === 'down' ? 'text-red-500' :
                    'text-gray-500'
                  }`}>
                    {trend === 'up' ? <ArrowUp className="w-4 h-4" /> :
                     trend === 'down' ? <ArrowDown className="w-4 h-4" /> :
                     <Minus className="w-4 h-4" />}
                    <span className="text-sm font-medium">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-48 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis
                        dataKey="date"
                        fontSize={12}
                        tickMargin={8}
                        stroke="currentColor"
                        opacity={0.5}
                      />
                      <YAxis
                        fontSize={12}
                        tickMargin={8}
                        stroke="currentColor"
                        opacity={0.5}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey={selectedMetric}
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6, fill: '#2563eb' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Latest Values */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
                      <p className="font-medium">{data[data.length - 1].volume}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                      <p className="font-medium">{data[data.length - 1].weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Reps</p>
                      <p className="font-medium">{data[data.length - 1].reps}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {Object.keys(exerciseData).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No workout data available yet. Start logging your workouts to track progress!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;