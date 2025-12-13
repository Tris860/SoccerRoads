// src/pages/ModeSelectionPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ModeSelectionPage = () => {
  const navigate = useNavigate();

  const handleSelectMode = (mode) => {
    // TODO: store mode if needed
    navigate("/dashboard");
  };

  return (
    <div className="page page-center">
      <div className="mode-container">
        <h2>Select Learning Mode</h2>

        <div className="mode-cards">
          <div
            className="mode-card"
            onClick={() => handleSelectMode("content")}
          >
            <h3>Content-based Learning</h3>
            <p>Read lessons, watch videos, and study materials.</p>
          </div>

          <div className="mode-card" onClick={() => handleSelectMode("qa")}>
            <h3>Question & Answer Mode</h3>
            <p>Practice with questions and answers to test yourself.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionPage;