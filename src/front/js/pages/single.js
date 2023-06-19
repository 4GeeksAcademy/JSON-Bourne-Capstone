import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Comments from "./comments";

export const Single = (props) => {
	
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="text-center mt-5">
      <h1>Hello Click Image GoTo Home!!</h1>
	  console.log("ÏAM HERERERER")
      <p>
        <Link to="/">
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

Single.propTypes = {
  match: PropTypes.object,
};
