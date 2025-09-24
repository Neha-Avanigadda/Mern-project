import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../services/mockApi';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/BookDetails.css'; // Create this new CSS file

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Gets the book ID from the URL

  useEffect(() => {
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
    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="container book-details-page"><p>Loading details...</p></div>;
  }

  if (!book) {
    return <div className="container book-details-page"><p>Book not found.</p></div>;
  }

  return (
    <div className="book-details-page">
      <div className="container">
        <Link to="/catalog" className="back-link"><FaArrowLeft /> Back to Catalog</Link>
        <div className="details-content">
          <div className="details-cover">
            <img src={book.cover} alt={`${book.title} cover`} />
          </div>
          <div className="details-info">
            <h1 className="details-title">{book.title}</h1>
            <h3 className="details-author">by {book.author}</h3>
            <p className="details-genre">{book.genre}</p>
            <p className="details-synopsis">{book.synopsis}</p>
            <button className="borrow-button">Borrow This Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;