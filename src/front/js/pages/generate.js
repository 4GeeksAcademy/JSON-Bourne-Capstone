import React, { useState, useContext } from "react";
import "../../styles/generate.css";
import { Context } from "../store/appContext";

export const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);

  const { actions } = useContext(Context); // Retrieve actions from context

  const handleGenerate = async (e) => {
    e.preventDefault();
    const generatedImages = await actions.generate_image(
      prompt,
      1,
      "512x512",
      "url"
    );
    setImages(generatedImages);
  };

  return (
    <div className="OpenAIbody">
      <h5>
        "Τα μεγάλα αποτελέσματα απαιτούν μεγάλες φιλοδοξίες" - Ηράκλειτος{" "}
      </h5>
      <form id="image-form" onSubmit={handleGenerate}>
        <div className="form-control">
          <input
            type="text"
            id="prompt"
            placeholder="Your Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Generate
        </button>
      </form>
      {images &&
        images.length > 0 &&
        images.map((image, index) => (
          <img key={index} src={image} alt="Generated" />
        ))}
    </div>
  );
};
