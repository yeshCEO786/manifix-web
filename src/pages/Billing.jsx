// src/pages/Billing.jsx
import React, { useState } from "react";
import "../styles/Billing666.css"; // create this file for styling

const BillingPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const priceId = "price_1999_monthly"; // Replace with your Stripe price ID

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://manifix.up.railway.app/api/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId }),
        }
      );
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        setError("Unable to start payment. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Payment service not reachable. Try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="billing-page" style={{ backgroundImage: "url(/manifix/backgrounds/purple-vibe.jpg)" }}>
      <header className="billing-header">
        <img src={PngIcons.manifix} alt="ManifiX Logo" className="billing-logo" />
        <h1>ManifiX Premium</h1>
        <p>Unlock full access to ManifiX features</p>
      </header>

      <section className="billing-card">
        <h2>Premium Subscription</h2>
        <p className="price">₹1,999 / month</p>
        <ul className="features">
          <li>🎯 Full access to GPT Chat</li>
          <li>🎵 Magic16 & Vibe features unlocked</li>
          <li>🔊 STT / TTS enabled like ChatGPT</li>
          <li>⚡ Priority support & updates</li>
        </ul>

        <button
          className="btn-subscribe"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? "Processing..." : "Subscribe Now"}
        </button>

        {error && <p className="billing-error">{error}</p>}
      </section>

      <footer className="billing-footer">
        <p>© 2026 ManifiX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BillingPage;
