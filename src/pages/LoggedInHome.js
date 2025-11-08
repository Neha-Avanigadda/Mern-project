import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoggedInHome.css';
import { getCoverUrl } from '../utils/imageUtils';
import { getAllBooks } from '../services/booksApi';
import LoggedInNavbar from '../components/LoggedInNavbar';
import { FaSearch } from 'react-icons/fa';

const LoggedInHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookSuggestions, setBookSuggestions] = useState([]);
  const navigate = useNavigate();

  // Recommended book titles to show
  const recommendedTitles = [
    "The Great Gatsby",
    "To Kill a Mockingbird",
    "1984",
    "Pride and Prejudice",
    "The Catcher in the Rye"
  ];

  // Fetch recommended books from MongoDB
  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const allBooks = await getAllBooks();
        // Filter to get only the recommended books
        const recommended = allBooks.filter(book => 
          recommendedTitles.includes(book.title)
        );
        // Sort to match the order of recommendedTitles
        const sorted = recommendedTitles
          .map(title => recommended.find(book => book.title === title))
          .filter(book => book !== undefined);
        setBookSuggestions(sorted);
      } catch (error) {
        console.error('Failed to fetch recommended books:', error);
        // Fallback to empty array if API fails
        setBookSuggestions([]);
      }
    };

    fetchRecommendedBooks();
  }, []);

  // Carousel auto-rotate
  useEffect(() => {
    if (bookSuggestions.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bookSuggestions.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [bookSuggestions.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };


  return (
    <div className="logged-in-home">
      <LoggedInNavbar />

      <main className="logged-in-content">
        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <h1 className="search-title">Find Your Next Great Read</h1>
            <p className="search-subtitle">Search through thousands of books in our digital library</p>
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="Search for books, authors, or genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <FaSearch className="search-icon" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="book-carousel-section">
          <h2 className="carousel-title">Recommended for You</h2>
          <div className="book-carousel">
            {bookSuggestions.length > 0 ? (
              <>
                <div className="carousel-container">
                  {bookSuggestions.map((book, index) => {
                    const bookId = book._id || book.id;
                    return (
                    <div
                      key={bookId}
                      className={`book-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                      <Link to={`/book/${bookId}`} state={{ book }} className="book-slide-link">
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
                          <span className="book-genre">{book.genre}</span>
                        </div>
                      </Link>
                    </div>
                    );
                  })}
                </div>
                <div className="carousel-indicators">
                  {bookSuggestions.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
                Loading recommendations...
              </div>
            )}
          </div>
        </div>

        <div className="quick-actions">
          <div className="action-card">
            <h3>Your Library</h3>
            <p>View your borrowed books and reading history</p>
            <Link to="/library" className="action-button">Go to Library</Link>
          </div>
          
          <div className="action-card">
            <h3>Browse Books</h3>
            <p>Discover new books and add them to your collection</p>
            <Link to="/browse" className="action-button">Browse Books</Link>
          </div>
          
          <div className="action-card">
            <h3>Reading Progress</h3>
            <p>Track your reading progress and set goals</p>
            <Link to="/progress" className="action-button">View Progress</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoggedInHome;
