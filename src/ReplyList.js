// src/ReplyList.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import Reply from './Reply';

function ReplyList({ postId, parentId }) {
  const [replies, setReplies] = useState([]);
  
  useEffect(() => {
    const repliesCollectionRef = collection(db, 'replies');
    
    // 🌟 FIX: Check for empty string "" for top-level replies
    const queryParentId = parentId === null ? "" : parentId; 
    
    const q = query(
  repliesCollectionRef,
  where('postId', '==', postId),      // Field 1: postId
  where('parentId', '==', queryParentId), // Field 2: parentId
  orderBy('createdAt', 'asc')         // Field 3: createdAt
);
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReplies(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsubscribe();
  }, [postId, parentId]); 

  return (
    <div className="reply-list">
      {replies.map((reply) => (
        <Reply key={reply.id} reply={reply} postId={postId} />
      ))}
      {replies.length === 0 && parentId === null && (
        <p style={{ margin: '10px 0', color: '#718096', fontStyle: 'italic' }}>No replies yet. Be the first to comment!</p>
      )}
    </div>
  );
}

export default ReplyList;