// src/pages/BillingPage.jsx
import React, { useState } from "react";
import PngIcons from "../assets/icons/png-icons"; // Your PNG icons
import "../styles/BillingPage.css";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      // Call backend API to create payment session
      const res = await fetch("https://manifix.up.railway.app/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: "price_1999_monthly" }), // Stripe or Razorpay price id
      });
      const data = await res.json();

      if (data.url) {
        // Redirect to payment gateway
        window.location.href = data.url;
      } else {
        setError("Failed to initiate payment. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Payment error. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="billing-page" style={{ backgroundImage: `url(/manifix/backgrounds/purple-vibe.jpg)` }}>
      <header className="billing-header">
        <img src="/manifix/logo.png" alt="ManifiX Logo" className="billing-logo" />
        <h1>Premium Membership</h1>
        <p>Unlock all features for ₹1,999 / month 💎</p>
      </header>

      <section className="billing-content">
        <div className="billing-card">
          <img src={PngIcons.magic16} alt="Premium Icon" className="premium-icon" />
          <h2>Premium Plan</h2>
          <p>Access GPT, Magic16, Vibe, and exclusive features</p>
          <span className="price">₹1,999 / month</span>
          <button className="btn-primary" onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Subscribe Now"}
          </button>
          {success && <p className="success-msg">🎉 Payment Successful!</p>}
          {error && <p className="error-msg">{error}</p>}
        </div>
      </section>

      <footer className="billing-footer">
        <p>Secure payment powered by your trusted gateway 🔒</p>
      </footer>
    </div>
  );
}
