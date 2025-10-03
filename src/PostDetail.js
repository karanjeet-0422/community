// src/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import ReplySection from './ReplySection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postDocRef = doc(db, 'posts', id); 
        const postSnapshot = await getDoc(postDocRef);

        if (postSnapshot.exists()) {
          setPost({ ...postSnapshot.data(), id: postSnapshot.id });
          setError(null);
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        console.error("Error fetching post: ", err);
        setError("Failed to load post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="container app-body"><p>Loading post...</p></div>;
  }

  if (error) {
    return <div className="container app-body"><p style={{ color: 'red' }}>Error: {error}</p></div>;
  }
  
  return (
    <div className="container app-body">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')} 
        className="btn btn-secondary back-button-style"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Feed
      </button>

      <div className="post-detail-card">
        <h2 className="detail-title">{post.title}</h2>
        <p className="detail-content">{post.content}</p>
        <small className="post-time">Posted: {new Date(post.createdAt).toLocaleTimeString()}</small>
      </div>

      <ReplySection postId={post.id} />
    </div>
  );
}

export default PostDetail;