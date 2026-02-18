import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "..styles/Landing.css";

function Landing() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="landing-wrapper">

      {/* Background Glow */}
      <div className="background-glow"></div>

      {/* Navigation */}
      <header className="landing-nav">
        <div className="logo">ManifiX</div>

        <div className="nav-actions">
          <button
            className="login-link"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="primary-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`hero ${loaded ? "fade-in" : ""}`}>
        <h1 className="hero-title">
          Intelligence meets Intention
        </h1>

        <p className="hero-subtitle">
          ManifiX is your AI Ritual Companion — combining focus,
          clarity, and energy into one powerful experience.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn large"
            onClick={() => navigate("/login")}
          >
            Enter ManifiX
          </button>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        © {new Date().getFullYear()} ManifiX. All rights reserved.
      </footer>

    </div>
  );
}

export default Landing;
