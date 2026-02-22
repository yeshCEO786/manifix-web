import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

import logo from "../assets/logo.svg";
import bgImage from "../background/dark-gradient.jpg";

import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailAuth = async (mode) => {
    setError("");
    setLoading(true);

    try {
      const user =
        mode === "login"
          ? await authService.login(email.trim(), password)
          : await authService.signUp(email.trim(), password);

      if (user) navigate("/app", { replace: true }); // ✅ fixed
    } catch (err) {
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await authService.googleLogin();
      navigate("/app", { replace: true }); // ✅ fixed
    } catch (err) {
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay" />

      <div className="login-card">

        {/* BRAND */}
        <div className="brand">
          <img src={logo} alt="ManifiX Logo" />
          <h1>ManifiX</h1>
          <p className="tagline">
            Intelligence meets Intention
          </p>
        </div>

        {/* HEADER */}
        <h2>Welcome Back to Your Ritual</h2>
        <p className="subtitle">
          Continue your daily alignment journey
        </p>

        {/* GOOGLE */}
        <button
          className="google-btn"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          Continue with Google
        </button>

        <div className="divider">
          <span>or continue with email</span>
        </div>

        {/* INPUTS */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error && <p className="error">{error}</p>}

        {/* ACTIONS */}
        <button
          className="primary-btn"
          onClick={() => handleEmailAuth("login")}
          disabled={loading}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        <button
          className="secondary-btn"
          onClick={() => handleEmailAuth("signup")}
          disabled={loading}
        >
          Create Account
        </button>

        <p className="microcopy">
          Your streak grows when you show up.
        </p>

        <p className="footer">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>

      </div>
    </div>
  );
}
