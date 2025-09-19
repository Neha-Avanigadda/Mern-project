import React from 'react';
import { FaBell } from 'react-icons/fa';
import './NotificationBell.css'; // Create this new CSS file

const NotificationBell = ({ count }) => {
  return (
    <div className="notification-bell">
      <FaBell />
      {count > 0 && <span className="notification-badge">{count}</span>}
    </div>
  );
};

export default NotificationBell;