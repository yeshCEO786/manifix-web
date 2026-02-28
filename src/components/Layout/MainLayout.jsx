// src/components/Layout/MainLayout.jsx

import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "../../styles/MainLayout.css";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useApp();

  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/app/dashboard" },
    { name: "Chat", path: "/app/chat" },
    { name: "Magic16", path: "/app/magic16" },
    { name: "Profile", path: "/app/profile" },
    { name: "Settings", path: "/app/settings" },
    { name: "Billing", path: "/app/billing" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? "70px" : "220px",
          background: "#111827",
          color: "white",
          padding: "20px",
          transition: "0.3s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>
          {collapsed ? "M" : "ManifiX"}
        </h2>

        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background:
                location.pathname === item.path ? "#1f2937" : "transparent",
              marginBottom: "8px",
              borderRadius: "6px",
            }}
          >
            {collapsed ? item.name[0] : item.name}
          </div>
        ))}

        <div style={{ marginTop: "auto" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px",
              width: "100%",
              background: "#dc2626",
              border: "none",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            {collapsed ? "⎋" : "Logout"}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              padding: "6px",
              width: "100%",
              background: "#374151",
              border: "none",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {collapsed ? "→" : "Collapse"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f9fafb",
          overflow: "auto",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          {user?.email}
        </div>

        <Outlet />
      </main>

    </div>
  );
}
