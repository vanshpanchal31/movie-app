
const BASE_URL = "https://fooapi.com/api";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movies`);
  const { data } = await response.json();
  return data;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};
