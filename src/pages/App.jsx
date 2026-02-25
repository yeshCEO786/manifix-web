import React, { useState } from "react";
import Gpt from "./Gpt";
import Magic16 from "./Magic16";
import Vibe from "./Vibe";

import Icons  from "../assets/icons";
import logo from "../assets/logo.png";

import "../styles/App.css"; // make sure this exists

export default function App() {
  const [showMagic, setShowMagic] = useState(false);
  const [showVibe, setShowVibe] = useState(true);

  // 🔥 Later connect to context
  const streak = 7;
  const energy = 82;

  return (
    <div className="app-container">

      {/* ================= TOP BAR ================= */}
      <div className="top-bar">

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

      </div>

      {/* ================= GPT CHAT AREA ================= */}
      <div className="chat-area">
        <Gpt />
      </div>

      {/* ================= FLOATING MAGIC BUTTON ================= */}
      <button
        className="magic-button"
        onClick={() => setShowMagic(true)}
      >
        <img src={Icons.magic16} alt="Magic16" />
        Start Magic16
      </button>

      {/* ================= MAGIC16 MODAL ================= */}
      {showMagic && (
        <div className="modal">
          <div className="modal-content">

            <div className="modal-header">
              <img src={Icons.magic16} alt="Magic16" />
              <h2>Magic16 Ritual</h2>
            </div>

            <Magic16 />

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

        {showVibe && <Vibe />}

      </div>

    </div>
  );
}
