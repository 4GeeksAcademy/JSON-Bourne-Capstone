import React, { useContext, useEffect, useState } from "react";
import { Context } from "/workspaces/JSON-Bourne-Capstone/src/front/js/store/appContext.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/explore.css";

const Explore = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const [isFav, setIsFav] = useState(false);
  // Favorites
  // const [activeFav, setActiveFav] = useState(false);

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const heartIcon = e.target;
    heartIcon.classList.toggle("active");
  };
/////////////////////////////////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   actions.getMessage();
  // }, []);

  return (
    <div className="entirePage">
      <div className="explore-container">
        {store.posts.map((imageUrl, index) => (
          <div className="explore-card" key={index}>
            <Link key={index} to={`/single/${index}`} className="explore-card-link">
              <img className="explore-card-image" src={imageUrl} alt={`Image ${index}`} />
              <h2 className="explore-card-title">Image {index}</h2>
            </Link>
            <button className="explore-fav-button" onClick={handleFavClick}>
                  <span className="heart-icon">&#9825;</span>
                  </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;