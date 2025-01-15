import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import Search from './Search'; // Import the Search component

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Refresh the page when the logo is clicked
    navigate('/');
    navigate('/home');
  };

  return (
    <div className="nav-bar">
      <img
        className="nav-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        onClick={handleLogoClick}
      />
      <Search onSearch={onSearch} /> {/* Include the Search component */}
      <div className="nav-avatar-container">
        <img
          className="nav-avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User Avatar"
        />
        <div className="nav-avatar-bubble">
          <p>Profile</p>
          <p>Settings</p>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;