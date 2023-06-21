import React, { useState } from 'react';
 
 function Comments({ imageUrl }) {
   const [showComments, setShowComments] = useState(false);
   const [comment, setComment] = useState('');
   const [comments, setComments] = useState([]);
   console.log(imageUrl, 'ÍAM IMAGE')
   const handleCommentChange = (event) => {
     setComment(event.target.value);
   };


  const toggleComments = () => {
    setShowComments(!showComments);
  };
  return (
    <div>
      <img src={imageUrl} alt="Image" onClick={toggleComments} />
      {showComments && (
        <div>
          <h3>Comments</h3>
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <input type="text" value={comment} onChange={handleCommentChange} />
            <button type="submit">Add Comment</button>
          </form>
        </div>
      )}
    </div>
   );
 }


 export default Comments;