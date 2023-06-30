import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Comments from "./comments";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const postId = params.id; // Accessing the post ID from the URL

  const commentData = {
    post_id: postId,
    userId: store.user // Using the post ID obtained from the URL
  };

  // Retrieve the single post based on the post ID
  const post = store.posts[postId];

  if (!post) {
    return <h3>Loading...</h3>; // Add a loading state until the post is fetched
  }

  return (
    <div className="text-center mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <img
              src={post}
              alt={`Image ${postId}`}
              style={{ width: "100%", height: "auto" }} // Adjust image size
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-6 offset-lg-3">
            <Comments actions={actions} commentData={commentData} />
          </div>
        </div>
      </div>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};