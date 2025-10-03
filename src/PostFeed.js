// src/PostFeed.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase-config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const postsCollectionRef = collection(db, 'posts');
    const q = query(postsCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({ 
          ...doc.data(), 
          id: doc.id
        }))
      );
    });

    return () => unsubscribe();
  }, []); 

  const handlePostClick = (id) => {
    navigate(`/post/${id}`); 
  };

  return (
    <div className="posts-container">
      <h2>Community Posts ({posts.length})</h2>
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="post-card-feed clickable-card"
          onClick={() => handlePostClick(post.id)}
        >
          <h3 className="post-title-feed">
            {post.title}
          </h3>
          <p className="post-content-feed">
            {post.content}
          </p>
          <small className="post-time">
            Posted: {new Date(post.createdAt).toLocaleTimeString()}
          </small>
        </div>
      ))}
      {posts.length === 0 && <p style={{ textAlign: 'center', color: '#718096' }}>No posts yet. Be the first to share!</p>}
    </div>
  );
}

export default PostFeed;