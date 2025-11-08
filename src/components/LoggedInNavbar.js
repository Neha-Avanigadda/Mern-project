import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoggedInHome.css';

const LoggedInNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="logged-in-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
              <Link to="/" className="brand-link">BookNexus</Link>
        </div>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">About</Link>
          </li>
          <li className="navbar-item profile-item">
            <button 
              className="profile-button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              Profile
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {isProfileOpen && (
              <div className="profile-dropdown">
                <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                  My Profile
                </Link>
                <Link to="/notifications" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                  Notifications
                </Link>
                <Link to="/library" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                  Library
                </Link>
                <Link to="/help" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                  Help
                </Link>
                <Link to="/settings" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                  Settings
                </Link>
                <button className="dropdown-item logout-item" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
