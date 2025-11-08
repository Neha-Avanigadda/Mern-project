import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllBooks, searchBooks } from '../services/booksApi';
import { getCoverUrl } from '../utils/imageUtils';
import { FaSearch, FaBook, FaUser, FaTag } from 'react-icons/fa';
import '../styles/SearchResults.css';

// Books are loaded from mock API so IDs match the details page

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [allBooks, setAllBooks] = useState([]);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    // Load catalog once so search and suggestions use the same data source
    (async () => {
      try {
        const books = await getAllBooks();
        setAllBooks(books);
      } catch (e) {
        // non-fatal for search UI
      }
    })();
  }, []);

  // Keep input in sync with URL
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  // Run search once the catalog is loaded or the query changes
  useEffect(() => {
    if (searchQuery && allBooks.length > 0) {
      performSearch(searchQuery);
    }
  }, [searchQuery, allBooks]);

  const performSearch = async (searchTerm) => {
    setLoading(true);
    setError('');
    
    try {
      // Try API search first, fallback to local filtering
      try {
        const results = await searchBooks(searchTerm);
        setSearchResults(results);
      } catch (apiError) {
        // Fallback to local search if API fails
        const source = allBooks.length > 0 ? allBooks : [];
        const filteredResults = source.filter(book => 
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
      }
    } catch (err) {
      setError('Failed to search books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  // Suggestion helpers
  const buildSuggestions = (value) => {
    if (!value || value.trim().length < 2) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      setHighlightIndex(-1);
      return;
    }
    const term = value.trim().toLowerCase();
    const items = (allBooks || []).filter(b =>
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term) ||
      b.genre.toLowerCase().includes(term)
    )
    .slice(0, 6);
    setSuggestions(items);
    setIsDropdownOpen(items.length > 0);
    setHighlightIndex(-1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    buildSuggestions(value);
  };

  const chooseSuggestion = (item) => {
    setSearchQuery(item.title);
    setIsDropdownOpen(false);
    setHighlightIndex(-1);
    performSearch(item.title);
  };

  const onKeyDown = (e) => {
    if (!isDropdownOpen || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        e.preventDefault();
        chooseSuggestion(suggestions[highlightIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setHighlightIndex(-1);
    }
  };

  return (
    <div className="search-results-page">
      
      <main className="search-results-content">
        <div className="search-header">
          <div className="search-container">
            <h1 className="search-title">Search Results</h1>
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="Search for books, authors, or genres..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={onKeyDown}
                  className="search-input"
                />
                {isDropdownOpen && suggestions.length > 0 && (
                  <ul className="search-suggestions">
                    {suggestions.map((s, idx) => (
                      <li
                        key={s.id}
                        className={`suggestion-item${idx === highlightIndex ? ' highlighted' : ''}`}
                        // onMouseDown to prevent input blur before click
                        onMouseDown={(e) => {
                          e.preventDefault();
                          chooseSuggestion(s);
                        }}
                      >
                        {s.title} <span className="suggestion-meta">by {s.author}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <button type="submit" className="search-button">
                  <FaSearch className="search-icon" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="results-section">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Searching for books...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="results-header">
                <h2>Found {searchResults.length} book{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"</h2>
              </div>
              <div className="books-grid">
                {searchResults.map(book => {
                  const bookId = book._id || book.id;
                  return (
                  <div key={bookId} className="book-card">
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
                      <p className="book-author">
                        <FaUser className="info-icon" />
                        {book.author}
                      </p>
                      <p className="book-genre">
                        <FaTag className="info-icon" />
                        {book.genre}
                      </p>
                      <p className="book-description">{book.description}</p>
                      <div className="book-actions">
                        <button className="borrow-button">Borrow</button>
                        <Link to={`/book/${bookId}`} state={{ book }} className="details-button">View Details</Link>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="no-results">
              <FaBook className="no-results-icon" />
              <h3>No books found</h3>
              <p>Try searching with different keywords or browse our collection.</p>
              <Link to="/browse" className="browse-link">Browse All Books</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
