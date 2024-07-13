import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/auth/me', {
        headers: { 'Authorization': token }
      }).then(response => {
        setUser(response.data);
        setIsAuthenticated(true);
      }).catch(() => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      const userResponse = await axios.get('http://localhost:3000/auth/me', {
        headers: { 'Authorization': response.data.token }
      });
      setUser(userResponse.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
