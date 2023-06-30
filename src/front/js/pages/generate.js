import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/generate.css";

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { actions } = useContext(Context);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const generatedImages = await actions.generate_image(prompt, 1, '1024x1024', 'url');
    if (generatedImages && generatedImages.length > 0) {
      setGeneratedImage(generatedImages[0]);
    }
    setIsLoading(false);
  };

  return (
    <div className="text-center mt-5">
      <h5 className="text-orange mb-4">"Τα μεγάλα αποτελέσματα απαιτούν μεγάλες φιλοδοξίες" - Ηράκλειτος</h5>
      <form onSubmit={handleGenerate}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Your Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button className="btn btn-warning" type="submit" style={{ width: '150px', height: '50px' }}>
          Generate
        </button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        generatedImage && <img src={generatedImage} alt="Generated" className="img-fluid mt-4" />
      )}
    </div>
  );
};

export default Generate;