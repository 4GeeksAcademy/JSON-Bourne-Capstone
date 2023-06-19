import React, { useState } from 'react';

function Comments({ imageUrl, actions, user_id, post_id }) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const created_at = new Date();
      const success = await actions.comments(comment, created_at, user_id, post_id);
      if (success) {
        setComments([...comments, comment]);
        setComment('');
      } else {
        
        console.log('Comment creation failed');
      }
    } catch (error) {
      
      console.error('Error creating comment:', error);
    }
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
