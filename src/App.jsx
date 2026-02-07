import React, { useEffect, useState } from "react";
import AppRouter from "./navigation/AppRouter";
import authService from "./services/auth.service";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Safety: Prevent hanging forever
        const currentUser = await Promise.race([
          authService.getCurrentUser(),
          new Promise((resolve) => setTimeout(() => resolve(null), 3000)) // fallback after 3s
        ]);
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    // Loader with fallback text to prevent white screen
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5f5" }}>
        <h2 style={{ color: "#333" }}>Loading ManifiX...</h2>
      </div>
    );
  }

  return <AppRouter user={user} />;
};

export default App;
