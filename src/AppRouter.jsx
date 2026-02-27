// src/AppRouter.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import App from "./pages/App";
import Dashboard from "./pages/Dashboard";
import Gpt from "./pages/Gpt";
import Magic16 from "./pages/Magic16";
import Vibe from "./pages/Vibe";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

// Context
import { AppProvider } from "./context/AppContext";

/* ----------------------------
   Protected Route Wrapper
---------------------------- */
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/* ----------------------------
   Public Route (prevent login if already logged in)
---------------------------- */
const PublicRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default function AppRouter({ user }) {
  return (
    <AppProvider>
      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}

        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login />
            </PublicRoute>
          }
        />

        {/* ---------- PROTECTED APP ROUTES ---------- */}

        <Route
          path="/app"
          element={
            <ProtectedRoute user={user}>
              <App />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes inside App Layout */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="gpt" element={<Gpt />} />
          <Route path="magic16" element={<Magic16 />} />
          <Route path="vibe" element={<Vibe />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="billing" element={<Billing />} />
        </Route>

        {/* ---------- 404 ---------- */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </AppProvider>
  );
}
