// src/Reply.js
import React, { useState } from 'react';
import ReplyList from './ReplyList';
import ReplyForm from './ReplyForm';

function Reply({ reply, postId }) {
  // State to control the visibility of the nested reply form
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Function to close the form after successful submission
  const handleReplySubmitted = () => {
    setShowReplyForm(false);
  };

  return (
    <div className="reply-card">
      <p className="reply-content">{reply.content}</p>
      <small className="reply-meta">
        Replied: {new Date(reply.createdAt).toLocaleTimeString()}
      </small>
      
      {/* Button to toggle the nested ReplyForm */}
      <button 
        onClick={() => setShowReplyForm(prev => !prev)} 
        className="reply-button"
      >
        {showReplyForm ? 'Cancel Reply' : 'Reply'}
      </button>

      {/* Renders the form if state is true */}
      {showReplyForm && (
        <ReplyForm 
          postId={postId} 
          parentId={reply.id} 
          onReplySubmitted={handleReplySubmitted}
        />
      )}

      {/* Nested Replies (Recursion point) */}
      <div style={{ paddingLeft: '10px', borderLeft: '1px dotted #ccc', marginTop: '10px' }}>
        <ReplyList postId={postId} parentId={reply.id} />
      </div>
    </div>
  );
}

export default Reply;