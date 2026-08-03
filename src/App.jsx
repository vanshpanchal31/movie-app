import "./App.css";
import MovieCards from "./components/moviecards.jsx";

function App() {
  const movienumber = 1;
  
   return (
    <>
      <MovieCards movie={{ title: "Tim's Film", release_Date: "2023-01-01" }} />
      <MovieCards movie={{ title: "Tim's Film", release_Date: "2023-01-01" }} />
    </>
  );
}

export default App;
