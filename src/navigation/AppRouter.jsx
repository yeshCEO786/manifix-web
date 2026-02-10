import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Magic16 from "../pages/Magic16";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Vibe from "../pages/Vibe";
import VibeCreate from "../pages/VibeCreate";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/magic16" element={<Magic16 />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/vibe" element={<Vibe />} />
      <Route path="/vibe/create" element={<VibeCreate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
