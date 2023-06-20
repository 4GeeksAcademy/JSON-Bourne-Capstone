import React from "react";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Home = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
  
    navigate("/single/1");
  };

  return (
    <div className="text-center mt-5">
      <h1>Hello Click Image GoTo Single!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo" onClick={handleImageClick} />
      </p>
      <div className="alert alert-info">
        Click the image to proceed to the Single view
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">Read documentation</a>
      </p>
    </div>
  );
};
