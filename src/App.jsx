import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import authService from "./services/auth.service";

function App() {
  const [user, setUser] = useState(undefined); // IMPORTANT

  useEffect(() => {
    let unsubscribe;

    authService.getCurrentUser().then((u) => {
      setUser(u);

      unsubscribe = authService.onAuthChange((newUser) => {
        setUser(newUser);
      });
    });

    return () => unsubscribe?.();
  }, []);

  // ⛔ BLOCK RENDER UNTIL AUTH LOADS
  if (user === undefined) {
    return null; // or loading spinner
  }

  return (
    <BrowserRouter>
      <AppRouter user={user} />
    </BrowserRouter>
  );
}

export default App;
