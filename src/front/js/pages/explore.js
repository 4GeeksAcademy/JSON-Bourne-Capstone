import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/explore.css";

const Explore = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {

    // Favorites
    const [activeFav, setActiveFav] = useState()
    const handleFavClick = (e) => {
      e.preventDefault()
      if (activeFav === true){
        // actions.removeFavorites(user_id, post_id)
        setActiveFav (false) 
      } else {
        actions.addFavorites(user_id, post_id) 
        setActiveFav (true) 
      }
    }
    // Redirect to login page if user is not logged in

    if (!store.token) {
      navigate("/");
    } else {
      actions.getMessage();
    }
  }, [store.token]);

  return (
    <div className="entirePage">

         <Link to="/generate">
            <button> Generate </button>
          </Link>
          {store.posts.map((item, index) => (
          {store.message && <div className="message">{store.message}</div>}
            <div key={index} className="eachCard">
              <h1>Some title</h1>
              <Link to={`/single/${index}`}>
              <img src={item} alt={`Image ${index}`} />
              </Link>
              {/* Favorites */}
              <button 
              onClick={(e)=>handleFavClick(e)} 
              className={activeFav ? "fas fa-heart":"far fa-heart"}></button>
       </div>
        );
      })}

    </div>
);
      }

export default Explore;