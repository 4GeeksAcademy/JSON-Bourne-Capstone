import React, { useContext, useState } from 'react';
import { Context } from '/workspaces/JSON-Bourne-Capstone/src/front/js/store/appContext.js';

const Comments = ({ actions, commentData}) => {
  const {store} = useContext(Context)
  const { userId} = commentData;
  const { post_id } = 0;
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

  // Filter comments based on the current post being displayed
  const filteredComments = comments.filter((c) => c.post_id === post_id);

  return (
    <div>
      <h3>Comment</h3>
      {filteredComments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
      <form className="d-flex" onSubmit={handleCommentSubmit}>
        <textarea className="commentsTextArea" type="text" value={comment} onChange={(e)=>setComment(e.target.value)} style={{ width: '300px', height: '100px' }} />
        <button className="btn btn-primary" type="submit"  style={{ width: '150px', height: '50px' }}>Add Comment</button>
      </form>
    </div>
  );
};

export default Comments;
