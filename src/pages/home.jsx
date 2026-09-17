import MovieCard from "../components/moviecard";
import { useState, useEffect, useMemo } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-dropdown")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setAllMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setError("Failed to fetch popular movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (!allMovies.length || !searchQuery.trim()) return;

    const timeoutId = setTimeout(() => {
      const runSearch = async () => {
        setLoading(true);
        setError(null);

        try {
          const searchResults = await searchMovies(searchQuery);
          setMovies(searchResults);
        } catch (err) {
          console.error(err);
          setError("Failed to search movies.");
        } finally {
          setLoading(false);
        }
      };

      runSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, allMovies]);

  const extractGenres = (movie) => {
    const rawGenres = movie?.genres || movie?.genre || "";

    if (Array.isArray(rawGenres)) {
      return rawGenres
        .flatMap((genre) => String(genre).split(","))
        .map((genre) => genre.trim())
        .filter(Boolean);
    }

    return String(rawGenres)
      .split(",")
      .map((genre) => genre.trim())
      .filter(Boolean);
  };

  const genreOptions = useMemo(() => {
    const options = new Set();

    allMovies.forEach((movie) => {
      extractGenres(movie).forEach((genre) => options.add(genre));
    });

    return ["All", ...Array.from(options).sort()];
  }, [allMovies]);

  const sortOptions = [
    { value: "latest", label: "Latest releases" },
    { value: "oldest", label: "Oldest releases" },
    { value: "rating-high", label: "Rating: high to low" },
    { value: "rating-low", label: "Rating: low to high" },
    { value: "title-az", label: "Title: A → Z" },
    { value: "title-za", label: "Title: Z → A" },
  ];

  const sortLabel = sortOptions.find((option) => option.value === sortOrder)?.label || "Sort by";

  const filterByGenre = (movie) => {
    if (selectedGenre === "All") return true;
    return extractGenres(movie).includes(selectedGenre);
  };

  const sortMovies = (movieList) => {
    return [...movieList].sort((a, b) => {
      const getYear = (item) => {
        const rawYear = item?.year || item?.release_date || item?.releaseDate || "";
        const match = String(rawYear).match(/\d{4}/);
        return match ? Number(match[0]) : 0;
      };
      const getRating = (item) => Number(item?.imdbRating || item?.rating || 0);
      const getTitle = (item) => String(item?.title || item?.name || "").toLowerCase();

      switch (sortOrder) {
        case "oldest":
          return getYear(a) - getYear(b);
        case "rating-high":
          return getRating(b) - getRating(a);
        case "rating-low":
          return getRating(a) - getRating(b);
        case "title-az":
          return getTitle(a).localeCompare(getTitle(b));
        case "title-za":
          return getTitle(b).localeCompare(getTitle(a));
        default:
          return getYear(b) - getYear(a);
      }
    });
  };

  const visibleMovies = useMemo(() => {
    const filtered = Array.isArray(movies) ? movies.filter(filterByGenre) : [];
    return sortMovies(filtered);
  }, [movies, selectedGenre, sortOrder]);

  const handleSearch = async (e) => {
    e?.preventDefault();

    setLoading(true);
    setError(null);

    try {
      if (!searchQuery.trim()) {
        setMovies(allMovies);
        setSelectedGenre("All");
      } else {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="top-controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              if (!value.trim()) {
                setMovies(allMovies);
                setSelectedGenre("All");
              }
            }}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="filter-panel">
          <div className="filter-group filter-dropdown">
            <button
              type="button"
              className={`dropdown-toggle ${openDropdown === "genre" ? "open" : ""}`}
              onClick={() => setOpenDropdown((current) => (current === "genre" ? null : "genre"))}
            >
              {selectedGenre}
            </button>
            <div className={`dropdown-menu category-menu ${openDropdown === "genre" ? "open" : ""}`}>
              {genreOptions.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={`dropdown-item ${selectedGenre === genre ? "active" : ""}`}
                  onClick={() => {
                    setSelectedGenre(genre);
                    setOpenDropdown(null);
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group filter-dropdown">
            <button
              type="button"
              className={`dropdown-toggle ${openDropdown === "sort" ? "open" : ""}`}
              onClick={() => setOpenDropdown((current) => (current === "sort" ? null : "sort"))}
            >
              {sortLabel}
            </button>
            <div className={`dropdown-menu sort-menu ${openDropdown === "sort" ? "open" : ""}`}>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`dropdown-item ${sortOrder === option.value ? "active" : ""}`}
                  onClick={() => {
                    setSortOrder(option.value);
                    setOpenDropdown(null);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading movies...</p>
        </div>
      ) : (
        <div className="movies-grid">
          {visibleMovies.length > 0 ? (
            visibleMovies.map((movie) => (
              <MovieCard key={movie.id || movie.title} movie={movie} />
            ))
          ) : (
            <div className="empty-message">No movies match your search or selected category.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;