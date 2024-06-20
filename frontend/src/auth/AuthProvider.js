// frontend/src/auth/AuthProvider.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, isAuthenticated, login as authLogin, logout as authLogout, signup as authSignup } from './auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  console.log('Token in AuthProvider:', token);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
      setLoading(false);
    };

    fetchUser();
  }, [isLoggedIn]);

  const login = async (email, password) => {
    try {
      await authLogin(email, password);
      setIsLoggedIn(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      throw error;
    }
  };


  const signup = async (email, password) => {
    try {
      await authSignup(email, password);
      setIsLoggedIn(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      throw error;
    }
  };




  const logout = () => {
    authLogout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
