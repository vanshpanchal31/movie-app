import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addtoFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie?.id);
  const posterUrl = movie?.poster || movie?.poster_path || movie?.Poster || "";
  const title = movie?.title || movie?.name || "Untitled movie";
  const subtitle = movie?.genre || movie?.genres?.join(", ") || "Genre unavailable";
  const releaseDate = movie?.year || movie?.release_date || movie?.releaseDate || "Coming soon";
  const rating = movie?.imdbRating || movie?.rating || "N/A";

  function handleClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addtoFavorites(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={posterUrl || "https://via.placeholder.com/300x450?text=No+Image"}
          alt={title}
          onError={(event) => {
            event.currentTarget.src = "https://via.placeholder.com/300x450?text=No+Image";
          }}
        />
        <div className="movie-overlay">
          <button
            type="button"
            className={`favorite-btn${favorite ? " active" : ""}`}
            onClick={handleClick}
          >
            {favorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>
        <p className="movie">IMDb: {rating}</p>
        <p className="movie">{subtitle}</p>
        <p className="movie">Released: {releaseDate}</p>
      </div>
    </div>
  );
}

export default MovieCard;