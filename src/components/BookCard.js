import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import '../styles/BookCard.css'; // We will create this file

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
        <img src={book.cover} alt={book.title} className="book-card-cover" />
        <div className="book-card-overlay">
          <div className="book-card-content">
            <h3 className="book-card-title">{book.title}</h3>
            <p className="book-card-author">{book.author}</p>
            <div className="book-card-rating">
              <FaStar color="#FFD700" /> {book.rating}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;