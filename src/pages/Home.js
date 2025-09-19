import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'; // Create this

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Your Digital Universe of Stories</h1>
          <p className="hero-subtitle">Explore thousands of books, from timeless classics to modern marvels. Your next adventure is just a click away.</p>
          <Link to="/catalog" className="hero-cta-button">Browse Catalog</Link>
        </div>
        <div className="hero-glow"></div>
      </section>
      
      {/* You can add a "Featured Books" section here later */}
    </div>
  );
};

export default Home;