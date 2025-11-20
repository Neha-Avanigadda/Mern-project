/* 
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; // Use shared style

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to access your digital library.</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="auth-error">{error}</p>}
          <div className="input-group">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Email Address"
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="Password"
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


COMMENTED THIS WHOLE CODE SO THAT LOGIN WILL WORK WITHOUT CONNECTING TO BACKEND,
 IF U WANT TO CONNECT TO BACKEND REMOVE THIS COMMENTS AND BELOW CODE


*/
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // We don't use 'login' from context anymore because the backend is offline
  // We only use 'loading' (optional) or just ignore it.
  const { loading } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- CHEAT CODE START ---
    // Instead of calling the backend, we check the password right here.
    
    if (email === "admin@test.com" && password === "admin123") {
        console.log("Bypassing backend...");

        // 1. Save fake data to localStorage so the app "remembers" you
        localStorage.setItem("token", "fake-demo-token-12345");
        localStorage.setItem("user", JSON.stringify({ 
            _id: "dummy-id-123",
            name: "Demo Admin",
            email: "admin@test.com",
            role: "admin" // This is the key! It tells your app you are an Admin.
        }));

        // 2. Force a reload to the Home page
        // We use window.location.href instead of navigate() to ensure 
        // your AuthContext re-reads the localStorage and updates the state.
        window.location.href = "/"; 

    } else {
        // If they type the wrong password
        setError('Invalid credentials. Try: admin@test.com / admin123');
    }
    // --- CHEAT CODE END ---
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to access your digital library.</p>
        <form onSubmit={handleSubmit}>
          {error && <p className="auth-error">{error}</p>}
          <div className="input-group">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Email Address"
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="Password"
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            Login
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;