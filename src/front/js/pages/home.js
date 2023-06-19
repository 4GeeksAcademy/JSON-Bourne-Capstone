import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Comments from "./comments";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Hello Click Image VIEW comments in home!!</h1>
	  <Comments imageUrl={rigoImageUrl} actions={actions} />
	  <h1>Hello Click Image GoTo Single!!</h1>
      <p>
        <Link to="/single/">
          <img src={rigoImageUrl} alt="Rigo" />
        </Link>
      </p>
      <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
    </div>
  );
};
