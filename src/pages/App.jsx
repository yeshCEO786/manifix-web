import React, { useState } from "react";
import Gpt from "./Gpt";
import Magic16 from "./Magic16";
import Vibe from "./Vibe";

export default function App() {
  const [showMagic, setShowMagic] = useState(false);
  const [showVibe, setShowVibe] = useState(true);

  const streak = 7;     // later connect to context
  const energy = 82;    // later calculate dynamically

  return (
    <div className="app-container">

      {/* 🔥 TOP BAR */}
      <div className="top-bar">
        <div className="logo">ManifiX</div>
        <div className="stats">
          <span>🔥 {streak}-Day Streak</span>
          <span>⚡ {energy}%</span>
        </div>
      </div>

      {/* 💬 GPT CHAT AREA */}
      <div className="chat-area">
        <Gpt />
      </div>

      {/* ◉ FLOATING MAGIC BUTTON */}
      <button 
        className="magic-button"
        onClick={() => setShowMagic(true)}
      >
        ◉ Start Magic16
      </button>

      {/* 🧘 MAGIC16 MODAL */}
      {showMagic && (
        <div className="modal">
          <div className="modal-content">
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

      {/* 🎵 VIBE PANEL */}
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
