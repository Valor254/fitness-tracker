import axios from "axios";
import { useQuery } from "react-query";

const BASE_URL = "https://wger.de/api/v2/";
const LANGUAGE_ID = 2; // English language

// Custom error class for API errors
export class APIError extends Error {
  constructor(message, status, details = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Fetch exercises from the WGER API based on a search query.
 * @param {string} query - Search term for exercises.
 * @returns {Promise<Array<{ id: number, name: string, category: string }>>} Filtered exercise list.
 * @throws {APIError} When the API request fails
 */
export const fetchExercises = async (query) => {
  if (!query?.trim()) return []; // Prevent empty API requests

  try {
    const response = await axios.get(`${BASE_URL}exerciseinfo/`, {
      params: {
        language: LANGUAGE_ID,
        search: query,
        limit: 20 // Limit results for better performance
      },
      timeout: 5000 // 5 second timeout
    });

    if (!response.data?.results) {
      throw new APIError('Invalid API response format', response.status);
    }

    return response.data.results
      .map((exercise) => {
        // Extract exercise name
        let name = exercise.name?.trim();
        if (!name && exercise.translations?.length > 0) {
          const translation = exercise.translations.find(
            (t) => t.language === LANGUAGE_ID
          );
          name = translation?.name?.trim();
        }

        // Only return exercises with valid names
        if (!name) return null;

        return {
          id: exercise.id,
          name: name,
          category: exercise.category?.name || 'Uncategorized',
          description: exercise.description || '',
          muscles: exercise.muscles?.map(m => m.name) || []
        };
      })
      .filter(Boolean) // Remove null entries
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new APIError(
        'Failed to fetch exercises',
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new APIError('No response from server', 0);
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new APIError('Request configuration error', 0, error.message);
    }
  }
};

/**
 * React Query hook for fetching exercises
 */
export const useExerciseSearch = (query) => {
  return useQuery(
    ['exercises', query],
    () => fetchExercises(query),
    {
      enabled: query?.length >= 2,
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes
      retry: 2, // Retry failed requests twice
      refetchOnWindowFocus: false // Don't refetch when window regains focus
    }
  );
};

export const useGetEx = () => {
  const results = useQuery(["getEx"], async () => {
    const res = await axios.get(`${BASE_URL}exercise/`);
    return res.data; // Ensure we return only the relevant data
  });

  return { ...results, exdata: results.data }; // Return exdata properly
};
