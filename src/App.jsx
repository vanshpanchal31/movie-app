import "./css/App.css";
import MovieCard from "./components/moviecard";
import Home from "./pages/home";
import Favorites from "./pages/favorite";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import Navbar from "./components/navbar";

function App() {
  const movienumber = 1;

  return (
    <>
      <MovieProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
