import React from 'react';
import { Link, useHistory } from 'react-router-dom';
let token = localStorage.getItem('token');

const Navbar = () => {
  const history = useHistory();

  const handleNewBlogClick = () => {
    if (!token) {
      history.push('/login');
    } else {
      history.push('/create');
    }
  };

  const handleAuthButtonClick = () => {
    if (token) {
      localStorage.removeItem('token');
      token = null;
      history.push('/');
    } else {
      history.push('/login');
    }
  };


  return (
    <nav className="navbar">
    <h1>My Blog</h1>
    <div className="links">
      <Link to="/">Home</Link>
      <button className="new-blog-button" onClick={handleNewBlogClick}>
        New Blog
      </button>
      <span className="button-spacing"></span>
      <button className="auth-button" onClick={handleAuthButtonClick}>
        {token ? 'Logout' : 'Login'}
      </button>
    </div>
  </nav>
  );
};

export default Navbar;
