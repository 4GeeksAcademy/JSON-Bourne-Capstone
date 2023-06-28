import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/explore.css";
import Card from "../component/card";

const Explore = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id; // Accessing the post ID from the URL

  const FavoritesData = {
    post_id: postId,
    user_id: store.user // Using the user ID from the store
  };

  // Favorites
  const [activeFav, setActiveFav] = useState(false);
  const [message, setMessage] = useState(store.message); // Store the message in a separate state variable

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

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!store.token) {
      navigate("/");
    } else {
      actions.getMessage();
    }
  }, [store.token]);

  return (
    <div className="entirePage">
<Link to="/generate"> <button className="btn btn-warning">Generate</button></Link>
      {message && <div className="message">{message}</div>} {/* Display the message only once */}
      {store.posts.map((item, index) => (
        // <React.Fragment key={index}>
      <Card index={index} item={item}></Card> 
        // </React.Fragment>
      ))}
    </div>
  );
};

export default Explore;