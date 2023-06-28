import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/explore.css";
import Card from "../component/card";

const Explore = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id; 

  // Favorites
  const [activeFav, setActiveFav] = useState(false);

  const handleFavClick = (post, e) => {
    e.preventDefault();

    if (!('image' in post)) {
      console.log('The post object does not have an image property');
      return;
    }

   const FavoritesData = {
      post_id: post.id,
      user_id: store.user,
      image: post.image
    };

    console.log(FavoritesData)

    if (activeFav === true) {
      actions.removeFavorites(FavoritesData.user_id, FavoritesData.post_id)
      setActiveFav(false);
    } else {
      actions.addFavorites(FavoritesData.user_id, FavoritesData.post_id, FavoritesData.image);
      setActiveFav(true);
    }
    actions.addFavorites(FavoritesData.user_id, FavoritesData.post_id);
  };

  addFavorites: (user_id, post_id) => {
    const store = getStore();
    const postToFav = store.posts.find(post => post.id === post_id);

  
    if (postToFav) {
      setStore({ favorites: [...store.favorites, postToFav] });
    }
  }


  useEffect(() => {
    if (!store.token) {
      navigate("/");
    } else {
      actions.getMessage();
    }
  }, [store.token]);

  return (
    <div className="entirePage">
      {store.posts.map((post, index) => (
      <Card key={post.id} index={index} post={post} onFavClick={handleFavClick.bind(null, post)}></Card> 
      ))}
    </div>
  );
};

export default Explore;