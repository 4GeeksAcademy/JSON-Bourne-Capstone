import { useState, useContext } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";





const Card = ({index, item}) => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const postId = params.id; // Accessing the post ID from the URL

  const FavoritesData = {
    post_id: postId,
    user_id: store.user // Using the user ID from the store
  };
    const handleFavClick = (e) => {
        e.preventDefault();
        console.log(FavoritesData)
        if (activeFav === true) {
          // actions.removeFavorites(FavoritesData.user_id, FavoritesData.post_id)
          setActiveFav(false);
        } else {
          actions.addFavorites(FavoritesData.user_id, FavoritesData.post_id); // Updated the arguments
          setActiveFav(true);
        }
      };
    
    const [activeFav, setActiveFav] = useState(false);
    
    return <div>
    <div className="eachCard">
    <p> </p>
    <Link to={`/single/${index}`}>
      <img src={item} alt={`Image ${index}`} />
    </Link>
    <button
      onClick={handleFavClick}
      className={activeFav ? "fas fa-heart" : "far fa-heart"}
    ></button>
  </div>
  </div>
}     
export default Card