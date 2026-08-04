import "./css/App.css";
import MovieCard from "./components/moviecard";
import Home from "./pages/home";
import Favorites from "./pages/favorite";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
  const movienumber = 1;

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
  
    </>
  );
}

export default App;
