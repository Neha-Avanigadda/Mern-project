import React from 'react';
import './DashboardWidget.css'; // Create this file

const DashboardWidget = ({ title, children, icon }) => {
  return (
    <div className="dashboard-widget">
      <div className="widget-header">
        <span className="widget-icon">{icon}</span>
        <h3 className="widget-title">{title}</h3>
      </div>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardWidget;