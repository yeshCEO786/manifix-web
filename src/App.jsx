import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Magic16 from "./pages/Magic16";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Vibe from "./pages/Vibe";
import VibeCreate from "./pages/VibeCreate";
import NotFound from "./pages/NotFound";

const isLoggedIn = () => {
  return !!localStorage.getItem("token"); // OR supabase session
};

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/magic16"
        element={
          <PrivateRoute>
            <Magic16 />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      <Route
        path="/vibe"
        element={
          <PrivateRoute>
            <Vibe />
          </PrivateRoute>
        }
      />

      <Route
        path="/vibe/create"
        element={
          <PrivateRoute>
            <VibeCreate />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
