import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.navbar}>
        <div style={styles.logo}>ManifiX</div>

        <nav style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/magic16" style={styles.navLink}>Magic16</Link>
          <Link to="/gpt" style={styles.navLink}>AI Chat</Link>
          <Link to="/analytics" style={styles.navLink}>Analytics</Link>
        </nav>

        <Link to="/profile" style={styles.profileButton}>
          Profile
        </Link>
      </header>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.overlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            Build Your Limitless Life
          </h1>

          <p style={styles.subtitle}>
            AI-powered manifestation, meditation, and clarity — all in one platform.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/magic16" style={{ textDecoration: "none" }}>
              <button style={styles.primaryButton}>Start Magic16</button>
            </Link>

            <Link to="/gpt" style={{ textDecoration: "none" }}>
              <button style={styles.secondaryButton}>Talk to AI</button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsSection}>
        <StatCard number="1B+" label="Global Users" />
        <StatCard number="98%" label="Success Rate" />
        <StatCard number="24/7" label="AI Support" />
      </section>

      {/* FEATURES */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Platform Features</h2>

        <div style={styles.featuresGrid}>
          <FeatureCard
            title="Magic16"
            desc="8 minutes yoga + 8 minutes meditation to rewire your mind."
          />
          <FeatureCard
            title="AI Chat"
            desc="Clarity, answers, and strategic thinking instantly."
          />
          <FeatureCard
            title="Vibe Analytics"
            desc="Track emotional and manifestation growth over time."
          />
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ number, label }) => (
  <div style={styles.statCard}>
    <h3 style={styles.statNumber}>{number}</h3>
    <p style={styles.statLabel}>{label}</p>
  </div>
);

const FeatureCard = ({ title, desc }) => (
  <div style={styles.featureCard}>
    <h3 style={styles.featureTitle}>{title}</h3>
    <p style={styles.featureDesc}>{desc}</p>
  </div>
);

const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#0b1120",
    color: "#ffffff",
    minHeight: "100vh",
  },

  /* NAVBAR */
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
    backgroundColor: "#0f172a",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },

  logo: {
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  navLinks: {
    display: "flex",
    gap: "30px",
  },

  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
  },

  profileButton: {
    textDecoration: "none",
    backgroundColor: "#6366f1",
    padding: "8px 18px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "0.9rem",
    fontWeight: "600",
  },

  /* HERO */
  hero: {
    position: "relative",
    height: "85vh",
    backgroundImage: "url('/assets/images/backgrounds/hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
    padding: "0 20px",
  },

  title: {
    fontSize: "3.2rem",
    fontWeight: "700",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "1.2rem",
    opacity: 0.85,
    marginBottom: "40px",
  },

  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  primaryButton: {
    padding: "14px 32px",
    fontSize: "1rem",
    fontWeight: "600",
    backgroundColor: "#6366f1",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    color: "#fff",
  },

  secondaryButton: {
    padding: "14px 32px",
    fontSize: "1rem",
    fontWeight: "600",
    backgroundColor: "transparent",
    border: "1px solid #6366f1",
    borderRadius: "30px",
    cursor: "pointer",
    color: "#6366f1",
  },

  /* STATS */
  statsSection: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "80px 20px",
    flexWrap: "wrap",
  },

  statCard: {
    backgroundColor: "#111827",
    padding: "40px",
    borderRadius: "20px",
    minWidth: "220px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  statNumber: {
    fontSize: "2.5rem",
    color: "#6366f1",
    marginBottom: "10px",
  },

  statLabel: {
    opacity: 0.8,
  },

  /* FEATURES */
  featuresSection: {
    padding: "100px 20px",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: "2.4rem",
    marginBottom: "60px",
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "30px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  featureCard: {
    backgroundColor: "#111827",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  featureTitle: {
    fontSize: "1.3rem",
    marginBottom: "15px",
  },

  featureDesc: {
    opacity: 0.75,
    lineHeight: "1.6",
  },
};

export default Dashboard;
