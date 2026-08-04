
const BASE_URL = "https://fooapi.com/api";

const normalizeMovies = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload?.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload?.results && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload?.movies && Array.isArray(payload.movies)) {
    return payload.movies;
  }

  return [];
};

export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movies`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    return normalizeMovies(payload);
  } catch (error) {
    console.error("Unable to load movies from API:", error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/movies?search=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    return normalizeMovies(payload);
  } catch (error) {
    console.error("Unable to search movies:", error);
    return [];
  }
};
