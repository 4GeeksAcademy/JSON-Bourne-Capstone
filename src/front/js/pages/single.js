import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Comments } from "./comments";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const userId = params.id; // Accessing the user ID from the URL

  const commentData = {
    user_id: userId, // Using the user ID obtained from the URL
    post_id: "post_id_value"
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="text-center mt-5">
      <div className="container">1
        <div className="row">
          <div className="col-lg-6">
            <Comments actions={actions} commentData={commentData} />
          </div>
          <div className="col-lg-6" onClick={handleClick}>
          </div>
        </div>
      </div>
      <h1>SINGLE VIEW</h1>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};