// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../services/auth.service";
import voiceService from "../services/voice.service";
import { isValidEmail, isValidPassword } from "../utils/validators";

import Logo from "../assets/logo.svg";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateInputs = () => {
    if (!email || !password) return "Please enter both email and password";
    if (!isValidEmail(email)) return "Invalid email format";
    if (!isValidPassword(password))
      return "Password must be at least 6 characters";
    return null;
  };

  const handleAuth = async (mode) => {
    setErrorMsg("");
    setLoading(true);

    const validationError = validateInputs();
    if (validationError) {
      setErrorMsg(validationError);
      setLoading(false);
      return;
    }

    try {
      const trimmedEmail = email.trim();
      const user =
        mode === "login"
          ? await authService.login(trimmedEmail, password)
          : await authService.signUp(trimmedEmail, password);

      if (user) {
        voiceService?.speak?.(
          mode === "login"
            ? "Welcome back to ManifiX"
            : "Welcome to ManifiX"
        );
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setErrorMsg(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Left Brand Panel */}
      <div className="auth-brand">
        <img src={Logo} alt="ManifiX Logo" className="brand-logo" />
        <h1>ManifiX</h1>
        <p>Intelligence meets Intention</p>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-container">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">
            Access your AI Ritual Companion
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAuth("login");
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {errorMsg && (
              <p className="error-msg">{errorMsg}</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Login"}
            </button>

            <button
              type="button"
              className="secondary-btn"
              disabled={loading}
              onClick={() => handleAuth("signup")}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
