import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Icons from "../../assets/icons";
import logo from "../../assets/logo.png";
import "../../styles/App.css";

export default function MainLayout() {
  const [showMagic, setShowMagic] = useState(false);

  return (
    <div className="layout-container">

      {/* ================= TOP HEADER ================= */}
      <header className="main-header">
        <img src={logo} alt="ManifiX Logo" className="header-logo" />
        <h1 className="header-title">ManifiX</h1>
      </header>

      {/* ================= BODY SECTION ================= */}
      <div className="main-body">

        {/* LEFT SIDEBAR */}
        <aside className="left-sidebar">
          <button className="side-btn">
            <img src={Icons.profile} alt="Profile" />
            <span>Profile</span>
          </button>

          <button className="side-btn">
            <img src={Icons.feed} alt="Vibe" />
            <span>Vibe</span>
          </button>
        </aside>

        {/* CENTER CONTENT */}
        <main className="center-content">
          <div className="star-container">
            <img src={Icons.starFilled} alt="Star" className="center-star" />
          </div>

          <Outlet />

          {/* CHAT INPUT BAR */}
          <div className="chat-bar">
            <input
              type="text"
              placeholder="Type your message..."
              className="chat-input"
            />
            <button className="send-btn">
              <img src={Icons.send} alt="Send" />
            </button>
          </div>
        </main>
      </div>

      {/* ================= MAGIC16 BUTTON ================= */}
      <button
        className="magic16-btn"
        onClick={() => setShowMagic(true)}
      >
        <img src={Icons.magic16} alt="Magic16" />
        Magic16
      </button>

      {/* ================= MAGIC MODAL ================= */}
      {showMagic && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Magic16 Ritual</h2>
            <p>8 Minutes Yoga + 8 Minutes Meditation</p>
            <button onClick={() => setShowMagic(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}
