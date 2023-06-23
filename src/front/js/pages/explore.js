import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/explore.css";

export const Explore = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!store.token) {
      navigate("/");
    }
  }, [store.token, navigate]);

  console.log(store.posts);
  return (
    <div className="entirePage">
      {store.posts.map((item, index) => {
        return (
          <div className="eachCard" key={index}>
            <h1>Some title</h1>
            <Link to={`/single/${item.id}`}>
              <img src={item.image} alt={`Image ${index}`} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};