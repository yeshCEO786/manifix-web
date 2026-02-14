import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Magic16 from "./pages/Magic16";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Vibe from "./pages/Vibe";
import VibeCreate from "./pages/VibeCreate";
import NotFound from "./pages/NotFound";

export default function AppRouter({ user }) {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" replace />}
      />

      <Route
        path="/magic16"
        element={user ? <Magic16 /> : <Navigate to="/" replace />}
      />

      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/" replace />}
      />

      <Route
        path="/settings"
        element={user ? <Settings /> : <Navigate to="/" replace />}
      />

      <Route
        path="/vibe"
        element={user ? <Vibe /> : <Navigate to="/" replace />}
      />

      <Route
        path="/vibe/create"
        element={user ? <VibeCreate /> : <Navigate to="/" replace />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
