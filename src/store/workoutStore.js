import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useWorkoutStore = create(
  persist(
    (set, get) => ({
      // Data for the current workout entry:
      exercise: "",
      sets: "",
      reps: "",
      // Array of logged workouts:
      workouts: [],
      
      // Setters:
      setExercise: (exercise) => set({ exercise }),
      setSets: (sets) => set({ sets }),
      setReps: (reps) => set({ reps }),
      
      // Add a workout to the list:
      addWorkout: (workout) => 
        set((state) => ({
          workouts: [...state.workouts, workout],
          // Reset current workout fields after adding
          exercise: "",
          sets: "",
          reps: "",
        })),
      
      // Delete a workout by id
      deleteWorkout: (workoutId) =>
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== workoutId),
        })),

      // Update a workout
      updateWorkout: (workoutId, updatedWorkout) =>
        set((state) => ({
          workouts: state.workouts.map((w) =>
            w.id === workoutId ? { ...w, ...updatedWorkout } : w
          ),
        })),
      
      // Get workouts for a specific date range
      getWorkoutsByDateRange: (startDate, endDate) => {
        const workouts = get().workouts;
        return workouts.filter((workout) => {
          const workoutDate = new Date(workout.date);
          return workoutDate >= startDate && workoutDate <= endDate;
        });
      },
      
      // Reset current workout fields:
      resetWorkout: () => set({ exercise: "", sets: "", reps: "" }),
      
      // Cache for exercise search results:
      exerciseCache: {},
      setExerciseCache: (query, results) =>
        set((state) => ({
          exerciseCache: { ...state.exerciseCache, [query]: results },
        })),
    }),
    {
      name: "workout-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({ 
        workouts: state.workouts,
        exerciseCache: state.exerciseCache 
      }), // only persist these fields
    }
  )
);

if (typeof window !== 'undefined') {
  window.workoutStore = useWorkoutStore;
}

export default useWorkoutStore; // 
