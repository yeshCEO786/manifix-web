// src/pages/Vibe.jsx
import React, { useEffect, useState } from "react";
import VibeService from "../services/vibe.service.js";
import AuthService from "../services/auth.service.js";
import Logo from "../assets/logo.png";    
import "../styles/vibe.css";

// Available fonts
const fonts = ["Inter","Playfair Display","Poppins","Montserrat","Cursive","Serif"];

const Vibe = () => {
  const [user, setUser] = useState(null);
  const [vibeText, setVibeText] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [font, setFont] = useState("Inter");
  const [music, setMusic] = useState("");
  const [myVibes, setMyVibes] = useState([]);
  const [search, setSearch] = useState("");
  const [publicVibes, setPublicVibes] = useState([]);

  // Load user & vibes
  useEffect(() => {
    AuthService.getCurrentUser().then(setUser);
    loadMyVibes();
  }, []);

  const loadMyVibes = async () => {
    try {
      const data = await VibeService.getUserVibes();
      setMyVibes(data || []);
    } catch (err) {
      console.error("Failed to load vibes", err);
    }
  };

  const searchPublicVibes = async () => {
    if (!search.trim()) return;
    try {
      const data = await VibeService.searchPublicVibes(search);
      setPublicVibes(data || []);
    } catch (err) {
      console.error("Failed to search public vibes", err);
    }
  };

  const createVibe = async () => {
    if (!vibeText.trim()) return;
    try {
      await VibeService.createVibe({ text: vibeText, privacy, font, music });
      setVibeText("");
      setMusic("");
      loadMyVibes();
    } catch (err) {
      console.error("Failed to create vibe", err);
    }
  };

  return (
    <div
      className="vibe-page"
      style={{
        backgroundImage: `url(/manifix/backgrounds/purple-vibe.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className="vibe-header">
        <img src="/manifix/src/assets/logo.png" alt="ManifiX Logo" className="vibe-logo" />
        <h1>✨ Your Vibe</h1>
        <p className="subtitle">Today Vibe</p>
      </header>

      {/* CREATE VIBE */}
      <div className="vibe-create">
        <textarea
          placeholder="Write your vibe..."
          value={vibeText}
          onChange={(e) => setVibeText(e.target.value)}
          style={{ fontFamily: font }}
        />

        <div className="vibe-controls">
          <select value={font} onChange={(e) => setFont(e.target.value)}>
            {fonts.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
            <option value="private">🔒 Private</option>
            <option value="public">🌍 Public</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="🎵 Add a song URL (Spotify/MP3)"
          value={music}
          onChange={(e) => setMusic(e.target.value)}
        />

        <button className="btn" onClick={createVibe}>
          Share Vibe ✨
        </button>
      </div>

      {/* MY VIBES */}
      <section className="vibe-section">
        <h2>My Vibes</h2>
        {myVibes.length === 0 && <p>No vibes yet.</p>}
        <div className="vibe-list">
          {myVibes.map((v) => (
            <div key={v.id} className="vibe-card" style={{ fontFamily: v.font }}>
              <p>{v.text}</p>
              {v.music && (
                <audio controls src={v.music}>
                  Your browser does not support audio
                </audio>
              )}
              <span className="privacy">{v.privacy}</span>
              <div className="vibe-icons">
                <img src={SvgIcons.like} alt="Like" />
                <img src={SvgIcons.share} alt="Share" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PUBLIC VIBES */}
      <section className="vibe-section">
        <h2>Public Vibes</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={searchPublicVibes}
        />
        {publicVibes.length === 0 && <p>No public vibes found.</p>}
        <div className="vibe-list">
          {publicVibes.map((v) => (
            <div key={v.id} className="vibe-card public" style={{ fontFamily: v.font }}>
              <p>{v.text}</p>
              {v.music && (
                <audio controls src={v.music}>
                  Your browser does not support audio
                </audio>
              )}
              <span className="author">{v.user_name}</span>
              <div className="vibe-icons">
                <img src={SvgIcons.like} alt="Like" />
                <img src={SvgIcons.share} alt="Share" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Vibe;
