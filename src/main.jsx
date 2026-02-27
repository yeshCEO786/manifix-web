import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import authService from "./services/auth.service";

function Root() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Safely get current user
      const currentUser = authService?.getCurrentUser?.();
      setUser(currentUser || null);
    } catch (error) {
      console.error("Auth initialization error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Show visible fallback instead of blank page
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Loading ManifiX...
      </div>
    );
  }

  return <AppRouter user={user} />;
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
<BrowserRouter>
      <Root />
</BrowserRouter>
  </React.StrictMode>
);
