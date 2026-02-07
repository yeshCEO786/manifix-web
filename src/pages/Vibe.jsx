// src/js/pages/Vibe.jsx
import React, { useEffect, useState } from "react";
import VibeService from "../services/vibe.service.js";
import AuthService from "../services/auth.service.js";


const fonts = [
  "Inter",
  "Playfair Display",
  "Poppins",
  "Montserrat",
  "Cursive",
  "Serif",
];

const Vibe = () => {
  const [user, setUser] = useState(null);
  const [vibeText, setVibeText] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [font, setFont] = useState("Inter");
  const [music, setMusic] = useState("");
  const [myVibes, setMyVibes] = useState([]);
  const [search, setSearch] = useState("");
  const [publicVibes, setPublicVibes] = useState([]);

  useEffect(() => {
    AuthService.getCurrentUser().then(setUser);
    loadMyVibes();
  }, []);

  const loadMyVibes = async () => {
    const data = await VibeService.getUserVibes();
    setMyVibes(data || []);
  };

  const searchPublicVibes = async () => {
    const data = await VibeService.searchPublicVibes(search);
    setPublicVibes(data || []);
  };

  const createVibe = async () => {
    if (!vibeText.trim()) return;
    await VibeService.createVibe({
      text: vibeText,
      privacy,
      font,
      music,
    });
    setVibeText("");
    setMusic("");
    loadMyVibes();
  };

  return (
    <div className="vibe-page">
      <h1>✨ Your Vibe</h1>
      <p className="subtitle">
        Express your energy, thoughts, or manifestation 🌙
      </p>

      {/* Create Vibe */}
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
          placeholder="🎵 Add a song (optional)"
          value={music}
          onChange={(e) => setMusic(e.target.value)}
        />

        <button className="btn" onClick={createVibe}>
          Share Vibe ✨
        </button>
      </div>

      {/* My Vibes */}
      <section className="vibe-section">
        <h2>My Vibes</h2>
        {myVibes.map((v) => (
          <div
            key={v.id}
            className="vibe-card"
            style={{ fontFamily: v.font }}
          >
            <p>{v.text}</p>
            {v.music && <small>🎵 {v.music}</small>}
            <span className="privacy">{v.privacy}</span>
          </div>
        ))}
      </section>

      {/* Public Vibes */}
      <section className="vibe-section">
        <h2>Public Vibes</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={searchPublicVibes}
        />

        {publicVibes.map((v) => (
          <div
            key={v.id}
            className="vibe-card public"
            style={{ fontFamily: v.font }}
          >
            <p>{v.text}</p>
            {v.music && <small>🎵 {v.music}</small>}
            <span className="author">{v.user_name}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Vibe;
