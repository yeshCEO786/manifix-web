import React, { useEffect, useState } from "react";
import supabase from "../services/supabase.js";
import VibeService from "../services/vibe.service.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [vibes, setVibes] = useState([]);
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

    if (!user) {
      setLoading(false);
      return;
    }

    setUser(user);
    await loadProfile(user.id);
    await loadUserVibes();
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

  const loadUserVibes = async () => {
    const userVibes = await VibeService.getUserVibes();
    setVibes(userVibes || []);
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
      <section className="profile-header">
        <div className="avatar">
          {username?.charAt(0)?.toUpperCase() ||
            user.email[0].toUpperCase()}
        </div>
        <h2>{username || "Your Identity"}</h2>
        <p className="email">{user.email}</p>
      </section>

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

      <section className="profile-section">
        <h3>Your Vibes</h3>
        {vibes.length === 0 && (
          <p className="empty">No vibes yet</p>
        )}

        <div className="card-list">
          {vibes.slice(0, 5).map((v) => (
            <div key={v.id} className="mini-card">
              <p>{v.text}</p>
              <span>{v.privacy}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
