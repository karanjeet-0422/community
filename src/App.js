// src/App.js
import React from 'react';
// Don't forget to run 'npm install react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import PostDetail from './PostDetail'; 

// Component for the Home route layout
function HomeLayout() {
  return (
    <div className="container app-body">
      <div className="grid-layout">
        <div className="form-card-wrapper">
            <PostForm />
        </div>
        <PostFeed /> 
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App-UmeedStyle">
        <header className="app-header">
          <h1 className="logo-text">UmeedBot - Community</h1>
        </header>
        
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;