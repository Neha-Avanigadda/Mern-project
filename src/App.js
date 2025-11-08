import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoggedInHome from './pages/LoggedInHome';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BrowseBooks from './pages/BrowseBooks';
import SearchResults from './pages/SearchResults';
import BookDetails from './pages/BookDetails';
import Dashboard from './pages/Dashboard';
import BorrowedBooks from './pages/BorrowedBooks';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { useAuth } from './context/AuthContext';
import LoggedInNavbar from './components/LoggedInNavbar';

function App() {
  const { user } = useAuth();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <LoggedInHome /> : <Home />} />
        <Route path="/login" element={
          <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <Login />
            </main>
          </>
        } />
        <Route path="/register" element={
          <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <Register />
            </main>
          </>
        } />
        <Route path="/profile" element={
          <>
            <LoggedInNavbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <Profile />
            </main>
          </>
        } />
        <Route path="/browse" element={
          <>
            <LoggedInNavbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <BrowseBooks />
            </main>
          </>
        } />
        <Route path="/search" element={
          <>
            <LoggedInNavbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <SearchResults />
            </main>
          </>
        } />
        <Route path="/book/:id" element={
          <>
            <LoggedInNavbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <BookDetails />
            </main>
          </>
        } />
        <Route path="/dashboard" element={
          <>
            <LoggedInNavbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <Dashboard />
            </main>
          </>
        } />
        <Route path="/my-books" element={
          <>
            <LoggedInNavbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <BorrowedBooks />
            </main>
          </>
        } />
        <Route path="/admin" element={
          <>
            <LoggedInNavbar />
            <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
              <AdminDashboard />
            </main>
          </>
        } />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;