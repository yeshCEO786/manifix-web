import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages (ALL inside src/pages)
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AppLayout from "./pages/App"; // layout wrapper
import Dashboard from "./pages/Dashboard";
import Gpt from "./pages/Gpt";
import Magic16 from "./pages/Magic16";
import Vibe from "./pages/Vibe";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

/* Protected Route */
const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

/* Public Route */
const PublicRoute = ({ user, children }) => {
  if (user) return <Navigate to="/app/dashboard" replace />;
  return children;
};

export default function AppRouter({ user }) {
  return (
    <Routes>

      {/* Landing */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/app/dashboard" replace /> : <Landing />
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          <PublicRoute user={user}>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected App Layout */}
      <Route
        path="/app"
        element={
          <ProtectedRoute user={user}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="gpt" element={<Gpt />} />
        <Route path="magic16" element={<Magic16 />} />
        <Route path="vibe" element={<Vibe />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="billing" element={<Billing />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
