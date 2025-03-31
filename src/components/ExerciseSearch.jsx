import { useState } from "react";
import { useExerciseSearch } from "../utils/api";
import { Search, Loader2, AlertCircle } from "lucide-react";
import useWorkoutStore from "../store/workoutStore";

const ExerciseSearch = ({ setData }) => {
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: results = [],
    isLoading,
    isError,
    error
  } = useExerciseSearch(query);

  const handleSelect = (exercise) => {
    setData(exercise);
    setQuery(exercise.name);
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) => Math.min(prev + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0) {
          handleSelect(results[highlightIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for an exercise..."
          className="w-full p-3 pl-10 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          aria-label="Search exercises"
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Results dropdown */}
      {isOpen && (query.length >= 2) && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <Loader2 className="animate-spin h-6 w-6 mx-auto mb-2" />
              <p>Searching exercises...</p>
            </div>
          ) : isError ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              <AlertCircle className="h-6 w-6 mx-auto mb-2" />
              <p>{error?.message || 'Failed to load exercises'}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No exercises found
            </div>
          ) : (
            <ul className="py-1">
              {results.map((exercise, index) => (
                <li
                  key={exercise.id}
                  onClick={() => handleSelect(exercise)}
                  onMouseEnter={() => setHighlightIndex(index)}
                  className={`px-4 py-2 cursor-pointer ${
                    index === highlightIndex
                      ? "bg-blue-50 dark:bg-gray-700"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="font-medium">{exercise.name}</div>
                  {exercise.category && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {exercise.category}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseSearch;
