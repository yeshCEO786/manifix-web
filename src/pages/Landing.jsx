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
      </div>

      {/* HERO SECTION */}
      <div className="landing-hero">
        <h2>
          Master Your Mind.  
          <br />
          Elevate Your Energy.
        </h2>

        <p>
          16-Minute Daily Ritual.  
          AI Reflection Engine.  
          Personal Vibe Tracking.
        </p>

        <button
          className="landing-button"
          onClick={() => navigate("/login")}
        >
          Begin Your Ritual →
        </button>
      </div>

      {/* FOOTER */}
      <div className="landing-footer">
        <span>Designed for clarity. Built for transformation.</span>
      </div>
    </div>
  );
}
