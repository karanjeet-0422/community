// src/PostForm.js
import React, { useState } from 'react';
import { db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore'; 

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const postsCollectionRef = collection(db, 'posts');

  const createPost = async () => {
    if (!title || !content) {
      alert('Please fill out both the title and content.');
      return;
    }

    try {
        await addDoc(postsCollectionRef, {
            title: title,
            content: content,
            createdAt: new Date().toISOString(),
        });
        setTitle('');
        setContent('');
    } catch (error) {
        console.error("Error adding post: ", error);
        alert("Failed to submit post. Check console for details.");
    }
  };

  return (
    <div className="form-card">
      <h3>Create a New Post</h3>
      <div className="input-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a catchy title..."
        />
      </div>
      <div className="input-group">
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          placeholder="Share your thoughts..."
        />
      </div>
      <button onClick={createPost} className="btn btn-primary">
        Submit Post
      </button>
    </div>
  );
}

export default PostForm;