// src/ReplySection.js
import React from 'react';
import ReplyForm from './ReplyForm';
import ReplyList from './ReplyList';

function ReplySection({ postId }) {
  return (
    <div className="replies-section">
      <h3 style={{ color: '#4a9d5e' }}>Join the Discussion</h3>
      
      {/* Form for top-level reply (parentId is null) */}
      <ReplyForm postId={postId} parentId={null} />

      {/* Component to fetch and display the list of top-level replies */}
      <ReplyList postId={postId} parentId={null} />
    </div>
  );
}

export default ReplySection;