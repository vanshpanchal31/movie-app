import MovieCard from "../components/moviecard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true); 
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setError("Failed to fetch popular movies. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null)
    } catch (err) {
      console.error(err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

  const visibleMovies = Array.isArray(movies) ? movies : [];

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading movies...</p>
        </div>
      ) : (
        <div className="movies-grid">
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id || movie.title} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;