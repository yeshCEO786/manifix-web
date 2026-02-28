// src/components/Layout/MainLayout.jsx
import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "../../styles/MainLayout.css";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useApp();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { name: "GPT", path: "/app/gpt" },
    { name: "Magic16", path: "/app/magic16" },
    { name: "Vibe", path: "/app/vibe" },
    { name: "Profile", path: "/app/profile" },
    { name: "Settings", path: "/app/settings" },
    { name: "Billing", path: "/app/billing" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="app-layout" style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarCollapsed ? "80px" : "220px",
          background: "#111827",
          color: "white",
          padding: "20px",
          transition: "0.3s",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {sidebarCollapsed ? "M" : "ManifiX"}
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
            {sidebarCollapsed ? item.name[0] : item.name}
          </div>
        ))}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "8px",
            width: "100%",
            background: "#dc2626",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            marginTop: "10px",
            padding: "6px",
            width: "100%",
            background: "#374151",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Toggle
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        <Outlet />
      </main>

    </div>
  );
}
