import { useState, useEffect } from "react";
import { fetchExercises } from "../utils/api";
import useWorkoutStore from "../store/workoutStore";

const ExerciseSearch = ({ onSelect }) => {
  const { exerciseCache, setExerciseCache } = useWorkoutStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        if (exerciseCache[query]) {
          console.log("Using cached data for query:", query);
          setResults(exerciseCache[query]);
        } else {
          const exercises = await fetchExercises(query);
          console.log("Mapped exercises:", exercises);
          if (Array.isArray(exercises)) {
            setResults(exercises);
            setExerciseCache(query, exercises);
          } else {
            console.error("Unexpected data format:", exercises);
            setResults([]);
          }
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setResults([]);
      }
      setLoading(false);
    };

    const handler = setTimeout(fetchData, 500);
    return () => clearTimeout(handler);
  }, [query, exerciseCache, setExerciseCache]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      onSelect(results[highlightIndex].name);
      setQuery(results[highlightIndex].name);
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search exercises..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white placeholder-white focus:outline-none focus:ring focus:border-blue-500"
      />
      {loading && (
        <p className="absolute bg-gray-800 text-white p-2">Loading...</p>
      )}
      {results.length > 0 && !loading && (
        <ul className="absolute w-full bg-gray-800 border border-gray-600 rounded-md shadow-md mt-1 max-h-48 overflow-y-auto z-10">
          {results.map((exercise, index) => (
            <li
              key={exercise.id}
              onClick={() => {
                onSelect(exercise.name);
                setQuery(exercise.name);
                setResults([]);
              }}
              className={`p-2 cursor-pointer ${
                index === highlightIndex ? "bg-gray-600" : "hover:bg-gray-700"
              } text-white`}
            >
              {exercise.name}
            </li>
          ))}
        </ul>
      )}
      {!loading && results.length === 0 && query.length > 2 && (
        <p className="p-2 text-gray-400">No exercises found.</p>
      )}
    </div>
  );
};

export default ExerciseSearch;
