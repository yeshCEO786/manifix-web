import React, { useState } from "react";
import { useVibe } from "@/hooks";
import { useNavigate } from "react-router-dom";

export default function VibeCreate() {
  const navigate = useNavigate();
  const { createVibe } = useVibe();

  const [text, setText] = useState("");
  const [mood, setMood] = useState("happy"); // default mood
  const [musicURL, setMusicURL] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================
  // Handlers
  // ==========================
  const handleSubmit = async () => {
    if (!text && !musicURL) {
      alert("Please add text or music for your vibe 🎵");
      return;
    }
    setLoading(true);
    try {
      await createVibe({ text, mood, musicURL });
      alert("Vibe shared successfully! ✨");
      navigate("/vibe"); // go to Vibe feed
    } catch (err) {
      console.error(err);
      alert("Oops! Something went wrong 😔");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Render
  // ==========================
  return (
    <div className="vibe-create-container">
      <h1 className="title">Share Your Vibe 🌈</h1>

      <div className="vibe-section">
        <label className="label">Your Vibe Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How do you feel today?"
          rows={4}
        />
      </div>

      <div className="vibe-section">
        <label className="label">Mood</label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="excited">🤩 Excited</option>
          <option value="calm">😌 Calm</option>
          <option value="angry">😡 Angry</option>
        </select>
      </div>

      <div className="vibe-section">
        <label className="label">Music URL (optional)</label>
        <input
          type="url"
          value={musicURL}
          onChange={(e) => setMusicURL(e.target.value)}
          placeholder="Paste Spotify / YouTube link"
        />
      </div>

      <button
        className="primary-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Sharing..." : "Share Vibe"}
      </button>

      <button
        className="secondary-btn"
        onClick={() => navigate("/vibe")}
      >
        Cancel
      </button>
    </div>
  );
}
