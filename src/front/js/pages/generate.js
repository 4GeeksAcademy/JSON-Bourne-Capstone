import React, { useState, useContext } from 'react';
import "../../styles/generate.css";
import { Context } from "../store/appContext";

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('');
  const [images, setImages] = useState([]);
  
  const { actions } = useContext(Context); // Retrieve actions from context

  const handleGenerate = async (e) => {
    e.preventDefault();
    const generatedImages = await actions.generate_image(prompt, 1, size, 'url');
    setImages(generatedImages);
  };

  return (
    <div className="OpenAIbody">
      <h5>"Τα μεγάλα αποτελέσματα απαιτούν μεγάλες φιλοδοξίες" - Ηράκλειτος </h5>
      <form id="image-form" onSubmit={handleGenerate}>
        <div className="form-control">
          <input 
            type="text" 
            id="prompt" 
            placeholder="Your Prompt" 
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
        </div>
        <div className="form-control">
          <select 
            name="size" 
            id="size" 
            value={size}
            onChange={e => setSize(e.target.value)}
          >
            <option value="256x256">256x256</option>    
            <option value="512x512">512x512</option>
            <option value="1024x1024">1024x1024</option>
          </select>
        </div>
        <button type="submit" className="btn btn-warning">Generate</button>
      </form>
      {images && images.length > 0 && images.map((image, index) => (
        <img key={index} src={image} alt="Generated" />
      ))}
    </div>
  );
};

export default Generate;