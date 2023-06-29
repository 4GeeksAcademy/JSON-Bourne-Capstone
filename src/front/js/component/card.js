import { useState, useContext } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


const Card = ({index, post, onFavClick}) => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const postId = params.id; 

  const FavoritesData = {
    post_id: postId,
    user_id: store.user 
  };

  
  const [activeFav, setActiveFav] = useState(false);
    
    return <div>
    <div className="eachCard">
    <p> </p>
    <Link to={`/single/${index}`}>
      <img src={post.image_url} alt={`Image ${index}`} /> {/* Change here */}
    </Link>
    <button
      onClick={onFavClick}
      className={'favorite-button ${isFavorite ? "fas fa-heart" : "far fa-heart"}'}
    ></button>
  </div>
  </div>
}     
export default Card
