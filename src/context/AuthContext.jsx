import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userData = localStorage.getItem('userData');

    if (token && userId) {
      setIsAuthenticated(true);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const { userId, token, ...otherData } = userData;
    
    // Store authentication data
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(otherData));
    
    setUser(otherData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('onboardingCompleted');
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
  };

  const isOnboardingCompleted = () => {
    return localStorage.getItem('onboardingCompleted') === 'true';
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    completeOnboarding,
    isOnboardingCompleted
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};