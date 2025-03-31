import { useState } from "react";
import { Search, Tag, Target, Info, Loader2 } from "lucide-react";
import { useExerciseSearch } from "../utils/api";

const Exercises = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: exercises = [],
    isLoading,
    isError,
  } = useExerciseSearch(searchQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="glass-effect rounded-2xl p-6 mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Exercise Library</h1>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow"
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12 text-red-500">
            <p>Failed to load exercises. Please try again later.</p>
          </div>
        )}

        {/* Exercise Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 hover-card cursor-pointer"
              onClick={() => setSelectedExercise(exercise)}
            >
              <h3 className="text-xl font-semibold mb-3">{exercise.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="text-sm">{exercise.category}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Target className="w-4 h-4 mr-2" />
                  <span className="text-sm">{exercise.muscles?.join(", ")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise Details Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold gradient-text">{selectedExercise.name}</h2>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-300">{selectedExercise.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                <span className="text-gray-600 dark:text-gray-300">{selectedExercise.category}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span className="text-gray-600 dark:text-gray-300">
                  {selectedExercise.muscles?.join(", ")}
                </span>
              </div>

              {selectedExercise.equipment && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-2">Equipment Needed:</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedExercise.equipment}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;