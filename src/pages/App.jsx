import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Public Pages
import Login from "./Login";
import NotFound from "./NotFound";

// Main App Pages
import Dashboard from "./Dashboard";
import Gpt from "./Gpt";
import Magic16 from "./Magic16";
import Vibe from "./Vibe";
import Profile from "./Profile";
import Settings from "./Settings";
import Billing from "./Billing";

// Admin Page
import Admin from "./Admin";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />

        {/* ================= PROTECTED APP ROUTES ================= */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/gpt" element={<Gpt />} />
          <Route path="/magic16" element={<Magic16 />} />
          <Route path="/vibe" element={<Vibe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/billing" element={<Billing />} />
        </Route>

        {/* ================= ADMIN ROUTE ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ROUTE ================= */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}
