import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();

  
  const booksRead = [];
  const booksInLibrary = 0;
  const averageRating = 0;
  const monthlyGoal = 4;
  const yearlyGoal = 20;
  const booksReadThisMonth = 0;
  const booksReadThisYear = 0;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-picture">
            <div className="profile-img-placeholder">
              <span className="profile-initial">
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user?.name || 'User'}</h1>
            <p className="profile-email">{user?.email || 'user@example.com'}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{booksRead.length}</span>
                <span className="stat-label">Books Read</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{averageRating || '0.0'}</span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{booksInLibrary}</span>
                <span className="stat-label">Books in Library</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="books-section">
            <h2 className="section-title">Books Read</h2>
            {booksRead.length > 0 ? (
              <div className="books-grid">
                {booksRead.map((book) => (
                  <div key={book.id} className="book-item">
                    <div className="book-cover">
                      <div className="book-cover-placeholder">
                        <span className="book-initial">
                          {book.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="book-details">
                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-author">{book.author}</p>
                      <p className="book-date">Read on {new Date(book.dateRead).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p className="empty-message">Nothing yet</p>
                <p className="empty-subtitle">Start reading to see your books here!</p>
              </div>
            )}
          </div>

          <div className="reading-progress">
            <h2 className="section-title">Reading Progress</h2>
            <div className="progress-stats">
              <div className="progress-item">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(booksReadThisMonth / monthlyGoal) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-label">This Month: {booksReadThisMonth}/{monthlyGoal} books</span>
              </div>
              <div className="progress-item">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(booksReadThisYear / yearlyGoal) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-label">Yearly Goal: {booksReadThisYear}/{yearlyGoal} books</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
