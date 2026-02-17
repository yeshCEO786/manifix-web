// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import authService from "./services/auth.service";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    initUser();
    const unsubscribe = authService.onAuthChange((u) => setUser(u));
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading…</div>;

  return (
    <BrowserRouter>
      <AppRouter user={user} />
    </BrowserRouter>
  );
}
