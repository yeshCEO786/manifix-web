// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import Logo from "../assets/logo.png";

// ✅ Import icons correctly (adjust path if needed)
import { PngIcons } from "../assets/icons";

const Dashboard = () => {
  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(/backgrounds/purple-vibe.jpg)`, // must be inside /public/backgrounds
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
      }}
    >
      {/* HEADER */}
      <header className="dashboard-header">
        <img src={Logo} alt="ManifiX Logo" className="dashboard-logo" />
        <h1 className="dashboard-title">Welcome to ManifiX</h1>
        <p className="dashboard-subtitle">
          Your central hub for Chat, Magic16, Yoga, and Meditation
        </p>
      </header>

      {/* MAIN CARDS */}
      <main className="dashboard-main">
        <div className="dashboard-cards">

          <Link to="/login" className="dashboard-card">
            <img src={PngIcons?.home} alt="Login Icon" className="card-icon" />
            <h2>Login</h2>
            <p>Access your account and settings</p>
          </Link>

          <Link to="/magic16" className="dashboard-card">
            <img src={PngIcons?.magic16} alt="Magic16 Icon" className="card-icon" />
            <h2>Magic16</h2>
            <p>Guided energy & focus routine</p>
          </Link>

          <Link to="/gpt" className="dashboard-card">
            <img src={PngIcons?.chat} alt="GPT Chat Icon" className="card-icon" />
            <h2>Chat GPT</h2>
            <p>AI assistant with STT & TTS</p>
          </Link>

          <Link to="/vibe" className="dashboard-card">
            <img src={PngIcons?.starFilled} alt="Vibe Icon" className="card-icon" />
            <h2>Vibe</h2>
            <p>Share your mood & energy</p>
          </Link>

          <Link to="/meditation" className="dashboard-card">
            <img src={PngIcons?.target} alt="Meditation Icon" className="card-icon" />
            <h2>Meditation</h2>
            <p>Guided breathing & relaxation</p>
          </Link>

          <Link to="/profile" className="dashboard-card">
            <img src={PngIcons?.profile} alt="Profile Icon" className="card-icon" />
            <h2>Profile</h2>
            <p>Edit your identity & settings</p>
          </Link>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <div className="footer-links">
          <a
            href="https://manifix.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Website
          </a>
          <Link to="/settings">Settings</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <p>© 2026 ManifiX — All rights reserved</p>
      </footer>
    </div>
  );
};

export default Dashboard;
