// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Logo from "../assets/logo.svg";
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

      if (user) navigate("/dashboard", { replace: true });
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
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <img src={Logo} alt="ManifiX Logo" />
          <h1>ManifiX</h1>
          <p>Intelligence meets Intention</p>
        </div>

        <h2>Welcome Back</h2>
        <p className="subtitle">Access your AI Ritual Companion</p>

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

        <input
          type="email"
          placeholder="Email"
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

        <p className="footer">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
