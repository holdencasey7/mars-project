import logo from "./logo.svg";
import "./App.css";
import Weather from "./weather-api/Weather";
import Image from "./image-api/Image";
import Gallery from "./image-api/Gallery";
import { useState } from "react";

function App() {
  const [sol, setSol] = useState(0);

  return (
    <>
      <form>
        <label>
          Enter Sol:
          <input
            type="number"
            value={sol}
            onChange={(e) => setSol(e.target.value)}
          />
        </label>
      </form>
      <Gallery sol={sol} />
    </>
  );
}

export default App;
