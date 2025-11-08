/*
  Seed the MongoDB "elibrary" with initial books.
  Usage:
    MONGODB_URI="mongodb://localhost:27017/elibrary" JWT_SECRET="dummy" node scripts/seedBooks.js
*/

const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('../models/Book');

const books = [
  {
    title: 'Quantum Computing Explained',
    author: 'Dr. Evelyn Reed',
    genre: 'Science',
    category: 'non-fiction',
    cover: '/assets/quantumcomputingexplained.jpg',
    description: 'This book demystifies qubits, entanglement, and quantum algorithms with approachable explanations and real-world analogies.',
    publishedYear: 2018,
    pages: 384,
    releaseDate: new Date('2018-05-12'),
    pdfUrl: '/pdfs/quantum-computing-explained.pdf'
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    genre: 'Sci-Fi',
    category: 'fiction',
    cover: '/assets/The-Martian.jpg',
    description: 'A survival story of science and humor as Mark Watney engineers his way across the Martian landscape.',
    publishedYear: 2014,
    pages: 387,
    releaseDate: new Date('2014-02-11'),
    pdfUrl: '/pdfs/the-martian.pdf'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    category: 'fiction',
    cover: '/assets/mockingbird.jpg',
    description: 'Compassionate, dramatic, and deeply moving, this novel takes readers to the roots of human behavior.',
    publishedYear: 1960,
    pages: 281,
    releaseDate: new Date('1960-07-11'),
    pdfUrl: '/pdfs/to-kill-a-mockingbird.pdf'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Classic Romance',
    category: 'fiction',
    cover: '/assets/pride-and-prejudice.jpg',
    description: 'A witty romantic comedy about the importance of marrying for love, not simply for money.',
    publishedYear: 1813,
    pages: 279,
    releaseDate: new Date('1813-01-28'),
    pdfUrl: '/pdfs/pride-and-prejudice.pdf'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J. D. Salinger',
    genre: 'Classic Literature',
    category: 'fiction',
    cover: '/assets/thecatcherintherye.jpg',
    description: 'A story of teenage angst and alienation that has influenced generations of readers.',
    publishedYear: 1951,
    pages: 277,
    releaseDate: new Date('1951-07-16'),
    pdfUrl: '/pdfs/the-catcher-in-the-rye.pdf'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic Literature',
    category: 'fiction',
    cover: '/assets/thegreatgatsby.jpg',
    description: 'A portrait of the Roaring Twenties and the elusive promise of the American Dream.',
    publishedYear: 1925,
    pages: 180,
    releaseDate: new Date('1925-04-10'),
    pdfUrl: '/pdfs/the-great-gatsby.pdf'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian Fiction',
    category: 'fiction',
    cover: '/assets/1984.jpg',
    description: 'A dystopian classic exploring truth, power, and the erasure of reality.',
    publishedYear: 1949,
    pages: 328,
    releaseDate: new Date('1949-06-08'),
    pdfUrl: '/pdfs/1984.pdf'
  }
];

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/elibrary';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  try {
    // Upsert by title + author
    for (const item of books) {
      await Book.findOneAndUpdate(
        { title: item.title, author: item.author },
        { $set: item },
        { upsert: true, new: true }
      );
      console.log(`Seeded: ${item.title}`);
    }
    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

run();


