
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Analytics from './pages/Analytics';
import BlogFeed from './pages/BlogFeed';
import LandingPage from './pages/LandingPage';
import KYC from './pages/kycForm';
import IncomeStream from './components/IncomeStream';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const kycStatus = localStorage.getItem('kycCompleted');

    if (token) {
      setIsAuthenticated(true);
    }

    if (kycStatus === 'true') {
      setIsFirstTimeUser(false);
    }
  }, []);

 
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('token', 'yourToken');  // Store token in localStorage
  };

  // Function to mark KYC as completed
  const handleKYCComplete = () => {
    setIsFirstTimeUser(false); 
    localStorage.setItem('kycCompleted', 'true');  
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/incomestream" element={<IncomeStream />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />

        {/* KYC Page, only shown for first-time users */}
        <Route
          path="/kyc"
          element={
            isFirstTimeUser ? (
              <KYC onComplete={handleKYCComplete} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Protected Routes - Redirect to Login if not authenticated */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/analytics"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Analytics />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/blogfeed"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <BlogFeed />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
