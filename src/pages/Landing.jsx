import React from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "../background/background/dark-gradient.jpg";
import splashLogo from "../assets/images/logos/splash-screen.png";
import verifiedBadge from "../assets/images/profile/verified-badge.png";

import "../styles/Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="landing-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay" />

      {/* TOP SECTION */}
      <div className="landing-top">
        <img src={splashLogo} alt="ManifiX" className="landing-logo" />
        <div className="verified">
          <img src={verifiedBadge} alt="Verified" />
          <span>Trusted Growth System</span>
        </div>
      </div>

      {/* HERO */}
      <div className="landing-hero">
        <h1>
          Master Your Mind.  
          <br />
          Elevate Your Energy.
        </h1>

        <p>
          Magic16 Daily Ritual.  
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
