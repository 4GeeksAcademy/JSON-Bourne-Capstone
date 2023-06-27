import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/explore.css";

const Explore = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate("/");
    } else {
      actions.getMessage();
    }
  }, [store.token]);

  return (
    <div className="entirePage">
      {store.message && <div className="message">{store.message}</div>}
      {store.posts.map((item, index) => (
        <div key={index} className="eachCard">
          <p></p>
          <Link to={`/single/${item.id}`}>
            <img src={item} alt="Post" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Explore;