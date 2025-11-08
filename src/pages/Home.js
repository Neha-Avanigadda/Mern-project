import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.css'; 

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <section className="hero-section">
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="/libu.mp4"
        />
        <div className="hero-content">
          <h1 className="hero-title">Your Digital Universe of Stories</h1>
          <p className="hero-subtitle">Explore thousands of books, from timeless classics to modern marvels. Your next adventure is just a click away.</p>
          <Link to="/login" className="hero-cta-button">Explore More</Link>
        </div>
        <div className="hero-glow"></div>
      </section>
      
    </div>
  );
};

export default Home;