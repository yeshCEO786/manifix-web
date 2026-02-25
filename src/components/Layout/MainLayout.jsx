import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Icons from "../../assets/icons";
import logo from "../../assets/logo.png";
import "../../styles/App.css";

export default function MainLayout() {
  const [showMagic, setShowMagic] = useState(false);
  const [showVibe, setShowVibe] = useState(true);

  const streak = 7;
  const energy = 82;

  return (
    <div className="app-container">
      {/* ================= TOP BAR ================= */}
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
            <span>{energy}% Energy</span>
          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="chat-area">
        <Outlet />
      </main>

      {/* ================= FLOATING MAGIC BUTTON ================= */}
      <button
        className="magic-button"
        onClick={() => setShowMagic(true)}
      >
        <img src={Icons.magic16} alt="Magic16" />
        Start Magic16
      </button>

      {/* ================= MAGIC MODAL ================= */}
      {showMagic && (
        <div className="modal">
          <div className="modal-content">
            <h2>Magic16 Ritual</h2>
            <p>8 Minutes Yoga + 8 Minutes Meditation</p>

            <button
              className="close-btn"
              onClick={() => setShowMagic(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= VIBE PANEL ================= */}
      <div className={`vibe-panel ${showVibe ? "open" : "closed"}`}>
        <div
          className="vibe-toggle"
          onClick={() => setShowVibe(!showVibe)}
        >
          {showVibe ? "▼ Hide Vibe" : "▲ Show Vibe"}
        </div>

        {showVibe && (
          <div className="vibe-content">
            <p>🌟 Your Energy Today: {energy}%</p>
            <p>🔥 Current Streak: {streak} Days</p>
          </div>
        )}
      </div>
    </div>
  );
}
