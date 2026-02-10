// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Magic16 from "./pages/Magic16";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Vibe from "./pages/Vibe";
import VibeCreate from "./pages/VibeCreate";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Simple protected route wrapper
const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppRouter = ({ user }) => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute user={user}>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/magic16"
        element={
          <PrivateRoute user={user}>
            <Magic16 />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute user={user}>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute user={user}>
            <Settings />
          </PrivateRoute>
        }
      />

      <Route
        path="/vibe"
        element={
          <PrivateRoute user={user}>
            <Vibe />
          </PrivateRoute>
        }
      />

      <Route
        path="/vibe/create"
        element={
          <PrivateRoute user={user}>
            <VibeCreate />
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
