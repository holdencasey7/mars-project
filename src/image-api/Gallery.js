import axios from "axios";
import React, { useEffect, useState } from "react";

function Gallery({ sol }) {
  const [imageJsonArray, setImageJsonArray] = useState([]);

  useEffect(
    () => async () => {
      async function getImageJson() {
        const imageApiResponse = await axios.get(`/api/images/json/${sol}`);
        if (!imageApiResponse.data.errors[0]) {
          setImageJsonArray(imageApiResponse.data.image_json_array);
        }
      }
      await getImageJson();
    },
    [sol]
  );

  return (
    <>
      <h3>Image Gallery {sol}</h3>
      {imageJsonArray.map((imageJson) => (
        <img
          key={imageJson.id}
          src={imageJson.img_src}
          alt="Mars Rover Capture"
          width="250"
          height="250"
        />
      ))}
    </>
  );
}

export default Gallery;
