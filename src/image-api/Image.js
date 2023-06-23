import axios from "axios";
import React, { useState } from "react";

function Image() {
  const [imageSrc, setImageSrc] = useState("");
  const [sol, setSol] = useState(1);
  const [num, setNum] = useState(0);

  const handleImageSubmit = (event) => {
    event.preventDefault();
    setImageWithSolAndNum(sol, num);
  };

  const setImageWithSolAndNum = async (sol, num) => {
    const response = await axios.get(`/api/images/link/${sol}/${num}`);
    const imageLink = response.data;
    setImageSrc(imageLink);
  };

  return (
    <>
      <h1>IMAGE</h1>
      <img src={imageSrc} alt="Mars Rover Capture" width="250" height="250" />
      <form onSubmit={handleImageSubmit}>
        <label>
          Enter Sol:
          <input
            type="number"
            value={sol}
            onChange={(e) => setSol(e.target.value)}
          />
        </label>
        <label>
          Enter Image Number:
          <input
            type="number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}

export default Image;
