import MovieCard from "../components/moviecard";
import { useState } from "react";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const movies = [
    { id: 1, title: "john wick", release_Date: "2023-01-01" },
    { id: 2, title: "terminator", release_Date: "2023-02-01" },
    { id: 3, title: "the matrix", release_Date: "2023-03-01" },
  ];
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
        {movies.map((movie) => movie.title.toLowerCase().startsWith(searchQuery)&& (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
