import React, { useState } from 'react';

const Comments = ({ actions, commentData, posts }) => {
  const { user_id, post_id } = commentData;
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

  // Filter comments based on the current post being displayed
  const filteredComments = comments.filter((c) => c.post_id === post_id);

  return (
    <div>
      <h3>Comment</h3>
      {filteredComments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input type="text" value={comment} onChange={handleCommentChange} />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default Comments;



  // const handleCommentSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const created_at = new Date();
  //     const success = await actions.comments(comment, created_at, user_id, post_id);
  //     if (success) {
  //       setComments([...comments, comment]);
  //       setComment('');
  //     } else {
  //       console.log('Comment creation failed');
  //     }
  //   } catch (error) {
  //     console.error('Error creating comment:', error);
  //   }
  // };
 // neeed to map through posts and match them to comments 
//   return (
//     <div>
//       <h3>Comment</h3>
//       {comments.map((comment, index) => (
//         <p key={index}>{comment}</p>
//       ))}
//       <form onSubmit={handleCommentSubmit}>
//         <input type="text" value={comment} onChange={handleCommentChange} />
//         <button type="submit">Add Comment</button>
//       </form>
//     </div>
//   );
// }

