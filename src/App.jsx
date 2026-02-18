import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./services/supabase";

// Pages
import Magic16 from "./pages/Magic16";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Gpt from "./pages/Gpt";
import Manifest from "./pages/Manifest";
import Vibe from "./pages/Vibe";
import VibeCreate from "./pages/VibeCreate";
import NotFound from "./pages/NotFound";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading ManifiX...
      </div>
    );
  }

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Magic16 />} />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profile"
        element={user ? <Profile user={user} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/settings"
        element={user ? <Settings /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/gpt"
        element={user ? <Gpt /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/manifest"
        element={user ? <Manifest /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/vibe"
        element={user ? <Vibe /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/vibe-create"
        element={user ? <VibeCreate /> : <Navigate to="/login" replace />}
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
