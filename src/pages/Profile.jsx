// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import supabase from "../services/supabase.js";
import VibeService from "../services/vibe.service.js";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [vibes, setVibes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    initProfile();
  }, []);

  // Initialize profile
  const initProfile = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setUser(user);
    await loadProfile(user.id);
    await loadUserVibes();
    await loadGallery(user.id);
    setLoading(false);
  };

  // Load username
  const loadProfile = async (userId) => {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();
    if (data?.username) setUsername(data.username);
  };

  // Load user vibes
  const loadUserVibes = async () => {
    const userVibes = await VibeService.getUserVibes();
    setVibes(userVibes || []);
  };

  // Load gallery (user images)
  const loadGallery = async (userId) => {
    const { data } = await supabase
      .from("gallery")
      .select("id, url")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setGallery(data || []);
  };

  // Update username
  const updateUsername = async () => {
    if (!username.trim() || !user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      username,
      email: user.email,
      updated_at: new Date().toISOString(),
    });

    alert("Profile updated ✨");
  };

  if (loading) {
    return <div className="page-loading">Loading profile…</div>;
  }

  return (
    <div className="profile-page" style={{ backgroundColor: "#1a1a2e" }}>
      {/* Profile Header */}
      <section className="profile-header">
        <div className="avatar neon-glow">
          {username?.charAt(0)?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
        </div>
        <h2 className="neon-text">{username || "Your Identity"}</h2>
        <p className="email">{user?.email}</p>
      </section>

      {/* Edit Username */}
      <section className="profile-edit">
        <label>Username</label>
        <input
          type="text"
          placeholder="Choose your identity"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={20}
        />
        <button className="btn neon-btn" onClick={updateUsername}>
          Save
        </button>
      </section>

      {/* Gallery */}
      <section className="profile-gallery">
        <h3>Gallery</h3>
        {gallery.length === 0 && <p className="empty">No photos yet 🌙</p>}
        <div className="gallery-grid">
          {gallery.map((img) => (
            <div key={img.id} className="gallery-card neon-border">
              <img src={img.url} alt="User Upload" />
            </div>
          ))}
        </div>
      </section>

      {/* User Vibes */}
      <section className="profile-section">
        <h3>Your Vibes</h3>
        {vibes.length === 0 && <p className="empty">No vibes yet ✨</p>}
        <div className="card-list">
          {vibes.slice(0, 6).map((v) => (
            <div key={v.id} className="mini-card neon-card" style={{ fontFamily: v.font }}>
              <p>{v.text}</p>
              {v.music && (
                <audio controls src={v.music}>
                  Your browser does not support audio
                </audio>
              )}
              <span>{v.privacy}</span>
              <div className="card-icons">
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

export default Profile;
