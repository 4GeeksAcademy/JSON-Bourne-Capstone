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
    <div className="container mt-5">
      <div className="card mb-3" id="block">
          <img src={post.image_url} alt={'image $postId'} className="card-img-top mx-auto d-block" style={{ width: '800px' }} />
          <div className="card-body">
            <Comments actions={actions} commentData={commentData} />
          </div>
        </div>
      </div>
  );
};



Single.propTypes = {
  match: PropTypes.object,
};