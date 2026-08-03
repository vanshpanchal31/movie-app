import "./App.css";
import MovieCard from "./components/moviecard";
import Home from "./pages/home";

function App() {
  const movienumber = 1;

  return (
    <>
    <div>
      <Home />
    </div>
      <MovieCard movie={{ title: "Tim's Film", release_Date: "2023-01-01" }} />
      <MovieCard movie={{ title: "Tim's Film", release_Date: "2023-01-01" }} />
    </>
  );
}

export default App;
