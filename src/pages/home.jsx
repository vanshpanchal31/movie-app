import MovieCard from "../components/moviecard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);


  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setError("Failed to fetch popular movies. Please try again later.");
      }
      finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  console.log(movies)

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
  };
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

      <div className="movie-grid">
        {movies.map(
          (movie) =>
          (
              <MovieCard key={movie.id} movie={movie}  />
            ),
        )}
      </div>
    </div>
  );
}

export default Home;
