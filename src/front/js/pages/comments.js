import React, { useState } from 'react';
import "../../styles/single.css"

const Comments = ({ actions, commentData}) => {
  const { userId, post_id} = commentData;
  const [showComments, setShowComments] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    console.log(event.target.value, 'HANDLECOMMENTCHANGE');
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const created_at = new Date();
      const success = await actions.comments(comment, created_at, userId, post_id);
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

  
  const filteredComments = comments.filter((c) => c.post_id === post_id);

  return (
    <div>
      {filteredComments.map((comment, index) => (
        <div key={index} className='mb-2'> 
        <div className="card">
          <div className='card-body'>
            <p className='card-text'>{comment}</p>
            </div>
            </div>
            </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <div className='form-group'>
        <textarea id='commentInput' className='form-control' type="text" value={comment} onChange={handleCommentChange}></textarea>
        </div>
        <button className="btn btn-warning" type="submit">Comment</button>
      </form>
    </div>
  );
};

export default Comments;
