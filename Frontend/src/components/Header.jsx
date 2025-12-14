// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear auth state
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">DS</div>
        <span className="site-name">Online Driving School</span>
      </div>

      <nav className="header-nav">
        <button className="link-button">About Us</button>
        <button className="link-button">Contact Us</button>
        <button className="icon-button" onClick={handleLogout} title="Logout">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;