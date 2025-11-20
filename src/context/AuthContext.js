/*
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      setUser(response.user);
      setToken(response.token);

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (firstName, lastName, email, password) => {
    setLoading(true);
    try {
      // Only create user in backend; don't log in right away
      const response = await registerUser(firstName, lastName, email, password);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = { user, loading, token, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};



COMMENTED THIS WHOLE CODE SO THAT LOGIN WILL WORK WITHOUT CONNECTING TO BACKEND,
 IF U WANT TO CONNECT TO BACKEND REMOVE THIS COMMENTS AND BELOW CODE
*/



import React, { createContext, useState, useContext, useEffect } from 'react';

// REMOVED: import { loginUser, registerUser } from '../services/authApi'; 
// We don't need the API anymore since we are faking it.

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  // Check for existing token on app load
  // This keeps you logged in when you refresh the page
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // --- CHEAT MODE START ---
    // We simply pretend the login worked. 
    // We wait 500ms to make it feel like it's "loading".
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser = {
        _id: "dummy-admin-id",
        firstName: "Demo",
        lastName: "Admin",
        email: email,
        role: "admin" // IMPORTANT: This gives you admin access in your app
    };
    const mockToken = "fake-jwt-token-12345";

    setUser(mockUser);
    setToken(mockToken);

    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setLoading(false);
    return { user: mockUser, token: mockToken };
    // --- CHEAT MODE END ---
  };

  const register = async (firstName, lastName, email, password) => {
    setLoading(true);
    
    // --- CHEAT MODE START ---
    // Pretend registration was successful
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setLoading(false);
    return { success: true, message: "User registered successfully (Demo)" };
    // --- CHEAT MODE END ---
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Force redirect to login page
  };

  const value = { user, loading, token, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};