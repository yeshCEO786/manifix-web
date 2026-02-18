import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./services/supabase";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Gpt from "./pages/Gpt";
import Magic16 from "./pages/Magic16";
import Vibe from "./pages/Vibe";
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

      {/* Public */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Landing />}
      />

      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/gpt"
        element={user ? <Gpt /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/magic16"
        element={user ? <Magic16 /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/vibe"
        element={user ? <Vibe /> : <Navigate to="/login" replace />}
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
