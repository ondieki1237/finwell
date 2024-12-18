import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Analytics from './pages/Analytics';
import BlogFeed from './pages/BlogFeed';
import LandingPage from './pages/LandingPage';
import KYC from './pages/kycForm';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleKYCComplete = () => {
    setIsFirstTimeUser(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/kyc"
          element={
            isFirstTimeUser ? <KYC onComplete={handleKYCComplete} /> : <Navigate to="/dashboard" />
          }
        />

        {/* Protected Routes */}
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
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <ProfilePage />
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
