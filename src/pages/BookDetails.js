import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getBookById } from '../services/booksApi';
import { getCoverUrl } from '../utils/imageUtils';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/BookDetails.css'; 

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  const location = useLocation();

  useEffect(() => {
    const stateBook = location.state && location.state.book;
    if (stateBook) {
      setBook(stateBook);
      setLoading(false);
      return;
    }
    const fetchBook = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchBook();
    }
  }, [id, location.state]);

  const handleStartReading = () => {
    if (book && book.pdfUrl) {
      // Open PDF in a new tab
      window.open(`http://localhost:4000${book.pdfUrl}`, '_blank');
    } else {
      alert('PDF not available for this book yet.');
    }
  };

  if (loading) {
    return <div className="container book-details-page"><p>Loading details...</p></div>;
  }

  if (!book) {
    return <div className="container book-details-page"><p>Book not found.</p></div>;
  }

  return (
    <div className="book-details-page">
      <div className="container">
        <Link to="/browse" className="back-link"><FaArrowLeft /> Back</Link>
        {/* Cover at the top */}
        <div className="details-cover top">
          {book.cover ? (
            <img src={getCoverUrl(book.cover)} alt={`${book.title} cover`} />
          ) : (
            <div className="cover-placeholder">{book.title?.charAt(0) || 'B'}</div>
          )}
        </div>

        {/* Text information stacked below */}
        <div className="details-info stacked">
          <h1 className="details-title">{book.title}</h1>
          <div className="details-meta">
            <span className="meta-item">Author: <strong>{book.author}</strong></span>
            <span className="meta-item">Release: <strong>{book.releaseDate ? new Date(book.releaseDate).toDateString() : '—'}</strong></span>
            <span className="meta-item">Pages: <strong>{book.pages || '—'}</strong></span>
          </div>
          <p className="details-description">{book.description || book.synopsis}</p>

          <button className="primary-action" onClick={handleStartReading}>
            Start Reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;