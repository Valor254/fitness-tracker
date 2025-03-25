import axios from "axios";

const BASE_URL = "https://wger.de/api/v2/exerciseinfo/";
const LANGUAGE_ID = 2; // English language

/**
 * Fetch exercises from the WGER API based on a search query.
 * @param {string} query - Search term for exercises.
 * @returns {Promise<Array<{ id: number, name: string }>>} Filtered exercise list.
 */
export const fetchExercises = async (query) => {
  if (!query.trim()) return []; // Prevent empty API requests

  try {
    console.log(`🔍 Fetching exercises for: "${query}"`);

    const response = await axios.get(BASE_URL, {
      params: { language: LANGUAGE_ID, search: query },
    });

    console.log("📥 Raw API Response:", response.data.results);

    return response.data.results
      .map((exercise) => {
        let name = exercise.name?.trim();

        // If no top-level name exists, try translations
        if (!name && exercise.translations?.length > 0) {
          const translation = exercise.translations.find((t) => t.language === LANGUAGE_ID);
          name = translation?.name?.trim();
        }

        return name ? { id: exercise.id, name } : null;
      })
      .filter(Boolean); // Remove null values
  } catch (error) {
    console.error("❌ API Fetch Error:", error.response?.data || error.message);
    return [];
  }
};
