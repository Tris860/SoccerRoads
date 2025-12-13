// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/auth");
  };

  return (

    <div className="page-wrapper">
     {/*<div className="page page-center">
      <div className="home-container">
        <h1>Online Driving School</h1>
        <p>Learn driving theory, rules, and test preparation online.</p>
         <button onClick={handleGoToLogin} className="primary-button">
          Login / Sign Up
        </button> 
      </div>
      
     </div>
    */}
     <div className="container">
      
      {/* ========== HEADER ========== */}
      <header className="header">
        <div className="logo">🚗</div>
        <span className="site-name">Kigali <br /><span>RoadRules</span></span>
        
        <nav className="links">
          {/* <p tabIndex="0">Who we are</p> */}
          <p className="login" tabIndex="0" onClick={handleGoToLogin} >Login</p>
        </nav>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="main-content">
        
        {/* LEFT - Intro Text */}
        <div className="intro-msg-container">
          
          {/* Free Badge */}
          <div className="free-badge">
            {/* <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg> */}
            100% FREE — No Hidden Fees
          </div>
          
          {/* Main Heading */}
          <h1>
            Learn to Drive <span className="highlight">Online</span>, 
            Pass Your Test <span className="highlight-green">First Time</span>
          </h1>
          
          {/* Description */}
          <p className="description">
            Master the rules of the road from the comfort of your home. 
            Our comprehensive online driving course prepares you for your 
            theory test with interactive lessons, practice exams, — completely free of charge.
          </p>

          {/* Features */}
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Complete theory test preparation</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>500+ practice questions with explanations</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Road signs & traffic rules mastery</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Learn at your own pace, anytime</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="button-container">
            <button className="btn-primary">
              Start Now
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">25K+</div>
              <div className="stat-label">Students Trained</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">94%</div>
              <div className="stat-label">Pass Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Student Rating</div>
            </div>
          </div>

        </div>

        {/* RIGHT - Image/Illustration */}
        <div className="intro-image-container">
          
          {/* Main Car Illustration */}
          <div className="car-illustration">
            {/* <div className="car-icon">🚙</div> */}
            <p>Your Journey Starts Here</p>
          </div>
          
          
        </div>

      </main>

    </div>
    </div> 
  )
};

export default HomePage;