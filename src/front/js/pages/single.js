import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import  Comments  from "./comments";


export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const postId = params.id; 

  // Find the single post based on the post ID
  const post = store.posts.find(post => post.id === Number(postId))

  if (!post) {
    return <h3>Loading...</h3>; 
  }


  const commentData = {
    post_id: postId,
    userId: store.user,
    image_url: post.image_url
  };

  return (
    <div className="text-center mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6" style={{ margin: '10%' }}>
            <img src={post.image_url} alt={`Image ${postId}`} />
          </div>
          <div className="col-lg-6" style={{ margin: '20px' }}>
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