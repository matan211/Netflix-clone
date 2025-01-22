import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: email, password }),
      });

      if (response.status === 401) {
        alert('Invalid email or password');
        return;
      }

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('isAdmin', data.user.isAdmin);
      setToken(data.token);
      setUserId(data.user._id);
      setIsAdmin(data.user.isAdmin);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, userId, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
