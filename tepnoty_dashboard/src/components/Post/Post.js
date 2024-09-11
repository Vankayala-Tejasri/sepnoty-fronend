import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css';  // Import some CSS to style the form and posts

const Post = () => {
  const [type, setType] = useState('text');  // Post type ('text', 'image', 'video')
  const [text, setText] = useState('');      // Text for text posts
  const [media, setMedia] = useState(null);  // Media file for image/video posts
  const [posts, setPosts] = useState([]);    // List of posts
  const [loading, setLoading] = useState(false);  // Loading state for form submission

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Handle file selection for image/video posts
  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
  };

  // Handle form submission to create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('type', type);
    
    if (type === 'text') {
      formData.append('text', text);
    } else {
      formData.append('media', media);
    }

    try {
      await axios.post('http://localhost:3001/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchPosts();  // Fetch posts again to see the newly created post
      setText('');   // Reset text input
      setMedia(null);  // Reset media input
      setLoading(false);
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
  };

  return (
    <div className="post-app">
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="post-type">
          <label>
            <input
              type="radio"
              value="text"
              checked={type === 'text'}
              onChange={() => setType('text')}
            />
            Text
          </label>
          <label>
            <input
              type="radio"
              value="image"
              checked={type === 'image'}
              onChange={() => setType('image')}
            />
            Image
          </label>
          <label>
            <input
              type="radio"
              value="video"
              checked={type === 'video'}
              onChange={() => setType('video')}
            />
            Video
          </label>
        </div>

        {type === 'text' ? (
          <textarea
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        ) : (
          <input type="file" accept={type === 'image' ? 'image/*' : 'video/*'} onChange={handleFileChange} required />
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>

      <h2>Posts</h2>
      <div className="posts">
        {posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="post">
              {post.type === 'text' && <p>{post.text}</p>}
              {post.type === 'image' && <img src={`http://localhost:3001/${post.mediaUrl}`} alt="Post Image" />}
              {post.type === 'video' && (
                <video controls>
                  <source src={`http://localhost:3001/${post.mediaUrl}`} type="video/mp4" />
                </video>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
