import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import authService from "./services/auth.service";

function Root() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService?.getCurrentUser?.();
    setUser(currentUser);
    setLoading(false);
  }, []);

  // Prevents flash while checking auth
  if (loading) return null;

  return <AppRouter user={user} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Root />
    </HashRouter>
  </React.StrictMode>
);
