import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import BookDetails from './pages/BookDetails';
import Dashboard from './pages/Dashboard';
import BorrowedBooks from './pages/BorrowedBooks';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-books" element={<BorrowedBooks />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;