import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Icons } from "../assets/icons";
import logo from "../assets/logo.png";
import "../styles/App.css";

export default function MainLayout() {
  const [showMagic, setShowMagic] = useState(false);
  const [showVibe, setShowVibe] = useState(true);

  const streak = 7;
  const energy = 82;

  return (
    <div className="app-container">

      {/* TopBar */}
      <header className="top-bar">
        <div className="logo-section">
          <img src={logo} alt="ManifiX Logo" className="logo-img" />
          <span className="logo-text">ManifiX</span>
        </div>

        <div className="stats">
          <div className="stat-item">
            <img src={Icons.starFilled} alt="Streak" />
            <span>{streak}-Day Streak</span>
          </div>

          <div className="stat-item">
            <img src={Icons.target} alt="Energy" />
            <span>{energy}%</span>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="chat-area">
        <Outlet />
      </main>

      {/* Floating Button */}
      <button
        className="magic-button"
        onClick={() => setShowMagic(true)}
      >
        <img src={Icons.magic16} alt="Magic16" />
        Start Magic16
      </button>

      {/* Magic Modal */}
      {showMagic && (
        <div className="modal">
          <div className="modal-content">
            <h2>Magic16 Ritual</h2>
            <button
              className="close-btn"
              onClick={() => setShowMagic(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Vibe Panel */}
      <div className={`vibe-panel ${showVibe ? "open" : "closed"}`}>
        <div
          className="vibe-toggle"
          onClick={() => setShowVibe(!showVibe)}
        >
          {showVibe ? "▼ Hide Vibe" : "▲ Show Vibe"}
        </div>
      </div>

    </div>
  );
}
