import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import '../styles/Navbar.css'; // We will create this file

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          E-Library
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" end>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/catalog" className="nav-link">Catalog</NavLink>
          </li>
          {user && (
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            </li>
          )}
           {user && user.role === 'librarian' && (
            <li className="nav-item">
              <NavLink to="/admin" className="nav-link">Admin</NavLink>
            </li>
          )}
        </ul>
        <div className="nav-user-actions">
          {user ? (
            <>
              <NotificationBell count={3} />
              <span className="nav-username">Welcome, {user.name}</span>
              <button onClick={logout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button">Login</Link>
              <Link to="/register" className="nav-button primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;