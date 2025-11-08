const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['fiction', 'non-fiction', 'study'],
    default: 'fiction'
  },
  cover: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  publishedYear: {
    type: Number
  },
  available: {
    type: Boolean,
    default: true
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  borrowedDate: {
    type: Date,
    default: null
  },
  returnDate: {
    type: Date,
    default: null
  },
  pdfUrl: {
    type: String,
    default: null
  },
  pages: {
    type: Number,
    default: null
  },
  releaseDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
