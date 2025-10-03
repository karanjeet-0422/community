// src/ReplyForm.js
import React, { useState } from 'react';
import { db } from './firebase-config'; 
import { collection, addDoc } from 'firebase/firestore'; 

function ReplyForm({ postId, parentId, onReplySubmitted }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    // 🌟 FIX: Use empty string for top-level replies, otherwise use the parent ID.
    const finalParentId = parentId === null ? "" : parentId; 

    try {
        await addDoc(collection(db, 'replies'), {
            postId: postId,
            parentId: finalParentId, 
            content: content,
            createdAt: new Date().toISOString(),
        });
        
        setContent('');
        if (onReplySubmitted) onReplySubmitted();
    } catch (error) {
        console.error("Firebase write error: ", error);
        alert("Failed to post reply. Check console for details.");
    }
  };

  return (
    <div className="reply-form-container" style={{ margin: parentId ? '10px 0 10px 0' : '20px 0'}}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={parentId ? "Reply to this comment..." : "Write a comment..."}
          rows="2"
          style={{ 
            width: '100%', 
            padding: '8px', 
            borderRadius: '4px', 
            border: '1px solid #ccc',
            resize: 'none'
          }}
        />
        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
          Post Reply
        </button>
      </form>
    </div>
  );
}

export default ReplyForm;