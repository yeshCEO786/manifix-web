import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/Layout/MainLayout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Gpt from "./pages/Gpt";
import Magic16 from "./pages/Magic16";
import NotFound from "./pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/gpt"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Gpt />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/magic16"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Magic16 />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
