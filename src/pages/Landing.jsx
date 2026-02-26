// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import bgImage from "../assets/backgrounds/dark-gradient.jpg";

import "../styles/Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="landing-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay" />

      {/* BRAND SECTION */}
      <div className="landing-top">
        <img src={logo} alt="ManifiX Logo" className="main-logo" />
        <h1 className="brand-name">ManifiX</h1>
        <span className="brand-tagline">
          Master Your Mind. Elevate Your Energy. Transform Your Life.
        </span>
      </div>

      {/* HERO / FEATURE HIGHLIGHTS */}
      <div className="landing-hero">
        <h2 className="hero-title">
           🌟16-Minute Daily Ritual <br />
          ✨ AI Reflection Engine <br />
          ⭐ Personal Vibe Tracking
        </h2>

        <p className="hero-description">
          Turn your daily moments into a lifetime of growth. <br />
          Converse with your AI Coach, track your energy, and manifest abundance.
        </p>

        <div className="hero-features">
          <div className="feature">
            <h3>Magic16 Ritual</h3>
            <p>8 minutes of meditation + 8 minutes of mindful reflection for balance & clarity.</p>
          </div>
          <div className="feature">
            <h3>AI-Powered Guidance</h3>
            <p>Ask anything, get human-like insights, and unlock your potential.</p>
          </div>
          <div className="feature">
            <h3>Vibe</h3>
            <p>Track your energy daily.</p>
          </div>
        </div>

        <button
          className="landing-button"
          onClick={() => navigate("/login")}
        >
          Begin Your Ritual →
        </button>

        <p className="landing-quote">
          "Your daily ritual, reimagined with AI. Turn 16 minutes into a lifetime of power."
        </p>
      </div>

      {/* FOOTER */}
      <div className="landing-footer">
        <span>Designed for clarity. Built for transformation. Join billions on their journey.</span>
      </div>
    </div>
  );
}
