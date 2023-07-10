import React, { useContext, useState } from 'react';
import { Context } from '/workspaces/JSON-Bourne-Capstone/src/front/js/store/appContext.js';
import '../../styles/comments.css';

const Comments = ({ actions, commentData }) => {
  const { store } = useContext(Context);
  const { userId } = commentData;
  const { post_id } = 0;
  const [showComments, setShowComments] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    console.log(event.target.value, 'HANDLECOMMENTCHANGE');
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission and page refresh
    try {
      const created_at = new Date();
      const success = await actions.comments(comment, created_at, userId, post_id);
      if (success) {
        const newComment = { comment, created_at, userId, post_id };
        setComments([...comments, newComment]);
        setComment('');
      } else {
        console.log('Comment creation failed');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const deleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  // Filter comments based on the current post being displayed
  const filteredComments = comments.filter((c) => c.post_id === post_id);

  return (
    <div className="comments-container">
      <h3 className="comments-heading">Comments</h3>
      <div className="comments-list">
        {filteredComments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p className="comment-text">{comment.comment}</p>
            <button className="btn btn-danger comment-delete-btn" onClick={() => deleteComment(index)}>Delete</button>
          </div>
        ))}
      </div>
      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <textarea
          className="comment-textarea"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button className="btn btn-primary comment-submit-btn" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default Comments;