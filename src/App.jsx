import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./services/supabase";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Gpt from "./pages/Gpt";
import Magic16 from "./pages/Magic16";
import Vibe from "./pages/Vibe";
import NotFound from "./pages/NotFound";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!error && mounted) {
        setSession(data?.session ?? null);
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route
        path="/"
        element={
          session ? <Navigate to="/dashboard" replace /> : <Landing />
        }
      />

      <Route
        path="/login"
        element={
          session ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute session={session}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gpt"
        element={
          <ProtectedRoute session={session}>
            <Gpt />
          </ProtectedRoute>
        }
      />

      <Route
        path="/magic16"
        element={
          <ProtectedRoute session={session}>
            <Magic16 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vibe"
        element={
          <ProtectedRoute session={session}>
            <Vibe />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/* ================= LOADING SCREEN ================= */

function LoadingScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading ManifiX...</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#0e0e14",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    fontFamily: "Inter, sans-serif",
  },
  spinner: {
    width: "42px",
    height: "42px",
    border: "4px solid rgba(255,255,255,0.1)",
    borderTop: "4px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  text: {
    fontSize: "0.95rem",
    letterSpacing: "1px",
    opacity: 0.8,
  },
};

export default App;
