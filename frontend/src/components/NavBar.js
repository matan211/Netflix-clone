import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import Search from './Search'; // Import the Search component
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMouseEnter = () => {
    setIsBubbleVisible(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsBubbleVisible(false);
    }, 500); // Keep the bubble open for half a second
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
      <div
        className="nav-avatar-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="nav-avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User Avatar"
        />
        <div className={`nav-avatar-bubble ${isBubbleVisible ? 'visible' : ''}`}>
          <p>Profile</p>
          <p>Settings</p>
          <p onClick={handleLogout} className="logout-link">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;