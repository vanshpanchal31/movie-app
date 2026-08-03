import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  function Text(){
    return <h1 >hello </h1>
  }
  return (
    <div>
      <button onClick={handleClick}>Count is {count}</button>
      <Text />
    </div>
  );
}

export default App;
 