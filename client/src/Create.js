import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setTitleError('');
    setBodyError('');
  
    if (title.length < 5) {
      setTitleError('Title must be at least 5 characters long');
      return;
    }
  
    if (body.length < 10) {
      setBodyError('Body must be at least 10 characters long');
      return;
    }
  
    const blog = { body, title, author };
    setIsPending(true);
  
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token is undefined. User may not be logged in.');
        setIsPending(false);
        return;
      }
  
      const response = await fetch('https://mock-json-k8w5.onrender.com/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...blog,
          timestamp: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('New blog added:', data);
      setIsPending(false);
      history.push('/');
    } catch (error) {
      console.error('Error adding blog:', error);
      setIsPending(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <div className="error">{titleError}</div>}

        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {bodyError && <div className="error">{bodyError}</div>}

        <label>Blog author:</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {isPending && (
          <div style={{ fontSize: "20px", fontWeight: "bolder", color: "blue" }}>
            Adding Blog...
          </div>
        )}
        {!isPending && <button>Add Blog</button>}
      </form>
    </div>
  );
};

export default Create;