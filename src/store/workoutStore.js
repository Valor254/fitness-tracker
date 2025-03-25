import { create } from "zustand";

const useWorkoutStore = create((set, get) => ({
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
  addWorkout: (workout) => set((state) => ({ workouts: [...state.workouts, workout] })),
  
  // Reset current workout fields:
  resetWorkout: () => set({ exercise: "", sets: "", reps: "" }),
  
  // Cache for exercise search results:
  exerciseCache: {},
  setExerciseCache: (query, results) =>
    set((state) => ({
      exerciseCache: { ...state.exerciseCache, [query]: results },
    })),
}));

if (typeof window !== 'undefined') {
  window.workoutStore = useWorkoutStore;
}

export default useWorkoutStore; // ✅
