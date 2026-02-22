// src/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import App from "./pages/App";

import { AppProvider } from "./context/AppContext";

export default function AppRouter({ user }) {
  return (
    <AppProvider>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={user ? <Navigate to="/app" /> : <Login />}
        />

        {/* Protected Main App */}
        <Route
          path="/app"
          element={user ? <App /> : <Navigate to="/login" />}
        />

        {/* Catch All */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>
    </AppProvider>
  );
}
