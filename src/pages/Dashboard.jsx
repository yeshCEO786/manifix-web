// src/pages/Dashboard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      
      <h1 style={{ marginBottom: "20px" }}>
        Welcome to ManifiX Dashboard 🚀
      </h1>

      <p style={{ marginBottom: "30px", color: "#555" }}>
        Choose your experience below:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Vibe AI Chat */}
        <div
          onClick={() => navigate("/app/chat")}
          style={cardStyle}
        >
          <h3>🤖 Vibe AI Chat</h3>
          <p>Talk to your AI Coach and get intelligent guidance.</p>
        </div>

        {/* Magic16 */}
        <div
          onClick={() => navigate("/app/magic16")}
          style={cardStyle}
        >
          <h3>✨ Magic16 Ritual</h3>
          <p>8 minutes meditation + 8 minutes reflection.</p>
        </div>

        {/* Profile */}
        <div
          onClick={() => navigate("/app/profile")}
          style={cardStyle}
        >
          <h3>👤 Profile</h3>
          <p>Manage your email and account settings.</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "0.2s ease",
};
