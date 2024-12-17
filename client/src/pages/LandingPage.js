import React from 'react';
import Navbar from '../components/Navbar';
import './LandingPage.css';
import welcomeImage from '../images/image-1.png'; // Update this with your image paths
import featureImage from '../images/image-2.png'; // Update this with your image paths

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* <Navbar /> */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>The only app that gets your money into shape</h1>
          <p>Manage your finances and track your expenses effortlessly with FinWell</p>
          <div className="app-buttons">
            <a href="https://www.apple.com/app-store/">
              <button className="btn app-store">Download on the App Store</button>
            </a>
            <a href="https://play.google.com/store/">
              <button className="btn google-play">Get it on Google Play</button>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src={welcomeImage} alt="FinWell Dashboard" />
        </div>
      </div>
      <div className="features-section">
        <h2>How to get your money into shape?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img src={featureImage} alt="Perfect control" />
            <h3>Have perfect control</h3>
            <p>Track all your expenses, accounts, E-Wallets, and crypto wallets in one place.</p>
          </div>
          <div className="feature-card">
            <img src={featureImage} alt="Quick overview" />
            <h3>Get a quick overview</h3>
            <p>Analyze your total income and expenses at a glance, anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <img src={featureImage} alt="Smart budgets" />
            <h3>Use smart budgets</h3>
            <p>Plan your savings for your dream car, vacation, or top university.</p>
          </div>
        </div>
      </div>
      <div className="steps-section">
        <h2>Steps to get started with FinWell</h2>
        <div className="steps">
          <div className="step">
            <h3>Step 1</h3>
            <p>Track your income and expenses easily.</p>
          </div>
          <div className="step">
            <h3>Step 2</h3>
            <p>Set budgets and save for your goals.</p>
          </div>
          <div className="step">
            <h3>Step 3</h3>
            <p>Stay on track with real-time alerts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
