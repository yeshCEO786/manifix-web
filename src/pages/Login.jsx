// src/js/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../services/auth.service";
import voiceService from "../services/voice.service";
import { isValidEmail, isValidPassword } from "../utils/validators";

import Logo from "../assets/logo.svg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      return "⚠️ Please enter both email and password";
    }
    if (!isValidEmail(email)) {
      return "⚠️ Invalid email format";
    }
    if (!isValidPassword(password)) {
      return "⚠️ Password must be at least 6 characters";
    }
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
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setErrorMsg(err?.message || "❌ Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={Logo} alt="ManifiX Logo" className="logo" />

        <h1>Welcome to ManifiX</h1>
        <p className="subtitle">
          Your AI manifestation & Magic16 companion
        </p>

        <form
          className="auth-form"
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

          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            disabled={loading}
            onClick={() => handleAuth("signup")}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="footer">
          By continuing, you agree to our{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
