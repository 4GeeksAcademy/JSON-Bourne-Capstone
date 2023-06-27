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
          <h1>Some title</h1>
          <Link to={`/single/${index}`}>
          <img src={item} alt={`Image ${index}`} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Explore;