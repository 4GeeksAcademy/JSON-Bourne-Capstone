import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Comments from "./comments";

export const Single = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  console.log(params); // Log the params object to check its structure

  const postId = params.id; // Accessing the post ID from the URL


  const commentData = {
    post_id: postId, userId: store.user // Using the post ID obtained from the URL
  };

console.log(commentData, "IAM COMMENT DATA USER")

  // const handleClick = () => {
  //   navigate("/");
  // };

  // Retrieve the single post based on the post ID
  const post = store.posts[postId]

  console.log(store.user, 'IAMTHEUSER')

  if (!post) {
    return <h3>Loading...</h3>; // Add a loading state until the post is fetched
  }

  return (
    <div className="text-center mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img src={post} alt={`Image ${postId}`} />
          </div>
          <div className="col-lg-6">
            <Comments actions={actions} commentData={commentData} />
          </div>
        </div>
      </div>
      <h1>SINGLE VIEW</h1>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object
};





// import React, { useContext } from "react";
// import PropTypes from "prop-types";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";
// import  Comments  from "./comments";

// export const Single = (props) => {
//   const { store, actions } = useContext(Context);
//   const params = useParams();
//   const navigate = useNavigate();

//   const userId = params.id; // Accessing the user ID from the URL

//   const commentData = {
//     user_id: userId, // Using the user ID obtained from the URL
//     post_id: "post_id_value"
//   };

//   const handleClick = () => {
//     navigate("/");
//   };

//   return (
//     <div className="text-center mt-5">
//       <div className="container">1
//         <div className="row">
//           <div className="col-lg-6">
//             <Comments actions={actions} commentData={commentData} />
//           </div>
//           <div className="col-lg-6" onClick={handleClick}>
//           </div>
//         </div>
//       </div>
//       <h1>SINGLE VIEW</h1>
//     </div>
//   );
// };

// Single.propTypes = {
//   match: PropTypes.object,
// };