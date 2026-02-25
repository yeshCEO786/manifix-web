// src/pages/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// ================= PUBLIC PAGES =================
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import NotFound from "./NotFound";

// ================= MAIN APP PAGES =================
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Gpt from "./Gpt";
import Magic16 from "./Magic16";
import Vibe from "./Vibe";
import Profile from "./Profile";
import Settings from "./Settings";
import Billing from "./Billing";

// ================= ADMIN PAGE =================
import Admin from "./Admin";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ================= PROTECTED APP ROUTES ================= */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/landing" element={<Landing />} />
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
            <ProtectedRoute adminOnly={true}>
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
