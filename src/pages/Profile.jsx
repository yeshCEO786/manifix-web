import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase.js";
import VibeService from "../services/vibe.service.js";
import ManifestService from "../services/manifest.service.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [vibes, setVibes] = useState([]);
  const [manifests, setManifests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    initProfile();
  }, []);

  const initProfile = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUser(user);
    await loadProfile(user.id);
    await loadUserContent();
    setLoading(false);
  };

  const loadProfile = async (userId) => {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();

    if (data?.username) setUsername(data.username);
  };

  const loadUserContent = async () => {
    const userVibes = await VibeService.getUserVibes();
    const userManifests = await ManifestService.getUserManifests();

    setVibes(userVibes);
    setManifests(userManifests);
  };

  const updateUsername = async () => {
    if (!username.trim()) return;

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
    <div className="profile-page">
      {/* 👤 USER INFO */}
      <section className="profile-header">
        <div className="avatar">
          {username?.charAt(0)?.toUpperCase() || user.email[0].toUpperCase()}
        </div>
        <h2>{username || "Your Identity"}</h2>
        <p className="email">{user.email}</p>
      </section>

      {/* ✏️ EDIT PROFILE */}
      <section className="profile-edit">
        <label>Username</label>
        <input
          type="text"
          placeholder="Choose your identity"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={20}
        />
        <button onClick={updateUsername}>Save</button>
      </section>

      {/* 🌊 VIBES */}
      <section className="profile-section">
        <h3>Your Vibes</h3>
        {vibes.length === 0 && <p className="empty">No vibes yet</p>}

        <div className="card-list">
          {vibes.slice(0, 5).map((v) => (
            <div key={v.id} className="mini-card">
              <p>{v.text}</p>
              <span>{v.privacy}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ✨ MANIFESTS */}
      <section className="profile-section">
        <h3>Your Manifests</h3>
        {manifests.length === 0 && <p className="empty">No manifests yet</p>}

        <div className="card-list">
          {manifests.slice(0, 5).map((m) => (
            <div key={m.id} className="mini-card">
              <p>{m.text}</p>
              <span>{m.method}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
