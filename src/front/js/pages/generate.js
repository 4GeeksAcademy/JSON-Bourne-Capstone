import React, { useState } from 'react';
import "../../styles/generate.css"

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('');
  const [images, setImages] = useState([]);

  const generate = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/generate_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    const data = await response.json(); 
    setImages(data);
  };

  return (
    <div className="OpenAIbody">
      <h5>"Τα μεγάλα αποτελέσματα απαιτούν μεγάλες φιλοδοξίες" - Ηράκλειτος </h5>
      <form id="image-form" onSubmit={generate}>
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
      {images.map((image, index) => (
        <img key={index} src={`data:image/png;base64,${image}`} alt="Generated" />
      ))}
    </div>
  );
};

export default Generate;
