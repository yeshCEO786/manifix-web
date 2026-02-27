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
      const currentUser = authService?.getCurrentUser?.();
      setUser(currentUser || null);
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return <AppRouter user={user} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
