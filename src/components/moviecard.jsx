function MovieCard({ movie }) {
  function handleClick() {
    alert("clicked!");
  }
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.url} alt={movie.title} />
        <div className="movie-overlay">
          <button className="favorite-button" onClick={handleClick}>
            like
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-release-date">{movie.release_Date}</p>
      </div>
    </div>
  );
}

export default MovieCard;