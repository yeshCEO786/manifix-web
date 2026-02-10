// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to ManifiX Dashboard</h1>
      <p style={styles.subtitle}>
        This is your main page where you can access all features.
      </p>

      <div style={styles.links}>
        <Link style={styles.link} to="/login">Login Page</Link>
        <Link style={styles.link} to="/magic16">Magic16</Link>
        <Link style={styles.link} to="/gpt">GPT Chat</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  link: {
    padding: "0.5rem 1rem",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: "0.5rem",
    textDecoration: "none",
  },
};

export default Dashboard;
