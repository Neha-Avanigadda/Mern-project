import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../services/booksApi';
import { getCoverUrl } from '../utils/imageUtils';
import '../styles/BrowseBooks.css';

const BrowseBooks = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [books, setBooks] = useState([]);

  // Ensure page opens at the top whenever this view is mounted
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  // Load books from shared mock API so IDs match the details page
  useEffect(() => {
    (async () => {
      const list = await getAllBooks();
      setBooks(list);
    })();
  }, []);

  const categories = [
    { id: 'all', name: 'All Books', count: books.length },
    { id: 'fiction', name: 'Fiction', count: books.filter(book => book.category === 'fiction').length },
    { id: 'non-fiction', name: 'Non-Fiction', count: books.filter(book => book.category === 'non-fiction').length },
    { id: 'study', name: 'Study Books', count: books.filter(book => book.category === 'study').length }
  ];

  const filteredBooks = selectedCategory === 'all' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  const handleBorrow = (bookId) => {
    alert(`Book with ID ${bookId} borrowed successfully!`);
  };

  return (
    <div className="browse-books-page">
      <div className="browse-container">
        <div className="browse-header">
          <h1 className="browse-title">Browse Books</h1>
          <p className="browse-subtitle">Discover your next great read from our extensive collection</p>
        </div>

        <div className="browse-content">
          <div className="categories-sidebar">
            <h3 className="sidebar-title">Categories</h3>
            <ul className="category-list">
              {categories.map(category => (
                <li key={category.id} className="category-item">
                  <button
                    className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="books-section">
            <div className="books-header">
              <h2 className="section-title">
                {selectedCategory === 'all' ? 'All Books' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="books-count">{filteredBooks.length} books found</p>
            </div>

            <div className="books-list">
              {filteredBooks.map(book => {
                const bookId = book._id || book.id;
                return (
                <div key={bookId} className="book-item">
                  <div className="book-cover">
                    {book.cover ? (
                      <img src={getCoverUrl(book.cover)} alt={book.title} />
                    ) : (
                      <div className="book-cover-placeholder">
                        <span className="book-initial">
                          {book.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <p className="book-genre">{book.genre}</p>
                    <div className="book-actions">
                      <button 
                        className="borrow-button"
                        onClick={() => handleBorrow(bookId)}
                      >
                        Borrow
                      </button>
                      <Link to={`/book/${bookId}`} state={{ book }} className="details-button">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseBooks;
