import React, { useEffect, useState } from "react";
import ManifestService from "../services/manifest.service.js";

const Manifest = () => {
  const [intention, setIntention] = useState("");
  const [manifests, setManifests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todayFocus, setTodayFocus] = useState("");

  useEffect(() => {
    loadManifests();
    setDailyFocus();
  }, []);

  const setDailyFocus = () => {
    const focuses = [
      "Abundance flows to me effortlessly",
      "I am aligned with my highest timeline",
      "Everything I desire is already mine",
      "I move with clarity, power, and grace",
      "The universe supports my vision",
    ];
    setTodayFocus(focuses[Math.floor(Math.random() * focuses.length)]);
  };

  const loadManifests = async () => {
    try {
      const data = await ManifestService.getUserManifests();
      setManifests(data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitManifest = async () => {
    if (!intention.trim()) return;
    setLoading(true);
    try {
      await ManifestService.createManifest({
        text: intention,
        emotion: "gratitude",
      });
      setIntention("");
      loadManifests();
    } catch (err) {
      alert("Unable to save manifestation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manifest-page">
      {/* 🌟 Header */}
      <header className="manifest-header">
        <h1>Manifest</h1>
        <p className="focus-line">✨ {todayFocus}</p>
      </header>

      {/* 🧠 Manifest Input */}
      <section className="manifest-input">
        <textarea
          placeholder="Write as if it has already happened…"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          maxLength={500}
        />
        <button onClick={submitManifest} disabled={loading}>
          {loading ? "Aligning..." : "Manifest Now"}
        </button>
      </section>

      {/* 📜 Manifest History */}
      <section className="manifest-history">
        <h2>Your Reality Log</h2>

        {manifests.length === 0 && (
          <p className="empty">Your manifestations will appear here ✨</p>
        )}

        {manifests.map((m) => (
          <div key={m.id} className="manifest-card">
            <p className="manifest-text">“{m.text}”</p>
            <span className="manifest-date">
              {new Date(m.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Manifest;
