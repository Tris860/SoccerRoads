import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/authpage.css';
import '../API/api.js';
import { postData } from '../API/api.js';

const passwordConfirm =document.getElementById("passwordConfirm");
const password = document.getElementById("password");
const email = document.getElementById("email");
const authForm = document.getElementById("auth-form");

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
     
    formData.append("email", email);
    formData.append("password", password);
    
    if (mode === 'login') {
      const action = 'login';
      formData.append("login", action);
      const data = await postData('login', formData);
      if (data.success === true) {
       
        navigate("/mode-selection");
      }
      else {
        //showMessageBox('Login failed', data.message || 'Login failed. Please try again.');
        alert(data.message || 'Login failed. Please try again.');
      }

      // Navigate to mode selection page
      

    } else {
      // Signup logic here
      authForm.reset();
      alert(email+password+confirmPassword);

      if (!email || !password || !confirmPassword) {
        alert('Please fill in all fields!');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address!');
        return;
      }
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        } else if (password.length < 8) {
          alert("Password must be at least 8 characters long!");
          return;
        } else {
          const action = "register";
          formData.append("register", action);
          const data = await postData("register", formData);
          if (data.success === true) {
            //showMessageBox('Signup successful', data.message || 'Account created successfully! You can now log in.');
            alert(data.message || "Account created successfully! You can now log in.");
            authForm.reset();
            setMode('login');
          } else {
            //showMessageBox('Signup failed', data.message || 'Signup failed. Please try again.');
            alert(data.message || "Signup failed. Please try again.");
          }
        }
    }
    
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="page page-center">
      <div className="auth-container">
        
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={mode === 'login' ? 'tab active' : 'tab'}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={mode === 'signup' ? 'tab active' : 'tab'}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} id='auth-form'>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <svg
                    className="eye-off-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    className="eye-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link (Login only) */}
          {mode === 'login' && (
            <div className="forgot-link">
              <a href="#">Forgot password?</a>
            </div>
          )}

          {/* Confirm Password (Signup only) */}
          {mode === 'signup' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id='passwordConfirm'
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <svg
                      className="eye-off-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      className="eye-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="primary-button">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AuthPage;