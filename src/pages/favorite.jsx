import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/moviecard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorites Movies Yet</h2>
        <p>
          Start adding your favorite movies by clicking the like button on the
          movie cards.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Favorites</h2>

      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.id || movie.title} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
