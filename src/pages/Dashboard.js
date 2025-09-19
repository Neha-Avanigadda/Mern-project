import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import DashboardWidget from '../components/DashboardWidget';
import '../styles/Dashboard.css';
import { FaBook, FaHistory, FaLightbulb, FaUser } from 'react-icons/fa';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 6, h: 2, minW: 4, minH: 2 },
    { i: 'b', x: 6, y: 0, w: 6, h: 2, minW: 4, minH: 2 },
    { i: 'c', x: 0, y: 2, w: 12, h: 2, minW: 6, minH: 2 },
  ];

  return (
    <div className="dashboard-container container">
      <h1 className="dashboard-title">My Dashboard</h1>
      <ResponsiveGridLayout 
        className="layout" 
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={150}
      >
        <div key="a">
          <DashboardWidget title="My Borrowed Books" icon={<FaBook />}>
            <p>You currently have 3 books borrowed. 'The Martian' is due in 2 days.</p>
          </DashboardWidget>
        </div>
        <div key="b">
          <DashboardWidget title="Reading History" icon={<FaHistory />}>
            <p>You have read 15 books this year. Your most read genre is Sci-Fi.</p>
          </DashboardWidget>
        </div>
        <div key="c">
          <DashboardWidget title="Personalized Recommendations" icon={<FaLightbulb />}>
            <p>Based on your interest in 'The Martian', you might like 'Project Hail Mary'.</p>
          </DashboardWidget>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;