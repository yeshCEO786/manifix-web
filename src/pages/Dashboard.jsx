// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import Logo from "../assets/logo.png";

// Dashboard Component
const Dashboard = () => {
  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(/manifix/backgrounds/purple-vibe.jpg)`,
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

          {/* Login Card */}
          <Link to="/login" className="dashboard-card">
            <img src={PngIcons.home} alt="Login Icon" className="card-icon" />
            <h2>Login</h2>
            <p>Access your account and settings</p>
          </Link>

          {/* Magic16 Card */}
          <Link to="/magic16" className="dashboard-card">
            <img src={PngIcons.magic16} alt="Magic16 Icon" className="card-icon" />
            <h2>Magic16</h2>
            <p>Perform guided routines for energy and focus</p>
          </Link>

          {/* GPT Chat Card */}
          <Link to="/gpt" className="dashboard-card">
            <img src={PngIcons.chat} alt="GPT Chat Icon" className="card-icon" />
            <h2>Chat GPT</h2>
            <p>Talk to your AI assistant with STT & TTS support</p>
          </Link>

          {/* Vibe Card */}
          <Link to="/vibe" className="dashboard-card">
            <img src={PngIcons.starFilled} alt="Vibe Icon" className="card-icon" />
            <h2>Vibe</h2>
            <p>Share your energy and moods with friends</p>
          </Link>

          {/* Meditation Card */}
          <Link to="/meditation" className="dashboard-card">
            <img src={PngIcons.target} alt="Meditation Icon" className="card-icon" />
            <h2>Meditation</h2>
            <p>Listen to guided meditation & breathing exercises</p>
          </Link>

          {/* Profile Card */}
          <Link to="/profile" className="dashboard-card">
            <img src={PngIcons.profile} alt="Profile Icon" className="card-icon" />
            <h2>Profile</h2>
            <p>Update your identity, avatar, and settings</p>
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <div className="footer-links">
          <a href="https://manifix.app" target="_blank" rel="noopener noreferrer">
            Official Website
          </a>
          <a href="/settings">Settings</a>
          <a href="/contact">Contact Us</a>
        </div>
        <p>© 2026 ManifiX — All rights reserved</p>
      </footer>
    </div>
  );
};

export default Dashboard;
