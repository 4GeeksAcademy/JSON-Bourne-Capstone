import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import  Comments  from "./comments";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const  postId = params.id; // Accessing the user ID from the URL

  const commentData = {
    post_id: postId, userId: store.user // Using the post ID obtained from the URL
  };

  console.log(commentData, "IAM COMMENT DATA USER")

  // Retrieve the single post based on the post ID
  const post = store.posts[postId]

  console.log(store.user, 'IAMTHEUSER')
 
  // if (!post) {
  //   return <h3>Loading...</h3>; // Add a loading state until the post is fetched
  // }

  return (
    <div className="text-center mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6" style={{ margin: '5px' }}>
            <img src={post} alt={`Image ${postId}`} />
          </div>
          <div className="col-lg-6" style={{ margin: '20px' }}>
            <Comments actions={actions} commentData={commentData} />
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