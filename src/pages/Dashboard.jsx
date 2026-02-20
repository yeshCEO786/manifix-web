// src/pages/Dashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import Logo from "../assets/logo.png";

// ✅ Direct icon imports (adjust filenames if needed)
import homeIcon from "../assets/icons/home_icon.png";
import chatIcon from "../assets/icons/chat_icon.png";
import magic16Icon from "../assets/icons/magic16.png";
import starFilledIcon from "../assets/icons/star-filled-666.png";
import profileIcon from "../assets/icons/profile_icon.png";
import settingsIcon from "../assets/icons/setting_icon.png";

const Dashboard = () => {
  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: "url(/assets/images/backgrounds/purple-vibe.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        color: "#ffffff",
      }}
    >
      {/* HEADER */}
      <header className="dashboard-header">
        <img src={Logo} alt="ManifiX Logo" className="dashboard-logo" />
        <h1 className="dashboard-title">Welcome to ManifiX</h1>
        <p className="dashboard-subtitle">
          Your central hub for Chat, Magic16, Yoga & Meditation
        </p>
      </header>

      {/* MAIN */}
      <main className="dashboard-main">
        <div className="dashboard-cards">

          <Link to="/dashboard" className="dashboard-card">
            <img src={homeIcon} alt="Home" className="card-icon" />
            <h2>Dashboard</h2>
            <p>Return to your main hub</p>
          </Link>

          <Link to="/gpt" className="dashboard-card">
            <img src={chatIcon} alt="Chat GPT" className="card-icon" />
            <h2>Chat GPT</h2>
            <p>AI assistant with voice support</p>
          </Link>

          <Link to="/magic16" className="dashboard-card">
            <img src={magic16Icon} alt="Magic16" className="card-icon" />
            <h2>Magic16</h2>
            <p>16-minute energy ritual</p>
          </Link>

          <Link to="/vibe" className="dashboard-card">
            <img src={starFilledIcon} alt="Vibe" className="card-icon" />
            <h2>Vibe</h2>
            <p>Track & share your energy</p>
          </Link>

          <Link to="/profile" className="dashboard-card">
            <img src={profileIcon} alt="Profile" className="card-icon" />
            <h2>Profile</h2>
            <p>Manage your account</p>
          </Link>

          <Link to="/settings" className="dashboard-card">
            <img src={settingsIcon} alt="Settings" className="card-icon" />
            <h2>Settings</h2>
            <p>Customize your experience</p>
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
          <Link to="/contact">Contact</Link>
        </div>
        <p>© 2026 ManifiX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
